import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import ChildDetails from '../componants/ChildDetails';

beforeEach(() => {
    store.dispatch({
        type: "user/SetSelection",
        payload: {
            id: 1,
            name: 'testChild',
            DOB: '01/01/2021',
            parent: 'testParent',
            room: 'testRoom',
            authorizedPersons: 'testAuthorisedPerson',
            allergies: 'testAllergy',
            medications: 'testMedication',
            specialNeeds: 'testSpecialNeed',
            notes: 'testNotes'
        }
    })
    store.dispatch({
        type: "user/SetChildren",
        payload: [{
            id: 1,
            name: 'testChild',
            DOB: '01/01/2021',
            parent: 'testParent',
            room: 'testRoom',
            authorizedPersons: 'testAuthorisedPerson',
            allergies: 'testAllergy',
            medications: 'testMedication',
            specialNeeds: 'testSpecialNeed',
            notes: 'testNotes'
        }]
    })
    render(
        <Provider store={store}>
            <ChildDetails />
        </Provider>
    )
})

describe('ChildDetails', () => {
    it('renders ChildDetails', async () => {
        // Arrange
        // Act
        // Assert
        expect(screen.getByTestId('title')).toBeInTheDocument()
        expect(screen.getByTestId('childName')).toBeInTheDocument()
        expect(screen.getByTestId('childDOB')).toBeInTheDocument()
        expect(screen.getByTestId('childRoom')).toBeInTheDocument()
        expect(screen.getByTestId('childAuthorizedPersons')).toBeInTheDocument()
        expect(screen.getByTestId('childAllergies')).toBeInTheDocument()
        expect(screen.getByTestId('childMedications')).toBeInTheDocument()
        expect(screen.getByTestId('childSpecialNeeds')).toBeInTheDocument()
        expect(screen.getByTestId('childAttending')).toBeInTheDocument()
        expect(screen.getByTestId('childNotes')).toBeInTheDocument()
    })
    it('renders ChildDetails with correct data', async () => {
        // Arrange
        // Act
        // Assert
        expect(screen.getByTestId('childName')).toHaveTextContent('testChild')
        expect(screen.getByTestId('childDOB')).toHaveTextContent('01/01/2021')
        expect(screen.getByTestId('childRoom')).toHaveTextContent('testRoom')
        expect(screen.getByTestId('childAuthorizedPersons')).toHaveTextContent('testAuthorisedPerson')
        expect(screen.getByTestId('childAllergies')).toHaveTextContent('testAllergy')
        expect(screen.getByTestId('childMedications')).toHaveTextContent('testMedication')
        expect(screen.getByTestId('childSpecialNeeds')).toHaveTextContent('testSpecialNeed')
        expect(screen.getByTestId('childNotes')).toHaveTextContent('testNotes')
    })
});