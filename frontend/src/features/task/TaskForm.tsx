import type { BoardMember, TaskStatus } from "@/graphql/generated/graphql";
import { useState } from "react";
import AssigneeSelector from "./AssigneeSelector";

type TaskFormProps = {
  onSubmit: (
    title: string,
    status: TaskStatus,
    dueDate?: string,
    assigneeIds?: string[]
  ) => void;
  members?: BoardMember[];
};

const TaskForm = ({ onSubmit, members = [] }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [dueDate, setDueDate] = useState("");
  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, status, dueDate || undefined, assigneeIds);
    setTitle("");
    setDueDate("");
    setAssigneeIds([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-700 
               border border-amber-200 dark:border-slate-600 p-4 rounded-2xl shadow-md 
               flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-wrap"
    >
      {/* Title */}
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

      {/* Status */}
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

      {/* Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 
                   bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white text-sm 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
      />

      {/* Assignee selector */}
      <AssigneeSelector
        selectedIds={assigneeIds}
        onChange={setAssigneeIds}
        members={members}
      />

      {/* Submit */}
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
