import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import EducatorInfo from '../componants/EducatorInfo';

beforeEach(() => {
    render(
        <Provider store={store}>
            <EducatorInfo />
        </Provider>
    )
})

describe('EducatorInfo', () => {
    it('should render a title', () => {
        expect(screen.getByTestId('title')).toBeInTheDocument()
    })
    it('should render a name', () => {
        expect(screen.getByTestId('name')).toBeInTheDocument()
    })
    it('should render a room', () => {
        expect(screen.getByTestId('room')).toBeInTheDocument()
    })
    it('should render a clockedIn', () => {
        expect(screen.getByTestId('clockedIn')).toBeInTheDocument()
    })
})