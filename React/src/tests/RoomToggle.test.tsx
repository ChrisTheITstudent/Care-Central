import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RoomToggle from '../componants/frontend/RoomToggle';
import * as fetchData from '../componants/backend/fetchData';

jest.mock("../componants/backend/fetchData", () => ({
    toggleUserRoom: jest.fn(),
}))
    
// Set up mocks
const mockRoomName = "TestRoom"
const mockUserId = 1

// Clear mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
})

// Tests
describe('RoomToggle', () => {
    const mockToggleUserRoom = fetchData.toggleUserRoom as jest.Mock;
    const mockOnToggle = jest.fn();

    const defaultProps = {
        roomName: mockRoomName,
        isSignedIn: true,
        userId: mockUserId,
        onToggle: mockOnToggle
    }

    test('Renders room toggle', () => {
        render(<RoomToggle roomName={mockRoomName} isSignedIn={true} userId={mockUserId} onToggle={mockOnToggle} />);
        const roomToggle = screen.getByTestId("room-toggle");
        expect(roomToggle).toBeInTheDocument();
    })

    test('Toggles room', async () => {
        const props = { ...defaultProps }

        mockToggleUserRoom.mockResolvedValueOnce(null);

        const { getByTestId } = render(<RoomToggle {...props} />);
        const toggleDiv = getByTestId("room-toggle");
        fireEvent.click(toggleDiv);

        expect(mockToggleUserRoom).toHaveBeenCalledWith(1, null)

        await Promise.resolve()
        expect(mockOnToggle).toHaveBeenCalled()
    })

    test('Should call toggleUserRoom with roomName when not signed in', async () => {
        const props = { ...defaultProps, isSignedIn: false }

        mockToggleUserRoom.mockResolvedValueOnce(null);

        const { getByTestId } = render(<RoomToggle {...props} />);
        const toggleDiv = getByTestId("room-toggle");
        fireEvent.click(toggleDiv);

        expect(mockToggleUserRoom).toHaveBeenCalledWith(1, mockRoomName)

        await Promise.resolve()
        expect(mockOnToggle).toHaveBeenCalled()
    })

    test('Should call toggleUserRoom with null when signed in', async () => {
        const props = { ...defaultProps, isSignedIn: true }

        mockToggleUserRoom.mockResolvedValueOnce(null);

        const { getByTestId } = render(<RoomToggle {...props} />);
        const toggleDiv = getByTestId("room-toggle");
        fireEvent.click(toggleDiv);

        expect(mockToggleUserRoom).toHaveBeenCalledWith(1, null)

        await Promise.resolve()
        expect(mockOnToggle).toHaveBeenCalled()
    })

    test('Should log error when toggleUserRoom fails when signed in', async () => {
        const props = { ...defaultProps }

        mockToggleUserRoom.mockRejectedValueOnce(new Error("Test Error"));

        const { getByTestId } = render(<RoomToggle {...props} />);
        const toggleDiv = getByTestId("room-toggle");
        fireEvent.click(toggleDiv);

        expect(mockToggleUserRoom).toHaveBeenCalledWith(1, null)

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith("Error toggling room: ", expect.any(Error))
        })
    })

    test('Should log error when toggleUserRoom fails when not signed in', async () => {
        const props = { ...defaultProps, isSignedIn: false }

        mockToggleUserRoom.mockRejectedValueOnce(new Error("Test Error"));

        const { getByTestId } = render(<RoomToggle {...props} />);
        const toggleDiv = getByTestId("room-toggle");
        fireEvent.click(toggleDiv);

        expect(mockToggleUserRoom).toHaveBeenCalledWith(1, mockRoomName)

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith("Error toggling room: ", expect.any(Error))
        })
    })
})