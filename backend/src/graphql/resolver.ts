import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./modules/user/user.resolver";
import { boardResolvers } from "./modules/board/board.resolver";
import { taskResolvers } from "./modules/task/task.resolver";
import { authResolvers } from "./modules/auth/auth.resolver";

export const resolvers = mergeResolvers([
  authResolvers,
  userResolvers,
  boardResolvers,
  taskResolvers,
]);
