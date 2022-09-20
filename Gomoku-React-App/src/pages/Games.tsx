import { useContext, useEffect, useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { Button } from "../components/app"
import { UserContext } from "../utils/context"
import { get } from '../utils/http'
import { GameLogDetails } from "../utils/types"
import { API_HOST } from "../utils/constants"

import style from './css/Games.module.css'

export default function Games() {
    const { user } = useContext(UserContext)
    const [games, setGames] = useState<GameLogDetails[]>([])
    const navigate = useNavigate()

    const fetchGames = async () => {
        const pastGames = await get<GameLogDetails[]>(
            `${API_HOST}/api/game-log`
        )
        setGames(pastGames)
    }

    useEffect(() => {
        fetchGames()
    }, [])

    if (!user) return <Navigate to="/login" />
    return (
        <div className={style.container}>
            {games.length === 0 && <p>Retrieving game log from server...</p>}
            {games.map((game, index) => {
                const gameDescription = `Game #${index + 1} @ ${new Date(game.createdAt).toLocaleDateString()} Winner: ${game.winner ? game.winner : 'Draw'}`
                return (
                    <div className={style.list} key={game._id} >
                        <p className={style.title}>{gameDescription}</p>
                        <Button className={style.button}
                            onClick={() => navigate(`/game-log/${game._id}`)}
                        >
                            View
                        </Button>
                    </div>
                )
            })}
        </div>
    )
}
