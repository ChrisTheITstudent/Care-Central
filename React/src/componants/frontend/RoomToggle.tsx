import { toggleUserRoom } from "../backend/fetchData"

interface RoomToggleProps {
    roomName: string
    isSignedIn: boolean
    userId: number
    onToggle: () => void
}
function RoomToggle({ roomName, isSignedIn, userId, onToggle }: RoomToggleProps) {

    const clickToggle = () => {
        if (!isSignedIn) {
            toggleUserRoom(userId, roomName)
                .then(() => {
                    onToggle()
                })
                .catch((error) => {
                    console.error("Error toggling room: ", error)
                })
        }
        
        else {
            toggleUserRoom(userId, null)
                .then(() => {
                    onToggle()
                })
                .catch((error) => {
                    console.error("Error toggling room: ", error)
                })
        }
    }

    return (
        <div
            className={isSignedIn ? "toggleOn" : "toggleOff"}
            onClick={clickToggle}
        />
  )
}

export default RoomToggle