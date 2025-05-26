import { Context } from "../../../context";
import { requireAuth } from "../../utils";

export const boards = async (_parent: unknown, _args: {}, context: Context) => {
  requireAuth(context);

  return context.prisma.board.findMany({
    include: {
      tasks: true,
    },
  });
};

export const createBoard = async (
  _parent: unknown,
  args: { title: string; description?: string },
  context: Context
) => {
  const userId = requireAuth(context);

  return context.prisma.board.create({
    data: {
      title: args.title,
      description: args.description,
      user: {
        connect: { id: userId },
      },
    },
  });
};

export const tasks = async (
  parent: { id: string },
  _args: {},
  context: Context
) => {
  requireAuth(context);

  return context.prisma.task.findMany({
    where: { boardId: parent.id },
  });
};
