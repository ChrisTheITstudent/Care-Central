import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import ClockInOutSwitch from '../componants/ClockInOutSwitch';

beforeEach(() => {
    render(
        <Provider store={store}>
            <ClockInOutSwitch />
        </Provider>
    )
})

describe('ClockInOutSwitch', () => {
    it('should render a switch', () => {
        expect(screen.getByTestId('switch')).toBeInTheDocument()
    })
})