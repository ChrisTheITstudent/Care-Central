import { User } from '../../classes'

interface ProfileProps {
    user: User | null
}
interface Person {
  firstName: string,
  lastName: string
}



function Profile({ user: User }: ProfileProps) {

  return (
      <div className='profile-container'>
          <h1>Profile</h1>
        <div className='profile-grid'>
        <h2>General information</h2>
        <div className='profile-sub-grid'>
          <p>Username</p>
          <p>{User?.getUsername()}</p>
          <p>Role</p>
          <p>{User?.getRole()}</p>
        </div>
          {(User?.getRole() === "educator") ?
            <>
              <h2>Job title</h2>
                <p>{User.getJobTitle()}</p>
              <h2>Qualification</h2>
                <div className='profile-sub-grid'>
                  <p>{User.getQualification()} <em>{User.getQualificationInstitution()}</em></p>
                </div>
              <h2>Emergency contact</h2>
                <div className='profile-sub-grid'>
                    <p>Name</p>
                    <p>{User.getEmergencyContact()}</p>
                    <p>Contact number</p>
                    <p>{User.getEmergencyNumber()}</p>
                </div>
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
                      <div className='child-profile-sub-grid'>
                        <p>Name</p>
                        <p>{child.getFirstName()}</p>
                      </div>
                      <div className='child-profile-sub-grid'>
                        <p>Age</p>
                        <p>{child.getAge()}</p>
                      </div>
                      <div className='child-profile-sub-grid'>
                        <p>Medical plan</p>
                        <p>{child.hasMedicalPlan() ? "Yes" : "No"}</p>
                      </div>
                      <div className='child-profile-sub-grid'>
                        <p>Allergies</p>
                        <p>{child.getAllergies()}</p>
                      </div>
                      <div className='child-profile-sub-grid'>
                        <p>Authorized persons</p>
                          {child.getAuthorizedPersons().map((authorizedPerson: Person) => (
                            <p>{authorizedPerson.firstName} {authorizedPerson.lastName}</p>
                          ))}
                      </div>
                      <div className='child-profile-sub-grid'>
                        <p>Emergency contact</p>
                        <p>
                          Name: {child.getEmergencyContact1().name} <br></br>
                          Contact: {child.getEmergencyContact1().contact}
                        </p>
                      </div>
                      <div className='child-profile-sub-grid'>
                        <p>Emergency contact</p>
                        <p>
                          Name: {child.getEmergencyContact2().name} <br></br>
                          Contact: {child.getEmergencyContact1().contact}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
            </>
            :
            null
          }
      </div>
  )
}

export default Profile