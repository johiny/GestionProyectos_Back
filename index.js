import express from  'express';
import cors from 'cors';
import {ApolloServer} from 'apollo-server-express';
import dotenv from 'dotenv';
import conectarBD from './db/db.js';
import {types}from './graphql/types.js';
import { resolvers } from './graphql/resolvers.js';
import { validateToken } from './utils/tokensUtils.js';

dotenv.config();

const getUserData = (token) =>{

    token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWEzZmFkMTRkMDAxODFkYTA0YWQwYmMiLCJub21icmUiOiJNQU5PTE8iLCJhcGVsbGlkbyI6IlNhbmNoZXoiLCJpZGVudGlmaWNhY2lvbiI6Ijk0ODQ5NTczOTg3IiwiY29ycmVvIjoicGVwaXRvcGVyZXpAZ21haWwuY29tIiwicm9sIjoiRVNUVURJQU5URSIsImlhdCI6MTYzODE1NDc1OCwiZXhwIjoxNjM4MzI3NTU4fQ.2G559sEhug3R_Vs-kqObTO0n-j5p0EjEDuOGbSEA-FY"
    const verification = validateToken(token.split(" ")[1])
    if(verification.data)
    {
        return verification.data;
    }
    else
    {
        return null;
    }
};

const server = new ApolloServer({
    typeDefs:types,
    resolvers: resolvers,
    context:({req}) => {
        const token = req.headers?.authorization?? null;
        if(token){
            const userData = getUserData(token);
            if(userData){
                console.log("contexto actual",userData)
                return {userData}; 
            }
        }
        return null;
    }
});

const app = express();
app.use (express.json());
app.use(cors());
app.listen({port: process.env.PORT || 4000}, async()=>{
    await conectarBD();
    await server.start();
    server.applyMiddleware({app});
    console.log("servidor listo");
});