import { Context } from "../../../context";
import { requireAuth } from "../../utils";

export const me = async (_parent: unknown, _args: {}, context: Context) => {
  const userId = requireAuth(context);

  return context.prisma.user.findUnique({
    where: { id: userId },
  });
};

export const boards = async (
  parent: { id: string },
  _args: {},
  context: Context
) => {
  requireAuth(context);

  return context.prisma.board.findMany({
    where: { userId: parent.id },
  });
};
