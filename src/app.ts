import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import homeHandler from './handler/home.handler';
import signupHandler from './handler/signup.handler';
import loginHandler from './handler/login.handler';
import gameHandler from './handler/game.handler';
import gameLogHandler from './handler/gameLog.handler';
import gamesHandler from './handler/games.handler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/', homeHandler);
app.use('/login', loginHandler);
app.use('/signup', signupHandler);
app.use('/game', gameHandler);
app.use('/games', gamesHandler);
app.use('/game-log', gameLogHandler);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});