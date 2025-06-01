import { createTask, deleteTask, tasks, updateTask } from "./task.service";
import { taskCreated, taskDeleted, taskUpdated } from "./task.subscription";

export const taskResolvers = {
  Query: {
    tasks,
  },

  Mutation: {
    createTask,
    updateTask,
    deleteTask,
  },

  Subscription: {
    taskCreated,
    taskUpdated,
    taskDeleted,
  },

  Task: {
    boardId: (parent: { boardId: string }) => parent.boardId,
  },
};
