import { Context } from "../../../context";
import { requireAuth } from "../../utils";

export async function me(_parent: unknown, _args: {}, context: Context) {
  const userId = requireAuth(context);

  return context.prisma.user.findUnique({
    where: { id: userId },
  });
}

export async function getUser(
  _parent: unknown,
  args: { userId: string },
  context: Context
) {
  requireAuth(context);

  return context.prisma.user.findUnique({
    where: { id: args.userId },
  });
}

export async function searchUsers(
  _parent: unknown,
  args: { query: string },
  context: Context
) {
  requireAuth(context);

  return context.prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: args.query, mode: "insensitive" } },
        { email: { contains: args.query, mode: "insensitive" } },
      ],
    },
    take: 10, // limit number of results
  });
}

export async function boards(parent: { id: string }, _args: {}, context: Context) {
  requireAuth(context);

  return context.prisma.board.findMany({
    where: { userId: parent.id },
  });
}
