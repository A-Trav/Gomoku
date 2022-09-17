import express, { Request, Response } from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import validateSchema from "../middleware/validateSchema";
import { getGameLogByIdSchema, createGameLogSchema } from "../schema/gameLog.schema";
import { checkForDraw, checkForWin } from "../util/gameLogic";

import { createGameLog, getAllGameLogs, getGameLogById } from "../service/gameLog.service";

const gameLogHandler = express.Router();
gameLogHandler.use(deserializeUser);

// Create game log
gameLogHandler.post("/", validateSchema(createGameLogSchema), async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const game = req.body;
        const newGame = await createGameLog({ ...game, userId });
        return res.status(200).send(newGame);
    } catch (err) {
        return res.status(500).send(err);
    }
})

// Get all game logs
gameLogHandler.get("/", async (req: Request, res: Response) => {
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

// Get game log by id
gameLogHandler.get("/:id", validateSchema(getGameLogByIdSchema), async (req: Request, res: Response) => {
    try {
        const gameId = req.params.id;
        const userId = req.userId;
        const game = await getGameLogById(gameId, userId);
        if (!game) return res.sendStatus(404);
        return res.status(200).send(game);
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default gameLogHandler;