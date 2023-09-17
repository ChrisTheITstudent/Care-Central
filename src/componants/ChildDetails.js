import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../css-modules/childDetails.module.css'
import Switch from './Switch'
import { updateChild } from '../backend/backendFunctions'

function ChildDetails() {
  const user = useSelector(state => state.user)
  const switchState = useSelector(state => state.switch.on)
  const dispatch = useDispatch()

  // Change the switch state when the user selection changes to match the isAttending value of the selection
  useEffect(() => {
    if (user.selection) {
      dispatch({ type: 'switch/switchToggle', payload: user.selection.isAttending })
    }
  }, [user.selection, dispatch])
  // Change the isAttending value in user.children when the switch is toggled
  useEffect(() => {
    if (user.selection) {
      updateChild({ ...user.selection, isAttending: switchState })
      dispatch({ type: 'user/UpdateChild', payload: { ...user.selection, isAttending: switchState } })
      dispatch({ type: 'user/setSelection', payload: { ...user.selection, isAttending: switchState } })
    }
  }, [switchState, dispatch, user.selection])
  // Confirm changes to children array and selection
  useEffect(() => {
    let child = {}
    if (user.selection) {
      for (let i = 0; i < user.children.length; i++) {
        if (user.children[i].name === user.selection.name) {
          child = user.children[i]
        }
      }
      updateChild(child)
    }
  }, [user.children, user.selection])

  return (
    <div className={styles.container}>
      <h1 data-testid="title" className={styles.h1}>Child Details</h1>
      <div data-testid="childName" className={styles.childDetailsName}><h2 className={styles.h2}>Name:</h2> <p className={styles.p}>{user.selection ? user.selection.name: "No selection"}</p></div>
      <div data-testid="childDOB" className={styles.childDetailsDOB}><h2 className={styles.h2}>DOB:</h2> <p className={styles.p}>{user.selection ? user.selection.DOB: "No selection"}</p></div>
      <div data-testid="childRoom" className={styles.childDetailsRoom}><h2 className={styles.h2}>Room:</h2> <p className={styles.p}>{user.selection ? user.selection.room : "No selection"}</p></div>
      <div data-testid="childAuthorizedPersons" className={styles.childDetailsAuthorizedPersons}><h2 className={styles.h2}>Authorized Persons:</h2> {user.selection ? user.selection.authorizedPersons : "No selection"}</div>
      <div data-testid="childAllergies" className={styles.childDetailsAllergies}><h2 className={styles.h2}>Allergies:</h2> {user.selection ? user.selection.allergies : "No selection"}</div>
      <div data-testid="childMedications" className={styles.childDetailsMedications}><h2 className={styles.h2}>Medications:</h2> {user.selection ? user.selection.medications : "No selection"}</div>
      <div data-testid="childSpecialNeeds" className={styles.childDetailsSpecialNeeds}><h2 className={styles.h2}>Special Needs:</h2> {user.selection ? user.selection.specialNeeds : "No selection"}</div>
      <div data-testid="childAttending" className={styles.childDetailsAttending}><h2 className={styles.h2}>Attending:</h2> {user.selection ?
        <div className={styles.switch}><Switch on={user.selection.isAttending} /></div> : "No selection"}</div>
      <div data-testid="childNotes" className={styles.childDetailsNotes}><h2 className={styles.h2}>Notes:</h2> <p className={styles.p}>{user.selection ? user.selection.notes : "No selection"}</p></div>
    </div>
  )
}

export default ChildDetails