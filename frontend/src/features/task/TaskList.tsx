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

type TaskListProps = {
  boardId: string;
};

const TaskList = ({ boardId }: TaskListProps) => {
  const { data, loading, error, refetch } = useQuery(GetTasksDocument, {
    variables: { boardId },
  });

  const [createTask] = useMutation(CreateTaskDocument);
  const [deleteTask] = useMutation(DeleteTaskDocument);
  const [updateTask] = useMutation(UpdateTaskDocument);

  const handleCreate = async (title: string, status: TaskStatus) => {
    await createTask({ variables: { boardId, title, status } });
    refetch();
  };

  const handleDelete = async (id: string) => {
    await deleteTask({ variables: { id } });
    refetch();
  };

  const handleUpdate = async (id: string, updates: Partial<Task>) => {
    await updateTask({ variables: { id, ...updates } });
    refetch();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-100 mb-6">
        Tasks
      </h2>

      <div className="mb-6 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 shadow">
        <TaskForm onSubmit={handleCreate} />
      </div>

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

      <div className="space-y-4">
        {data?.tasks.length ? (
          data.tasks.map((task: Task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p className="text-center text-zinc-500 dark:text-zinc-400">
            No tasks yet. Start by creating one above!
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
