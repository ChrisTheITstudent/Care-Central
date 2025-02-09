import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from './componants/frontend/App';
import { User, Children } from './classes';
import * as fetchData from './componants/backend/fetchData';

// Set up mocks

const mockFamilyUser = new User(1, "TestUser")
const mockEducatorUser = new User(2, "TestEducator")
const mockChildrenList = [new Children(1, "TestChild", "TestChild", true), new Children(2, "TestChild2", "TestChild2", true), new Children(3, "TestChild3", "TestChild3", true)]
const mockEmptyUser = new User(0, "")

mockFamilyUser.setRole("Family")
mockEducatorUser.setRole("educator")
mockFamilyUser.setChild(mockChildrenList[0])
mockFamilyUser.setChild(mockChildrenList[1])
mockFamilyUser.setChild(mockChildrenList[2])

// Clear mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
})

// Mock componants
jest.mock("./componants/frontend/UserInfo", () => () => {
  return <div data-testid="user-info">User Info</div>
})
jest.mock("./componants/frontend/ProfileDropdown", () => () => {
  return <div data-testid="profile-dropdown">Profile Dropdown</div>
})
jest.mock("./componants/frontend/SwitchList", () => () => {
  return <div data-testid="switch-list">Switch List</div>
})
jest.mock("./componants/frontend/RoomToggles", () => () => {
  return <div data-testid="room-toggles">Room Toggles</div>
})
jest.mock("./componants/frontend/EducatorRoomData", () => () => {
  return <div data-testid="educator-data">Educator Data</div>
})

// Tests
describe('Navigation', () => {
  test('Home option renders', () => {
    render(<App />);
    const linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
  })

  test('Dashboard option renders', () => {
    render(<App />);
    const linkElement = screen.getByText(/Dashboard/i);
    expect(linkElement).toBeInTheDocument();
  })

  test('Renders logo', () => {
    render(<App />);
    const logoElements = screen.getAllByAltText('logo');
    expect(logoElements[0]).toBeInTheDocument();
  })

  test('Navigation element renders', () => {
    render(<App />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  })

  test('User info element renders', () => {
    render(<App />);
    expect(screen.getByTestId('user-info')).toBeInTheDocument();
  })

  test('Profile dropdown does not render by default', () => {
    render(<App />);
    expect(screen.queryByTestId('profile-dropdown')).toBeNull();
  })

  test('Profile dropdown renders when clicked', () => {
    render(<App showLoginProp={false} userProp={mockEducatorUser} />);
    fireEvent.click(screen.getByTestId('profile-dropdown-click'));
    expect(screen.getByTestId('profile-dropdown')).toBeInTheDocument();
  })

  test('Profile dropdown closes when clicked again', () => {
    render(<App showLoginProp={false} userProp={mockEducatorUser} />);
    fireEvent.click(screen.getByTestId('profile-dropdown-click'));
    fireEvent.click(screen.getByTestId('profile-dropdown-click'));
    expect(screen.queryByTestId('profile-dropdown')).toBeNull();
  })
})

describe('Mid container rendering', () => {
  test('Renders SwitchList when user is a family', async () => {
    jest.spyOn(fetchData, 'createUser').mockResolvedValueOnce(mockFamilyUser)
    render(<App showLoginProp={false} userProp={mockEducatorUser} />);
    expect(await screen.findByTestId('switch-list')).toBeInTheDocument()
  })

  test('Renders RoomToggles when user is an educator', async () => {
    jest.spyOn(fetchData, 'createUser').mockResolvedValue(mockEducatorUser)
    render(<App showLoginProp={false} userProp={mockEducatorUser} />);
    expect(await screen.findByTestId('room-toggles')).toBeInTheDocument()
  })

  test('Renders EducatorData when user is an educator', async () => {
    jest.spyOn(fetchData, 'createUser').mockResolvedValueOnce(mockEducatorUser)
    render(<App showLoginProp={false} userProp={mockEducatorUser} />)
    expect(await screen.findByTestId('educator-data')).toBeInTheDocument()
  })
})

describe('Errors work as intended', () => {
  test('Error message is displayed when user creation fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(fetchData, 'createUser').mockRejectedValueOnce(new Error("Failed to create user"))
    render(<App />);
    waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith("Error creating user:", expect.any(Error))
    })
    consoleErrorSpy.mockRestore()
  })

  test('Empty user data is handled', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(fetchData, 'createUser').mockResolvedValueOnce(mockEmptyUser)
    render(<App />);
    waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith("User data not defined in App.tsx")
    })
  })

  test('User data is handled', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { })
    const { createUser } = jest.requireActual('./componants/backend/fetchData')
    createUser.mockResolvedValueOnce(null)
    render(<App />);
    waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith("User data defined in App.tsx")
    })
  })
})