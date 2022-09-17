import express, { Request, Response } from "express";
import { PLAYERS } from "../constants/types";
import { deserializeUser } from "../middleware/deserializeUser";
import validateSchema from '../middleware/validateSchema'
import { createGameSchema, updateGameSchema, deleteGameSchema } from "../schema/game.schema";

import { createGame, getGameById, updateGame, deleteGame } from "../service/game.service";
import { getCurrentPlayer, checkForDraw, checkForWin } from "../util/gameLogic";

const gameHandler = express.Router();
gameHandler.use(deserializeUser);

// New game
gameHandler.post("/", validateSchema(createGameSchema), async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const game = req.body;
        const newGame = await createGame({ ...game, userId });
        return res.status(200).send(newGame);
    } catch (err) {
        return res.status(500).send(err);
    }
})

// Game turn
gameHandler.put("/:id", validateSchema(updateGameSchema), async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const id = req.params.id;
        const turn = req.body.state;

        // check if turn has already been played
        const game = await getGameById(id, userId);
        if (!game || game.state.includes(turn) || game.gameWon || game.gameDraw) return res.sendStatus(400);

        const playerMoves = [...game.state, turn].filter((_, index) => getCurrentPlayer(index) === game.currentPlayer)
        const gameWon = checkForWin(playerMoves, game.boardWidth);
        const gameDraw = checkForDraw(game.state.length + 1, game.boardWidth);
        const player = (gameDraw || gameWon) ? game.currentPlayer : getCurrentPlayer(game.state.length + 1);

        const updatedGame = await updateGame(id, userId, turn, player, gameWon, gameDraw);
        if (!updatedGame) return res.sendStatus(404);
        return res.status(200).send(updatedGame);

    } catch (err) {
        return res.status(500).send(err);
    }
})

// Game complete
gameHandler.delete("/:id", validateSchema(deleteGameSchema), async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const id = req.params.id;
        const deletedGame = await deleteGame(id, userId);
        return res.status(200).send(deletedGame);
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default gameHandler;
