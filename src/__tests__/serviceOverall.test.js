import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import ServiceOverall from '../componants/ServiceOverall';
import * as backendFunctions from '../backend/backendFunctions'

backendFunctions.getAllUsers = jest.fn(() => {
    return [
        {
            role: "educator",
            isClockedIn: true
        },
        {
            role: "educator",
            isClockedIn: true
        },
        {
            role: "educator",
            isClockedIn: false
        }
    ]
})

backendFunctions.getAllChildren = jest.fn(() => {
    return [
        {
            isAttending: true
        },
        {
            isAttending: true
        },
        {
            isAttending: false
        }
    ]
})

backendFunctions.calculateEducatorsRequired = jest.fn(() => {
    return 2
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <ServiceOverall />
        </Provider>
    )
})

describe('ServiceOverall', () => {
    it('should render the children title', () => {
        expect(screen.getByTestId('childrenTitle')).toBeInTheDocument()
    })
    it('should render the children present', () => {
        expect(screen.getByTestId('childrenPresent')).toBeInTheDocument()
    })
    it('should render the educators title', () => {
        expect(screen.getByTestId('educatorTitle')).toBeInTheDocument()
    })
    it('should render the educators present', () => {
        expect(screen.getByTestId('clockedIn')).toBeInTheDocument()
    })
    it('should render the required title', () => {
        expect(screen.getByTestId('requiredTitle')).toBeInTheDocument()
    })
    it('should render the educators required', () => {
        expect(screen.getByTestId('educatorsRequired')).toBeInTheDocument()
    })
})
