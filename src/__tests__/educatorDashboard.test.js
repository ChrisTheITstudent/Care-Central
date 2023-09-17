import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import EducatorDashboard from '../pages/educator/EducatorDashboard';

jest.mock('../componants/EducatorInfo', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid='educatorInfo' />
    }
}))
jest.mock('../componants/ClockInOut', () => () => {
        return <div data-testid='clockInOut' />
    }
)
jest.mock('../componants/EducatorRoom', () => () => {
        return <div data-testid='educatorRoom' />
    }
)
jest.mock('../componants/ServiceOverall', () => () => {
        return <div data-testid='serviceOverall' />
    }
)
jest.mock('../componants/ChildrenLocation', () => () => {
        return <div data-testid='childrenLocation' />
    }
)
jest.mock('../componants/ChildrenList', () => () => {
        return <div data-testid='childrenList' />
    }
)

describe('EducatorDashboard', () => {
    test('renders EducatorDashboard', async () => {
        // Arrange
        const {getByTestId} = render(<Provider store={store}><EducatorDashboard /></Provider>);
        // Act
        // Assert
        expect(getByTestId('educatorDashboardTitle')).toBeInTheDocument()
        expect(getByTestId('educatorInfo')).toBeInTheDocument()
        expect(getByTestId('clockInOut')).toBeInTheDocument()
        expect(getByTestId('educatorRoom')).toBeInTheDocument()
        expect(getByTestId('serviceOverall')).toBeInTheDocument()
        expect(getByTestId('childrenLocation')).toBeInTheDocument()
        expect(getByTestId('childrenList')).toBeInTheDocument()
    })
})