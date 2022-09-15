import mongoose, { Document } from "mongoose"
import { PLAYERS } from "../constants/types";
import { UserDocument } from './user.model'

export interface GameDocument extends Document {
    userId: UserDocument["_id"];
    boardWidth: number;
    currentPlayer: PLAYERS;
    gameDraw: boolean;
    gameWon: boolean;
    state: [number];
}

const gameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    boardWidth: Number,
    currentPlayer: { type: String, default: PLAYERS.PLAYER1 },
    gameDraw: { type: Boolean, default: false },
    gameWon: { type: Boolean, default: false },
    state: [Number]
})

export default mongoose.model<GameDocument>("Game", gameSchema)