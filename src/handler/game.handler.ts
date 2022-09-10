import express, { Request, Response } from "express";

import { createGame, updateGame, deleteGame } from "../service/game.service";

const gameHandler = express.Router();

// New game
gameHandler.get("/", async (req: Request, res: Response) => {
    try {
        const game = req.body;
        const newGame = await createGame({ ...game });
        return res.status(200).send(newGame);
    } catch (err) {
        return res.status(500).send(err);
    }
})

// Game turn
gameHandler.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const turn = req.body;
        console.log(JSON.stringify(turn));
        const updatedGame = await updateGame(id, turn);
        if (!updatedGame) return res.sendStatus(404);
        // Need to calculate win here
        return res.status(200).send(updatedGame);
    } catch (err) {
        return res.status(500).send(err);
    }
})

// Game complete
gameHandler.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deletedGame = await deleteGame(id);
        return res.status(200).send(deletedGame);
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default gameHandler;
