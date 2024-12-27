import { useEffect, useState } from "react"
import { User } from "../../classes"
import RoomToggle from "./RoomToggle"

interface RoomToggleProps {
  room: string | undefined
  user: User
}

function RoomToggles({ room, user }: RoomToggleProps) {
  const [roomList, setRoomList] = useState<Record<string, boolean>> ({
    "Babies": room === "Babies",
    "Toddler": room === "Toddler",
    "Pre Kindergarten": room === "Pre Kindergarten",
    "Kindergarten": room === "Kindergarten",
    "Preschool": room === "Preschool"
  })

  const [currentRoom, setCurrentRoom] = useState<string | undefined>(room)

  useEffect(() => {
    const signedInRoom = Object.keys(roomList).find((roomName) => roomList[roomName])

    if (signedInRoom) {
      setCurrentRoom(signedInRoom)
    } else {
      setCurrentRoom(undefined)
    }
  }, [roomList])

  useEffect(() => {
    setCurrentRoom(room)
  }, [room])
  
  const handleToggleRoom = (roomName: string) => {
    setRoomList((prevList) => {
      const newRoomList = Object.keys(prevList).reduce((acc, key) => {
        acc[key] = key === roomName ? !prevList[key] : false
        return acc
      }, {} as Record<string, boolean>)

      return newRoomList
    })
  }
  
  return (
    <div className='roomToggle'>
      
      <div className="toggleTitle" data-testid="roomToggle">
        <p>Current room</p>
        <p>{currentRoom ? currentRoom : "Not signed into a room"}</p>
      </div>

      {
        Object.keys(roomList).map((roomName: string) => (
          <div className="toggleContainer">
            <li key={roomName}>
              <RoomToggle
                roomName={roomName}
                isSignedIn={roomList[roomName]}
                userId={user.getUserId()}
                onToggle={() => handleToggleRoom(roomName)}
              />
            </li>
            <p>{roomName}</p>
          </div>
        ))
      }
    </div>
  )
}

export default RoomToggles