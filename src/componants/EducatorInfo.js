import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../css-modules/educatorInfo.module.css'

function EducatorInfo() {
  const educator = useSelector(state => state.user)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Educator Information</h1>
      <hr className={styles.hr}/>
      <div className={styles.info}>
        <p className={styles.infoItem}>Name: {educator.user}</p>
        <p className={styles.infoItem}>Room: {educator.room?educator.room:"N/A"}</p>
        <p className={styles.infoItem}>In Count: {educator.clockedIn ? "Yes" : "No"}</p>
      </div>
    </div>
  )
}

export default EducatorInfo