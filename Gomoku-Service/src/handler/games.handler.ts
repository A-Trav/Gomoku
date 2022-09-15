import express, { Request, Response } from "express";
import { deserializeUser } from "../middleware/deserializeUser";

import { getAllGameLogs } from '../service/gameLog.service';

const gamesHandler = express.Router();
gamesHandler.use(deserializeUser);

gamesHandler.get("/", async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const games = await getAllGameLogs(userId);
        return res.status(200).send(games.map(game => ({
            _id: game._id,
            createdAt: game.createdAt,
            winner: game.winner
        })));
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default gamesHandler;