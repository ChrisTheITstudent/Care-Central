import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import Message from '../componants/Message';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
    render(
        <Provider store={store}>
            <Message message={
                {
                    id: 1,
                    subject: 'Test Subject',
                    from: 'Test From',
                    date: 'Test Date',
                    message: 'Test Message'
                }
            } />
        </Provider>
    )
})

describe('Message', () => {
    it('should render a header', () => {
        expect(screen.getByTestId('header')).toBeInTheDocument()
    })
    it('should render a subject', () => {
        expect(screen.getByTestId('subject')).toBeInTheDocument()
    })
    it('should render a from', () => {
        expect(screen.getByTestId('from')).toBeInTheDocument()
    })
    it('should render a date', () => {
        expect(screen.getByTestId('date')).toBeInTheDocument()
    })
    it('should render a body', () => {
        expect(screen.getByTestId('body')).toBeInTheDocument()
    })
    it('should toggle the body when the header is clicked', () => {
        act(() => {
            fireEvent.click(screen.getByTestId('header'))
        })
        expect(screen.getByTestId('body')).toHaveClass('messageBody')
    })
    it('should toggle the body when the header is clicked (to hidden)', () => {
        act(() => {
            fireEvent.click(screen.getByTestId('header'))
        })
        act(() => {
            fireEvent.click(screen.getByTestId('header'))
        })
        expect(screen.getByTestId('body')).toHaveClass('hidden')
    })
})