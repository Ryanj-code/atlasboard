import { useSubscription } from "@apollo/client";
import { UserBoardsUpdatedDocument } from "@/graphql/generated/graphql";

type UseUserBoardSubscriptionProps = {
  userId: string | undefined;
  refetchBoards: () => void;
};

export const useUserBoardSubscription = ({
  userId,
  refetchBoards,
}: UseUserBoardSubscriptionProps) => {
  useSubscription(UserBoardsUpdatedDocument, {
    variables: { userId },
    skip: !userId,
    onData: () => {
      console.log("📡 UserBoardsUpdated received — refetching boards");
      refetchBoards();
    },
  });
};
