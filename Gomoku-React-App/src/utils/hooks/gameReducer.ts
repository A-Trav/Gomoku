import { GameTurnPayload } from "../types"
import { GAME_ACTIONS, PLAYERS } from '../constants'

export type GameAction = {
    type: GAME_ACTIONS
    payload?: GameTurnPayload
}

function handleReset(): number[] {
    return new Array()
}

export const gameReducer = (state: number[], action: GameAction) => {
    const { type, payload } = action
    switch (type) {
        case GAME_ACTIONS.PLAYER1: {
            if (payload) {
                return [...state, payload.id]
            } else
                return state
        }
        case GAME_ACTIONS.PLAYER2: {
            if (payload) {
                return [...state, payload.id]
            } else
                return state
        }
        case GAME_ACTIONS.RESTART:
            return handleReset()
        default:
            return state
    }
}