import { useState } from 'react'
import styles from './login.module.css'
import { Link } from "react-router-dom";
// import Sign from './SignUp.jsx'

import kawankost from "../../assets/icons/kawankost.png";
import kost_vector from "../../assets/images/kost-vector.png";

function Login() {
  const [count, setCount] = useState(0)

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
                        <form className={styles.form} action="">
                            <input type="email" placeholder='Email' />
                            <span className={styles.suffix3}>Email</span>
                            <input type="password" placeholder='Password' />
                            <span className={styles.suffix4}>Password</span>
                            <p>Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
                            <button type='submit'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
