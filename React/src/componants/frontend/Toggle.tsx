import { useState } from "react"
import { toggleChildIsAttending } from "../backend/fetchData"

interface ToggleProps {
  id: number
  initialIsOn: boolean,
}

function Toggle({ id, initialIsOn }: ToggleProps) {
  const [isOn, setIsOn] = useState<boolean>(initialIsOn)  

  const clickToggle = () => {
    setIsOn((prevIsOn) => {
      const newIsOn = !prevIsOn
      toggleChildIsAttending(id)
      return newIsOn
    })
  }
  
  return (
    <div className='toggle-container' onClick={clickToggle}>
      <div className={isOn ? "toggle-on" : "toggle-off"} />
    </div>
  )
}

export default Toggle