import { Context } from "../../../context";
import { requireAuth, requireBoardRole } from "../../utils";
import { BoardRole, TaskStatus } from "../../../../prisma/generated";

export async function tasks(
  _parent: unknown,
  args: { boardId: string },
  context: Context
) {
  const userId = requireAuth(context);

  await requireBoardRole(context.prisma, userId, args.boardId, [
    BoardRole.OWNER,
    BoardRole.EDITOR,
    BoardRole.VIEWER,
  ]);

  const rawTasks = await context.prisma.task.findMany({
    where: { boardId: args.boardId },
  });

  return rawTasks.map((task) => ({
    ...task,
    createdAt: task.createdAt?.toISOString(),
    updatedAt: task.updatedAt?.toISOString(),
    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
  }));
}

export async function createTask(
  _parent: unknown,
  args: { boardId: string; title: string; status: TaskStatus },
  context: Context
) {
  const userId = requireAuth(context);

  await requireBoardRole(context.prisma, userId, args.boardId, [
    BoardRole.OWNER,
    BoardRole.EDITOR,
  ]);

  return context.prisma.task.create({
    data: {
      boardId: args.boardId,
      title: args.title,
      status: args.status,
    },
  });
}

export async function updateTask(
  _parent: unknown,
  args: { id: string; title?: string; status?: TaskStatus; dueDate?: string },
  context: Context
) {
  const userId = requireAuth(context);

  const task = await context.prisma.task.findUnique({
    where: { id: args.id },
    select: { boardId: true },
  });

  if (!task) throw new Error("Task not found");

  await requireBoardRole(context.prisma, userId, task.boardId, [
    BoardRole.OWNER,
    BoardRole.EDITOR,
  ]);

  return context.prisma.task.update({
    where: { id: args.id },
    data: {
      title: args.title,
      status: args.status,
      dueDate: args.dueDate ? new Date(args.dueDate) : undefined,
    },
  });
}

export async function deleteTask(
  _parent: unknown,
  args: { id: string },
  context: Context
) {
  const userId = requireAuth(context);

  const task = await context.prisma.task.findUnique({
    where: { id: args.id },
    select: { boardId: true },
  });

  if (!task) throw new Error("Task not found");

  await requireBoardRole(context.prisma, userId, task.boardId, [
    BoardRole.OWNER,
    BoardRole.EDITOR,
  ]);

  return context.prisma.task.delete({
    where: { id: args.id },
  });
}
