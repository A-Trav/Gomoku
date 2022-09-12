import { PLAYERS } from "../constants"

export type GameLogDetails = {
    _id: string
    boardWdith: number
    result: number[]
    createdAt: Date
    winner: PLAYERS
}