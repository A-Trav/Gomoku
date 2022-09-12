import { PLAYERS } from "../constants"

export type GameDetailsType = {
    _id: string
    boardWidth: number
    currentPlayer: PLAYERS
    state: number[]
}