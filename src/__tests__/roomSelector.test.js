import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import RoomSelector from '../componants/RoomSelector';

beforeEach(() => {
    render(
        <Provider store={store}>
            <RoomSelector />
        </Provider>
    )
    store.dispatch({
        type: "roomSelector/setSelectedRoom",
        payload: 'babies'
    })
    store.dispatch({
        type: "roomSelector/setCapacity",
        payload: 8
    })
    store.dispatch({
        type: "roomSelector/setEducatorCount",
        payload: 1
    })
    store.dispatch({
        type: "roomSelector/setEducatorList",
        payload: ['testEducator']
    })
    store.dispatch({
        type: "roomSelector/setChildrenCount",
        payload: 1
    })
    store.dispatch({
        type: "roomSelector/setChildrenList",
        payload: ['testChild']
    })
})

describe('RoomSelector', () => {
    it('should render', () => {
        expect(screen.getByTestId('selectionContainer')).toBeInTheDocument()
    })

    it('should display the selected room', () => {
        expect(screen.getByTestId('selectionContainer')).toHaveTextContent('babies')
    })

    it('should display the room selector when clicked', () => {
        fireEvent.click(screen.getByTestId('selectionContainer'))
        expect(screen.getByTestId('roomSelector')).toBeInTheDocument()
    })
})