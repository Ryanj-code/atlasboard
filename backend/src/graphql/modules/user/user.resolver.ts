import { boards, getUser, me, searchUsers } from "./user.service";
import { userBoardsUpdated } from "./user.subscription";

export const userResolvers = {
  Query: {
    me,
    getUser,
    searchUsers,
  },

  Subscription: {
    userBoardsUpdated,
  },

  User: {
    boards,
  },
};
