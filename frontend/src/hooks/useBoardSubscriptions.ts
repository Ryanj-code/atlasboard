import { useSubscription } from "@apollo/client";
import {
  BoardDeletedDocument,
  BoardInvitedDocument,
  BoardUpdatedDocument,
} from "@/graphql/generated/graphql";
import { useNavigate } from "react-router-dom";

type useBoardSubscriptionsProps = {
  refetchBoards: () => void;
  currentBoardId?: string;
};

export function useBoardSubscriptions({
  refetchBoards,
  currentBoardId,
}: useBoardSubscriptionsProps) {
  const navigate = useNavigate();
  useSubscription(BoardInvitedDocument, {
    onData: ({ data }) => {
      // console.log(data);
      const invitedBoard = data.data?.boardInvited;
      if (invitedBoard) {
        refetchBoards();
      }
    },
  });

  useSubscription(BoardUpdatedDocument, {
    onData: ({ data }) => {
      const updatedBoard = data.data?.boardUpdated;
      if (updatedBoard) {
        // Only refetch if this board is the one currently being viewed
        if (currentBoardId && updatedBoard.id === currentBoardId) {
          refetchBoards();
        }
      }
    },
  });

  useSubscription(BoardDeletedDocument, {
    onData: ({ data }) => {
      const deletedBoard = data.data?.boardDeleted;
      if (deletedBoard) {
        refetchBoards();

        if (currentBoardId && deletedBoard.id === currentBoardId) {
          navigate("/dashboard");
        }
      }
    },
  });
}
