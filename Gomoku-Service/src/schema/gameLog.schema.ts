import { object, string, number, TypeOf, array } from 'zod'

const createPayload = {
    body: object({
        boardWidth: number({
            required_error: 'Board size is required'
        }).min(
            5, 'Board size must be 5 or greater'
        ).max(
            20, 'board size must be less than 20'
        ),
        result: array(
            number({
                required_error: 'Game result is required'
            })
        ).min(9, "Game must have atleast 10 turns for a player to have won")
    })
}

const params = {
    params: object({
        id: string({
            required_error: 'Id is required'
        })
    })
}

export const createGameLogSchema = object({
    ...createPayload
})
export const getGameLogByIdSchema = object({
    ...params
})

export type CreateGameLogInput = TypeOf<typeof createGameLogSchema>
export type GetGameLogByIdInput = TypeOf<typeof getGameLogByIdSchema>