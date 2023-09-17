import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import RoomInfo from '../componants/RoomInfo';
import * as backend from '../backend/backendFunctions';

backend.getChildrenByRoom = jest.fn(() => {
    return [
        {
            id: 1,
            name: 'testChild',
            DOB: '01/01/2021',
            parent: 'testParent',
            room: 'babies',
            authorisedPersons: 'testAuthorisedPerson',
            allergies: 'testAllergy',
            medications: 'testMedication',
            specialNeeds: 'testSpecialNeed',
            notes: 'testNotes'
        }
    ]
})

backend.getUserByRoom = jest.fn(() => {
    return [
        {
            id: 1,
            username: 'testEducator',
            password: 'testPassword',
            room: 'babies',
            role: 'educator'
        }
    ]
})

backend.calculateEducatorsRequired = jest.fn(() => {
    return 1
})

beforeEach(() => {
    waitFor(() => {
        store.dispatch({
            type: "user/UpdateRequest",
            payload: {
                username: 'testEducator',
                room: 'babies'
            }
        })
        store.dispatch({
            type: "user/UpdateSuccess",
            payload: {
                user: {
                    username: 'testEducator',
                    room: 'babies'
                }
            }
        })
        store.dispatch({
            type: "roomSelector/setSelectedRoom",
            payload: "babies"
        })
    })
})

describe('RoomInfo', () => {
    it('renders RoomInfo', async () => {
        // Arrange
        const { getByTestId } = render(<Provider store={store}><RoomInfo /></Provider>);
        // Act
        waitFor(() => {
            expect(getByTestId('educatorList')).value.toBe('testEducator')
        })
        // Assert
        expect(getByTestId('title')).toBeInTheDocument()
        expect(getByTestId('classList')).toBeInTheDocument()
        expect(getByTestId('educatorList')).toBeInTheDocument()
        expect(getByTestId('educatorsRequired')).toBeInTheDocument()
    })
    it('renders RoomInfo with educators', async () => {
        // Arrange
        render(<Provider store={store}><RoomInfo /></Provider>);
        // Act
        await waitFor(() => {
            expect(screen.getByTestId('educatorList')).toHaveTextContent('testEducator')
        })
        // Assert
        expect(screen.getByText('testEducator')).toBeInTheDocument()
    })
    it('renders RoomInfo with educators required', async () => {
        // Arrange
        render(<Provider store={store}><RoomInfo /></Provider>);
        // Act
        await waitFor(() => {
            expect(screen.getByTestId('educatorsRequired')).toHaveTextContent('1')
        })
        // Assert
        expect(screen.getByTestId('educatorsRequired')).toBeInTheDocument()
    })
});