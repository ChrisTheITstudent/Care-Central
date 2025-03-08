import { useState } from "react"
import { onboardChildren, onboardUsers } from "../backend/fetchData"
import closeIcon from '../../images/closeIcon.png'
import Loading from "./Loading"
import OnboardingConfirmation from "./OnboardingConfirmation"
import RegistrationForm from "./RegistrationForm"
import OffBoarding from "./OffBoarding"

function AdminLSidebar() {
  const [loading, setLoading] = useState<boolean>(false)

  const [selectedOption, setSelectedOption] = useState<null | string>(null)  
  const [onboarded, setOnboarded] = useState<boolean>(false)
  const [showOnboardingConfirmation, setOnboardingConfirmation] = useState<boolean>(false)

  const [selectedSingleOption, setSingleOption] = useState<null | string>(null)

  const [removeData, setRemoveData] = useState<null | string>(null)
  
  function handleOnboardUsers() {
    setSelectedOption("users")
  }
  
  function handleOnboardChildren() {
    setSelectedOption("children")
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      console.log(`Uploading ${file.name} for ${selectedOption}`)
      if (selectedOption === "users") {
        console.log("Processing user CSV...")
        setLoading(true)
        setOnboarded(await onboardUsers(file))
        setLoading(false)
        setOnboardingConfirmation(true)
      } else if (selectedOption === "children") {
        console.log("Processing children CSV...")
        setLoading(true)
        setOnboarded(await onboardChildren(file))
        setLoading(false)
        setOnboardingConfirmation(true)
      }
      setSelectedOption(null)
    }
  }

  function addUser() {
    setSingleOption("user")
  }

  function addChildren() {
    setSingleOption("children")
  }

  function removeUser() {
    setRemoveData("user")
  }

  function removeChildren() {
    setRemoveData("children")
  }

  return (
    <div className='adminLsidebar'>
      <ul>
        <p className='LsidebarHeader'>Onboarding</p>
        <span className="LsidebarSpacer" />
        <li onClick={handleOnboardUsers}>Users</li>
        <li onClick={handleOnboardChildren}>Children</li>
        <span className="LsidebarSpacer" />
        <p className='LsidebarHeader'>Add Data</p>
        <span className="LsidebarSpacer" />
        <li onClick={addUser}>Users</li>
        <li onClick={addChildren}>Children</li>
        <span className="LsidebarSpacer" />
        <p className='LsidebarHeader'>Offboarding</p>
        <span className="LsidebarSpacer" />
        <li onClick={removeUser}>Users</li>
        <li onClick={removeChildren}>Children</li>
        <span className="LsidebarSpacer" />
      </ul>

      {selectedOption !== null && (
        <div className="upload-form">
          <img src={closeIcon} alt='Close' className='close-icon' data-testid={"upload-close"} onClick={() => setSelectedOption(null)} />
          <p>Upload CSV for {selectedOption}</p>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
      )}
      {selectedSingleOption !== null && (
        <RegistrationForm option={selectedSingleOption} setOption={setSingleOption}/>
      )}
      {removeData !== null && (
        <OffBoarding option={removeData} setOption={setRemoveData} />
      )}
      {loading && (
        <Loading loadingText="Onboarding data...."/>
      )}
      {showOnboardingConfirmation && (
        <OnboardingConfirmation onboarded={onboarded} setShowOnboarding={setOnboardingConfirmation} />
      )}
    </div>
  )
}

export default AdminLSidebar