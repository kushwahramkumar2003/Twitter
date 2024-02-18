import express, { query } from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { prismaClient } from "../clients";
import { User } from "./user";

export async function initServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const graphqlServer = new ApolloServer({
    typeDefs: `
    ${User.types}
    type Query{
        ${User.queries}
    }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
    },
  });

  await graphqlServer.start();

  app.use("/graphql", expressMiddleware(graphqlServer));

  return app;
}
