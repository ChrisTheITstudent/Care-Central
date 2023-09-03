import React from 'react'
import styles from '../css-modules/clockInOut.module.css'
import ClockInOutSwitch from './ClockInOutSwitch'

function ClockInOut() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Clock In/Out</p>
      <div className={styles.clockInOut}>
        <ClockInOutSwitch />
      </div>
    </div>
  )
}

export default ClockInOut