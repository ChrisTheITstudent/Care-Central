import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../css-modules/switch.module.css'

function Switch(props) {
    const dispatch = useDispatch()
    const switchGlobalState = useSelector(state => state.switch)
    const switchStyle = switchGlobalState.on ? styles.on : styles.off

    const handleSwitch = () => {
        dispatch({ type: "switch/switchToggle", payload: !switchGlobalState.on })
    }

  return (
      <div className={styles.container} onClick={ handleSwitch }>
          <div className={styles.switch}>
              <div data-testid="switch" className={switchStyle} />
          </div>
      </div>
  )
}

export default Switch