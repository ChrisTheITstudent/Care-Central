import React, { useState } from 'react'
import styles from '../css-modules/inbox.module.css'

function Message(props) {
    const [isHidden, setHidden] = useState(true);
    const toggleHidden = () => {
        setHidden(!isHidden);
    }

    return (
    <div key={props.message.id} className={styles.message}>
        <div className={styles.messageHeader} onClick={toggleHidden}>
          <div className={styles.messageSubject}>{props.message.subject}</div>
          <div className={styles.messageFrom}>{props.message.from}</div>
        </div>
        <div className={isHidden?styles.hidden:styles.messageDate}>Date: {props.message.date}</div>
        <div className={isHidden?styles.hidden:styles.messageBody}>{props.message.message}</div>
    </div>
  )
}

export default Message