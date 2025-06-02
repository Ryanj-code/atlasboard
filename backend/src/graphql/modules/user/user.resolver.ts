import { boards, getUser, me, searchUsers } from "./user.service";

export const userResolvers = {
  Query: {
    me,
    getUser,
    searchUsers,
  },

  User: {
    boards,
  },
};
