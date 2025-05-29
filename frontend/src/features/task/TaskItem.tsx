import { useState } from "react";
import type { Task, TaskStatus } from "@/graphql/generated/graphql";
import { Pencil, Trash2, Calendar } from "lucide-react";

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
};

const TaskItem = ({ task, onDelete, onUpdate }: TaskItemProps) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  const handleSave = () => {
    onUpdate(task.id, { title, status, dueDate });
    setEditing(false);
  };

  return (
    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 rounded-xl shadow-sm space-y-2">
      {editing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white text-sm"
            placeholder="Task title"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="px-3 py-2 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white text-sm"
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="REVIEW">Review</option>
              <option value="DONE">Done</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-3 py-2 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white text-sm"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h4 className="font-semibold text-zinc-800 dark:text-zinc-100">
                {task.title}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 capitalize">
                {task.status.replace(/_/g, " ").toLowerCase()}
              </p>
              {task.dueDate && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(true)}
                title="Edit"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                title="Delete"
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
