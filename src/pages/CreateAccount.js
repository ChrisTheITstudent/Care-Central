import React, { useState } from 'react'
import styles from '../css-modules/createAccount.module.css'
import { useSelector, useDispatch } from 'react-redux'

function CreateAccount() {
  const [username, setUsername] = useState('Username')
  const [password, setPassword] = useState('Password')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleCreateAccountClick = (event) => {
    event.preventDefault()
    // Attempt to create account
    dispatch({
      type: "user/RegisterRequest",
      payload: {
        username: event.target.username.value,
        password: event.target.password.value,
        confirmPassword: event.target.confirmPassword.value
      }
    })
    user.error === null ?
      dispatch({
        type: "user/RegisterSuccess",
        payload: {
          username: event.target.username.value,
          password: event.target.password.value
        }
    }) : console.error("Account creation failed: " + user.error)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Title */}
        <h1 className={styles.title}>Create an account</h1>
        <hr className={styles.hr} />
        {/* Create account form */}
        <form className={styles.form} onSubmit={(e) => { handleCreateAccountClick(e) }}>
          <label className={styles.label}>Username</label>
          <input className={styles.input} type='text' name='username' value={username} onChange={(e) => { handleUsernameChange(e) }} />
          <label className={styles.label}>Password</label>
          <input className={styles.input} type='password' name='password' value={password} onChange={(e) => { handlePasswordChange(e) }} />
          <label className={styles.label}>Confirm Password</label>
          <input className={styles.input} type='password' name='confirmPassword' />
          {user.error !== null ? <p className={styles.passwordError}>{user.error}</p> : null}
          <button className={styles.button} type='submit'>Create Account</button>
        </form>
      </div>
    </div>
  )
}

export default CreateAccount