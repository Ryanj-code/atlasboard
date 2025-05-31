import { gql } from "graphql-tag";

export const boardTypeDefs = gql`
  scalar DateTime

  type Board {
    id: ID!
    title: String!
    description: String
    tasks: [Task!]!
    userId: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    members: [BoardMember!]!
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
    createdAt: DateTime!
  }

  type Query {
    boards: [Board!]!
    getBoard(boardId: ID!): Board!
  }

  type Mutation {
    createBoard(title: String!, description: String): Board!
    deleteBoard(boardId: ID!): Board!

    addBoardMember(boardId: String!, userId: String!, role: BoardRole!): BoardMember!
    updateBoardMember(boardId: String!, userId: String!, role: BoardRole!): BoardMember!
    removeBoardMember(boardId: String!, userId: String!): BoardMember!
  }

  type Subscription {
    boardInvited: Board!
  }
`;
