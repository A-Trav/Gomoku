import { useState } from "react"
import { User } from "../../utils/types"
import { UserContext } from "../../utils/context"

type UserProviderProps = {
    children: React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | undefined>(undefined)

    const login = (username: string) => setUser({ username })
    const logout = () => setUser(undefined)
    return (<UserContext.Provider value={{ user, login, logout }}>
        {children}
    </UserContext.Provider>
    )
}
