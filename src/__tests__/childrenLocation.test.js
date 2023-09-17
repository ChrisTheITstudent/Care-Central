import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import ChildrenLocation from '../componants/ChildrenLocation';

jest.mock('../backend/backendFunctions', () => {
    return {
        getChildrenByRoom: jest.fn(
            (test) => Promise.resolve(
                [
                    {
                        id: 1,
                        name: "Test Child 1",
                        DOB: "2019-01-01",
                        room: "Test Room 1"
                    },
                    {
                        id: 2,
                        name: "Test Child 2",
                        DOB: "2019-01-01",
                        room: "Test Room 2"
                    },
                    {
                        id: 3,
                        name: "Test Child 3",
                        DOB: "2019-01-01",
                        room: "Test Room 3"
                    }
                ]
            )
        )
    }
})

describe('ChildrenLocation', () => {
    it('should render a title', async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <ChildrenLocation />
                </Provider>
            )
        })
        expect(screen.getByText('Children Attending')).toBeInTheDocument()
    })
    it('should render a list of children', async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <ChildrenLocation />
                </Provider>
            )
        })
        waitFor(() => expect(screen.getAllByTestId('child').length).not.toBe(0))
        expect(screen.getAllByTestId('child')).toBeDefined()
    })
})