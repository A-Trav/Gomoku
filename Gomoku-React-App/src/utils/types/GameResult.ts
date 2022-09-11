import { PLAYERS } from "../constants"

export type GameResult = {
    winner: PLAYERS
    date: string
    result: number[]
    boardWidth: number
    gameWon: Boolean
    gameDraw: Boolean
}