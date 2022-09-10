import mongoose, { DocumentDefinition } from 'mongoose';
import GameModel, { GameDocument } from '../model/game.model';

export async function createGame(input: DocumentDefinition<GameDocument>) {
    return GameModel.create(input);
}

export async function updateGame(id: string, input: DocumentDefinition<GameDocument>) {
    return GameModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        input,
        { new: true }
    )
}

export async function deleteGame(id: string) {
    return GameModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id)
    })
}