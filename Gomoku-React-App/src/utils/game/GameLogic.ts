import { PLAYERS } from "../constants";

export const getCurrentPlayer = (turnCount: number, gameOver: Boolean = false): PLAYERS => {
    if (!gameOver)
        return turnCount % 2 !== 0 ? PLAYERS.PLAYER2 : PLAYERS.PLAYER1
    else
        return (turnCount - 1) % 2 !== 0 ? PLAYERS.PLAYER2 : PLAYERS.PLAYER1
}