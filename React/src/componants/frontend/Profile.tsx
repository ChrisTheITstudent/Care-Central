import React from 'react'
import { User } from '../../classes'

interface ProfileProps {
    user: User | null
}

function Profile({ user: User }: ProfileProps) {
  User?.getChildren()?.forEach(child => {
    // child.getDateOfBirth()
  });

  return (
      <div className='profile-container'>
          <h1>Profile</h1>
          <h2>General information</h2>
          <div className='profile-grid'>
              <p>Username</p>
              <p>{User?.getUsername()}</p>
              <p>Role</p>
              <p>{User?.getRole()}</p>
              {(User?.getRole() === "educator") ?
                  <>
                    <p>Job title</p>
                    <p>in development</p>
                  </>
                  :
                  null
            }
          </div>
          {(User?.getRole() === "Family") ?
              <>
                  <h2>Children</h2>
                    <div className='children-container'>
                  {User.getChildren()?.map((child, index) => (
                      <div className='child-profile-grid' key={index}>
                        <p>Name</p>
                          <p>{child.getFirstName()}</p>
                        <p>Age</p>
                          <p>{Date.now() - (child.getDateOfBirth()).getTime()}</p>
                        <p>Medical plan</p>
                        <p>in development</p>
                        <p>Allergies</p>
                        <p>in development</p>
                        <p>Authorized persons</p>
                        <p>in development</p>
                        <p>Emergency contact</p>
                        <p>in development</p>
                        <p>Emergency contact</p>
                        <p>in development</p>
                      </div>
                  ))}
                    </div>
                  
              </>
              :
              null
          }
          {(User?.getRole() === "educator") ?
              <>
                  <h2>Qualifications</h2>
                  <div className='profile-grid'>
                    <p>Qualifcation name</p>
                    <p>in development</p>
                    <p>Institution name</p>
                    <p>in development</p>
                  </div>
              </>
              :
              null
          }
          {(User?.getRole() === "educator") ?
              <>
                  <h2>Emergency contact</h2>
                  <div className='profile-grid'>
                      <p>Name</p>
                      <p>in development</p>
                      <p>Contact number</p>
                      <p>in development</p>
                  </div>
              </>
              :
              null
          }
      </div>
  )
}

export default Profile