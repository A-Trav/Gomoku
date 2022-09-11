import express, { Request, Response } from "express";
import { deserializeUser } from "../middleware/deserializeUser";

import { createGame, getGameById, updateGame, deleteGame, setGameOver } from "../service/game.service";
import { getCurrentPlayer, checkForDraw, checkForWin } from "../util/gameLogic";

const gameHandler = express.Router();
gameHandler.use(deserializeUser);

// New game
gameHandler.get("/", async (req: Request, res: Response) => {
    try {
        // need to add the user id to the new game record
        const userId = req.userId;
        const game = req.body;
        console.log(game);
        const newGame = await createGame({ ...game, userId });
        return res.status(200).send(newGame);
    } catch (err) {
        return res.status(500).send(err);
    }
})

// Game turn
gameHandler.put("/:id", async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const id = req.params.id;
        const turn = req.body.state;

        // check if turn has already been played
        const game = await getGameById(id, userId);

        if (!game || game.state.includes(turn) || game.gameOver) return res.sendStatus(400);

        const updatedGame = await updateGame(id, userId, turn);
        if (!updatedGame) return res.sendStatus(404);

        // Need to calculate win here
        if (checkForWin(updatedGame.state, updatedGame.boardWidth)) {
            console.log("Win");
            return res.status(200).send({ ...setGameOver(updatedGame.id, updatedGame.userId, true), gameWon: true });
        }
        if (checkForDraw(updatedGame.state.length, updatedGame.boardWidth)) {
            console.log("Draw");
            return res.status(200).send({ ...setGameOver(updatedGame.id, updatedGame.userId, true), gameDraw: true });
        }
        return res.status(200).send({ ...updatedGame, currentPlayer: getCurrentPlayer(updatedGame.state.length) });
    } catch (err) {
        return res.status(500).send(err);
    }
})

// Game complete
gameHandler.delete("/:id", async (req: Request, res: Response) => {
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
