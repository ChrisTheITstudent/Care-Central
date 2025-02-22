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
      <div className='profile-container' data-testid="profile-container">
          <h1>Profile</h1>
        <div className='profile-grid'>
        <h2>General information</h2>
        <div className='profile-sub-grid'>
          <p>Username</p>
          <p data-testid="username">{User?.getUsername()}</p>
          <p>Role</p>
          <p data-testid="role">{User?.getRole()}</p>
        </div>
          {(User?.getRole() === "educator") ?
            <>
              <h2>Job title</h2>
                <p data-testid="educator-title">{User.getJobTitle()}</p>
              <h2>Qualification</h2>
                <div className='profile-sub-grid'>
                  <p data-testid="educator-qual">{User.getQualification()} <em>{User.getQualificationInstitution()}</em></p>
                </div>
              <h2 data-testid="educator-emergency">Emergency contact</h2>
                <div className='profile-sub-grid'>
                    <p>Name</p>
                    <p data-testid="educator-emergency-name">{User.getEmergencyContact()}</p>
                    <p>Contact number</p>
                    <p data-testid="educator-emergency-number">{User.getEmergencyNumber()}</p>
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
                        <p data-testid="child-name">{child.getFirstName()}</p>
                      </div>
                      <div className='child-profile-sub-grid'>
                        <p>Age</p>
                        <p data-testid="child-age">{child.getAge()}</p>
                      </div>
                      <div className='child-profile-sub-grid'>
                        <p>Medical plan</p>
                        <p data-testid="child-medical">{child.hasMedicalPlan() ? "Yes" : "No"}</p>
                      </div>
                      <div className='child-profile-sub-grid'>
                        <p>Allergies</p>
                        <p data-testid="child-allergies">{child.getAllergies()}</p>
                      </div>
                      <div className='child-profile-sub-grid'>
                        <p>Authorized persons</p>
                          {child.getAuthorizedPersons().map((authorizedPerson: Person) => (
                            <p data-testid="child-authorised">{authorizedPerson.firstName} {authorizedPerson.lastName}</p>
                          ))}
                      </div>
                      <div className='child-profile-sub-grid'>
                        <p>Emergency contact</p>
                        <p data-testid="child-emergency-contact1">
                          Name: {child.getEmergencyContact1().name} <br></br>
                          Contact: {child.getEmergencyContact1().contact}
                        </p>
                      </div>
                      <div className='child-profile-sub-grid'>
                        <p>Emergency contact</p>
                        <p data-testid="child-emergency-contact2">
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