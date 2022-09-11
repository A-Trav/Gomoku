import { useContext } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { Button } from "../components/app"
import { UserContext } from "../utils/context"
import { useLocalStorage } from "../utils/hooks"
import { GameResult } from "../utils/types"

import style from './css/Games.module.css'

export default function Games() {
    const { user } = useContext(UserContext)
    const [games] = useLocalStorage<Record<string, GameResult>>(`Games`, {})
    const navigate = useNavigate()
    if (!user) return <Navigate to="/login" />
    return (
        <div className={style.container}>
            {Object.keys(games).map((id) => {
                const { [id]: game } = games
                const gameDescription = `${id} @ ${game.date} Winner: ${game.winner}`
                return (
                    <div className={style.list} key={id} >
                        <p className={style.title}>{gameDescription}</p>
                        <Button className={style.button}
                            onClick={() => navigate(`/game-log/${id.split('#')[1]}`)}
                        >
                            View
                        </Button>
                    </div>
                )
            })}
        </div>
    )
}
