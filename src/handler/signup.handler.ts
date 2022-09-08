import express, { Request, Response } from "express";

const signupHandler = express.Router();

signupHandler.get("/", async (req: Request, res: Response) => {
    try {
        console.log('signup page');
        return res.status(200).send('signup page');
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default signupHandler;