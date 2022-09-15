import { PLAYERS } from "../constants"

export type GameDetailsType = {
    _id: string
    boardWidth: number
    currentPlayer: PLAYERS
    gameWon: boolean
    gameDraw: boolean
    state: number[]
}

export type GameStart = {
    boardWidth: number
}