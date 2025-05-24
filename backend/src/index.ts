import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// Placeholder for now
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// Placeholder for now
const resolvers = {
  Query: {
    hello: () => "Hello from AtlasBoard!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

  httpServer.listen(4000, () => {
    console.log(`Server ready at http://localhost:4000/graphql`);
  });
}

startServer();
