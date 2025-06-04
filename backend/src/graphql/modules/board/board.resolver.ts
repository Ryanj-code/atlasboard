import {
  addBoardMember,
  boardMembers,
  boardMemberUser,
  boards,
  createBoard,
  deleteBoard,
  getBoard,
  leaveBoard,
  removeBoardMember,
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
    leaveBoard,
  },

  Subscription: {
    boardInvited,
    boardUpdated,
    boardDeleted,
    boardMemberUpdated,
    boardMemberRemoved,
  },

  // Field resolvers
  Board: {
    tasks,
    members: boardMembers,
  },

  BoardMember: {
    user: boardMemberUser,
  },
};
