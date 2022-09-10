import express, { Request, Response } from "express";

import { getAllGameLogs } from '../service/gameLog.service';

const gamesHandler = express.Router();

gamesHandler.get("/", async (req: Request, res: Response) => {
    try {
        const games = await getAllGameLogs();
        return res.status(200).send(games.map(game => ({
            _id: game._id,
            gameId: game.gameId,
            createdAt: game.createdAt,
            winner: game.winner
        })));
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default gamesHandler;