import { GraphQLError } from "graphql";
import { Context } from "../context";
import { BoardRole, PrismaClient } from "../../prisma/generated";

export function requireAuth(context: Context): string {
  if (!context.userId) {
    throw new GraphQLError("Unauthorized", {
      extensions: { code: "UNAUTHORIZED" },
    });
  }
  return context.userId;
}

export async function requireBoardRole(
  prisma: PrismaClient,
  userId: string,
  boardId: string,
  allowedRoles: BoardRole[]
) {
  const membership = await prisma.boardMember.findUnique({
    where: {
      userId_boardId: { userId, boardId },
    },
  });

  if (!membership || !allowedRoles.includes(membership.role)) {
    throw new GraphQLError("Forbidden", {
      extensions: { code: "FORBIDDEN" },
    });
  }
}
