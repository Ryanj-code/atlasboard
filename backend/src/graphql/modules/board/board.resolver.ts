import { Context } from "../../../context";
import { boards, createBoard, tasks } from "./board.service";

export const boardResolvers = {
  Query: {
    boards,
  },
  Mutation: {
    createBoard,
  },
  Board: {
    // This field resolver is optional if included via `include: { tasks: true }` above
    tasks,
  },
};
