import { Link } from "react-router-dom";
import { Trash2, ListTodo, ScrollText, GitBranch } from "lucide-react";
import type { Board } from "@/graphql/generated/graphql";
import { getStatusIcon, getStatusLabel } from "@/utils/utils";
import { useAuth } from "@/contexts/AuthContext";

type BoardCardProps = {
  board: Board;
  onDelete: (boardId: string) => void;
};

const BoardCard = ({ board, onDelete }: BoardCardProps) => {
  const { user } = useAuth();

  const isOwner = board.members?.some(
    (member) => member.userId === user?.id && member.role === "OWNER"
  );

  return (
    <div
      className="relative group border-2 border-amber-200 dark:border-slate-600 rounded-xl 
         shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 
         hover:border-amber-300 dark:hover:border-slate-500 
         bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700"
    >
      {isOwner && (
        <button
          onClick={() => onDelete(board.id)}
          className="absolute top-2 right-2 text-red-600 dark:text-red-400 
         hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 
         px-2 py-1 rounded text-xs transition-colors duration-200 z-10"
          title="Delete Board"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

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
  );
};

export default BoardCard;
