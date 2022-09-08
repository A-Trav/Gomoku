import express, { Request, Response } from "express";

const gamesHandler = express.Router();

gamesHandler.get("/", async (req: Request, res: Response) => {
    try {
        console.log('games page');
        return res.status(200).send('games page');
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default gamesHandler;