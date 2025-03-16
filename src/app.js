import express from 'express';
import dotenv from "dotenv";
import { resolvers, typeDefs } from "../src/graphql/index.js";
import { ApolloServer } from '@apollo/server';
import cors from "cors";

dotenv.config();

const app = express();

//@TODO: cONFIG TOKEN ENV FILE
//@TODO: Is admin token generate

// ✅ Initialize Apollo Server
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req, res }) => ({ req, res }) // ✅ Allows setting cookies & auth
});


await server.start();
server.applyMiddleware({ app, cors: { origin: "*", credentials: true } });


app.listen(process.env.PORT, ()=> {
    console.log(`Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`);
})