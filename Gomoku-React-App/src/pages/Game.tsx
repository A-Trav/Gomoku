import { useState, useContext, useCallback, useEffect } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Button } from '../components/app'
import { GameDetails, Board } from '../components/game'
import { UserContext } from '../utils/context'
import { GameLogDetails, GameStart, GameDetailsType, GameTurn } from '../utils/types'
import { post, put, del } from '../utils/http'
import { PLAYERS } from '../utils/constants'

import style from './css/Game.module.css'

export default function Game() {
    const { user, logout } = useContext(UserContext)
    const boardWidth = (useLocation().state as number)
    const [gameDetails, setGameDetails] = useState<GameDetailsType>()
    const [lock, setLock] = useState(false)
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
                await post<GameLogDetails, GameLogDetails>('/game-log/', {
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
            if (!lock && gameDetails) {
                setLock(true)
                const result = await put<GameTurn, GameDetailsType>(`/game/${gameDetails._id}`, {
                    state: id
                })
                setGameDetails(result)
                setLock(false)
                return true
            }
            return false
        } catch (error) {
            console.log((error as Error).message)
            logout()
            navigate('/')
            return false
        }
    }

    useEffect(() => {
        if (!user) return
        if (!gameDetails) {
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
                        deleteGame()
                        navigate('/games')
                    } else
                        navigate('/')
                }}>Leave</Button>
            </div>
        </div >
    )
}
