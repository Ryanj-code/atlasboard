import {
  TaskCreatedDocument,
  TaskDeletedDocument,
  TaskUpdatedDocument,
} from "@/graphql/generated/graphql";
import { useSubscription } from "@apollo/client";

type useTaskSubscriptionsProps = {
  boardId: string;
  refetchTask: () => void;
  refetchBoard: () => void;
};

export function useTaskSubscriptions({
  boardId,
  refetchTask,
  refetchBoard,
}: useTaskSubscriptionsProps) {
  useSubscription(TaskCreatedDocument, {
    variables: { boardId },
    onData: () => {
      refetchTask();
      refetchBoard();
    },
  });

  useSubscription(TaskUpdatedDocument, {
    variables: { boardId },
    onData: () => {
      refetchTask();
      refetchBoard();
    },
  });

  useSubscription(TaskDeletedDocument, {
    variables: { boardId },
    onData: () => {
      refetchTask();
      refetchBoard();
    },
  });
}
