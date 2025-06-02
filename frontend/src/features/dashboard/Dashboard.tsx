import { useQuery } from "@apollo/client";
import {
  type TaskStatus,
  type Task,
  GetBoardsDocument,
  type Board,
} from "@/graphql/generated/graphql";
import BoardList from "../board/BoardList";
import { LayoutDashboard, ListTodo, Calendar } from "lucide-react";
import { SummaryCard } from "./SummaryCard";
import { getStatusIcon, getStatusLabel } from "@/utils/utils";
import { useAuth } from "@/contexts/AuthContext";

export const Dashboard = () => {
  const { user } = useAuth();
  const { data, loading, error } = useQuery(GetBoardsDocument);

  const boards = data?.boards || [];
  const allTasks = boards.flatMap((b: Board) => b.tasks);

  const taskCounts = {
    TODO: 0,
    IN_PROGRESS: 0,
    DONE: 0,
  };

  const upcomingDeadlines: { title: string; dueDate: string }[] = [];

  allTasks.forEach((task: Task) => {
    if (task.status in taskCounts) {
      taskCounts[task.status as TaskStatus]++;
    }
    if (task.dueDate) {
      upcomingDeadlines.push({
        title: task.title,
        dueDate: task.dueDate,
      });
    }
  });

  // Sort upcoming deadlines by date
  upcomingDeadlines.sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-amber-800 dark:text-amber-100">
          Welcome back, {user?.username}
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300 mt-2">
          Here’s an overview of your boards and task progress.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Boards */}
        <SummaryCard
          icon={
            <LayoutDashboard className="w-5 h-5 text-amber-700 dark:text-amber-300" />
          }
          title="Total Boards"
          value={loading ? "..." : boards.length}
          description="Boards you’re actively working on."
        />

        {/* Task Progress */}
        <SummaryCard
          icon={<ListTodo className="w-5 h-5 text-amber-700 dark:text-amber-300" />}
          title="Task Progress"
          value={
            <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
              {Object.entries(taskCounts).map(([status, count]) => (
                <li
                  key={status}
                  className="flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-100"
                >
                  {getStatusIcon(status)}
                  <span className="font-medium">{getStatusLabel(status)}:</span>
                  <span className="text-zinc-600 dark:text-zinc-300">
                    {loading ? "..." : count}
                  </span>
                </li>
              ))}
            </ul>
          }
          description="Overview of your tasks by status."
        />

        {/* Upcoming Deadlines */}
        <SummaryCard
          icon={<Calendar className="w-5 h-5 text-amber-700 dark:text-amber-300" />}
          title="Upcoming Deadlines"
          value={
            <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
              {loading ? (
                <li>Loading...</li>
              ) : upcomingDeadlines.length === 0 ? (
                <li>No upcoming deadlines.</li>
              ) : (
                upcomingDeadlines.slice(0, 3).map((task) => (
                  <li key={task.title}>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-zinc-800 dark:text-zinc-100">
                        {task.title}
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 italic">
                        Due {new Date(task.dueDate).toISOString().split("T")[0]}
                      </span>
                    </div>
                  </li>
                ))
              )}
            </ul>
          }
          description="Tasks with the nearest due dates."
        />
      </div>

      {/* Boards Section */}
      <div>
        <BoardList />
      </div>
    </div>
  );
};
