import express, { Request, Response } from "express";

import { getGameLogById } from "../service/gameLog.service";

const gameLogHandler = express.Router();

gameLogHandler.get("/:id", async (req: Request, res: Response) => {
    try {
        const game = await getGameLogById(req.params.id);
        console.log(game)
        if (!game) return res.sendStatus(404);
        return res.status(200).send(game);
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default gameLogHandler;