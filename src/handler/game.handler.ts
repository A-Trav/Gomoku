import express, { Request, Response } from "express";

const gameHandler = express.Router();

gameHandler.get("/", async (req: Request, res: Response) => {
    try {
        console.log('game')
        return res.status(200).send('game page');
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default gameHandler;
