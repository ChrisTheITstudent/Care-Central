import React, { useEffect } from 'react'
import { Rooms } from '../../classes'

interface EducatorDataProps {
    roomList: Rooms[]
    initalRoomNames: string[]

    setRoomList: (rooms: Rooms[]) => void
}

function EducatorRoomData({roomList, initalRoomNames, setRoomList}: EducatorDataProps) {

    useEffect(() => {
        const rooms = initalRoomNames.map(roomName => new Rooms(roomName))
        const loadRoomsData = async () => {
            
            try {
                await Promise.all(
                    rooms.map(async (room) => {
                        await room.loadChildren()
                        await room.loadEducators()
                    })
                )
                setRoomList(rooms)
            } catch (err) {
                console.error("Error loading rooms:", err)
            }
        }

        loadRoomsData();
    }, [initalRoomNames, setRoomList])

    console.log(roomList)

  return (
      <div className='educator-data-grid' data-testid="educatorGridContainer">
          {roomList.map((room, index) => (
              <div className='room-info' key={index} data-testId='room-info'>
                  <p>{room.getRoomName()}</p>
                  <p>Children: {room.getChildrenCount()}</p>
                  <p className={room.checkCompliance() ? "" : "room-warning"}>Educators: {room.getEducatorCount()}</p>
              </div>
          ))}
      </div>
  )
}

export default EducatorRoomData