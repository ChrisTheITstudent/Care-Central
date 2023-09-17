import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../state-management/store'
import WelcomeScreen from '../pages/WelcomeScreen';

describe('WelcomeScreen', () => {

    test('renders WelcomeScreen component', async () => {
        // Arrange
        render(
            <Provider store={store}>
                <WelcomeScreen />
            </Provider>
        );
        // Act
        const welcomeScreen = screen.getByTestId('welcomeScreen');
        // Assert
        expect(welcomeScreen).toBeInTheDocument();
    });

    test('renders WelcomeScreen title', async () => {
        // Arrange
        render(
            <Provider store={store}>
                <WelcomeScreen />
            </Provider>
        );
        // Act
        await screen.findByTestId('welcomeScreen');
        // Assert
        expect(screen.getByTestId("welcomeScreen")).toBeInTheDocument();
    });

    test('renders login form', async () => {
        // Arrange
        render(
            <Provider store={store}>
                <WelcomeScreen />
            </Provider>
        );
        // Act
        await screen.findByTestId('loginForm');
        // Assert
        expect(screen.getByTestId("loginForm")).toBeInTheDocument();
    });

    test('renders username input field', async () => {
        // Arrange
        render(
            <Provider store={store}>
                <WelcomeScreen />
            </Provider>
        );
        // Act
        await screen.findByTestId('username');
        // Assert
        expect(screen.getByTestId("username")).toBeInTheDocument();
    });

    test('renders password input field', async () => {
        // Arrange
        render(
            <Provider store={store}>
                <WelcomeScreen />
            </Provider>
        );
        // Act
        await screen.findByTestId('password');
        // Assert
        expect(screen.getByTestId("password")).toBeInTheDocument();
    });

    test('renders submit button', async () => {
        // Arrange
        render(
            <Provider store={store}>
                <WelcomeScreen />
            </Provider>
        );
        // Act
        await screen.findByTestId('submit');
        // Assert
        expect(screen.getByTestId("submit")).toBeInTheDocument();
    });
});