import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import * as fetchData from './componants/backend/fetchData'
import {Rooms, Children} from './classes'
import ProfileDropdown from './componants/frontend/ProfileDropdown'
import * as Helpers from './helpers.tsx'

describe('Profile Dropdown model', () => {
    test('Profile dropdown model displays', () => {
        const mockProps = Helpers.getMockProfileProps()

        render(<ProfileDropdown {...mockProps} />)
        
        const profileDropdown = screen.getByTestId('profile-dropdown')
        expect(profileDropdown).toBeInTheDocument()
        expect(profileDropdown).toHaveTextContent(mockProps.username)
    })
})