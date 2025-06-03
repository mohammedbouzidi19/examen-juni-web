import dotenv from "dotenv";
import { FlashMessage } from "./types";
import mongoDbSession from "connect-mongodb-session";
dotenv.config();

import session, { MemoryStore } from "express-session";

const MongoDBStore = mongoDbSession(session);

const mongoStore = new MongoDBStore({
    uri: process.env.MONGODB_URI ?? "mongodb://localhost:27017",
    collection: "sessions",
    databaseName: "natuur",
});

declare module 'express-session' {
    export interface SessionData {
        message : string 
        username : string
    }
}

export default session({
    secret: process.env.SESSION_SECRET ?? "my-super-secret-secret",
    store: new MemoryStore(),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
});