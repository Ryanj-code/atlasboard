import { useQuery, useMutation } from "@apollo/client";
import {
  GetTasksDocument,
  CreateTaskDocument,
  DeleteTaskDocument,
  UpdateTaskDocument,
  type TaskStatus,
  type Task,
} from "@/graphql/generated/graphql";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { useGetBoards } from "@/hooks/useGetBoards";
import { useTaskSubscriptions } from "@/hooks/useTaskSubscriptions";
import { ClipboardList } from "lucide-react";

type TaskListProps = {
  boardId: string;
  currentUserRole: "OWNER" | "EDITOR" | "VIEWER";
};

const TaskList = ({ boardId, currentUserRole }: TaskListProps) => {
  const { data, loading, error, refetch } = useQuery(GetTasksDocument, {
    variables: { boardId },
  });

  const { refetch: refetchBoard } = useGetBoards();
  useTaskSubscriptions({ boardId, refetchTask: refetch, refetchBoard });

  const [createTask] = useMutation(CreateTaskDocument);
  const [deleteTask] = useMutation(DeleteTaskDocument);
  const [updateTask] = useMutation(UpdateTaskDocument);

  const handleCreate = async (title: string, status: TaskStatus) => {
    await createTask({ variables: { boardId, title, status } });
    refetch();
    refetchBoard();
  };

  const handleDelete = async (id: string) => {
    await deleteTask({ variables: { id } });
    refetch();
    refetchBoard();
  };

  const handleUpdate = async (id: string, updates: Partial<Task>) => {
    await updateTask({ variables: { id, ...updates } });
    refetch();
    refetchBoard();
  };

  const grouped: Record<TaskStatus, Task[]> = {
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  };

  data?.tasks.forEach((task: Task) => {
    if (grouped[task.status as TaskStatus]) {
      grouped[task.status as TaskStatus].push(task);
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-10">
      <h2 className="flex items-center gap-2 text-3xl font-extrabold text-amber-800 dark:text-amber-100">
        <ClipboardList className="w-6 h-6 text-amber-700 dark:text-amber-200" />
        Current Tasks
      </h2>
      {/* Task creation form */}
      {(currentUserRole === "OWNER" || currentUserRole === "EDITOR") && (
        <TaskForm onSubmit={handleCreate} />
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
