import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { getLoggedInUser, logout } from "../hooks/useAuth"
import style from './home.module.css'

function Home() {
    const [count, setCount] = useState(0)

    const user = getLoggedInUser()
    const navigate = useNavigate()

    if (!user) {
        return <useNavigate to="/login" />
    }

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <>
            <h1>Welcome, {user.firstName} {user.lastName}!</h1>
            <button className={style.button} onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Home