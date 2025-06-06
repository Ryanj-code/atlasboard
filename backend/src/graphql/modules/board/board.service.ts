import { Context } from "../../../context";
import { requireAuth, requireBoardRole } from "../../utils";
import { pubsub } from "../../pubsub";
import { GraphQLError } from "graphql";
import { Board, BoardMember, BoardRole, Task } from "@prisma/client";

export async function boards(_parent: unknown, _args: {}, context: Context) {
  const userId = requireAuth(context);

  const memberships = await context.prisma.boardMember.findMany({
    where: { userId },
    include: {
      board: {
        include: { tasks: true },
      },
    },
  });

  type MembershipWithBoardAndTasks = BoardMember & {
    board: Board & { tasks: Task[] };
  };

  return memberships.map((m: MembershipWithBoardAndTasks) => m.board);
}

export async function getBoard(
  _parent: unknown,
  { boardId }: { boardId: string },
  context: Context
) {
  const userId = requireAuth(context);

  const membership = await context.prisma.boardMember.findUnique({
    where: {
      userId_boardId: {
        userId,
        boardId,
      },
    },
  });

  if (!membership) {
    throw new GraphQLError("Access denied", {
      extensions: { code: "FORBIDDEN" },
    });
  }

  return context.prisma.board.findUnique({
    where: { id: boardId },
    include: {
      tasks: true,
      members: true,
    },
  });
}

export async function createBoard(
  _parent: unknown,
  { title, description }: { title: string; description?: string },
  context: Context
) {
  const userId = requireAuth(context);

  return context.prisma.board.create({
    data: {
      title,
      description,
      user: { connect: { id: userId } },
      members: {
        create: {
          userId,
          role: BoardRole.OWNER,
        },
      },
    },
  });
}

export async function updateBoard(
  _parent: unknown,
  {
    boardId,
    title,
    description,
  }: { boardId: string; title?: string; description?: string },
  context: Context
) {
  const userId = requireAuth(context);

  // Allow only OWNER or EDITOR to update board
  await requireBoardRole(context.prisma, userId, boardId, [
    BoardRole.OWNER,
    BoardRole.EDITOR,
  ]);

  const updatedBoard = await context.prisma.board.update({
    where: { id: boardId },
    data: {
      ...(title && { title }),
      ...(description !== undefined && { description }),
    },
    include: { members: true },
  });

  await pubsub.publish("BOARD_UPDATED", {
    boardUpdated: updatedBoard,
  });

  return updatedBoard;
}

export async function deleteBoard(
  _parent: unknown,
  { boardId }: { boardId: string },
  context: Context
) {
  const userId = requireAuth(context);

  await requireBoardRole(context.prisma, userId, boardId, [BoardRole.OWNER]);

  const board = await context.prisma.board.findUnique({
    where: { id: boardId },
    include: { tasks: true, members: true },
  });

  if (board) {
    pubsub.publish("BOARD_DELETED", {
      boardDeleted: board,
    });
  }

  return context.prisma.board.delete({
    where: { id: boardId },
  });
}

export async function addBoardMember(
  _parent: unknown,
  { boardId, userId, role }: { boardId: string; userId: string; role: BoardRole },
  context: Context
) {
  const currentUserId = requireAuth(context);

  await requireBoardRole(context.prisma, currentUserId, boardId, [BoardRole.OWNER]);

  const newMember = await context.prisma.boardMember.create({
    data: { boardId, userId, role },
  });

  const board = await context.prisma.board.findUnique({
    where: { id: boardId },
    include: { tasks: true, members: true },
  });

  if (board) {
    pubsub.publish("BOARD_INVITED", {
      boardInvited: board,
    });
  }

  return newMember;
}

export async function updateBoardMember(
  _parent: unknown,
  { boardId, userId, role }: { boardId: string; userId: string; role: BoardRole },
  context: Context
) {
  const currentUserId = requireAuth(context);

  await requireBoardRole(context.prisma, currentUserId, boardId, [BoardRole.OWNER]);

  const updatedMember = await context.prisma.boardMember.update({
    where: {
      userId_boardId: { userId, boardId },
    },
    data: { role },
  });

  pubsub.publish("BOARD_MEMBER_UPDATED", {
    boardMemberUpdated: updatedMember,
  });

  return updatedMember;
}

export async function removeBoardMember(
  _parent: unknown,
  args: { boardId: string; userId: string },
  context: Context
) {
  const currentUserId = requireAuth(context);

  // Only an OWNER should be able to remove members
  await requireBoardRole(context.prisma, currentUserId, args.boardId, [BoardRole.OWNER]);

  const removedMember = await context.prisma.boardMember.delete({
    where: {
      userId_boardId: {
        userId: args.userId,
        boardId: args.boardId,
      },
    },
  });

  await pubsub.publish("BOARD_MEMBER_REMOVED", {
    boardMemberRemoved: removedMember,
  });

  return removedMember;
}

export async function leaveBoard(
  _parent: unknown,
  args: { boardId: string },
  context: Context
) {
  const userId = requireAuth(context);

  const member = await context.prisma.boardMember.findUnique({
    where: {
      userId_boardId: {
        userId,
        boardId: args.boardId,
      },
    },
    select: { role: true },
  });

  if (!member) {
    throw new Error("You're not a member of this board.");
  }

  if (member.role === BoardRole.OWNER) {
    throw new Error("Owners cannot leave the board.");
  }

  const removed = await context.prisma.boardMember.delete({
    where: {
      userId_boardId: {
        userId,
        boardId: args.boardId,
      },
    },
  });

  await pubsub.publish("BOARD_MEMBER_REMOVED", {
    boardMemberRemoved: removed,
  });

  return removed;
}

export async function tasks(parent: { id: string }, _args: {}, context: Context) {
  const userId = requireAuth(context);

  const board = await context.prisma.board.findUnique({
    where: { id: parent.id },
    select: { id: true },
  });

  if (!board) return [];

  await requireBoardRole(context.prisma, userId, parent.id, [
    BoardRole.OWNER,
    BoardRole.EDITOR,
    BoardRole.VIEWER,
  ]);

  return context.prisma.task.findMany({
    where: { boardId: parent.id },
  });
}

export async function boardMembers(parent: { id: string }, _args: {}, context: Context) {
  requireAuth(context);

  return context.prisma.boardMember.findMany({
    where: { boardId: parent.id },
    select: {
      userId: true,
      role: true,
    },
  });
}

export async function boardMemberUser(
  parent: { userId: string },
  _args: {},
  context: Context
) {
  return context.prisma.user.findUnique({
    where: { id: parent.userId },
  });
}
