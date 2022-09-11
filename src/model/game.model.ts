import mongoose, { Document } from "mongoose"
import { UserDocument } from './user.model'

export interface GameDocument extends Document {
    userId: UserDocument["_id"];
    boardWidth: number;
    state: [number];
}

const gameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    boardWidth: Number,
    state: [Number]
})

export default mongoose.model<GameDocument>("Game", gameSchema)