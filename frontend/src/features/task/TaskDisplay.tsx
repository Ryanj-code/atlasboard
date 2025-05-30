import { useParams } from "react-router-dom";
import TaskList from "./TaskList";
import { AlertTriangle } from "lucide-react";

const TaskDisplay = () => {
  const { boardId } = useParams<{ boardId: string }>();

  // needs to search if board exist
  if (!boardId) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-md border border-red-200 dark:border-slate-600">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">
          Board Not Found
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Please select a valid board to view its tasks. You may have followed
          an invalid link or the board no longer exists.
        </p>
      </div>
    );
  }

  return <TaskList boardId={boardId} />;
};

export default TaskDisplay;
