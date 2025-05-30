import { Context } from "../../../context";
import { requireAuth, requireBoardRole } from "../../utils";
import { BoardRole } from "../../../../prisma/generated";

export async function boards(_parent: unknown, _args: {}, context: Context) {
  const userId = requireAuth(context);

  const memberships = await context.prisma.boardMember.findMany({
    where: { userId },
    include: { board: { include: { tasks: true } } },
  });

  return memberships.map((m) => m.board);
}

export async function createBoard(
  _parent: unknown,
  args: { title: string; description?: string },
  context: Context
) {
  const userId = requireAuth(context);

  return context.prisma.board.create({
    data: {
      title: args.title,
      description: args.description,
      user: {
        connect: { id: userId },
      },
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

  return context.prisma.board.delete({
    where: { id: boardId },
  });
}

export async function addBoardMember(
  _parent: unknown,
  {
    boardId,
    userId,
    role,
  }: { boardId: string; userId: string; role: BoardRole },
  context: Context
) {
  const currentUserId = requireAuth(context);

  // Only the board OWNER can invite others
  await requireBoardRole(context.prisma, currentUserId, boardId, [
    BoardRole.OWNER,
  ]);

  return context.prisma.boardMember.create({
    data: {
      boardId,
      userId,
      role,
    },
  });
}

export async function updateBoardMember(
  _parent: unknown,
  {
    boardId,
    userId,
    role,
  }: { boardId: string; userId: string; role: BoardRole },
  context: Context
) {
  const currentUserId = requireAuth(context);

  // Only the current board OWNER can invite others
  await requireBoardRole(context.prisma, currentUserId, boardId, [
    BoardRole.OWNER,
  ]);

  return context.prisma.boardMember.update({
    where: {
      userId_boardId: { userId, boardId },
    },
    data: {
      role,
    },
  });
}

export async function tasks(
  parent: { id: string },
  _args: {},
  context: Context
) {
  const userId = requireAuth(context);

  // Skip role check if board no longer exists
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

  const rawTasks = await context.prisma.task.findMany({
    where: { boardId: parent.id },
  });

  return rawTasks.map((task) => ({
    ...task,
    createdAt: task.createdAt?.toISOString(),
    updatedAt: task.updatedAt?.toISOString(),
    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
  }));
}
