import { useParams, useNavigate, Navigate } from "react-router-dom"
import { Board, GameDetails } from "../components/game"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../utils/context"
import { get } from "../utils/http"
import { GameLogDetails } from "../utils/types"
import { Button } from "../components/app"
import { API_HOST } from "../utils/constants"

import style from './css/GameLog.module.css'

export default function GameLog() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const { id = '' } = useParams()
    const [gameLog, setGameLog] = useState<GameLogDetails>()

    const fetchGameDetails = async (id: string) => {
        const game = await get<GameLogDetails>(`${API_HOST}/api/game-log/${id}`)
        setGameLog(game);
    }

    useEffect(() => {
        fetchGameDetails(id)
    }, [id])

    if (!gameLog) return null

    if (!user) return <Navigate to="/login" />
    return (
        <div className={style.container}>
            <GameDetails
                currentPlayer={gameLog.winner ? gameLog.winner : undefined}
                gameWon={gameLog.winner ? true : false}
                gameDraw={gameLog.winner ? false : true}
            />
            <Board
                boardWidth={gameLog.boardWidth}
                currentPlayer={gameLog.winner ? gameLog.winner : undefined}
                gameComplete={true}
                historicState={gameLog.result}
            />
            <div className={style.controller}>
                <Button
                    className={style.button}
                    onClick={() => navigate('/games')}>
                    Back
                </Button>
            </div>
        </div >
    )
}
