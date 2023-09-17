import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import Loading from '../componants/Loading';

beforeEach(() => {
    render(
        <Provider store={store}>
            <Loading />
        </Provider>
    )
})

describe('Loading', () => {
    it('should render a spinner', () => {
        expect(screen.getByTestId('spinner')).toBeInTheDocument()
    })
})