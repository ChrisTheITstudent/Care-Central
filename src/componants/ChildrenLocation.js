import React, { useEffect, useState } from 'react'
import { getChildrenByRoom } from '../backend/backendFunctions'
import styles from '../css-modules/childrenLocation.module.css'

function ChildrenLocation() {
    const [children, setChildren] = useState({
      babies: [],
      toddlers: [],
      preK: [],
      Kindergarten: [],
      schoolAge: []
    })
    const rooms = Object.keys(children)
  
    // TODO: Create a useEffect to set the children in each room in the children object
  useEffect(() => {
    
    const childrenAttending = async () => {
      const babies = await getChildrenByRoom('babies')
      const toddlers = await getChildrenByRoom('toddlers')
      const preK = await getChildrenByRoom('preK')
      const Kindergarten = await getChildrenByRoom('Kindergarten')
      const schoolAge = await getChildrenByRoom('schoolAge')
      setChildren({
        babies: babies,
        toddlers: toddlers,
        preK: preK,
        Kindergarten: Kindergarten,
        schoolAge: schoolAge
      })
    }
    childrenAttending()

  }, [])
  
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Children Attending</h1>
        <hr className={styles.hr} />
        <div className={styles.rooms}>
          {rooms.map((room, index) => {
            return (
              <div key={index} className={styles.classroom}>
                <h1 className={styles.roomTitle} >{room}</h1>
                <hr className={styles.hr} />
                {children[room] && children[room].map((child, index2) => {
                  return <p data-testid="child" key={index2} className={styles.childName}>{child.name}</p>
                })}
                <hr className={styles.hr} />
              </div>
            )
          })}
        </div>
      </div>
  )
}

export default ChildrenLocation