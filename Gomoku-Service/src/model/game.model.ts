import mongoose, { Document } from "mongoose"
import { PLAYERS } from "../constants/types";
import { UserDocument } from './user.model'

export interface GameDocument extends Document {
    userId: UserDocument["_id"];
    boardWidth: number;
    gameOver: boolean;
    state: [number];
}

const gameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    boardWidth: Number,
    gameOver: { type: Boolean, default: false },
    state: [Number]
})

export default mongoose.model<GameDocument>("Game", gameSchema)