import gql from "graphql-tag";

export const taskTypeDefs = gql`
  type Task {
    id: ID!
    title: String!
    status: String!
    dueDate: String
    boardId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    tasks(boardId: ID!): [Task!]!
  }

  type Mutation {
    createTask(boardId: ID!, title: String!, status: String!): Task!
    updateTask(id: ID!, title: String, status: String, dueDate: String): Task!
    deleteTask(id: ID!): Boolean
  }
`;
