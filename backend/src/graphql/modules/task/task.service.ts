import { Context } from "../../../context";
import { requireAuth, requireBoardRole } from "../../utils";
import { BoardRole, TaskStatus } from "@prisma/client";
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
    include: { assignees: true },
  });
}

export async function createTask(
  _parent: unknown,
  args: {
    boardId: string;
    title: string;
    status: TaskStatus;
    dueDate?: string;
    assigneeIds?: string[];
  },
  context: Context
) {
  const userId = requireAuth(context);

  await requireBoardRole(context.prisma, userId, args.boardId, [
    BoardRole.OWNER,
    BoardRole.EDITOR,
  ]);

  let dueDate: Date | undefined;
  if (args.dueDate && !isNaN(Date.parse(args.dueDate))) {
    dueDate = new Date(args.dueDate);
  }

  const newTask = await context.prisma.task.create({
    data: {
      boardId: args.boardId,
      title: args.title,
      status: args.status,
      dueDate,
      assignees: args.assigneeIds
        ? {
            connect: args.assigneeIds.map((id) => ({ id })),
          }
        : undefined,
    },
    include: {
      assignees: true,
    },
  });

  await pubsub.publish("TASK_CREATED", {
    taskCreated: newTask,
  });

  const boardMembers: { userId: string }[] = await context.prisma.boardMember.findMany({
    where: { boardId: args.boardId },
    select: { userId: true },
  });

  const userIds = boardMembers.map((m) => m.userId);

  await pubsub.publish("USER_BOARDS_UPDATED", {
    userBoardsUpdated: { userIds, value: true },
  });

  return newTask;
}

export async function updateTask(
  _parent: unknown,
  args: {
    id: string;
    title?: string;
    status?: TaskStatus;
    dueDate?: string;
    assigneeIds?: string[];
  },
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
      ...(args.assigneeIds && {
        assignees: {
          set: args.assigneeIds.map((id) => ({ id })),
        },
      }),
    },
    include: {
      assignees: true,
    },
  });

  await pubsub.publish("TASK_UPDATED", {
    taskUpdated: updatedTask,
  });

  const boardMembers: { userId: string }[] = await context.prisma.boardMember.findMany({
    where: { boardId: task.boardId },
    select: { userId: true },
  });
  const userIds = boardMembers.map((m) => m.userId);

  await pubsub.publish("USER_BOARDS_UPDATED", {
    userBoardsUpdated: { userIds, value: true },
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
    include: { assignees: true },
  });

  const boardMembers: { userId: string }[] = await context.prisma.boardMember.findMany({
    where: { boardId: task.boardId },
    select: { userId: true },
  });
  const userIds = boardMembers.map((m) => m.userId);

  await pubsub.publish("USER_BOARDS_UPDATED", {
    userBoardsUpdated: { userIds, value: true },
  });

  return deletedTask;
}

export async function taskAssignees(
  parent: { id: string },
  _args: {} = {},
  context: Context
) {
  const taskWithAssignees = await context.prisma.task.findUnique({
    where: { id: parent.id },
    include: {
      assignees: true,
    },
  });

  return taskWithAssignees?.assignees ?? [];
}
