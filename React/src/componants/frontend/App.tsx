import { useState, useEffect } from 'react';
import logo from '../../images/logo.png';
import dropdown from '../../images/sort-down.png'
import '../../style/App.css';
import SwitchList from './SwitchList';
import UserInfo from './UserInfo';
import ProfileDropdown from './ProfileDropdown';
import { Rooms, User } from '../../classes';
import { createUser } from '../backend/fetchData';
import { setUserCookies, getUserCookies, removeUserCookies } from '../backend/cookies';
import RoomToggles from './RoomToggles';
import EducatorRoomData from './EducatorRoomData';
import Login from './Login';
import Profile from './Profile';

interface AppProps {
  showLoginProp?: boolean
  userProp?: User | null
  setShowLoginProp?: (showlogin: boolean) => void
}

function App({ showLoginProp = true, userProp = null, setShowLoginProp}: AppProps) {
  const [showLogin, setShowLogin] = useState<boolean>(showLoginProp)
  const [username, setUsername] = useState<string | null>(userProp ? userProp.getUsername() : null)

  const initalRoomNames = ["Babies", "Toddlers", "Pre Kindergarten", "Kindergarten", "PreSchool"]

  const [roomList, setRoomList] = useState<Rooms[]>([])
  const [user, setUser] = useState<User | null>(userProp)
  const [showProfileDropdown, setProfileDropdown] = useState<boolean>(false)

  const [showProfile, setShowProfile] = useState<boolean>(false)

  useEffect(() => {
    if (userProp) {
      setShowLogin(false)
      setUser(userProp)
      setUsername(userProp.getUsername())
    }
  }, [userProp])

  useEffect(() => {
    if (showLogin) {
      setProfileDropdown(false)
      if (!userProp) {
        setUser(null)
        removeUserCookies()
        console.log("Cookies removed in showLogin effect")
        setUsername(null)
      }
      
      return
    }
    
    const storedUsername = getUserCookies();
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }
  , [showLogin])

  useEffect(() => {
    console.log("Username:", username)
    if (username === null && !getUserCookies()) {
      console.log("Username is null and no cookies")
      return
    } else if (username === null && getUserCookies()) {
      console.log("Username is null but cookies exist")
      removeUserCookies()
      console.log("Cookies removed in username effect")
      if (showLogin) {
        setShowLoginProp? setShowLoginProp(false) : setShowLogin(false)
      }
    } else {
      createUser(username)
        .then((userData) => {
          setUser(userData)
          setUserCookies(userData)
          if (userData) {
            console.log("User data defined in App.tsx")
          } else {
            console.log("User data not defined in App.tsx")
          }
        })
      .catch((err) => {
      console.error("Error creating user:", err)
      })
    }
  }, [username])

  return (
    <div className="App">
      <header className="App-header">
        <img className='logo' src={logo} alt='logo' />
        <nav>
          <li>Home<img src={dropdown} alt=''/></li>
          <li>Dashboard<img src={dropdown} alt='' /></li>
          <li onClick={() => {
            setProfileDropdown((prevState) => {
              console.log("Profile dropdown clicked")
              console.log("Username:", username)
              console.log("Show login:", showLogin)
              console.log("User:", user)
              return !prevState
            })
          }} data-testid="profile-dropdown-click">
            <UserInfo user={user} />
            <img src={dropdown} alt='' />
          </li>
        </nav>
      </header>
      {showLogin ? <Login setShowLogin={setShowLogin} setUsername={setUsername} setProfileDropdown={setProfileDropdown} /> : null}
      {showProfileDropdown && username ? <ProfileDropdown username={username} setUserName={setUsername} setShowLogin={setShowLogin} setProfileDropdown={setProfileDropdown} setShowProfile={setShowProfile} /> : null}
      <div className='mid-container'>
        {showProfile ? <Profile user={user ? user : null}  /> : 
          <>
          <div className='Right-side-bar'>
            {user?.getRole() === 'Family' && username ? <SwitchList username={username} /> : null}
            {user?.getRole() === 'educator' && username ? <RoomToggles room={user.getRoom()} user={user} /> : null}
          </div>
          <div className='Middle-info'>
            {user?.getRole() === 'educator' ? <EducatorRoomData roomList={roomList} initalRoomNames={initalRoomNames} setRoomList={setRoomList} /> : null}
          </div>
          <div className='Left-side-bar'>

          </div>
          </>
        }
      </div>
    </div>
  );
}

export default App;
