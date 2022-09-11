import { useParams, useNavigate, Navigate } from "react-router-dom"
import { useLocalStorage } from "../utils/hooks"
import { GameResult } from "../utils/types"
import { getCurrentPlayer } from "../utils/game"
import { Board, GameDetails } from "../components/game"
import { useContext } from "react"
import { UserContext } from "../utils/context"

import style from './css/GameLog.module.css'
import { Button } from "../components/app"

export default function GameLog() {
    const { user } = useContext(UserContext)
    const { id } = useParams()
    const [games, saveGame] = useLocalStorage<Record<string, GameResult>>(
        'Games', {})
    const { [`Game #${id}`]: game } = games
    const navigate = useNavigate()
    if (!user) return <Navigate to="/login" />
    return (
        <div className={style.container}>
            <GameDetails
                currentPlayer={getCurrentPlayer(game.result.length, game.gameWon || game.gameDraw)}
                gameWon={game.gameWon}
                gameDraw={game.gameDraw}
            />
            <Board
                boardWidth={game.boardWidth}
                currentPlayer={getCurrentPlayer(game.result.length, game.gameWon || game.gameDraw)}
                gameComplete={(game.gameWon || game.gameDraw)}
                historicState={game.result}
            />
            <div className={style.controller}>
                <Button className={style.button} onClick={() => navigate('/games')}>Back</Button>
            </div>
        </div >
    )
}
