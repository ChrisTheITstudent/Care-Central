export const getMockProfileProps = () => ({
    username: 'Sally',
    setUserName: jest.fn(),
    setShowLogin: jest.fn(),
    setProfileDropdown: jest.fn(),
    setShowProfile: jest.fn()
})

export const getMockRoomToggleProps = () => ({
    roomName: 'Test Room',
    isSignedIn: true,
    userId: 1,
    onToggle: jest.fn()
})

export const getMockAge = () => {
    const childDOB = new Date(2020, 2, 12)
    let diff = Date.now() - childDOB.getTime()
      
    let seconds = Math.floor(diff / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    let days = Math.floor(hours / 24)
    let months = Math.floor(days / 30)
    let years = Math.floor(days / 365)
    
    seconds %= 60
    minutes %= 60
    hours %= 24
    days %= 30
    months %= 12
    
    return `${years} yrs, ${months} mths`
}