import { Code2, ListTodo, SearchCheck } from "lucide-react";

export const getStatusIcon = (status: string) => {
  switch (status.toUpperCase()) {
    case "DONE":
      return <Code2 className="w-4 h-4 text-green-600 dark:text-green-300" />;
    case "IN_PROGRESS":
      return (
        <SearchCheck className="w-4 h-4 text-blue-600 dark:text-blue-300" />
      );
    case "TODO":
    default:
      return <ListTodo className="w-4 h-4 text-zinc-600 dark:text-zinc-200" />;
  }
};

export const getStatusLabel = (status: string) => {
  switch (status.toUpperCase()) {
    case "DONE":
      return "Completed";
    case "IN_PROGRESS":
      return "In Progress";
    case "TODO":
    default:
      return "To Do";
  }
};
