import React, { useState } from 'react'
import styles from '../css-modules/inbox.module.css'

function Message(props) {
    const [isHidden, setHidden] = useState(true);
    const toggleHidden = () => {
        setHidden(!isHidden);
    }

    return (
    <div key={props.message.id} className={styles.message}>
        <div data-testid="header" className={styles.messageHeader} onClick={toggleHidden}>
          <div data-testid="subject" className={styles.messageSubject}>{props.message.subject}</div>
          <div data-testid="from" className={styles.messageFrom}>{props.message.from}</div>
        </div>
        <div data-testid="date" className={isHidden?styles.hidden:styles.messageDate}>Date: {props.message.date}</div>
        <div data-testid="body" className={isHidden?styles.hidden:styles.messageBody}>{props.message.message}</div>
    </div>
  )
}

export default Message