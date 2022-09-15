import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface GameLogDocument extends Document {
    userId: UserDocument["_id"];
    boardWidth: number;
    createdAt: Date;
    winner: string;
    result: [number];
}

const gameLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    boardWidth: Number,
    createdAt: Date,
    winner: String,
    result: [Number],
}, { timestamps: { createdAt: true, updatedAt: false } })

export default mongoose.model<GameLogDocument>("GameLog", gameLogSchema);