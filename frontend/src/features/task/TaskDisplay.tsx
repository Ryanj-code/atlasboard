import { useParams } from "react-router-dom";
import TaskList from "./TaskList";

const TaskDisplay = () => {
  const { boardId } = useParams<{ boardId: string }>();

  if (!boardId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center ">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
          Board Not Found
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300">
          Please select a valid board to view its tasks.
        </p>
      </div>
    );
  }

  return <TaskList boardId={boardId} />;
};

export default TaskDisplay;
