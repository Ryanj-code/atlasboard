import { Context } from "../../../context";
import { requireAuth, requireBoardRole } from "../../utils";
import { BoardRole, TaskStatus } from "../../../../prisma/generated";
import { pubsub } from "../../pubsub";

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

  return context.prisma.task.findMany({
    where: { boardId: args.boardId },
  });
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

  const newTask = await context.prisma.task.create({
    data: {
      boardId: args.boardId,
      title: args.title,
      status: args.status,
    },
  });

  await pubsub.publish("TASK_CREATED", {
    taskCreated: newTask,
  });

  return newTask;
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

  let dueDate: Date | undefined;
  if (args.dueDate && !isNaN(Date.parse(args.dueDate))) {
    dueDate = new Date(args.dueDate);
  }

  const updatedTask = await context.prisma.task.update({
    where: { id: args.id },
    data: {
      title: args.title,
      status: args.status,
      dueDate,
    },
  });

  await pubsub.publish("TASK_UPDATED", {
    taskUpdated: updatedTask,
  });

  return updatedTask;
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

  const deletedTask = await context.prisma.task.delete({
    where: { id: args.id },
  });

  await pubsub.publish("TASK_DELETED", {
    taskDeleted: deletedTask,
  });

  return deletedTask;
}
