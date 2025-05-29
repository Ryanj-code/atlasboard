import gql from "graphql-tag";

export const taskTypeDefs = gql`
  enum TaskStatus {
    TODO
    IN_PROGRESS
    DONE
  }

  type Task {
    id: ID!
    title: String!
    status: TaskStatus!
    dueDate: String
    boardId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    tasks(boardId: ID!): [Task!]!
  }

  type Mutation {
    createTask(boardId: ID!, title: String!, status: TaskStatus!): Task!
    updateTask(
      id: ID!
      title: String
      status: TaskStatus
      dueDate: String
    ): Task!
    deleteTask(id: ID!): Task!
  }
`;
