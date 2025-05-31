import {
  addBoardMember,
  boardInvited,
  boards,
  createBoard,
  deleteBoard,
  getBoard,
  removeBoardMember,
  tasks,
  updateBoardMember,
} from "./board.service";

export const boardResolvers = {
  Query: {
    boards,
    getBoard,
  },

  Mutation: {
    createBoard,
    deleteBoard,
    addBoardMember,
    updateBoardMember,
    removeBoardMember,
  },

  Subscription: {
    boardInvited,
  },

  Board: {
    // This field resolver is optional if included via `include: { tasks: true }` above
    tasks,
  },
};
