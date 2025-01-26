import React from 'react'
import EducatorRoomData from '../componants/frontend/EducatorRoomData'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {Rooms, Children} from '../classes'

// Setup props
let mockRoomList: Rooms[] = []
const mockInitialRoomNames = ["Babies", "Toddlers", "Pre Kindergarten", "Kindergarten", "PreSchool"]
const mockSetRoomList = jest.fn((rooms) => {
    mockRoomList = rooms
})

// Setup mocks
jest.mock('../componants/backend/fetchData', () => {
    return {
        getChildrenByRoomName: jest.fn(),
        getEducatorsByRoomName: jest.fn()
    }
})
jest.mock('../classes', () => {
    return {
        Rooms: jest.fn((roomName) => {
            console.log(`Creating Room: ${roomName}`)
            return {
                addChild: jest.fn(),
                setCompliance: jest.fn(),
                removeChild: jest.fn(),
                checkCompliance: jest.fn().mockReturnValue(true),
                getChildren: jest.fn().mockReturnValue([]),
                getRoomName: jest.fn().mockReturnValue(roomName),
                getChildrenCount: jest.fn().mockReturnValue(5),
                getEducatorCount: jest.fn().mockReturnValue(2),
                loadChildren: jest.fn().mockResolvedValue(undefined),
                loadEducators: jest.fn().mockResolvedValue(undefined),
            }
        }),
    }
})

// Factories
function createMockRoom(roomName: string): Rooms {
    return {
        getRoomName: jest.fn(() => roomName),
        getChildrenCount: jest.fn(() => 5),
        getEducatorCount: jest.fn(() => 2),
        checkCompliance: jest.fn(() => true),
        loadChildren: jest.fn(),
        loadEducators: jest.fn(),
    } as unknown as Rooms;
}


beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
    jest.restoreAllMocks()
})

describe('EducatorRoomData Componant', () => {
    test('Educator data container renders', () => {
        render(
        <EducatorRoomData 
        roomList={mockRoomList} 
        initalRoomNames={mockInitialRoomNames} 
        setRoomList={mockSetRoomList}/>)
        expect(screen.getByTestId('educatorGridContainer')).toBeInTheDocument()
    })

    test('Should set room list', async () => {
        (Rooms as jest.Mock).mockImplementation(() => ({
            loadChildren: jest.fn(),
            loadEducators: jest.fn().mockResolvedValue(undefined),
            getRoomName: jest.fn().mockReturnValue('Mock Room'),
            getChildrenCount: jest.fn().mockRejectedValue(5),
            getEducatorCount: jest.fn().mockReturnValue(2),
            checkCompliance: jest.fn().mockReturnValue(true),
        }))
        render(
            <EducatorRoomData
            roomList={mockRoomList}
            initalRoomNames={mockInitialRoomNames}
            setRoomList={mockSetRoomList}
            />
        )
        await waitFor(() => {
            expect(Rooms).toHaveBeenCalledTimes(mockInitialRoomNames.length)
            expect(mockSetRoomList).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({getRoomName: expect.any(Function)}),
                ])
            )
        })
    })

    test('Should handle erros during room data loading', async () => {
        (Rooms as jest.Mock).mockImplementation(() => ({
            loadChildren: jest.fn().mockRejectedValue(new Error('Load error')),
            loadEducators: jest.fn().mockResolvedValue(undefined),
            getRoomName: jest.fn().mockReturnValue('Mock Room'),
            getChildrenCount: jest.fn().mockReturnValue(5),
            getEducatorCount: jest.fn().mockReturnValue(2),
            checkCompliance: jest.fn().mockReturnValue(true),
        }))
        render(
            <EducatorRoomData
            roomList={mockRoomList}
            initalRoomNames={mockInitialRoomNames}
            setRoomList={mockSetRoomList}
            />
        )
        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(
                'Error loading rooms:', 
                expect.any(Error)
            )
        })
    })

    test('Should render room-info divs for each room in the room list', async () => {
        (Rooms as jest.Mock).mockImplementation(() => ({
                    loadChildren: jest.fn().mockResolvedValue(undefined),
                    loadEducators: jest.fn().mockResolvedValue(undefined),
                    getRoomName: jest.fn().mockReturnValue("Test Room"),
                    getChildrenCount: jest.fn().mockReturnValue(5),
                    getEducatorCount: jest.fn().mockReturnValue(2),
                    checkCompiance: jest.fn().mockReturnValue(true)
                }))

        const { rerender } = render(
            <EducatorRoomData
            roomList={mockRoomList}
            initalRoomNames={mockInitialRoomNames}
            setRoomList={mockSetRoomList}
            />
        )

        await waitFor(() => {
            expect(mockSetRoomList).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({getRoomName: expect.any(Function) }),
                ])
            )
        })

        mockRoomList = mockInitialRoomNames.map(createMockRoom)

        rerender(
            <EducatorRoomData
            roomList={mockRoomList}
            initalRoomNames={mockInitialRoomNames}
            setRoomList={mockSetRoomList}
            />
        )

        const roomInfoDivs = screen.getAllByTestId('room-info')
        expect(roomInfoDivs).toHaveLength(mockRoomList.length)

        mockRoomList.forEach((room, index) => {
            expect(roomInfoDivs[index]).toHaveTextContent(room.getRoomName())
            expect(roomInfoDivs[index]).toHaveTextContent('Children: 5')
            expect(roomInfoDivs[index]).toHaveTextContent('Educators: 2')
        })
    })

    test('Should render room-info divs for each room in the room list when non-compliant', async () => {
        (Rooms as jest.Mock).mockImplementation(() => ({
                    loadChildren: jest.fn().mockResolvedValue(undefined),
                    loadEducators: jest.fn().mockResolvedValue(undefined),
                    getRoomName: jest.fn().mockReturnValue("Test Room"),
                    getChildrenCount: jest.fn().mockReturnValue(5),
                    getEducatorCount: jest.fn().mockReturnValue(2),
                    checkCompiance: jest.fn().mockReturnValue(false)
                }))

        const { rerender } = render(
            <EducatorRoomData
            roomList={mockRoomList}
            initalRoomNames={mockInitialRoomNames}
            setRoomList={mockSetRoomList}
            />
        )

        await waitFor(() => {
            expect(mockSetRoomList).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({getRoomName: expect.any(Function) }),
                ])
            )
        })

        mockRoomList = mockInitialRoomNames.map(createMockRoom)

        rerender(
            <EducatorRoomData
            roomList={mockRoomList}
            initalRoomNames={mockInitialRoomNames}
            setRoomList={mockSetRoomList}
            />
        )

        const roomInfoDivs = screen.getAllByTestId('room-info')
        expect(roomInfoDivs).toHaveLength(mockRoomList.length)

        mockRoomList.forEach((room, index) => {
            expect(roomInfoDivs[index]).toHaveTextContent(room.getRoomName())
            expect(roomInfoDivs[index]).toHaveTextContent('Children: 5')
            expect(roomInfoDivs[index]).toHaveTextContent('Educators: 2')
        })
    })
})