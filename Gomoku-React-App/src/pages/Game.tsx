import { useState, useReducer, useEffect, useContext } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useLocalStorage, gameReducer } from '../utils/hooks'
import { Button } from '../components/app'
import { GameDetails, Board } from '../components/game'
import { GameInitState, GameResult } from '../utils/types'
import { GAME_ACTIONS } from '../utils/constants'
import { checkForWin, checkForDraw, getCurrentPlayer } from '../utils/game'
import { UserContext } from '../utils/context'

import style from './css/Game.module.css'

export default function Game() {
    const { user } = useContext(UserContext)
    const boardWidth = (useLocation().state as GameInitState)?.boardWidth
    const [games, saveGame] = useLocalStorage<Record<string, GameResult>>('Games', {})
    const currentGameTitle = `Game #${Object.keys(games).length}`
    const [state, dispatch] = useReducer(gameReducer, [])
    const [gameWon, setGameWon] = useState(false)
    const [gameDraw, setGameDraw] = useState(false)
    const [key, setKey] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        checkGameWon(state)
        checkGameDraw(state)
    })

    if (!user) return <Navigate to="/login" />
    if (!boardWidth) return <Navigate to="/home" />

    function checkGameWon(state: number[]) {
        if (checkForWin(state.filter((_, index) => getCurrentPlayer(index) === getCurrentPlayer(state.length - 1)), boardWidth))
            setGameWon(true)
    }

    function checkGameDraw(state: number[]) {
        if (checkForDraw(state.length, boardWidth))
            setGameDraw(true)
    }

    function restart() {
        dispatch({ type: GAME_ACTIONS.RESTART })
        setGameWon(false)
        setGameDraw(false)
        setKey(key + 1)
    }

    return (
        <div className={style.container}>
            <GameDetails
                currentPlayer={getCurrentPlayer(state.length, (gameWon || gameDraw))}
                gameWon={gameWon}
                gameDraw={gameDraw}
            />
            <Board
                boardWidth={boardWidth}
                currentPlayer={getCurrentPlayer(state.length, (gameWon || gameDraw))}
                gameComplete={(gameWon || gameDraw)}
                dispatch={dispatch}
                key={key}
            />
            <div className={style.controller}>
                <Button className={style.button} onClick={() => {
                    restart()
                }}>Restart</Button>
                <Button className={style.button} onClick={() => {
                    if (gameDraw || gameWon) {
                        saveGame({
                            ...games, [currentGameTitle]: {
                                winner: getCurrentPlayer(state.length, gameWon || gameDraw),
                                date: new Date().toLocaleDateString(),
                                result: state,
                                boardWidth: boardWidth,
                                gameWon: gameWon,
                                gameDraw: gameDraw
                            }
                        })
                        navigate('/games')
                    } else
                        navigate('/')
                }}>Leave</Button>
            </div>
        </div >
    )
}
