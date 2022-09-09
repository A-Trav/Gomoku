import mongoose, { Document } from "mongoose";

export interface GameLogDocument extends Document {
    gameId: number;
    boardWidth: number;
    createdAt: Date;
    winner: string;
    result: [number];
}

const gameLogSchema = new mongoose.Schema({
    gameId: Number,
    boardWidth: Number,
    createdAt: Date,
    winner: String,
    result: [Number],
}, { timestamps: { createdAt: true, updatedAt: false } })

export default mongoose.model<GameLogDocument>("GameLog", gameLogSchema);