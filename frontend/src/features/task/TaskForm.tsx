import type { TaskStatus } from "@/graphql/generated/graphql";
import { useState } from "react";

type TaskFormProps = {
  onSubmit: (title: string, status: TaskStatus) => void;
};

const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("TODO");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, status);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 
                 p-5 rounded-xl shadow flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
    >
      <input
        type="text"
        placeholder="Enter task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-3 py-2 rounded border border-zinc-300 dark:border-zinc-600 
                   bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white text-sm"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        className="px-3 py-2 rounded border border-zinc-300 dark:border-zinc-600 
                   bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white text-sm"
      >
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
      <button
        type="submit"
        className="bg-gradient-to-r from-sky-600 to-cyan-500 text-white 
                   px-4 py-2 rounded shadow hover:brightness-110 transition text-sm"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
