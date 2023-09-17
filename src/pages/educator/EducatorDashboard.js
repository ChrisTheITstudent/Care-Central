import React from 'react'
import styles from '../../css-modules/educatorDashboard.module.css'
import ChildrenList from '../../componants/ChildrenList'
import EducatorInfo from '../../componants/EducatorInfo'
import EducatorRoom from '../../componants/EducatorRoom'
import ServiceOverall from '../../componants/ServiceOverall'
import ChildrenLocation from '../../componants/ChildrenLocation'
import ClockInOut from '../../componants/ClockInOut'

function EducatorDashboard() {

  return (
    <div className={styles.educatorContainer}>
      <h1 data-testid="educatorDashboardTitle" className={styles.title}>Educator Dashboard</h1>
      <hr className={styles.mainSeperator} />
      <div className={styles.educatorInfo}>
        <EducatorInfo />
      </div>
      <div className={styles.clockInOut}>
        <ClockInOut />
      </div>
      <hr className={styles.mainSeperator} />
      <div className={styles.educatorRoom}>
        <EducatorRoom />
      </div>
      <hr className={styles.subSeperator} />
      <div className={styles.serviceOverall}>
        <ServiceOverall />
      </div>
      <hr className={styles.mainSeperator} />
      <div className={styles.childrenLocation}>
        <ChildrenLocation />
      </div>
      <div className={styles.childrenList}>
        <ChildrenList />
      </div>
      <hr className={styles.finalSeperator} />
    </div>
  )
}

export default EducatorDashboard