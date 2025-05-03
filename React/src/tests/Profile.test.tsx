import { render, screen } from "@testing-library/react";
import { Children, User } from "../classes";
import Profile from "../componants/frontend/Profile";
import { getMockAge } from "../helpers";

const mockEducatorProfileProps = new User(1, "TestEducatorUser")
const mockFamilyProfileProps = new User(1, "TestFamilyUser")

// Set mock objects
mockEducatorProfileProps.setJobTitle("Sample User")
mockEducatorProfileProps.setRole("educator")
mockEducatorProfileProps.setQulification("Sample Data")
mockEducatorProfileProps.setQualInstitution("CareCentral")
mockEducatorProfileProps.setEmergencyContact("Devs")
mockEducatorProfileProps.setEmergencyNumber(412345678)
// Children
const mockChild = new Children(1, "Sally", "Sample", true)
mockChild.addEmergencyContact(1, "Simple", 412345678)
mockChild.addEmergencyContact(2, "Second Simple", 412345678)
mockChild.addAuthorizedPerson("Sally", "Sample")
mockChild.addAllergy("Nuts")
mockChild.setMedicalPlan(true)
mockChild.setDateOfBirth(12, 3, 2020)
mockChild.setAttending(true)
// Family
mockFamilyProfileProps.setRole("Family")
mockFamilyProfileProps.setChild(mockChild)

// Clear mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
})

// Tests
describe("Profile componant", () => {
    test("profile renders educator screen", () => {
        render(<Profile user={mockEducatorProfileProps} />)
        expect(screen.getByTestId('profile-container')).toBeInTheDocument()
        expect(screen.getByTestId('educator-title')).toBeInTheDocument()
        expect(screen.getByTestId('educator-qual')).toBeInTheDocument()
        expect(screen.getByTestId('educator-emergency')).toBeInTheDocument()

        expect(screen.queryByTestId('child-name')).not.toBeInTheDocument()
        expect(screen.queryByTestId('child-age')).not.toBeInTheDocument()
        expect(screen.queryByTestId('child-medical')).not.toBeInTheDocument()
        expect(screen.queryByTestId('child-allergies')).not.toBeInTheDocument()
        expect(screen.queryByTestId('child-authorised')).not.toBeInTheDocument()
        expect(screen.queryByTestId('child-emergency-contact1')).not.toBeInTheDocument()
        expect(screen.queryByTestId('child-emergency-contact2')).not.toBeInTheDocument()
    })
    test("correct educator data renders", () => {
        render(<Profile user={mockEducatorProfileProps} />)
        expect(screen.getByTestId('username')).toHaveTextContent("TestEducatorUser")
        expect(screen.getByTestId('role')).toHaveTextContent("educator")

        expect(screen.getByTestId('educator-title')).toHaveTextContent("Sample User")
        expect(screen.getByTestId('educator-qual')).toHaveTextContent("Sample Data CareCentral")
        expect(screen.getByTestId('educator-emergency-name')).toHaveTextContent("Devs")
        expect(screen.getByTestId('educator-emergency-number')).toHaveTextContent("0412345678")
    })

    test("profile renders family screen", () => {
        render(<Profile user={mockFamilyProfileProps} />)
        expect(screen.getByTestId('profile-container')).toBeInTheDocument()
        expect(screen.getByTestId('child-name')).toBeInTheDocument()
        expect(screen.getByTestId('child-age')).toBeInTheDocument()
        expect(screen.getByTestId('child-medical')).toBeInTheDocument()
        expect(screen.getByTestId('child-allergies')).toBeInTheDocument()
        expect(screen.getByTestId('child-authorised')).toBeInTheDocument()
        expect(screen.getByTestId('child-emergency-contact1')).toBeInTheDocument()
        expect(screen.getByTestId('child-emergency-contact2')).toBeInTheDocument()

        expect(screen.queryByTestId('educator-title')).not.toBeInTheDocument()
        expect(screen.queryByTestId('educator-qual')).not.toBeInTheDocument()
        expect(screen.queryByTestId('educator-emergency')).not.toBeInTheDocument()
    })
    test("correct family data renders", () => {
        render(<Profile user={mockFamilyProfileProps} />)
        expect(screen.getByTestId('username')).toHaveTextContent("TestFamilyUser")
        expect(screen.getByTestId('role')).toHaveTextContent("Family")

        expect(screen.getByTestId('child-name')).toHaveTextContent("Sally")
        expect(screen.getByTestId('child-age')).toHaveTextContent(getMockAge())
        expect(screen.getByTestId('child-medical')).toHaveTextContent("Yes")
        expect(screen.getByTestId('child-authorised')).toHaveTextContent("Sally Sample")
        expect(screen.getByTestId('child-emergency-contact1')).toHaveTextContent("Name: Simple Contact: 0412345678")
        expect(screen.getByTestId('child-emergency-contact2')).toHaveTextContent("Name: Second Simple Contact: 0412345678")
    })
})