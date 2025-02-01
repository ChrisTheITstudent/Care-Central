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