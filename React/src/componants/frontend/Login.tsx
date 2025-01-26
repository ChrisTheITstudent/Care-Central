import React from 'react'
import { verifyPassword } from '../backend/fetchData'
import closeIcon from '../../images/closeIcon.png'

interface LoginProps {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
    setUsername: React.Dispatch<React.SetStateAction<string | null>>
    setProfileDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

function Login({ setShowLogin, setUsername, setProfileDropdown }: LoginProps) {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const form = e.currentTarget as HTMLFormElement
    const username = form.elements.namedItem('username') as HTMLInputElement
    const password = form.elements.namedItem('password') as HTMLInputElement
    
    verifyPassword(username.value, password.value)
      .then((json) => {
        if (json) {
          setUsername(username.value)
          setShowLogin(false)
          setProfileDropdown(false)
        } else {
          alert('Invalid username or password')
        }
      })
      .catch((err) => {
        console.error(err)
        alert("Error logging in")
      })
  }

  return (
      <div className='login-container' data-testid={'login-container'}>
        <h1>Login</h1>
        <img src={closeIcon} alt='Close' className='close-icon' data-testid={"login-close"} onClick={() => setShowLogin(false)} />
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' data-testid={'username'} />
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' data-testid={'password'} />
          <button type='submit'>Submit</button>
        </form>
      </div>
  )
}

export default Login