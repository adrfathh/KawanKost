import { useState } from 'react'
import styles from './signup.module.css'
import { Link } from "react-router-dom";
// import Sign from './SignUp.jsx'

import kawankost from "../../assets/icons/kawankost.png";
import kost_vector from "../../assets/images/kost-vector.png";

function SignUp() {
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
                        <h1>Create Account</h1>
                        <form className={styles.form} action="">
                            <div className={styles.name}>
                                <input type="text" placeholder='Adrian' />
                                <span className={styles.suffix1}>First Name</span>
                                <input type="text" placeholder='Fathir' />
                                <span className={styles.suffix2}>Last Name</span>
                            </div>
                            <input type="email" placeholder='Email' />
                            <span className={styles.suffix3}>Email</span>
                            <input type="password" placeholder='Password' />
                            <span className={styles.suffix4}>Password</span>
                            <div className="choice">
                                <p><input type="checkbox" /> I agree to the <a href="">terms of service</a> and <a href="">privacy policy</a></p>
                                <p>or Already have an account? <Link to="/login">Login</Link></p>
                            </div>
                            <button type='submit'>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SignUp
