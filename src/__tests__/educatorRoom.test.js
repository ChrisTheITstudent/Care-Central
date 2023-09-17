import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import EducatorRoom from '../componants/EducatorRoom';

jest.mock('../componants/RoomSelector', () => () => {
    return <div data-testid='roomSelector' />
})

jest.mock('../componants/RoomInfo', () => () => {
    return <div data-testid='roomInfo' />
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <EducatorRoom />
        </Provider>
    )
})

describe('EducatorRoom', () => {
    it('should render a roomSelector', () => {
        expect(screen.getByTestId('roomSelector')).toBeInTheDocument()
    })
    it('should render a roomInfo', () => {
        expect(screen.getByTestId('roomInfo')).toBeInTheDocument()
    })
})