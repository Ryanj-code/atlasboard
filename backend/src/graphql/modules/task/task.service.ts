import { Context } from "../../../context";
import { requireAuth } from "../../utils";

export const tasks = async (
  _parent: unknown,
  args: { boardId: string },
  context: Context
) => {
  requireAuth(context);

  return context.prisma.task.findMany({
    where: { boardId: args.boardId },
  });
};

export const createTask = async (
  _parent: unknown,
  args: { boardId: string; title: string; status: string },
  context: Context
) => {
  requireAuth(context);

  return context.prisma.task.create({
    data: {
      boardId: args.boardId,
      title: args.title,
      status: args.status,
    },
  });
};

export const updateTask = async (
  _parent: unknown,
  args: { id: string; title?: string; status?: string; dueDate?: string },
  context: Context
) => {
  requireAuth(context);

  return context.prisma.task.update({
    where: { id: args.id },
    data: {
      title: args.title,
      status: args.status,
      dueDate: args.dueDate,
    },
  });
};

export const deleteTask = async (
  _parent: unknown,
  args: { id: string },
  context: Context
) => {
  requireAuth(context);

  await context.prisma.task.delete({
    where: { id: args.id },
  });
  return true;
};
