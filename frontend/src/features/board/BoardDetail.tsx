import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetBoardDocument, type BoardMember } from "@/graphql/generated/graphql";
import TaskList from "../task/TaskList";
import BoardMembers from "../board-member/BoardMembers";
import { AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useBoardMemberSubscriptions } from "@/hooks/useBoardMemberSubscriptions";
import { useBoardSubscriptions } from "@/hooks/useBoardSubscriptions";
import EditBoardForm from "./EditBoardForm";

const BoardDetail = () => {
  const { user } = useAuth();
  const { boardId } = useParams<{ boardId: string }>();

  const [activeTab, setActiveTab] = useState<"tasks" | "members">("tasks");
  const [roleChanged, setRoleChanged] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery(GetBoardDocument, {
    variables: { boardId: boardId },
    skip: !boardId,
  });

  useBoardMemberSubscriptions(boardId ?? "", user?.id ?? "", refetch, setRoleChanged);
  useBoardSubscriptions({ refetchBoards: refetch, currentBoardId: boardId ?? "" });

  if (!user || !boardId || loading) {
    return (
      <div className="text-center py-10 text-zinc-700 dark:text-zinc-300">
        Loading board details...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-md border border-red-200 dark:border-slate-600">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">
          Board Not Found
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Please select a valid board to view its tasks. You may have followed an invalid
          link or the board no longer exists.
        </p>
      </div>
    );
  }

  const board = data.getBoard;

  const currentMember = board.members.find(
    (member: BoardMember) => member.userId === user.id
  );

  if (!currentMember) {
    return (
      <div className="text-center py-10 text-zinc-700 dark:text-zinc-300">
        You are not a member of this board.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <EditBoardForm board={board} currentUserRole={currentMember.role} />

      {/* Tab Header */}
      <div className="flex gap-4 mb-4 border-b border-amber-200 dark:border-slate-600">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "tasks"
              ? "border-b-2 border-amber-500 text-amber-600 dark:text-amber-300"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
        >
          Tasks
        </button>
        <button
          onClick={() => setActiveTab("members")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "members"
              ? "border-b-2 border-amber-500 text-amber-600 dark:text-amber-300"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
        >
          Members
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "tasks" && (
        <TaskList boardId={boardId} currentUserRole={currentMember.role} />
      )}
      {activeTab === "members" && (
        <BoardMembers boardId={boardId} currentUserRole={currentMember.role} />
      )}

      {roleChanged && (
        <div className="mb-4 p-3 text-sm bg-blue-100 text-blue-800 rounded">
          Your role has been updated to <strong>{roleChanged}</strong>.
        </div>
      )}
    </div>
  );
};

export default BoardDetail;
