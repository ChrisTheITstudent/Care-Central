import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import FamilyDashboard from '../pages/family/FamilyDashboard';

jest.mock('../componants/ChildrenList', () => {
    return function DummyChildrenList() {
        return <div data-testid='childrenList' />
    }
}
)
jest.mock('../componants/ChildDetails', () => {
    return function DummyChildDetails() {
        return <div data-testid='childDetails' />
    }
}
)
jest.mock('../componants/Inbox', () => {
    return function DummyInbox() {
        return <div data-testid='inbox' />
    }
}
)

describe('FamilyDashboard', () => {
    test('renders FamilyDashboard', () => {
        render(<Provider store={store}><FamilyDashboard /></Provider>);
        expect(screen.getByTestId('dashboardTitle')).toBeInTheDocument();
        expect(screen.getByTestId('childrenList')).toBeInTheDocument();
        expect(screen.getByTestId('childDetails')).toBeInTheDocument();
        expect(screen.getByTestId('inbox')).toBeInTheDocument();
    })
})