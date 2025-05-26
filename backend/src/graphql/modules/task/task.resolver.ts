import { createTask, deleteTask, tasks, updateTask } from "./task.service";

export const taskResolvers = {
  Query: {
    tasks,
  },

  Mutation: {
    createTask,
    updateTask,
    deleteTask,
  },

  Task: {
    // Optional: resolve fields like board if needed
    boardId: (parent: { boardId: string }) => parent.boardId,
  },
};
