import React, { useEffect, useState } from 'react'
import { Rooms } from '../../classes'

interface EducatorDataProps {
    roomList: Rooms[]
    initalRoomNames: string[]

    setRoomList: (rooms: Rooms[]) => void
}

function EducatorRoomData({ roomList, initalRoomNames, setRoomList }: EducatorDataProps) {
    
    const [roomNames, setRoomNames] = useState(() => initalRoomNames)

    useEffect(() => {
        const rooms = initalRoomNames.map(roomName => new Rooms(roomName))
        
        let isMounted = true

        const loadRoomsData = async () => {
            console.log("Loading rooms data at", new Date().toLocaleTimeString())

            try {
                await Promise.all(
                    rooms.map(async (room) => {
                        await room.loadChildren()
                        await room.loadEducators()
                    })
                )
                if (isMounted) {
                    setRoomList([...rooms])
                }
                
            } catch (err) {
                console.error("Error loading rooms:", err)
            }

            if (isMounted) {
                console.log("Setting next execution in 5 minutes")
                setTimeout(() => {
                    loadRoomsData()
                }, 300000)
            }
        }

        loadRoomsData()

        return () => {
            console.log("Component unmounting, stopping execution")
            isMounted = false
        }

    }, [roomNames])

  return (
      <div className='educator-data-grid' data-testid="educatorGridContainer">
          {roomList.map((room, index) => (
              <div className='room-info' key={index} data-testid='room-info'>
                  <p>{room.getRoomName()}</p>
                  <p>Children: {room.getChildrenCount()}</p>
                  <p className={room.checkCompliance() ? "" : "room-warning"}>Educators: {room.getEducatorCount()}</p>
              </div>
          ))}
      </div>
  )
}

export default EducatorRoomData