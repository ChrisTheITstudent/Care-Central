import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../css-modules/switch.module.css'
import { clockUserInOut } from '../backend/backendFunctions'

function ClockInOutSwitch() {
    const [firstLoad, setFirstLoad] = useState(true)
    const dispatch = useDispatch()
    const switchGlobalState = useSelector(state => state.switch)
    const user = useSelector(state => state.user)
    const switchStyle = switchGlobalState.on ? styles.on : styles.off

    const handleSwitch = () => {
        dispatch({ type: "switch/switchToggle", payload: !switchGlobalState.on })
        if (!switchGlobalState.on) {
            dispatch({ type: "user/ClockIn", payload: "" })
        } else {
            dispatch({ type: "user/ClockOut", payload: "" })
        }
    }

    useEffect(() => {
        if (firstLoad === false) {
            clockUserInOut(user)
        } else {
            dispatch({ type: "switch/switchToggle", payload: user.clockedIn })
            setFirstLoad(false)
        }
    }, [user.clockedIn, dispatch, user, firstLoad])

  return (
      <div className={styles.container} onClick={ handleSwitch }>
          <div className={styles.switch}>
              <div data-testid="switch" className={switchStyle} />
          </div>
      </div>
  )
}

export default ClockInOutSwitch