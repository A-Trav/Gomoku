import { PLAYERS } from "../constants"

export type GameLogDetails = {
    _id?: string
    boardWidth: number
    result: number[]
    createdAt?: Date
    winner: PLAYERS
}