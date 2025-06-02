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
      className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-700 
                 border border-amber-200 dark:border-slate-600 p-4 rounded-2xl shadow-md 
                 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
    >
      <input
        type="text"
        placeholder="Enter task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 
                   bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white text-sm 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        className="px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 
                   bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white text-sm 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
      >
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
      <button
        type="submit"
        className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white 
                   font-semibold text-sm shadow-sm hover:brightness-110 transition-all"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
