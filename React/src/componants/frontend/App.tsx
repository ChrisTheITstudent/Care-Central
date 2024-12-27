import { useState, useEffect } from 'react';
import logo from '../../images/logo.png';
import dropdown from '../../images/sort-down.png'
import '../../style/App.css';
import SwitchList from './SwitchList';
import UserInfo from './UserInfo';
import ProfileDropdown from './ProfileDropdown';
import { Rooms, User } from '../../classes';
import { createUser } from '../backend/fetchData';
import RoomToggles from './RoomToggles';
import EducatorRoomData from './EducatorRoomData';

function App() {
  // Replace with login
  const [username, setUsername] = useState<string>("Gina")

  const initalRoomNames = ["Babies", "Toddlers", "Pre Kindergarten", "Kindergarten", "PreSchool"]

  const [roomList, setRoomList] = useState<Rooms[]>([])
  const [user, setUser] = useState<User | null>()
  const [showProfileDropdown, setProfileDropdown] = useState<boolean>(false)

  useEffect(() => {
    console.log("Creating user")
    createUser(username)
      .then((userData) => {
        setUser(userData)
        if (userData) {
          console.log("User data defined in App.tsx")
        } else {
          console.log("User data not defined in App.tsx")
        }
      })
      .catch((err) => {
      console.error("Error creating user:", err)
    })
  }, [username])

  return (
    <div className="App">
      <header className="App-header">
        <img className='logo' src={logo} alt='logo' />
        <nav>
          <li>Home<img src={dropdown} alt=''/></li>
          <li>Dashboard<img src={dropdown} alt='' /></li>
          <li onClick={() => { setProfileDropdown(prevState => !prevState) }} data-testid="profile-dropdown-click">
            <UserInfo user={user} />
            <img src={dropdown} alt='' />
          </li>
        </nav>
      </header>
      {showProfileDropdown ? <ProfileDropdown username={username}/> : null}
      <div className='mid-container'>
        <div className='Right-side-bar'>
          {user?.getRole() === 'Family' ? <SwitchList username={username} /> : null}
          {user?.getRole() === 'educator' ? <RoomToggles room={user.getRoom()} user={user} /> : null}
        </div>
        <div className='Middle-info'>
          {user?.getRole() === 'educator' ? <EducatorRoomData roomList={roomList} initalRoomNames={initalRoomNames} setRoomList={setRoomList} /> : null}
        </div>
        <div className='Left-side-bar'>

        </div>
      </div>
    </div>
  );
}

export default App;
