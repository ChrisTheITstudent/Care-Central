import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../css-modules/educatorRoom.module.css'
import { updateUser } from '../backend/backendFunctions'
import RoomSelector from './RoomSelector'
import RoomInfo from './RoomInfo'

function EducatorRoom() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const roomSelected = useSelector(state => state.roomSelector.selectedRoom)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (!firstLoad) {
      dispatch({ type: "user/UpdateRequest", payload: {room: roomSelected} })
      dispatch({ type: "user/UpdateSuccess", payload: user })
    } else {
      setFirstLoad(false)
    }
  }, [roomSelected])

  useEffect(() => {
    updateUser(user)
  }, [user])
  
  return (
    <div className={styles.container}>
      <div className={styles.roomSelector}>
        <RoomSelector />
      </div>
      <div className={styles.roomInfo}>
        <RoomInfo />
      </div>
    </div>
  )
}

export default EducatorRoom