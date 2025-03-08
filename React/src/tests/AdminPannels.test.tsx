import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AdminLSidebar from "../componants/frontend/AdminLSidebar";

// Mock componants
jest.mock("../componants/frontend/RegistrationForm", () => () => {
    return <div data-testid="RegistrationForm">RegistrationForm</div>
})
jest.mock("../componants/frontend/OffBoarding", () => () => {
    return <div data-testid="OffBoarding">OffBoarding</div>
  })

describe('Left admin sidebar', () => {
    test('Menu renders', () => {
        render(<AdminLSidebar />)
        const menuElements = [screen.getByText(/Onboarding/i), screen.getByText(/Add Data/i), screen.getByText(/Offboarding/i)]
        expect(menuElements).toHaveLength(3)
    })

    describe('Componants show when needed', () => {
        test('User oboarding renders', () => {
            render(<AdminLSidebar />)
            const onboardUsersOption = screen.getByTestId("onboardUsers")
            expect(onboardUsersOption).toBeInTheDocument()

            fireEvent.click(onboardUsersOption)
            expect(screen.getByTestId("upload-form")).toBeInTheDocument()
        })
        test('Add single user form renders', () => {
            render(<AdminLSidebar />)
            const singleDataOption = screen.getByTestId("addSingleUserData")
            expect(singleDataOption).toBeInTheDocument()

            fireEvent.click(singleDataOption)
            expect(screen.getByTestId("RegistrationForm")).toBeInTheDocument()
        })
        test('Remove single user form renders', () => {
            render(<AdminLSidebar />)
            const singleDataOption = screen.getByTestId("removeUser")
            expect(singleDataOption).toBeInTheDocument()

            fireEvent.click(singleDataOption)
            expect(screen.getByTestId("OffBoarding")).toBeInTheDocument()
        })
        test('Children oboarding renders', () => {
            render(<AdminLSidebar />)
            const onboardChildrenOption = screen.getByTestId("onboardChildren")
            expect(onboardChildrenOption).toBeInTheDocument()

            fireEvent.click(onboardChildrenOption)
            expect(screen.getByTestId("upload-form")).toBeInTheDocument()
        })
        test('Add single Child form renders', () => {
            render(<AdminLSidebar />)
            const singleDataOption = screen.getByTestId("addSingleChildData")
            expect(singleDataOption).toBeInTheDocument()

            fireEvent.click(singleDataOption)
            expect(screen.getByTestId("RegistrationForm")).toBeInTheDocument()
        })
        test('Remove single Child form renders', () => {
            render(<AdminLSidebar />)
            const singleDataOption = screen.getByTestId("removeChild")
            expect(singleDataOption).toBeInTheDocument()

            fireEvent.click(singleDataOption)
            expect(screen.getByTestId("OffBoarding")).toBeInTheDocument()
        })
    })
})