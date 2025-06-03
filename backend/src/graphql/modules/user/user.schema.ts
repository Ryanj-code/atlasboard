import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    boards: [Board!]!
  }

  type Query {
    me: User
    getUser(userId: ID!): User!
    searchUsers(query: String!): [User!]!
  }

  type Subscription {
    userBoardsUpdated(userId: ID!): Boolean
  }
`;
