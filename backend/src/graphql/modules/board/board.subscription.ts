import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../../pubsub";
import { BoardMember } from "../../../../prisma/generated";

export const boardInvited = {
  subscribe: withFilter(
    () => {
      return pubsub.asyncIterableIterator("BOARD_INVITED");
    },
    (payload, _args, context) => {
      const userId = context.userId;
      // Filter based on members list if available
      const members = payload.boardInvited?.members ?? [];
      return members.some((m: BoardMember) => m.userId === userId);
    }
  ),
};

export const boardDeleted = {
  subscribe: withFilter(
    () => {
      return pubsub.asyncIterableIterator("BOARD_DELETED");
    },
    (payload, _args, context) => {
      const userId = context.userId;
      const members = payload.boardDeleted?.members ?? [];
      return members.some((m: BoardMember) => m.userId === userId);
    }
  ),
};

export const boardMemberUpdated = {
  subscribe: withFilter(
    () => {
      return pubsub.asyncIterableIterator("BOARD_MEMBER_UPDATED");
    },
    (payload, args, _context) => {
      const { boardId } = args;
      const match = payload.boardMemberUpdated.boardId === boardId;
      return match;
    }
  ),
};

export const boardMemberRemoved = {
  subscribe: withFilter(
    () => {
      return pubsub.asyncIterableIterator("BOARD_MEMBER_REMOVED");
    },
    (payload, args, _context) => {
      const { boardId } = args;
      const match = payload.boardMemberRemoved.boardId === boardId;
      return match;
    }
  ),
};
