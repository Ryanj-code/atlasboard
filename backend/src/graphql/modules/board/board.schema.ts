import { gql } from "graphql-tag";

export const boardTypeDefs = gql`
  type Board {
    id: ID!
    title: String!
    description: String
    tasks: [Task!]!
  }

  enum BoardRole {
    OWNER
    EDITOR
    VIEWER
  }

  type BoardMember {
    id: ID!
    boardId: String!
    userId: String!
    role: BoardRole!
    createdAt: String!
  }

  type Query {
    boards: [Board!]!
  }

  type Mutation {
    createBoard(title: String!, description: String): Board!
    deleteBoard(boardId: ID!): Board!

    addBoardMember(
      boardId: String!
      userId: String!
      role: BoardRole!
    ): BoardMember!
    updateBoardMember(
      boardId: String!
      userId: String!
      role: BoardRole!
    ): BoardMember!
  }
`;
