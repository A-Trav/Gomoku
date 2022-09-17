import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user.model";
import { PLAYERS } from "../constants/types";

export interface GameLogDocument extends Document {
    userId: UserDocument["_id"];
    boardWidth: number;
    winner?: PLAYERS;
    result: [number];
    createdAt?: Date;
}

const gameLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    boardWidth: Number,
    winner: String,
    result: [Number],
}, { timestamps: { createdAt: true, updatedAt: false } })

export default mongoose.model<GameLogDocument>("GameLog", gameLogSchema);