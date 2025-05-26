import { Context } from "../../../context";
import { boards, me } from "./user.service";

export const userResolvers = {
  Query: {
    me,
  },

  User: {
    boards,
  },
};
