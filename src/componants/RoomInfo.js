import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../css-modules/roomInfo.module.css'
import { getChildrenByRoom, getUserByRoom, calculateEducatorsRequired } from '../backend/backendFunctions'

function RoomInfo() {
  const user = useSelector(state => state.user)
  const selectedRoom = useSelector(state => state.roomSelector.selectedRoom)
  const dispatch = useDispatch()
  const room = user.room
  const [classList, setClassList] = useState([])
  const [educatorList, setEducatorList] = useState([])
  const [educatorsRequired, setEducatorsRequired] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (!firstLoad) {
      dispatch({ type: 'user/UpdateRequest', payload: { room: selectedRoom } })
      dispatch({ type: 'user/UpdateSuccess', payload: user })
    } else {
      setFirstLoad(false)
    }
  }, [selectedRoom])

  useEffect(() => {
    const fetchChildrenData = async () => {
      let childrenData = await getChildrenByRoom(room)
      childrenData.forEach((child) => {
        setClassList(classList => [...classList, child.username])
      })
    }
    const fetchEducatorData = async () => {
      try {
        let educatorData = await getUserByRoom(room)
        educatorData.forEach((educator) => {
          setEducatorList(educatorList => [...educatorList, educator.username])
        })
      } catch (error) {
        console.log(error)
      }
    }
    const fetchEducatorsRequired = async () => {
      let childrenData = await getChildrenByRoom(room)
      let educatorsRequired = calculateEducatorsRequired(childrenData)
      setEducatorsRequired(educatorsRequired)
    }
    fetchEducatorsRequired()
    fetchChildrenData()
    fetchEducatorData()
  }, [room])

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {/* Class list */}
        <div className={styles.infoItem}>
          <h2 className={styles.infoTitle}>Class List</h2>
          <div className={styles.infoList}>
            {classList.length > 0 ? classList.map((student, index) => {
              return <p className={styles.infoText} key={index}>{student}</p>
            }) : (<p className={styles.infoText}>No students in this class</p>)
          }
          </div>
        </div>
        <hr className={styles.divider} />
        {/* Class Count */}
        <div className={styles.infoItem}>
          <h2 className={styles.infoTitle}>Children count</h2>
          <p className={styles.infoText}>{classList.length}</p>
        </div>
        <hr className={styles.divider} />
        {/* Educator list */}
        <div className={styles.infoItem}>
          <h2 className={styles.infoTitle}>Educator List</h2>
          <div className={styles.infoList}>
            {educatorList.map((educator, index) => {
              return <div className={styles.infoListItem} key={index}>{educator}</div>
            })}
          </div>
        </div>
        <hr className={styles.divider} />
        {/* Educator Count */}
        <div className={styles.infoItem}>
          <h2 className={styles.infoTitle}>Educator Count</h2>
          <p className={styles.infoText}>{educatorList.length}</p>
        </div>
        <hr className={styles.divider} />
        <div className={styles.infoItem}>
          <h2 className={styles.infoTitle}>Educators Required</h2>
          <p className={styles.infoText}>{educatorsRequired}</p>
        </div>
      </div>
    </div>
  )
}

export default RoomInfo