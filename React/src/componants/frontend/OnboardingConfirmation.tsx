import closeIcon from '../../images/closeIcon.png'

interface OnboardingConfirmationProps {
    onboarded: boolean
    setShowOnboarding: React.Dispatch<React.SetStateAction<boolean>>
}

function OnboardingConfirmation({onboarded = false, setShowOnboarding}: OnboardingConfirmationProps) {
  return (
      <div className="onboarding-confirmation">
          <img src={closeIcon} alt='Close' className='close-icon' data-testid={"onboarding-confirmation-close"} onClick={() => setShowOnboarding(false)} />
          {
              onboarded ?
                  <p>Successfully onboarded new data</p>
                  :
                  <p>Failed to onboard all data. </p>
          }
      </div>
  )
}

export default OnboardingConfirmation