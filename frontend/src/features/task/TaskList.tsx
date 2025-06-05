import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GetTasksDocument,
  CreateTaskDocument,
  DeleteTaskDocument,
  UpdateTaskDocument,
  type TaskStatus,
  type Task,
  GetBoardDocument,
} from "@/graphql/generated/graphql";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { useGetBoards } from "@/hooks/useGetBoards";
import { useTaskSubscriptions } from "@/hooks/useTaskSubscriptions";
import { ClipboardList, Plus, X } from "lucide-react";
import Button from "@/components/ui/Button";

type TaskListProps = {
  boardId: string;
  currentUserRole: "OWNER" | "EDITOR" | "VIEWER";
};

const TaskList = ({ boardId, currentUserRole }: TaskListProps) => {
  const [showForm, setShowForm] = useState(false);

  const { data, loading, error, refetch } = useQuery(GetTasksDocument, {
    variables: { boardId },
  });

  const { data: BoardData } = useQuery(GetBoardDocument, {
    variables: { boardId },
  });

  const currentBoardMembers = BoardData.getBoard.members;

  const { refetch: refetchBoard } = useGetBoards();
  useTaskSubscriptions({ boardId, refetchTask: refetch, refetchBoard });

  const [createTask] = useMutation(CreateTaskDocument);
  const [deleteTask] = useMutation(DeleteTaskDocument);
  const [updateTask] = useMutation(UpdateTaskDocument);

  const handleCreate = async (
    title: string,
    status: TaskStatus,
    dueDate?: string,
    assigneeIds?: string[]
  ) => {
    await createTask({
      variables: { boardId, title, status, dueDate, assigneeIds },
    });
    refetch();
    refetchBoard();
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await deleteTask({ variables: { id } });
    refetch();
    refetchBoard();
  };

  const handleUpdate = async (
    id: string,
    updates: Partial<Task> & { assigneeIds?: string[] }
  ) => {
    await updateTask({
      variables: { id, ...updates },
    });
    refetch();
    refetchBoard();
  };

  const grouped = useMemo(() => {
    const buckets: Record<TaskStatus, Task[]> = {
      TODO: [],
      IN_PROGRESS: [],
      DONE: [],
    };
    data?.tasks.forEach((task: Task) => {
      buckets[task.status].push(task);
    });
    return buckets;
  }, [data?.tasks]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="flex items-center gap-2 text-3xl font-extrabold text-amber-800 dark:text-amber-100">
          <ClipboardList className="w-6 h-6 text-amber-700 dark:text-amber-200" />
          Current Tasks
        </h2>

        {(currentUserRole === "OWNER" || currentUserRole === "EDITOR") && (
          <Button
            onClick={() => setShowForm((prev) => !prev)}
            variant="primary"
            size="sm"
            className="flex items-center gap-2"
          >
            {showForm ? (
              <>
                <X className="w-4 h-4" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Task
              </>
            )}
          </Button>
        )}
      </div>
      {(currentUserRole === "OWNER" || currentUserRole === "EDITOR") && (
        <div className="space-y-4">
          {showForm && <TaskForm onSubmit={handleCreate} members={currentBoardMembers} />}
        </div>
      )}

      {loading && (
        <p className="text-center text-zinc-600 dark:text-zinc-300">Loading tasks...</p>
      )}
      {error && (
        <p className="text-center text-red-600 dark:text-red-400">
          Error: {error.message}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(["TODO", "IN_PROGRESS", "DONE"] as TaskStatus[]).map((status) => (
          <div
            key={status}
            className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 border border-amber-200 dark:border-slate-600 rounded-2xl p-5 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-4 tracking-tight">
              {status === "TODO"
                ? "To Do"
                : status === "IN_PROGRESS"
                ? "In Progress"
                : "Done"}
            </h3>

            <div className="space-y-4">
              {grouped[status].length ? (
                grouped[status].map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    currentUserRole={currentUserRole}
                    members={currentBoardMembers}
                  />
                ))
              ) : (
                <p className="text-sm italic text-zinc-500 dark:text-zinc-400">
                  No tasks here.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
