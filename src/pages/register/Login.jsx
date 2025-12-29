import { useState } from 'react'
import styles from './login.module.css'
import { Link, useNavigate } from "react-router-dom";
import { loginUser, setLoggedInUser } from "../../hooks/useAuth"

// shadcn ui
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import kawankost from "../../assets/icons/kawankost.png";
import kost_vector from "../../assets/images/kost-vector.png";




function Login() {
    const [count, setCount] = useState(0)

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = loginUser(email, password)

        if (!user) {
            alert("Email atau password salah")
            return
        }

        setLoggedInUser(user)

        if (user.role === "admin") {
            navigate("/dashboard");
        } else {
            navigate("/");
        }
    }

    return (
        <>
            <div className={styles.mainBg}>
                <div className={styles.card}>
                    <div className={styles.leftContent}>
                        <img src={kost_vector} alt="" />
                    </div>
                    <div className={styles.rightContent}>
                        <div className={styles.header}>
                            <img src={kawankost} alt="" />
                        </div>
                        <div className={styles.formContainer}>
                            <h1>Enter Account</h1>
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                <span className={styles.suffix3}>Email</span>
                                <Input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                                <span className={styles.suffix4}>Password</span>
                                <p>Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
                                <Button type='submit'>Login</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
