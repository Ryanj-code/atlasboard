import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./modules/user/user.schema";
import { taskTypeDefs } from "./modules/task/task.schema";
import { boardTypeDefs } from "./modules/board/board.schema";
import { authTypeDefs } from "./modules/auth/auth.schema";

export const typeDefs = mergeTypeDefs([
  authTypeDefs,
  userTypeDefs,
  boardTypeDefs,
  taskTypeDefs,
]);
