import { useEffect, useState } from "react"
import { User } from "../../classes"
import defaultUser from "../../images/user.png"

interface UserInfoProps {
    user: User | null | undefined
}

function UserInfo({user}: UserInfoProps) {
    
    const [profileImage, setProfileImage] = useState<string | null>(null)
    let imageURL: string | null = null

    useEffect(() => {
        const userProfileImage = user?.getProfileImage()
                if (userProfileImage instanceof Blob) {
                    imageURL = URL.createObjectURL(userProfileImage)
                    setProfileImage(imageURL)
                } else {
                    if (typeof userProfileImage === 'string') {
                        setProfileImage(`data:image/png;base64,${userProfileImage}`)
                    } else {
                        console.error("Invlaid profile image data", userProfileImage)
                    }
        }
        return () => {
            if (imageURL) {
                URL.revokeObjectURL(imageURL)
            }
        }
    }, [user])



    return (
        <div className="user-info">
            <img src={profileImage || defaultUser} alt="Profile"/>
            <p>{user ? user.getUsername() : "Loading user..."}</p>
        </div>
  )
}

export default UserInfo