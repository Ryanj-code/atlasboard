import {
  addBoardMember,
  boards,
  createBoard,
  deleteBoard,
  getBoard,
  removeBoardMember,
  resolveBoardMemberUser,
  tasks,
  updateBoard,
  updateBoardMember,
} from "./board.service";
import {
  boardDeleted,
  boardInvited,
  boardMemberRemoved,
  boardMemberUpdated,
  boardUpdated,
} from "./board.subscription";

export const boardResolvers = {
  Query: {
    boards,
    getBoard,
  },

  Mutation: {
    createBoard,
    updateBoard,
    deleteBoard,
    addBoardMember,
    updateBoardMember,
    removeBoardMember,
  },

  Subscription: {
    boardInvited,
    boardUpdated,
    boardDeleted,
    boardMemberUpdated,
    boardMemberRemoved,
  },

  Board: {
    // This field resolver is optional if included via `include: { tasks: true }` above
    tasks,
  },

  BoardMember: {
    user: resolveBoardMemberUser,
  },
};
