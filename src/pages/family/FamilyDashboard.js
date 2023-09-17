import styles from '../../css-modules/familyDashboard.module.css'
import ChildrenList from '../../componants/ChildrenList'
import ChildDetails from '../../componants/ChildDetails'
import Inbox from '../../componants/Inbox'

function FamilyDashboard() {

  return (
    <div className={styles.container}>
      {/* Title */}
      <h1 data-testid='dashboardTitle' className={styles.h1}>Family Dashboard</h1>
      {/* TODO: Utilize the vertical space more on the styling layout */}
      <div className={styles.componants}>
        <div className={styles.childrenList}>
          <ChildrenList />
        </div>
        <div className={styles.childDetails}>
          <ChildDetails />
        </div>
        <div className={styles.inbox}>
          <Inbox />
        </div>
      </div>
    </div>
  )
}

export default FamilyDashboard