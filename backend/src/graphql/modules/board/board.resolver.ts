import {
  addBoardMember,
  boards,
  createBoard,
  deleteBoard,
  tasks,
  updateBoardMember,
} from "./board.service";

export const boardResolvers = {
  Query: {
    boards,
  },

  Mutation: {
    createBoard,
    deleteBoard,
    addBoardMember,
    updateBoardMember,
  },

  Board: {
    // This field resolver is optional if included via `include: { tasks: true }` above
    tasks,
  },
};
