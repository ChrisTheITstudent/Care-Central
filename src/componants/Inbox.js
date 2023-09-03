import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../css-modules/inbox.module.css'
import { getInbox } from '../backend/backendFunctions'
import Message from './Message';

function Inbox() {
  const [online, setOnline] = useState(true);
  const user = useSelector(state => state.user)
  const messages = getInbox(user.username);

  return (
    <div className={styles.container}>
      <h2>Inbox</h2>
      <div className={styles.onlineIndicator}>
        <div
          className={online ? styles.online : styles.offline}
          onClick={() => setOnline(!online)}
        ></div>
        {online ? "Online" : "Offline"}
      </div>
      <hr className={styles.hr} />
      <div className={styles.inbox}>
        <Message key="na" message={
          {
            id: "-1",
            subject: "Subject",
            from: "Sender",
            date: "1/1/2021",
            message: "Welcome to Care Central! We are excited to have you here. Please feel free to reach out to us with any questions or concerns."
          }
        } />
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </div>
  )
}

export default Inbox