import {
  LayoutDashboard,
  Trash2,
  ListTodo,
  ScrollText,
  PlusSquare,
  GitBranch,
} from "lucide-react";
import { useMutation } from "@apollo/client";
import { DeleteBoardDocument, type Board } from "@/graphql/generated/graphql";
import CreateBoardForm from "./CreateBoardForm";
import { Link } from "react-router-dom";
import { useGetBoards } from "@/hooks/useGetBoards";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
import { getStatusIcon, getStatusLabel } from "@/utils/utils";

const BoardList = () => {
  const { boards, loading, error, refetch } = useGetBoards();
  const [deleteBoard] = useMutation(DeleteBoardDocument);

  const boardsData = boards ?? [];
  // console.log(boardsData);

  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  if (loading)
    return (
      <p className="text-[#5c3a0d] dark:text-amber-100">Loading Boards...</p>
    );

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
            <div
              key={board.id}
              className="relative group border-2 border-amber-200 dark:border-slate-600 rounded-xl 
                 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 
                 hover:border-amber-300 dark:hover:border-slate-500 
                 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700"
            >
              <button
                onClick={() => {
                  setSelectedBoardId(board.id);
                  setShowModal(true);
                }}
                className="absolute top-2 right-2 text-red-600 dark:text-red-400 
                 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 
                 px-2 py-1 rounded text-xs transition-colors duration-200 z-10"
                title="Delete Board"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <Link to={`/board/${board.id}`} className="block p-5 h-full">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-[#5c3a0d] dark:text-amber-300" />
                    <h3 className="font-bold text-lg text-[#5c3a0d] dark:text-amber-100">
                      {board.title}
                    </h3>
                  </div>
                </div>

                <p
                  className="text-sm text-[#5c3a0d] dark:text-amber-200 italic mb-4 
                   bg-amber-100/50 dark:bg-slate-700/40 p-2 rounded-lg border-l-4 border-amber-400"
                >
                  <ScrollText className="inline w-4 h-4 mr-1 text-[#5c3a0d] dark:text-amber-300" />
                  {board.description || "No description provided"}
                </p>

                {board.tasks.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <ListTodo className="w-4 h-4 text-[#5c3a0d] dark:text-amber-300" />
                      <span className="text-sm font-semibold text-[#5c3a0d] dark:text-amber-100">
                        Tasks ({board.tasks.length})
                      </span>
                    </div>
                    <ul className="space-y-2 max-h-32 overflow-y-auto">
                      {board.tasks.map((task) => (
                        <li
                          key={task.id}
                          className="bg-white/60 dark:bg-slate-700/60 p-2 rounded-md 
                             border border-amber-200 dark:border-slate-600"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[#5c3a0d] dark:text-amber-100 font-medium text-sm flex items-center gap-1">
                              {getStatusIcon(task.status)} {task.title}
                            </span>
                          </div>
                          <span className="text-xs text-[#5c3a0d] dark:text-amber-300 capitalize">
                            {getStatusLabel(task.status)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center py-4 text-[#5c3a0d] dark:text-amber-300 text-sm">
                    No tasks have been created.
                  </div>
                )}
              </Link>
            </div>
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
