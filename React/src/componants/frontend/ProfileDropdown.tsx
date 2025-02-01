import logoutBtn from "../../images/power.png"
import { removeUserCookies } from "../backend/cookies"
import profileIcon from "../../images/profileIcon.png"
import settingsIcon from "../../images/settingsIcon.png"
import helpIcon from "../../images/helpIcon.png"

interface ProfileProps {
    username: string
    setUserName: (username: string | null) => void
    setShowLogin: (showLogin: boolean) => void
    setProfileDropdown: (profileDropdown: boolean) => void
    setShowProfile: (showProfile: boolean) => void
}

function ProfileDropdown({ username, setUserName, setShowLogin, setProfileDropdown, setShowProfile }: ProfileProps) {
    const logout = async () => {
        removeUserCookies()
        setUserName(null)
        setShowLogin(true)
        setProfileDropdown(false)
    }

    const handleProfileClick = () => {
        setShowProfile(true)
        setProfileDropdown(false)
    }

    return (
        <div className="profile-dropdown" data-testid="profile-dropdown">
            <img src={logoutBtn} alt="Log out" onClick={logout}/>
            <h2>{username}</h2>
            <span className="sperator" />
            <ul>
                <li onClick={handleProfileClick}><img className="profile-icon" src={profileIcon} /> Profile</li>
                <li><img className="settings-icon" src={settingsIcon} />Settings</li>
                <li><img className="help-icon" src={helpIcon} />Help</li>
            </ul>
        </div>
  )
}

export default ProfileDropdown