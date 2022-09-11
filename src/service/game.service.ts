import mongoose, { DocumentDefinition } from 'mongoose';
import GameModel, { GameDocument } from '../model/game.model';

export async function createGame(input: DocumentDefinition<GameDocument>) {
    console.log({ ...input });
    return GameModel.create(input);
}

export async function updateGame(id: string, userId: string, input: DocumentDefinition<GameDocument>) {
    return GameModel.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(id),
            userId: new mongoose.Types.ObjectId(userId)
        },
        input,
        { new: true }
    )
}

export async function deleteGame(id: string, userId: string) {
    return GameModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId)
    })
}