import express, { Request, Response } from "express";
import { deserializeUser } from "../middleware/deserializeUser";

import { createGameLog, getGameLogById } from "../service/gameLog.service";

const gameLogHandler = express.Router();
gameLogHandler.use(deserializeUser);

gameLogHandler.post("/", async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const game = req.body;
        console.log(game);
        const newGame = await createGameLog({ ...game, userId });
        return res.status(200).send(newGame);
    } catch (err) {
        return res.status(500).send(err);
    }
})

gameLogHandler.get("/:id", async (req: Request, res: Response) => {
    try {
        const gameId = req.params.id;
        const userId = req.userId;
        const game = await getGameLogById(gameId, userId);
        console.log(game)
        if (!game) return res.sendStatus(404);
        return res.status(200).send(game);
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default gameLogHandler;