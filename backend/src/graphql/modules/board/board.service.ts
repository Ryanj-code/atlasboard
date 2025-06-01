import { Context } from "../../../context";
import { requireAuth, requireBoardRole } from "../../utils";
import { BoardMember, BoardRole } from "../../../../prisma/generated";
import { pubsub } from "../../pubsub";
import { GraphQLError } from "graphql";
import { withFilter } from "graphql-subscriptions";
import { boardDeleted, boardMemberUpdated } from "./board.subscription";

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

  return memberships.map((m) => m.board);
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
