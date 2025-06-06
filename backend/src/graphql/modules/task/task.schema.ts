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
    dueDate: DateTime
    boardId: ID!
    assignees: [User!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    tasks(boardId: ID!): [Task!]!
  }

  type Mutation {
    createTask(
      boardId: ID!
      title: String!
      status: TaskStatus!
      dueDate: DateTime
      assigneeIds: [ID!]
    ): Task!
    updateTask(
      id: ID!
      title: String
      status: TaskStatus
      dueDate: DateTime
      assigneeIds: [ID!]
    ): Task!
    deleteTask(id: ID!): Task!
  }

  type Subscription {
    taskCreated(boardId: ID!): Task!
    taskUpdated(boardId: ID!): Task!
    taskDeleted(boardId: ID!): Task!
  }
`;
