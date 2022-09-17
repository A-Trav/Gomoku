import mongoose, { DocumentDefinition } from 'mongoose';
import { PLAYERS } from '../constants/types';
import GameModel, { GameDocument } from '../model/game.model';

export async function createGame(input: DocumentDefinition<GameDocument>) {
    return GameModel.create(input);
}

export async function getGameById(id: string, userId: string) {
    return GameModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId)
    }).lean();
}

export async function updateGame(id: string, userId: string, turn: number, player: PLAYERS, won: boolean, draw: boolean) {
    return GameModel.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(id),
            userId: new mongoose.Types.ObjectId(userId)
        },
        {
            "$push": { "state": turn },
            "$set":
            {
                "currentPlayer": player,
                "gameWon": won,
                "gameDraw": draw
            }
        },
        { new: true }
    ).lean();
}

export async function deleteGame(id: string, userId: string) {
    return GameModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId)
    })
}