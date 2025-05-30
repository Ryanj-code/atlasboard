import { useState } from "react";
import type { Task, TaskStatus } from "@/graphql/generated/graphql";
import { Pencil, Trash2, Calendar, Check, X } from "lucide-react";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";

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
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    onUpdate(task.id, { title, status, dueDate });
    setEditing(false);
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "DONE";

  return (
    <div className="group bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 border border-amber-200 dark:border-slate-600 hover:border-amber-300 dark:hover:border-slate-500 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 space-y-3">
      {editing ? (
        <div className="space-y-4 w-full">
          {/* Title Input */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Task title"
            autoFocus
          />

          {/* Status & Date */}
          <div className="flex flex-col gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="w-full sm:w-auto flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
            <div className="relative w-full sm:w-auto flex-1">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-row gap-3">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition duration-200 shadow hover:shadow-md"
            >
              <Check className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-zinc-700 dark:text-zinc-300 px-4 py-2.5 rounded-xl text-sm font-medium transition duration-200"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-amber-100 leading-snug">
              {task.title}
            </h4>

            <div className="flex flex-wrap items-center gap-2">
              {task.dueDate && (
                <div
                  className={`flex items-center gap-1.5 text-xs ${
                    isOverdue
                      ? "text-red-600 dark:text-red-400 font-medium"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {isOverdue ? "Overdue: " : "Due: "}
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      timeZone: "UTC",
                    })}
                  </span>
                </div>
              )}
              <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-slate-600 dark:text-amber-200 font-medium">
                {task.status.replace("_", " ")}
              </span>
            </div>
          </div>

          <div className="flex gap-1 transition-opacity duration-200">
            <button
              onClick={() => setEditing(true)}
              title="Edit"
              className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowModal(true)}
              title="Delete"
              className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <ConfirmDeleteModal
            isOpen={showModal}
            title="Delete Task"
            description={`Are you sure you want to delete the task "${task.title}"? This action cannot be undone.`}
            onConfirm={() => {
              onDelete(task.id);
              setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default TaskItem;
