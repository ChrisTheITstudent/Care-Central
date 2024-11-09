import logoutBtn from "../../images/power.png"

interface ProfileProps {
    username: string
}

function ProfileDropdown({username}:ProfileProps) {
    return (
        <div className="profile-dropdown">
            <p>{username}</p>
            <img src={logoutBtn} alt="Log out"/>
        </div>
  )
}

export default ProfileDropdown