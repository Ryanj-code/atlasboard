import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../../pubsub";

type UserBoardsUpdatedPayload = {
  userBoardsUpdated: {
    userIds: string[];
    value: boolean;
  };
};

export const userBoardsUpdated = {
  subscribe: withFilter(
    () => pubsub.asyncIterableIterator("USER_BOARDS_UPDATED"),
    (payload, variables) => {
      return payload.userBoardsUpdated.userIds.includes(variables.userId);
    }
  ),
  resolve: (payload: UserBoardsUpdatedPayload) => payload.userBoardsUpdated.value,
};
