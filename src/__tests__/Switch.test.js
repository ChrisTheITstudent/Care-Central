import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import Switch from '../componants/Switch';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
    render(
        <Provider store={store}>
            <Switch />
        </Provider>
    )
    store.dispatch({
        type: "switch/switchToggle",
        payload: false
    })
})

describe('Switch', () => {
    it('should render', () => {
        expect(screen.getByTestId('switch')).toBeInTheDocument()
    })
    it('should render the switch off', () => {
        expect(screen.getByTestId('switch')).toHaveClass('off')
    })
    it('should render the switch on', () => {
        act(() => {
            store.dispatch({
                type: "switch/switchToggle",
                payload: true
            })
        })
        expect(screen.getByTestId('switch')).toHaveClass('on')
    })
    it('should dispatch the correct action when clicked', () => {
        fireEvent.click(screen.getByTestId('switch'))
        expect(store.getState().switch.on).toBe(true)
    })
})