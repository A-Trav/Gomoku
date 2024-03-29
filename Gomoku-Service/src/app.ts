import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './util/connectDB';

import gameHandler from './handler/game.handler';
import gameLogHandler from './handler/gameLog.handler';
import authHandler from './handler/auth.handler';

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT;

app.use(
    cors({
        origin: process.env.allowHost || true
    })
)
app.use(express.json());

app.use('/api/game', gameHandler);
app.use('/api/game-log', gameLogHandler);
app.use('/api/auth', authHandler);

mongoose.connection.once('connected', () => {
    console.log('⚡️[server]: Connected to MongoDB.');
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})