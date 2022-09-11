import express, { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { createUser, getUserByUsername } from "../service/auth.service";
import { signJwt } from "../util/jwt";

const authHandler = express.Router();

authHandler.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);

        // Check if the user already exists in the db
        const existingUser = await getUserByUsername(username);

        if (existingUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create new user in db
        const newUser = await createUser({
            username,
            password: encryptedPassword,
        });

        // Create token
        const token = signJwt({ username, _id: newUser._id });

        // return new user with token
        console.log({ token });
        res.status(200).json({ _id: newUser._id, token });
    } catch (err) {
        return res.status(500).send(err);
    }
})

authHandler.post("/login", async (req: Request, res: Response) => {
    try {
        // Get user input
        const { username, password } = req.body;

        // Check if user exists
        const user = await getUserByUsername(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = signJwt({ username, _id: user._id });

            // user
            return res.status(200).json({ _id: user._id, token });
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default authHandler;