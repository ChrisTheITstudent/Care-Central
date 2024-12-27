import React from 'react'
import EducatorRoomData from './componants/frontend/EducatorRoomData'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import * as fetchData from './componants/backend/fetchData'
import {Rooms, Children} from './classes'

// Setup props
let mockRoomList: Rooms[] = []
const mockInitialRoomNames = ["Babies", "Toddlers", "Pre Kindergarten", "Kindergarten", "PreSchool"]
const mockSetRoomList = jest.fn((rooms) => {
    mockRoomList = rooms
})

// Setup mocks
jest.mock('./componants/backend/fetchData', () => {
    return {
        getChildrenByRoomName: jest.fn(),
        getEducatorsByRoomName: jest.fn()
    }
})
jest.mock('./classes', () => {
    return {
        Rooms: jest.fn().mockImplementation(() => ({
            addChild: jest.fn(),
            setCompliance: jest.fn(),
            removeChild: jest.fn(),
            checkCompliance: jest.fn().mockReturnValue(true),
            getChildren: jest.fn().mockReturnValue([]),
            getRoomName: jest.fn().mockReturnValue('Mock Room'),
            getChildrenCount: jest.fn().mockReturnValue(2),
            getEducatorCount:  jest.fn().mockReturnValue(0),
            loadChildren: jest.fn(),
            loadEducators: jest.fn(),
        })),
    }
})

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
            getChildrenCount: jest.fn(5),
            getEducatorCount: jest.fn(2),
            checkCompliance: jest.fn(true),
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
            getChildrenCount: jest.fn(5),
            getEducatorCount: jest.fn(2),
            checkCompliance: jest.fn(true),
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

    test('Should render roon-info divs for each room in the room list', () => {
        // Mock rooms
        const mockRooms = [
            {
                getRoomName: jest.fn().mockReturnValue("Room A"),
                getChildrenCount: jest.fn().mockReturnValue(10),
                getEducatorCount: jest.fn().mockReturnValue(2),
                checkCompliance: jest.fn().mockReturnValue(true),
            },
            {
                getRoomName: jest.fn().mockReturnValue("Room B"),
                getChildrenCount: jest.fn().mockReturnValue(5),
                getEducatorCount: jest.fn().mockReturnValue(1),
                checkCompliance: jest.fn().mockReturnValue(false),
            },
            {
                getRoomName: jest.fn().mockReturnValue("Room C"),
                getChildrenCount: jest.fn().mockReturnValue(8),
                getEducatorCount: jest.fn().mockReturnValue(3),
                checkCompliance: jest.fn().mockReturnValue(true),
            },
        ]

        render(
            <EducatorRoomData
            roomList={mockRooms}
            initalRoomNames={[]}
            setRoomList={mockSetRoomList}
            />
        )

        const roomInfoDivs = screen.getAllByTestId('room-info')
        expect(roomInfoDivs).toHaveLength(mockRooms.length)

        mockRooms.forEach((room, index) => {
            expect(roomInfoDivs[index]).toHaveTextContent(room.getRoomName())
            expect(roomInfoDivs[index]).toHaveTextContent(`Children: ${room.getChildrenCount()}`)
            expect(roomInfoDivs[index]).toHaveTextContent(`Educators: ${room.getEducatorCount()}`)
        })
    })
})