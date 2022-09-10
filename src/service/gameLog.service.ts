import mongoose, { DocumentDefinition } from 'mongoose';
import GameLogModel, { GameLogDocument } from '../model/gameLog.model';

export async function createGameLog(input: DocumentDefinition<GameLogDocument>) {
    return GameLogModel.create(input);
}

export async function getAllGameLogs() {
    return await GameLogModel.find().lean();
}

export async function getGameLogById(id: string) {
    return await GameLogModel.findById(id).lean();
}