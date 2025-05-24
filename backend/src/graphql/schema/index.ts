import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type Board {
    id: ID!
    title: String!
    description: String
    tasks: [Task!]!
  }

  type Task {
    id: ID!
    title: String!
    status: String!
    dueDate: String
    boardId: ID!
  }

  type Query {
    me: User
    boards: [Board!]!
    tasks(boardId: ID!): [Task!]!
  }

  type Mutation {
    createBoard(title: String!, description: String): Board!
    createTask(boardId: ID!, title: String!, status: String!): Task!
    updateTask(id: ID!, title: String, status: String, dueDate: String): Task!
    deleteTask(id: ID!): Boolean
  }
`;
