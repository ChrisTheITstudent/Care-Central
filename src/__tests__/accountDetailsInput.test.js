import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import AccountDetailsInput from '../componants/AccountDetailsInput';
import * as backend from '../backend/backendFunctions';

backend.getChildren = jest.fn(() => {
    return [
        {
            id: 1,
            name: 'testChild',
            DOB: '01/01/2021',
            parent: 'testParent',
            room: 'testRoom',
            authorisedPersons: 'testAuthorisedPerson',
            allergies: 'testAllergy',
            medications: 'testMedication',
            specialNeeds: 'testSpecialNeed',
            notes: 'testNotes'
        }
    ]
})
backend.updateChild = jest.fn((data) => {
    return data
})
backend.createChild = jest.fn((data) => {
    return data
})

beforeEach(() => {
    store.dispatch({
        type: "user/UpdateRequest",
        payload: {
            username: 'testParent',
            password: 'testPassword'
        }
    })
    store.dispatch({
        type: "user/UpdateSuccess",
        payload: {
            user: {
                username: 'testParent',
                password: 'testPassword'
            }
        }
    })
})

describe('AccountDetailsInput', () => {
    it('renders AccountDetailsInput', async () => {
        // Arrange
        const { getByTestId } = render(<Provider store={store}><AccountDetailsInput /></Provider>);
        // Act
        // Assert
        expect(getByTestId('accountDetailsInputTitle')).toBeInTheDocument()
        expect(getByTestId('numberOfChildren')).toBeInTheDocument()
    })
    it('renders AccountDetailsInput with children', async () => {
        // Arrange
        render(<Provider store={store}><AccountDetailsInput /></Provider>);
        // Act
        fireEvent.change(screen.getByTestId('numberOfChildren'), { target: { value: 1 } })
        // Assert
        expect(screen.getByTestId('childData')).toBeInTheDocument()
        expect(screen.getByTestId('childName')).toBeInTheDocument()
    })
});