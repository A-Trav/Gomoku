import express, { Request, Response } from "express";

const gameLogHandler = express.Router();

gameLogHandler.get("/", async (req: Request, res: Response) => {  // expecting /:id here
    try {
        console.log('game-log/:id')
        return res.status(200).send('game-log/:id page');
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default gameLogHandler;