import { useSubscription } from "@apollo/client";
import {
  BoardMemberRemovedDocument,
  BoardMemberUpdatedDocument,
} from "@/graphql/generated/graphql";
import { useNavigate } from "react-router-dom";

export function useBoardMemberSubscriptions(
  boardId: string,
  currentUserId: string,
  refetchBoard: () => void,
  setRoleChanged: (role: string | null) => void
) {
  const navigate = useNavigate();

  useSubscription(BoardMemberUpdatedDocument, {
    variables: { boardId },
    onData: ({ data }) => {
      const updated = data.data?.boardMemberUpdated;
      if (updated?.userId === currentUserId) {
        setRoleChanged(updated.role);
        setTimeout(() => setRoleChanged(null), 2000);
        refetchBoard();
      }
    },
  });

  useSubscription(BoardMemberRemovedDocument, {
    variables: { boardId },
    onData: ({ data }) => {
      const removed = data.data?.boardMemberRemoved;
      if (removed?.userId === currentUserId) {
        // Removed member
        navigate("/dashboard");
      } else {
        // For other members
        refetchBoard();
      }
    },
  });
}
