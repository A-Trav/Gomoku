import mongoose, { Document } from "mongoose"

export interface GameDocument extends Document {
    boardWidth: number;
    state: [number];
}

const gameSchema = new mongoose.Schema({
    boardWidth: Number,
    state: [Number]
})

export default mongoose.model<GameDocument>("Game", gameSchema)