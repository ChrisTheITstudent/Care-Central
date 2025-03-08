import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import App from '../componants/frontend/App';
import { User, Children } from '../classes';
import * as fetchData from '../componants/backend/fetchData';
import * as cookies from '../componants/backend/cookies'
import {setUserCookies, getUserCookies, removeUserCookies } from '../componants/backend/cookies'

// Set up mocks

const mockFamilyUser = new User(1, "TestUser")
const mockEducatorUser = new User(2, "TestEducator")
const mockAdminUser = new User(3, "TestAdmin")
const mockChildrenList = [new Children(1, "TestChild", "TestChild", true), new Children(2, "TestChild2", "TestChild2", true), new Children(3, "TestChild3", "TestChild3", true)]
const mockEmptyUser = new User(0, "")

mockFamilyUser.setRole("Family")
mockEducatorUser.setRole("educator")
mockAdminUser.setRole("admin")
mockFamilyUser.setChild(mockChildrenList[0])
mockFamilyUser.setChild(mockChildrenList[1])
mockFamilyUser.setChild(mockChildrenList[2])

// Clear mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
})

// Mock componants
jest.mock("../componants/frontend/UserInfo", () => () => {
  return <div data-testid="user-info">User Info</div>
})
jest.mock("../componants/frontend/ProfileDropdown", () => () => {
  return <div data-testid="profile-dropdown">Profile Dropdown</div>
})
jest.mock("../componants/frontend/SwitchList", () => () => {
  return <div data-testid="switch-list">Switch List</div>
})
jest.mock("../componants/frontend/RoomToggles", () => () => {
  return <div data-testid="room-toggles">Room Toggles</div>
})
jest.mock("../componants/frontend/EducatorRoomData", () => () => {
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

  test('Profile dropdown renders when clicked', async () => {
    setUserCookies(mockFamilyUser)
    render(<App showLoginProp={false} />);
    expect(screen.getByTestId('profile-dropdown-click')).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('profile-dropdown-click'));
      expect(screen.getByTestId('profile-dropdown')).toBeInTheDocument();
    })
    removeUserCookies()
  })

  test('Profile dropdown closes when clicked again', () => {
    render(<App showLoginProp={false} />);
    fireEvent.click(screen.getByTestId('profile-dropdown-click'));
    fireEvent.click(screen.getByTestId('profile-dropdown-click'));
    expect(screen.queryByTestId('profile-dropdown')).toBeNull();
  })
})

describe('Login feature', () => {
  test('Shows login screen when state is to showLogin', () => {
    render(<App showLoginProp={true}/>);
    expect(screen.getByTestId('username')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
  })
})

describe('Cookies', () => {
  test('Cookies are set', () => {
    setUserCookies(mockFamilyUser)
    expect(getUserCookies()).toBe("TestUser")
  })

  test('Cookies are removed', () => {
    setUserCookies(mockFamilyUser)
    removeUserCookies()
    expect(getUserCookies()).toBeNull()
  })
})

describe('Mid container rendering', () => {
  test('Renders SwitchList when user is a family', async () => {
    jest.spyOn(fetchData, 'createUser').mockResolvedValueOnce(mockFamilyUser)
    render(<App showLoginProp={false} userProp={mockFamilyUser} />);
    expect(await screen.findByTestId('switch-list')).toBeInTheDocument()
  })

  test('Renders RoomToggles when user is an educator', async () => {
    jest.spyOn(fetchData, 'createUser').mockResolvedValue(mockEducatorUser)
    render(<App showLoginProp={false} userProp={mockEducatorUser} />);
    expect(await screen.findByTestId('room-toggles')).toBeInTheDocument()
  })

  test('Renders EducatorData when user is an educator', async () => {
    jest.spyOn(fetchData, 'createUser').mockResolvedValue(mockEducatorUser)
    render(<App showLoginProp={false} userProp={mockEducatorUser} />)
    expect(await screen.findByTestId('educator-data')).toBeInTheDocument()
  })

  test('Renders Admin left sidebar when user is an admin', async () => {
    jest.spyOn(fetchData, 'createUser').mockResolvedValue(mockAdminUser)
    render(<App showLoginProp={false} userProp={mockAdminUser} />)
    expect(await screen.findByTestId('adminLeftBar')).toBeInTheDocument()
  })

  test('Renders Admin mid pannel when user is an admin', async () => {
    jest.spyOn(fetchData, 'createUser').mockResolvedValue(mockAdminUser)
    render(<App showLoginProp={false} userProp={mockAdminUser} />)
    expect(await screen.findByTestId('adminMid')).toBeInTheDocument()
  })

  test('Renders Admin right sidebar when user is an admin', async () => {
    jest.spyOn(fetchData, 'createUser').mockResolvedValue(mockAdminUser)
    render(<App showLoginProp={false} userProp={mockAdminUser} />)
    expect(await screen.findByTestId('adminRightBar')).toBeInTheDocument()
  })
})

describe('Errors work as intended', () => {
  test('Error message is displayed when user creation fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { })
    jest.spyOn(fetchData, 'createUser').mockRejectedValueOnce(new Error("Failed to create user"))
    render(<App />);
    waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith("Error creating user:", expect.any(Error))
    })
    consoleErrorSpy.mockRestore()
  })

  test('Empty user data is handled', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { })
    jest.spyOn(fetchData, 'createUser').mockResolvedValueOnce(mockEmptyUser)
    render(<App />);
    waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith("User data not defined in App.tsx")
    })
  })
})

  describe('Frontend data handling', () => {
  test('User data is handled', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { })
    const { createUser } = jest.requireActual('../componants/backend/fetchData')
    createUser.mockResolvedValueOnce(null)
    render(<App />);
    waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith("User data defined in App.tsx")
    })
  })
})