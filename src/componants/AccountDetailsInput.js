import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createChild, updateChild, getChildren } from '../backend/backendFunctions';
import styles from '../css-modules/accountDetailsInput.module.css'

class Child {
  constructor(childDetails) {
      this.id = childDetails.id;
      this.name = childDetails.name;
      this.DOB = childDetails.DOB;
      this.parent = childDetails.parent;
      this.room = childDetails.room;
      this.authorisedPersons = childDetails.authorisedPersons;
      this.allergies = childDetails.allergies;
      this.medications = childDetails.medications;
      this.specialNeeds = childDetails.specialNeeds;
      this.notes = childDetails.notes;
  }
}

function AccountDetailsInput() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState({
    username: user.user,
    password: user.password,
    role: 'family',
    children: []
  })
  const [childExists, setChildExists] = useState(false)
  const handleSaveChild = (index) => {
    // TODO: Save child to database if it doesn't exist, otherwise update child
    let child = async () => {
      console.log(user.user)
      let child = await getChildren(userDetails.username)
      child.forEach(child => {
        if (child.name === userDetails.children[index].name) {
          setChildExists(true)
        }
      })
      if (childExists) {
        dispatch({
          type: "user/UpdateRequest",
          payload: {
            username: userDetails.username,
            password: userDetails.password,
            role: userDetails.role,
            children: userDetails.children
          }
        })
        dispatch({
          type: "user/UpdateSuccess",
          payload: {
            user
          }
        })
        updateChild(userDetails.children[index])
      } else {
        dispatch({
          type: "user/UpdateRequest",
          payload: {
            username: userDetails.username,
            password: userDetails.password,
            role: userDetails.role,
            children: userDetails.children
          }
        })
        dispatch({
          type: "user/UpdateSuccess",
          payload: {
            user
          }
        })
        createChild(userDetails.children[index])
      }
    }
    child()
  }

  useEffect(() => {
    // TODO: Save user to database
  }, [user])

  useEffect(() => {
    let children = []
    userDetails.children.forEach(child => {
      children.push({
        id: child.id+1,
        name: child.name,
        DOB: child.DOB,
        parent: [{
          id: null,
          username: userDetails.username
        }],
        room: null,
        authorisedPersons: child.authorisedPersons,
        allergies: child.allergies,
        medications: child.medications,
        specialNeeds: child.specialNeeds,
        notes: child.notes
      })
    });
    dispatch({
      type: "user/UpdateRequest",
      payload: {
        username: userDetails.username,
        password: userDetails.password,
        role: userDetails.role,
        children: children
      }
    })
    dispatch({
      type: "user/UpdateSuccess",
      payload: {
        user
      }
    })
  }, [userDetails])
  
  return (
    <div className={styles.container}>
      <h1 data-testid='accountDetailsInputTitle' className={styles.title}>Account Details</h1>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Number of children</label>
        <input data-testid="numberOfChildren" className={styles.numberInput} type="number" min="0" max="10" onChange={(e) => {
          let children = []
          for (let i = 0; i < e.target.value; i++) {
            children.push(new Child({
              id: i,
              parent: [{
                id: null,
                username: userDetails.username
              }],
            }))
          }
          setUserDetails({ ...userDetails, children: children })
        }} />
        <hr className={styles.mainDivider} />
        
        {userDetails.children.map((child, index) => {
          return (
            <div data-testid="childData" key={index}>
              <label className={styles.label}>Child {index + 1} name</label>
              <input data-testid="childName" className={styles.input} type="text" onChange={(e) => {
                let children = userDetails.children
                children[index].name = e.target.value
                setUserDetails({ ...userDetails, children: children })
              }} />
              <label className={styles.label}>Date of birth</label>
              <input data-testid="dateOfBirth" className={styles.input} type="date" onChange={(e) => {
                let children = userDetails.children
                children[index].DOB = e.target.value
                setUserDetails({ ...userDetails, children: children })
              }} />
              <label className={styles.label}>Child {index + 1} authorised persons</label>
              <p className={styles.hintText}>Seperate each name by a comma (,)</p>
              <input data-testid="authorizedPersons" className={styles.input} type="text" onChange={(e) => {
                let children = userDetails.children
                children[index].authorisedPersons = e.target.value
                setUserDetails({ ...userDetails, children: children })
              }} />
              <label className={styles.label}>Allergies</label>
              <p className={styles.hintText}>Seperate each allergy by a comma (,)</p>
              <input data-testid="allergies" className={styles.input} type="text" onChange={(e) => {
                let children = userDetails.children
                children[index].allergies = e.target.value
                setUserDetails({ ...userDetails, children: children })
              }} />
              <label className={styles.label}>Medications</label>
              <p className={styles.hintText}>Seperate each medication by a comma (,)</p>
              <input data-testid="medication" className={styles.input} type="text" onChange={(e) => {
                let children = userDetails.children
                children[index].medications = e.target.value
                setUserDetails({ ...userDetails, children: children })
              }} />
              <label className={styles.label}>Special needs</label>
              <input data-testid="specialNeeds" className={styles.input} type="text" onChange={(e) => {
                let children = userDetails.children
                children[index].specialNeeds = e.target.value
                setUserDetails({ ...userDetails, children: children })
              }} />
              <label className={styles.label}>Additional information</label>
              <input data-testid="notes" className={styles.input} type="text" onChange={(e) => {
                let children = userDetails.children
                children[index].notes = e.target.value
                setUserDetails({ ...userDetails, children: children })
              }} />
              <div data-testid="saveChild" className={styles.saveChildButton} onClick={() => {
                handleSaveChild(index)
              }}>Save child</div>
              <hr className={styles.childDivider} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AccountDetailsInput