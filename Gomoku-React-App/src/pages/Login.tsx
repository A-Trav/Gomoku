import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Message } from '../components/app'
import { UserContext } from '../utils/context'

import style from './css/Login.module.css'

export default function Login() {
    const { login } = useContext(UserContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = async () => {
        setErrorMessage('')
        const result = await login(username, password)
        if (result === true) {
            navigate('/')
        } else {
            setErrorMessage(result)
        }
    }

    return (
        <form
            className={style.container}
            onSubmit={(e) => {
                e.preventDefault()
                handleLogin()
            }}
        >
            {errorMessage && (
                <Message variant="error" message={errorMessage} />
            )}
            <Input
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                    setErrorMessage('')
                }}
            />
            <Input
                name="password"
                type="password"
                placeholder="Password"
                value={password} onChange={(e) => {
                    setPassword(e.target.value)
                    setErrorMessage('')
                }}
            />
            <Button type="submit">Login</Button>
        </form>
    )
}
