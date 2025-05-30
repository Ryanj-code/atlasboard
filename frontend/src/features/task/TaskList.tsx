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

type TaskListProps = {
  boardId: string;
};

const TaskList = ({ boardId }: TaskListProps) => {
  const { data, loading, error, refetch } = useQuery(GetTasksDocument, {
    variables: { boardId },
  });

  const { refetch: refetchBoard } = useGetBoards();

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

  const grouped = {
    TODO: [] as Task[],
    IN_PROGRESS: [] as Task[],
    DONE: [] as Task[],
  };

  data?.tasks.forEach((task: Task) => {
    if (grouped[task.status as TaskStatus]) {
      grouped[task.status as TaskStatus].push(task);
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h2 className="text-3xl font-extrabold text-amber-800 dark:text-amber-100 mb-2">
          Tasks Overview
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300">
          Organize your work across different statuses.
        </p>
      </div>

      {/* Task creation form */}
      <TaskForm onSubmit={handleCreate} />

      {loading && (
        <p className="text-center text-zinc-600 dark:text-zinc-300">
          Loading tasks...
        </p>
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
