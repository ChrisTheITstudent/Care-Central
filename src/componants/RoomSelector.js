import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../css-modules/roomSelector.module.css'

function RoomSelector() {
  const dispatch = useDispatch()
  const roomSelector = useSelector(state => state.roomSelector)
  const rooms = ["Babies", "Toddlers", "Pre-K", "Kindergarten", "School Age"]

  return (
    <div className={styles.container}>
      <div data-testid="selectionContainer" className={`${styles.selectContainer} ${roomSelector.roomSelectorOn && `${styles.open}`}`} onClick={()=>dispatch({type: "roomSelector/roomSelectorToggle", payload: roomSelector.roomSelectorOn})}>
        {roomSelector.selectedRoom ? roomSelector.selectedRoom : "Select a room"}
      </div>
      {roomSelector.roomSelectorOn &&
        <div data-testid="roomSelector" className={styles.selection}>
          {rooms.map((room) => {
            return (
              <button
                className={styles.roomButton}
                key={room}
                value={room}
                onClick={()=>dispatch({ type: 'roomSelector/setSelectedRoom', payload: room })}
              >
                {room}
              </button>
            )
          })}
          <button className={styles.roomButton} onClick={()=>dispatch({ type: 'roomSelector/reset' })}>Cancel</button>
        </div>
      }
    </div>
  )
}

export default RoomSelector