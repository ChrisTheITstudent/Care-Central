import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import * as fetchData from '../componants/backend/fetchData'
import * as cookies from '../componants/backend/cookies'
import {Rooms, Children} from '../classes'
import ProfileDropdown from '../componants/frontend/ProfileDropdown'
import * as Helpers from '../helpers'

jest.spyOn(cookies, 'removeUserCookies').mockImplementation(() => { })
jest.spyOn(cookies, 'getUserCookies').mockImplementation(() => Helpers.getMockProfileProps().username)
jest.spyOn(cookies, 'setUserCookies').mockImplementation(() => { })

describe('Profile Dropdown model', () => {
    test('Profile dropdown model displays', () => {
        const mockProps = Helpers.getMockProfileProps()

        render(<ProfileDropdown {...mockProps} />)
        
        const profileDropdown = screen.getByTestId('profile-dropdown')
        expect(profileDropdown).toBeInTheDocument()
        expect(profileDropdown).toHaveTextContent(mockProps.username)
    })

    test('Profile dropdown model logs out', async () => {
        const mockProps = Helpers.getMockProfileProps()

        render(<ProfileDropdown {...mockProps} />)
        
        const logoutBtn = screen.getByAltText('Log out')
        fireEvent.click(logoutBtn)
        
        await waitFor(() => {
            expect(cookies.removeUserCookies).toHaveBeenCalled()
            expect(mockProps.setUserName).toHaveBeenCalledWith(null)
            expect(mockProps.setShowLogin).toHaveBeenCalledWith(true)
            expect(mockProps.setProfileDropdown).toHaveBeenCalledWith(false)
        })
    })
})