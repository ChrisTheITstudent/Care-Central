import React, { useState } from 'react'
import styles from '../css-modules/welcomeScreen.module.css'
import { useDispatch } from 'react-redux'
import { getUser } from "../backend/backendFunctions";

function WelcomeScreen() {
  const [username, setUsername] = useState('educator')
  const [password, setPassword] = useState('secret')
  const dispatch = useDispatch()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleCreateAccountClick = () => {
    dispatch({type: "page/ChangeRequest", payload: 'CreateAccount'} )
    dispatch({type: "page/Current", payload: 'CreateAccount'})
  }
  const handleLoginClick = (event) => {
    event.preventDefault()

    // Login logic
    dispatch({ type: "user/SetLoading", payload: true });

    // Promise to get user data
    let userAuth = new Promise((resolve, reject) => {
        resolve(getUser(username));
    });

    // Resolve promise then return data
    try {
      userAuth.then((response) => {
          try {
            if (response === null) {
                throw new Error("User does not exist");
            } else if (response.password !== password) {
                throw new Error("Incorrect password");
            } else {
              // TODO: Create a cypher for password:
              //                                      - using 2 keys(one client side, one server side)
              //                                      - using a rotation cypher to encrypt the password before encrypting it with the keys
              dispatch({
                type: "user/LoginSuccess", payload: {
                  id: response.id,
                  username: response.username,
                  password: response.password,
                  role: response.role,
                  children: response.children,
                  room: response.room,
                  clockedIn: response.clockedIn
                }
              });
              switch (response.role) {
                case "admin":
                  dispatch({ type: "page/ChangeRequest", payload: 'AdminDashboard' });
                  dispatch({ type: "page/Current", payload: 'AdminDashboard' });
                  break;
                case "educator":
                  dispatch({ type: "page/ChangeRequest", payload: 'EducatorDashboard' });
                  dispatch({ type: "page/Current", payload: 'EducatorDashboard' });
                  break;
                case "family":
                  dispatch({ type: "page/ChangeRequest", payload: 'FamilyDashboard' });
                  dispatch({ type: "page/Current", payload: 'FamilyDashboard' });
                  break;
                case "developer":
                  dispatch({ type: "page/ChangeRequest", payload: 'DevDashboard' });
                  dispatch({ type: "page/Current", payload: 'DevDashboard' });
                  break;
                default:
                  dispatch({ type: "page/ChangeRequest", payload: 'WelcomeScreen' });
                  dispatch({ type: "page/Current", payload: 'WelcomeScreen' });
                  break;
              }
            }
        } catch (error) {
          dispatch({ type: "user/LoginFailure", payload: error.message });
        }
      });
    } catch (error) {
        console.log("Error: ", error);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Title */}
        <h1 className={styles.title}>Welcome to CareCentral</h1>
        <hr className={styles.hr} />
        {/* Login form */}
        <form className={styles.form} onSubmit={(e) => { handleLoginClick(e) }}>
          <label className={styles.label}>Username</label>
          <input className={styles.input} type='text' value={username} onChange={(e) => {handleUsernameChange(e)}} />
          <label className={styles.label}>Password</label>
          <input className={styles.input} type='password' value={password} onChange={(e) => {handlePasswordChange(e)}} />
          <button className={styles.button} type='submit'>Login</button>
        </form>
        {/* Create account link */}
        <div className={styles.createAccount}>
          <p className={styles.createAccountLink} onClick={handleCreateAccountClick}>Create an account</p>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen