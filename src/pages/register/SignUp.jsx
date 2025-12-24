import { useState } from 'react'
import styles from './signup.module.css'
import { Link, useNavigate } from "react-router-dom";
import { saveUser, getUsers } from "../../hooks/useAuth"

import kawankost from "../../assets/icons/kawankost.png";
import kost_vector from "../../assets/images/kost-vector.png";

function SignUp() {
    const [count, setCount] = useState(0)
    const [agree, setAgree] = useState(false)
    
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const users = getUsers()
        const exists = users.find((u) => u.email === email)
        if (exists) {
            alert("Email sudah terdaftar")
            return
        }

        if (!agree) {
        alert("Anda harus menyetujui Terms of Service dan Privacy Policy")
            return
        }

        saveUser({ firstName, lastName, email, password })
        navigate("/login")
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
                            <h1>Create Account</h1>
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.name}>
                                    <input type="text" placeholder='Adrian' onChange={(e) => setFirstName(e.target.value)} />
                                    <span className={styles.suffix1}>First Name</span>
                                    <input type="text" placeholder='Fathir' onChange={(e) => setLastName(e.target.value)} />
                                    <span className={styles.suffix2}>Last Name</span>
                                </div>
                                <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                                <span className={styles.suffix3}>Email</span>
                                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                                <span className={styles.suffix4}>Password</span>
                                <div className="choice">
                                    <p><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}/> I agree to the <a href="">terms of service</a> and <a href="">privacy policy</a></p>
                                    <p>or Already have an account? <Link to="/login">Login</Link></p>
                                </div>
                                <button disabled={!agree} type='submit'>Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
