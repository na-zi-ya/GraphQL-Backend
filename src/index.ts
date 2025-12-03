import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";
import { authMiddleware } from "./middleware/auth";

dotenv.config();
connectDB();

const app: Application = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: authMiddleware(req) }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}${server.graphqlPath}`);
  });
}

startServer();
