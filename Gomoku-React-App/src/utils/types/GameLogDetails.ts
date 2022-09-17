import { PLAYERS } from "../constants"

export type NewGameLogDetails = {
    boardWidth: number
    winner?: PLAYERS
    result: number[]
}

export type GameLogDetails = {
    _id: string
    boardWidth: number
    winner?: PLAYERS
    result: number[]
    createdAt: Date
}