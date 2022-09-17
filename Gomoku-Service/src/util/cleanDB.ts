import 'dotenv/config';
import connect from './connectDB';

import UserModel from "../model/user.model";
import GameModel from '../model/game.model';
import GameLogModel from '../model/gameLog.model';

const run = async () => {
    try {
        await connect();

        await UserModel.deleteMany();

        await GameModel.deleteMany();

        await GameLogModel.deleteMany();

        console.log(`⚡️[server]: DB has been cleared`);
        process.exit(0)
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

run();