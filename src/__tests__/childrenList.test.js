import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import ChildrenList from '../componants/ChildrenList';

jest.mock('../backend/backendFunctions', () => {
    return {
        getChildren: jest.fn(
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
        ),
        getAllChildren: jest.fn(
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
        ),
        calculateAge: jest.fn(
            (test) => "2 years"
        )
    }
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <ChildrenList />
        </Provider>
    )
    
    act(() => {
        store.dispatch(
            {
                type: "user/SetUser",
                payload: {
                    user: {
                        id: 1,
                        user: "Test User",
                        role: "family"
                    }
                }
            }
        )
    })
})

describe('ChildrenList', () => {
    it('renders ChildrenList', async () => {
        // Arrange
        // Act
        await waitFor(() => {
            expect(screen.getByTestId('childrenList')).toBeInTheDocument()
        })
        // Assert
        expect(screen.getByTestId('title')).toBeInTheDocument()
        expect(screen.getByTestId('children')).toBeInTheDocument()
    })
    it('renders children', async () => {
        // Arrange
        // Act
        await waitFor(() => {
            expect(screen.getByTestId('childrenList')).toBeInTheDocument()
        })
        // Assert
        expect(screen.getByTestId('children')).toBeInTheDocument()
        expect(screen.getByTestId('children').children.length).toBe(3)
    })
})