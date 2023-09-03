import React from 'react'
import styles from '../css-modules/loading.module.css'

function Loading() {
  return (
      <div className={styles.container}>
          <div className={styles.spinner}><h1>Loading!!!!!</h1></div>
      </div>
  )
}

export default Loading