import Tile from './Tile'
import { PLAYERS } from '../../utils/constants'
import { getCurrentPlayer } from '../../utils/game'

import style from './css/Board.module.css'

type BoardProps = {
    boardWidth: number
    currentPlayer: PLAYERS
    gameComplete: Boolean
    historicState?: number[]
    tileSelected?: (id: number) => Promise<void>
}

export default function Board(props: BoardProps) {
    const { boardWidth, currentPlayer, historicState, tileSelected, gameComplete } = props

    function getHistoricState(index: number): string | undefined {
        if (historicState && historicState.indexOf(index) >= 0)
            return getCurrentPlayer(historicState.indexOf(index))
    }

    function getHistoricTurnNumber(index: number): number | undefined {
        if (historicState && historicState.indexOf(index) >= 0)
            return historicState.indexOf(index) + 1
    }

    function getNewGameBoard() {
        return (
            [...Array(boardWidth * boardWidth)].map((_, index) => (
                <Tile key={`tile - ${index}`} id={index} nextStatusChange={currentPlayer} gameComplete={gameComplete}
                    historicState={getHistoricState(index)}
                    historicTurnNumber={getHistoricTurnNumber(index)}
                    onSelect={tileSelected ? tileSelected : undefined}
                />
            ))
        )
    }

    return (
        <div className={style.board}>
            <div className={style.tile}
                style={{ gridTemplateColumns: `repeat(${boardWidth}, 1fr)` }
                }>{getNewGameBoard()}</div>
        </div>
    )
}
