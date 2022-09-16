import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, DropDown, Message } from "../components/app";
import { UserContext } from '../utils/context';

import style from './css/Home.module.css'

export default function Home() {
    const { user } = useContext(UserContext)
    const [boardSizeSelection, setBoardSizeSelection] = useState<number | undefined>()
    const [invalidBoardSize, setInvalidBoardSize] = useState(false)
    const navigate = useNavigate()

    function onClickHandler() {
        if (user && boardSizeSelection) {
            navigate('/game', { state: boardSizeSelection })
        } else {
            if (!user)
                navigate('/login')
            if (!boardSizeSelection)
                setInvalidBoardSize(true)
        }
    }

    return (
        <div className={style.container}>
            {invalidBoardSize && (
                <Message variant="error" message="You must select a board size before starting" />
            )}
            <DropDown
                setSelectedOption={setBoardSizeSelection}
                defaultText={'Select Board Size'}
                from={5}
                to={20}
            />
            <Button onClick={() => onClickHandler()}>Start Game</Button>
        </div >
    )
}
