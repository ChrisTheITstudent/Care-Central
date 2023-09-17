import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import ClockInOut from '../componants/ClockInOut';

jest.mock('../componants/ClockInOutSwitch', () => () => {
    return <div data-testid='clockInOutSwitch' />
}
)

beforeEach(() => {
    render(
        <Provider store={store}>
            <ClockInOut />
        </Provider>
    )
})

describe('ClockedInOut', () => {
    it('should render a title', () => {
        expect(screen.getByTestId('title')).toBeInTheDocument()
    })
    it('should render a clockInOutSwitch', () => {
        expect(screen.getByTestId('clockInOutSwitch')).toBeInTheDocument()
    })
})