import mongoose, { DocumentDefinition } from 'mongoose';
import GameModel, { GameDocument } from '../model/game.model';

export async function createGame(input: DocumentDefinition<GameDocument>) {
    console.log({ ...input });
    return GameModel.create(input);
}

export async function getGameById(id: string, userId: string) {
    return GameModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId)
    }).lean();
}

export async function updateGame(id: string, userId: string, turn: number) {
    return GameModel.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(id),
            userId: new mongoose.Types.ObjectId(userId)
        },
        { "$push": { "state": turn } },
        { new: true }
    ).lean();
}

export async function setGameOver(id: string, userId: string, gameOver: boolean) {
    return GameModel.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(id),
            userId: new mongoose.Types.ObjectId(userId)
        },
        { "$set": { "gameOver": gameOver } },
        { new: true }
    ).lean();
}

export async function deleteGame(id: string, userId: string) {
    return GameModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId)
    })
}