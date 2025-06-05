import { useState } from "react";
import type { BoardMember, Task, TaskStatus } from "@/graphql/generated/graphql";
import { Pencil, Trash2, Calendar, Check, X } from "lucide-react";
import ConfirmDeleteModal from "@/components/ui/ConfirmActionModal";
import { formatDateForInput } from "@/utils/utils";
import AssigneeSelector from "./AssigneeSelector";

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task> & { assigneeIds?: string[] }) => void;
  currentUserRole: "OWNER" | "EDITOR" | "VIEWER";
  members: BoardMember[];
};

const TaskItem = ({
  task,
  onDelete,
  onUpdate,
  currentUserRole,
  members,
}: TaskItemProps) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [assignees, setAssignees] = useState<string[]>(
    task.assignees?.map((user) => user.id) || []
  );
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    onUpdate(task.id, { title, status, dueDate, assigneeIds: assignees });
    setEditing(false);
  };

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const isOverdue = task.dueDate && task.dueDate < today && task.status !== "DONE";

  return (
    <div className="group bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 border border-amber-200 dark:border-slate-600 hover:border-amber-300 dark:hover:border-slate-500 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4">
      {editing ? (
        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Task title"
          />

          <div className="flex flex-col gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="px-4 py-3 rounded-xl border border-zinc-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>

            <input
              type="date"
              value={formatDateForInput(dueDate)}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-4 py-3 rounded-xl border border-zinc-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
            />

            {/* Assignee Checkbox Dropdown */}
            <AssigneeSelector
              selectedIds={assignees}
              onChange={setAssignees}
              members={members}
            />
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:brightness-110 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm"
            >
              <Check className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
              }}
              className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-sm text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-xl"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-2">
            <h4 className="text-base font-semibold text-zinc-800 dark:text-amber-100">
              {task.title}
            </h4>

            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              {task.dueDate && (
                <div
                  className={`flex items-center gap-1.5 ${
                    isOverdue ? "text-red-600 dark:text-red-400 font-medium" : ""
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {isOverdue ? "Overdue: " : "Due: "}
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                  })}
                </div>
              )}
              <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-slate-600 dark:text-amber-200 font-medium">
                {task.status.replace("_", " ")}
              </span>

              {task.assignees?.length > 0 && (
                <span>
                  • Assigned to {task.assignees.map((user) => user.username).join(", ")}
                </span>
              )}
            </div>
          </div>

          {(currentUserRole === "OWNER" || currentUserRole === "EDITOR") && (
            <div className="flex gap-1">
              <button
                onClick={() => setEditing(true)}
                className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={showModal}
        title="Delete Task"
        description={`Are you sure you want to delete "${task.title}"? This cannot be undone.`}
        onConfirm={() => {
          onDelete(task.id);
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default TaskItem;
