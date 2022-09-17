import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user.model";
import { PLAYERS } from "../constants/types";

export interface GameLogDocument extends Document {
    userId: UserDocument["_id"];
    boardWidth: number;
    createdAt: Date;
    winner?: PLAYERS;
    result: [number];
}

const gameLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    boardWidth: Number,
    createdAt: Date,
    result: [Number],
}, { timestamps: { createdAt: true, updatedAt: false } })

export default mongoose.model<GameLogDocument>("GameLog", gameLogSchema);