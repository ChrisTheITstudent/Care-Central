export const getMockProfileProps = () => ({
    username: 'Sally'
})

export const getMockRoomToggleProps = () => ({
    roomName: 'Test Room',
    isSignedIn: true,
    userId: 1,
    onToggle: jest.fn()
})