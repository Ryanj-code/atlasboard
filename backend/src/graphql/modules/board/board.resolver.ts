import {
  addBoardMember,
  boards,
  createBoard,
  deleteBoard,
  getBoard,
  removeBoardMember,
  tasks,
  updateBoardMember,
} from "./board.service";
import {
  boardDeleted,
  boardInvited,
  boardMemberRemoved,
  boardMemberUpdated,
} from "./board.subscription";

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
    boardDeleted,
    boardMemberUpdated,
    boardMemberRemoved,
  },

  Board: {
    // This field resolver is optional if included via `include: { tasks: true }` above
    tasks,
  },
};
