import express, { Request, Response } from "express";

const loginHandler = express.Router();

loginHandler.get("/", async (req: Request, res: Response) => {
    try {
        console.log('login page');
        return res.status(200).send('login page');
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default loginHandler;