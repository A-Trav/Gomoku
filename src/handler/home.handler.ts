import express, { Request, Response } from "express";

const homeHandler = express.Router();

homeHandler.get("/", async (req: Request, res: Response) => {
    try {
        console.log('home page');
        return res.status(200).send('home page');
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default homeHandler;