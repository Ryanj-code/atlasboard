import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    user: User!
  }

  type RefreshPayload {
    accessToken: String!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    signup(email: String!, username: String!, password: String!): AuthPayload!
    logout(token: String!): Boolean!
    refreshToken(token: String!): RefreshPayload!
  }
`;
