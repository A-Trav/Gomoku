import { PLAYERS } from "../../utils/constants";

import style from './css/GameDetails.module.css'

type GameDetailsProp = {
    currentPlayer: PLAYERS
    gameWon: Boolean
    gameDraw: Boolean
}

export default function GameDetails(props: GameDetailsProp) {
    const { currentPlayer, gameWon, gameDraw } = props

    function getNewRoundDisplay() {
        if (gameWon)
            return `Player: ${currentPlayer} has Won!`
        else if (gameDraw)
            return `Game Over, Draw.`
        else
            return `Current Player: ${currentPlayer}`
    }

    return (
        <h1 className={style.header}>
            {getNewRoundDisplay()}
        </h1>
    )
}
