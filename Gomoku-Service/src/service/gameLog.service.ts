import mongoose, { DocumentDefinition } from 'mongoose';
import GameLogModel, { GameLogDocument } from '../model/gameLog.model';

export async function createGameLog(input: DocumentDefinition<GameLogDocument>) {
    return GameLogModel.create(input);
}

export async function getAllGameLogs(userId: string) {
    return await GameLogModel.find({ userId: new mongoose.Types.ObjectId(userId) }).lean();
}

export async function getGameLogById(id: string, userId: string) {
    return await GameLogModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId)
    }).lean();
}