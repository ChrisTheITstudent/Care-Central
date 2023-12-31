import React, { useEffect, useState } from 'react'
import { getAllUsers, getAllChildren, calculateEducatorsRequired } from '../backend/backendFunctions'
import styles from '../css-modules/serviceOverall.module.css'

function ServiceOverall() {
  // TODO: Make function to count all educators clocked in
  // TODO: Make function to calculate educators required overall
  const [educatorsClockedIn, setEducatorsClockedin] = useState(0)
  const [childrenPresent, setChildrenPresent] = useState(0)
  const [educatorsRequiredOverAll, setEducatorsRequiredOverall] = useState(0)

  // DUBUG: required educators being logged to console BEFORE backend function making the call for the user list
  useEffect(() => {
    const allUsers = async () => {
      let educatorsList = []

      let response = await getAllUsers()
      response.forEach(user => {
        if (user.role === "educator" && user.isClockedIn) {
          educatorsList.push(user)
        }
      })
      setEducatorsClockedin(educatorsList.length)
    }
    const allChildren = async () => {
      let childrenList = []

      let response = await getAllChildren()
      response.forEach(child => {
        if (child.isAttending) {
          childrenList.push(child)
        }
      })
      setChildrenPresent(childrenList.length)
      setEducatorsRequiredOverall(calculateEducatorsRequired(childrenList))
    }
    allUsers()
    allChildren()
  }, [])

  return (
    <div className={styles.container}>
      <p data-testid="childrenTitle" className={styles.title}>Total children present</p>
      <p data-testid="childrenPresent" className={styles.text}>{childrenPresent}</p>
      <hr className={styles.divider}/>
      <p data-testid="educatorTitle" className={styles.title}>Total educators present</p>
      <p data-testid="clockedIn" className={styles.text}>{educatorsClockedIn}</p>
      <hr className={styles.divider}/>
      <p data-testid="requiredTitle" className={styles.title}>Educators required</p>
      <p data-testid="educatorsRequired" className={styles.text}>{educatorsRequiredOverAll}</p>
    </div>
  )
}


export default ServiceOverall