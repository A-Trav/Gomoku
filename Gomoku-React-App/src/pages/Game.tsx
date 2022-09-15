import { useState, useContext, useCallback, useEffect } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Button } from '../components/app'
import { GameDetails, Board } from '../components/game'
import { GameInitState, GameLogDetails, GameStart } from '../utils/types'
import { UserContext } from '../utils/context'
import { GameDetailsType } from '../utils/types'
import { post, put, del } from '../utils/http'
import { GameTurn } from '../utils/types/GameTurn'
import { PLAYERS } from '../utils/constants'

import style from './css/Game.module.css'

export default function Game() {
    const { user, logout } = useContext(UserContext)
    const boardWidth = (useLocation().state as GameInitState)?.boardWidth
    const [gameDetails, setGameDetails] = useState<GameDetailsType>()
    const navigate = useNavigate()

    const NewGame = useCallback(async () => {
        try {
            const result = await post<GameStart, GameDetailsType>('game/', { boardWidth: boardWidth })
            result.currentPlayer = PLAYERS.PLAYER1
            setGameDetails(result)
        } catch (error) {
            console.log((error as Error).message)
            logout()
            navigate('/')
        }
    }, [])


    const saveGame = async () => {
        try {
            if (gameDetails) {
                const result = await post<GameLogDetails, GameLogDetails>('/game-log/', {
                    boardWidth: gameDetails.boardWidth,
                    winner: gameDetails.currentPlayer,
                    result: gameDetails.state
                })
            }
        } catch (error) {
            console.log((error as Error).message)
            logout()
            navigate('/')
        }
    }

    const deleteGame = async () => {
        try {
            if (gameDetails) {
                const result = await del(`/game/${gameDetails._id}`)
            }
        } catch (error) {
            console.log((error as Error).message)
            logout()
            navigate('/')
        }
    }

    const playTurn = async (id: number) => {
        try {
            if (gameDetails) {
                console.log(gameDetails)
                const result = await put<GameTurn, GameDetailsType>(`/game/${gameDetails._id}`, {
                    state: id
                })
                setGameDetails(result)
            }
        } catch (error) {
            console.log((error as Error).message)
            logout()
            navigate('/')
        }
    }

    useEffect(() => {
        if (!user) return
        if (!gameDetails) {
            console.count('UseEffect')
            NewGame()
        }
    }, [])

    if (!user) return < Navigate to="/login" replace />
    if (!gameDetails) return null

    return (
        <div className={style.container}>
            <GameDetails
                currentPlayer={gameDetails.currentPlayer}
                gameWon={gameDetails.gameWon}
                gameDraw={gameDetails.gameDraw}
            />
            <Board
                boardWidth={boardWidth}
                currentPlayer={gameDetails.currentPlayer}
                gameComplete={(gameDetails.gameWon || gameDetails.gameDraw)}
                tileSelected={playTurn}
                key={gameDetails._id}
            />
            <div className={style.controller}>
                <Button className={style.button} onClick={() => {
                    NewGame()
                }}>Restart</Button>
                <Button className={style.button} onClick={() => {
                    if (gameDetails.gameDraw || gameDetails.gameWon) {
                        saveGame()
                        navigate('/games')
                    } else
                        navigate('/')
                }}>Leave</Button>
            </div>
        </div >
    )
}
