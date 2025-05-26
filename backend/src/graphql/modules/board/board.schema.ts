import { gql } from "graphql-tag";

export const boardTypeDefs = gql`
  type Task {
    id: ID!
    title: String!
    boardId: ID!
  }

  type Board {
    id: ID!
    title: String!
    description: String
    tasks: [Task!]!
  }

  type Query {
    boards: [Board!]!
  }

  type Mutation {
    createBoard(title: String!, description: String): Board!
  }
`;
