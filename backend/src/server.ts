import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { useServer } from "graphql-ws/use/ws";
import { WebSocketServer } from "ws";

import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolver";
import { createContext } from "./context";
import { makeExecutableSchema } from "@graphql-tools/schema";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// Create GraphQL schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// Attach GraphQL WebSocket server
useServer(
  {
    schema,
    context: async (ctx) => {
      const token =
        ctx.connectionParams?.Authorization || ctx.connectionParams?.authorization;

      const fakeReq = {
        headers: {
          authorization: typeof token === "string" ? token : "",
        },
      };

      const context = createContext(fakeReq);
      return context;
    },
  },
  wsServer
);

// Create ApolloServer instance for HTTP requests
const server = new ApolloServer({ schema });

async function startServer() {
  await server.start();

  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => createContext(req),
    })
  );

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`HTTP endpoint ready at http://localhost:${PORT}/graphql`);
    console.log(`WS endpoint ready at ws://localhost:${PORT}/graphql`);
  });
}

startServer();
