import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import Inbox from '../componants/Inbox';

jest.mock('../componants/Message', () => () => {
    return <div data-testid='message' />
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <Inbox />
        </Provider>
    )
})

describe('Inbox', () => {
    it('should render a title', () => {
        expect(screen.getByTestId('title')).toBeInTheDocument()
    })
    it('should render a onlineIndicator', () => {
        expect(screen.getByTestId('onlineIndicator')).toBeInTheDocument()
    })
    it('should render a inbox', () => {
        expect(screen.getByTestId('inbox')).toBeInTheDocument()
    })
    it('should render a message', () => {
        expect(screen.getAllByTestId('message').length).not.toBe(0)
    })
})