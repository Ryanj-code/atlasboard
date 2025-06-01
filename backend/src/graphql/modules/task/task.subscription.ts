import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../../pubsub";

export const taskCreated = {
  subscribe: withFilter(
    () => pubsub.asyncIterableIterator("TASK_CREATED"),
    (payload, variables) => payload.taskCreated.boardId === variables.boardId
  ),
};

export const taskUpdated = {
  subscribe: withFilter(
    () => pubsub.asyncIterableIterator("TASK_UPDATED"),
    (payload, variables) => payload.taskUpdated.boardId === variables.boardId
  ),
};

export const taskDeleted = {
  subscribe: withFilter(
    () => pubsub.asyncIterableIterator("TASK_DELETED"),
    (payload, variables) => payload.taskDeleted.boardId === variables.boardId
  ),
};
