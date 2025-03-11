import express from 'express';
import dotenv from "dotenv";
import { ApolloServer } from '@apollo/server';
import cors from "cors";

dotenv.config();

const app = express();


// ✅ Initialize Apollo Server
const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    context: ({ req, res }) => ({ req, res }) // ✅ Allows setting cookies & auth
});


await server.start();
server.applyMiddleware({ app, cors: { origin: "*", credentials: true } });


app.listen(process.env.PORT, ()=> {
    console.log(`Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`);
})