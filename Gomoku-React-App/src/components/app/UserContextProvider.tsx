import { User, Credential } from "../../utils/types"
import { UserContext } from "../../utils/context"
import useLocalStorage from "../../utils/hooks/useLocalStorage"
import { post, setToken } from "../../utils/http"
import { API_HOST } from "../../utils/constants"

type UserProviderProps = {
    children: React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useLocalStorage<User | undefined>('user', undefined)
    if (user) {
        setToken(user.token)
    }

    const login = async (username: string, password: string) => {
        try {
            const user = await post<Credential, User>(`${API_HOST}/api/auth/login`, {
                username,
                password
            })
            setUser(user)
            setToken(user.token)
            return true
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }
            return 'Unable to login at this moment, please try again later.'
        }
    }

    const register = async (username: string, password: string) => {
        try {
            const user = await post<Credential, User>(`${API_HOST}/api/auth/register`, {
                username,
                password
            })
            setUser(user)
            setToken(user.token)
            return true
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }
            return 'Unable to register at this moment, please try again later.'
        }
    }

    const logout = () => {
        setUser(undefined)
        setToken('')
    }
    return (<UserContext.Provider value={{ user, login, register, logout }}>
        {children}
    </UserContext.Provider>
    )
}
