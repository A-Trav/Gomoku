import { object, string, number, TypeOf, array } from 'zod'

const createPayload = {
    body: object({
        boardWidth: number({
            required_error: 'Board size is required'
        }).nonnegative(),
        result: array(
            number({
                required_error: 'Game result is required'
            })
        ).nonempty()
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