import { useEffect, useState, useRef } from "react"
import { User } from "../../classes"
import defaultUser from "../../images/user.png"

interface UserInfoProps {
    user: User | null | undefined
}

function UserInfo({user}: UserInfoProps) {

    const [profileImage, setProfileImage] = useState<string | null>(null)
    const imageURL = useRef<string | null>(null)

    useEffect(() => {

        const userProfileImage = user?.getProfileImage()
        console.log("User profile image:", userProfileImage)

        if (userProfileImage instanceof Blob) {
            const url = URL.createObjectURL(userProfileImage)
            console.log("Created URL:", url);
            imageURL.current = url
            setProfileImage(url)
        } else if (typeof userProfileImage === 'string') {
            const url = userProfileImage
            imageURL.current = url
            setProfileImage(`data:image/png;base64,${userProfileImage}`)
        } else {
            console.error("Invlaid profile image data", userProfileImage)
        }
        return () => {
            if (imageURL.current) {
                console.log("Revoke URL:", imageURL.current)
                URL.revokeObjectURL(imageURL.current)
                imageURL.current = null
            }
        }
    }, [user])



    return (
        <div className="user-info" data-testid="user-info">
            <img src={profileImage || defaultUser} alt="Profile"/>
            <p>{user ? user.getUsername() : "Loading user..."}</p>
        </div>
  )
}

export default UserInfo