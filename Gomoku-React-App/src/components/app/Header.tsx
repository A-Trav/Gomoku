import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../utils/context'
import { useLocation } from 'react-router-dom'

import style from './css/Header.module.css'

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logout } = useContext(UserContext)

    const getActions = () => {
        if (user) {
            return <>
                <button className={style.action} onClick={() => navigate('/games')}>Previous Games</button>
                <button className={style.action} onClick={() => { logout(); navigate('/') }}> Logout</button>
            </>
        } else {
            return location.pathname !== '/login' ? (
                <button className={style.action} onClick={() => navigate('login')}>
                    Login
                </button>
            ) : (
                <button className={style.action} onClick={() => navigate('sign-up')}>
                    Signup
                </button>
            )
        }
    }

    return (
        <header className={style.header}>
            <div className={style.container}>
                <Link to="/">Gomoku</Link>
                <div className={style.actions}>
                    {getActions()}
                </div>
            </div>
        </header >
    )
}
