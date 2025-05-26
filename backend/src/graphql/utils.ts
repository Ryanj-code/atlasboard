import { GraphQLError } from "graphql";
import { Context } from "../context";

export function requireAuth(context: Context): string {
  if (!context.userId) {
    throw new GraphQLError("Unauthorized", {
      extensions: { code: "UNAUTHORIZED" },
    });
  }
  return context.userId;
}
