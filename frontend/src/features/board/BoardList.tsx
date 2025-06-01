import { useState } from "react";
import { LayoutDashboard, PlusSquare } from "lucide-react";
import { useMutation } from "@apollo/client";
import { DeleteBoardDocument, type Board } from "@/graphql/generated/graphql";
import CreateBoardForm from "./CreateBoardForm";
import { useGetBoards } from "@/hooks/useGetBoards";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
import BoardCard from "./BoardCard";
import { useBoardSubscriptions } from "@/hooks/useBoardSubscriptions";

const BoardList = () => {
  const { boards, loading, error, refetch } = useGetBoards();
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  useBoardSubscriptions({ refetchBoards: refetch });

  const boardsData = boards ?? [];

  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  if (loading)
    return <p className="text-[#5c3a0d] dark:text-amber-100">Loading Boards...</p>;

  if (error)
    return (
      <p className="text-red-600 dark:text-red-400">
        Error Loading Boards: {error.message}
      </p>
    );

  const handleConfirmDelete = async () => {
    if (!selectedBoardId) return;
    await deleteBoard({ variables: { boardId: selectedBoardId } });
    setShowModal(false);
    setSelectedBoardId(null);
    refetch();
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedBoardId(null);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <LayoutDashboard className="w-8 h-8 text-[#5c3a0d] dark:text-amber-300" />
          <div>
            <h2 className="text-3xl font-bold text-[#5c3a0d] dark:text-amber-100">
              Developer Dashboard – Projects Overview
            </h2>
            <p className="text-[#5c3a0d] dark:text-amber-300 text-sm">
              Track active boards, issues, and progress
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {boardsData.map((board: Board) => (
            <BoardCard
              key={board.id}
              board={board}
              onDelete={(id) => {
                setSelectedBoardId(id);
                setShowModal(true);
              }}
            />
          ))}
        </div>

        {boardsData.length === 0 && (
          <div className="text-center py-12">
            <LayoutDashboard className="mx-auto w-12 h-12 text-[#5c3a0d] dark:text-amber-300 mb-4" />
            <h3 className="text-xl font-semibold text-[#5c3a0d] dark:text-amber-100 mb-2">
              No Projects Yet
            </h3>
            <p className="text-[#5c3a0d] dark:text-amber-300">
              Start by creating your first board to track development
            </p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t-2 border-amber-200 dark:border-slate-600">
          <div className="flex items-center gap-2 mb-4">
            <PlusSquare className="w-5 h-5 text-[#5c3a0d] dark:text-amber-300" />
            <h3 className="text-lg font-semibold text-[#5c3a0d] dark:text-amber-100">
              Create New Project Board
            </h3>
          </div>

          <CreateBoardForm onCreated={refetch} />
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={showModal}
        title="Delete Board"
        description="Are you sure you want to delete this board? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default BoardList;
