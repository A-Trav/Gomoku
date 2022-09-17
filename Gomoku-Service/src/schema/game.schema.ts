import { object, string, number, TypeOf } from 'zod'

const createPayload = {
    body: object({
        boardWidth: number({
            required_error: 'Board size is required'
        })
    })
}

const updatePayload = {
    body: object({
        state: number({
            required_error: 'Game state is required'
        })
    })
}

const params = {
    params: object({
        id: string({
            required_error: 'Id is required'
        })
    })
}

export const createGameSchema = object({
    ...createPayload
})
export const updateGameSchema = object({
    ...updatePayload,
    ...params
})
export const deleteGameSchema = object({
    ...params
})

export type CreateGameInput = TypeOf<typeof createGameSchema>
export type UpdateGameInput = TypeOf<typeof updateGameSchema>
export type DeleteGameInput = TypeOf<typeof deleteGameSchema>