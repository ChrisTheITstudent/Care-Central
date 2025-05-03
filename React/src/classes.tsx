import { getChildrenByRoomName, getEducatorsByRoomName } from "./componants/backend/fetchData"

export class User {
    private userId: number
    private username: string | null
    private role?: string
    private children: Children[] = []
    private profileImage?: Blob | string
    private profileImageUrl?: string
    private room?: string
    private jobTitle?: string
    private qualification?: string
    private qualificationInstituation?: string
    private emergencyContact?: string
    private emergencyNumber?: number

    constructor(userId: number, username: string | null) {
        this.username = username
        this.userId = userId
    }

    // Setters
    public setRoom(room: string) {
        this.room = room
    }
    public removeRoom() {
        this.room = undefined
    }

    public setRole(role: string) {
        this.role = role
    }
    public removeRole() {
        this.role = undefined
    }

    public setChild(child: Children) {
        this.children?.push(child)
    }
    public removeChild(childToRemove: Children) {
        this.children = this.children.filter(
            child => child.getId() !== childToRemove.getId()
        )
    }
    public removeAllChildren() {
        this.children = []
    }

    private setProfileImageUrl(profileImage: string | Blob) {
        if (this.profileImageUrl) {
            URL.revokeObjectURL(this.profileImageUrl);
        }
        this.profileImageUrl = profileImage instanceof Blob ? URL.createObjectURL(profileImage) : profileImage;
        this.profileImage = profileImage
    }
    public removeProfileImage() {
        if (this.profileImageUrl) {
            URL.revokeObjectURL(this.profileImageUrl);
        }
        this.profileImage = undefined
        this.profileImageUrl = undefined
    }
    public setProfileImage(profileImage: Blob): void;
    public setProfileImage(profileImage: string): void;
    public setProfileImage(profileImage: string | Blob): void {
        if (profileImage instanceof Blob) {
            this.setProfileImageUrl(profileImage)
            this.profileImage = profileImage
        } else if (typeof profileImage === 'string') {
            this.setProfileImageUrl(profileImage)
            this.profileImage = `data:image/png;base64,${profileImage}`
        } else {
            this.setProfileImageUrl(profileImage)
        }
    }
    
    public setJobTitle(title: string) {
        this.jobTitle = title
    }
    public removeJobTitle() {
        this.jobTitle = undefined
    }

    public setQulification(qualification: string) {
        this.qualification = qualification
    }
    public removeQualification() {
        this.qualification = undefined
    }

    public setQualInstitution(institution: string) {
        this.qualificationInstituation = institution
    }
    public removeQualInstitution() {
        this.qualificationInstituation = undefined
    }

    public setEmergencyContact(contact: string): void;
    public setEmergencyContact(contact: string, number: number): void;
    public setEmergencyContact(contact: string, number?: number): void {
        this.emergencyContact = contact
        if (number) {
            this.setEmergencyNumber(number)
        }
    }
    public removeEmergencyContact() {
        this.emergencyContact = undefined
    }

    public setEmergencyNumber(emergencyNumber: number) {
        this.emergencyNumber = emergencyNumber
    }
    public removeEmergencyNumber() {
        this.emergencyNumber = undefined
    }

    // Getters
    public getUserId(): number {
        return this.userId
    }
    public getUsername(): string | null {
        return this.username
    }
    public getRole(): string | undefined {
        return this.role
    }
    public getChildren(): Children[] | undefined {
        return this.children
    }
    public getProfileImage(): Blob | string | undefined {
        return this.profileImage
    }
    public getRoom(): string | undefined {
        return this.room
    }
    public getJobTitle(): string | undefined {
        return this.jobTitle
    }
    public getQualification(): string | undefined {
        return this.qualification
    }
    public getQualificationInstitution(): string | undefined {
        return this.qualificationInstituation
    }
    public getEmergencyContact(): string | undefined {
        return this.emergencyContact
    }
    public getEmergencyNumber(): string | undefined {
        if (this.emergencyNumber ? parseInt(this.emergencyNumber.toString().charAt(0)) === 4 : false)
            return "0" + this.emergencyNumber
    }
}

export class Children {
    private id: number
    private firstName: string
    private lastName: string
    private dateOfBirth?: Date
    private attending: boolean
    private room?: string
    private medicalPlan?: boolean
    private allergies: string[] =[]
    private authorizedPersons: string[] = []
    private emergencyContact1: {
        name: string,
        contact: string
    } = {
            name: "Not Provided",
            contact: "000"
    }
    private emergencyContact2: {
        name: string,
        contact: string
    } = {
        name: "Not Provided",
        contact: "000"
}

    constructor(id: number, firstName: string, lastName: string, isAttending: boolean) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.attending = isAttending
    }

    public removeAllergy(allergyToRemove: string) {
        // Remove allergy
    }
    public removeAuthorizedPerson(firstName: string, lastName: string) {
        // Remove person
    }
    public removeEmergencyContact(nameToRemove: string) {
        if (this.emergencyContact1.name === nameToRemove)
            this.emergencyContact1 = {
                name: "Not Provided",
                contact: "000"
            }
        else if (this.emergencyContact2.name === nameToRemove)
            this.emergencyContact2 = {
                name: "Not Provided",
                contact: "000"
            }
        else
            throw new Error(`${nameToRemove} was not found in emergency contacts`)
    }

    public addEmergencyContact(priority: number, name: string, contactNumber: number) {
        let contactNumberString: string
        if (contactNumber ? parseInt(contactNumber.toString().charAt(0)) === 4 : false)
            contactNumberString = "0" + contactNumber
        else
            contactNumberString = contactNumber.toString()
        if (priority === 1) {
            this.emergencyContact1 = {
                name: name,
                contact: contactNumberString
            }
        }
        else if (priority === 2) {
            this.emergencyContact2 = {
                name: name,
                contact: contactNumberString
            }
        }
        else
            throw new Error("Emergency contact must be either 1st or 2nd emergency contact")
    }
    public addAuthorizedPerson(firstName: string, lastName: string) {
        this.authorizedPersons.push(firstName)
        this.authorizedPersons.push(lastName)
    }
    public addAllergy(allergy: string) {
        this.allergies?.push(allergy)
    }
    public setMedicalPlan(hasMedicalPlan: boolean) {
        this.medicalPlan = hasMedicalPlan
    }
    public setDateOfBirth(day: number, month: number, year: number) {
        let dob: Date = new Date(day + "-" + month + "-" + year)
        this.dateOfBirth = dob
    }
    public setAttending(isAttending: boolean) {
        this.attending = isAttending
    }
    public setRoom(room: string) {
        this.room = room
    }

    public getId() {
        return this.id
    }
    public getFirstName() {
        return this.firstName
    }
    public getLastName() {
        return this.lastName
    }
    public getDateOfBirth() {
        if (this.dateOfBirth)
            return this.dateOfBirth
        else
            throw new Error("Date of birth not set")
    }
    public getAttending() {
        return this.attending
    }
    public getRoom() {
        if (this.room)
            return this.room
        else
            throw new Error("Room not set")
    }
    public hasMedicalPlan() {
        if (this.medicalPlan)
            return this.medicalPlan
        else
            return false
    }
    public getAllergies() {
        if (this.allergies)
            return this.allergies
        else
            return "No allergies"
    }
    public getAuthorizedPersons() {
        if (this.authorizedPersons) {
            interface Person {
                firstName: string,
                lastName: string
            }
            let authorizedList: Person[] = []

            for (let i = 0; i < this.authorizedPersons.length; i+=2) {
                const element = this.authorizedPersons[i];
                const element2 = this.authorizedPersons[i+1]
                
                const newAuthorizedPerson: Person = {
                    firstName: element,
                    lastName: element2
                }

                authorizedList.push(newAuthorizedPerson)
            }

            return Array.isArray(authorizedList)
                ? authorizedList
                : [authorizedList]
        }
        else
            return [{
                firstName: "Parents",
                lastName: "Only"
            }]
    }
    public getEmergencyContact1() {
        if (this.emergencyContact1)
            return this.emergencyContact1
        else
            return {
                name: "n/a",
                contact: 0o0
            }
    }
    public getEmergencyContact2() {
        if (this.emergencyContact2)
            return this.emergencyContact2
        else
            return {
                name: "n/a",
                contact: 0o0
            }
    }
    public getAge(): String {
        const childDOB = this.getDateOfBirth()
        let diff = Date.now() - childDOB.getTime()
        console.log(diff)
        console.log(childDOB.getTime())
        console.log(Date.now())
        console.log(childDOB)
      
        let seconds = Math.floor(diff / 1000)
        let minutes = Math.floor(diff / 60000)
        let hours = Math.floor(minutes / 60)
        let days = Math.floor(minutes / 1440)
        let months = Math.floor(minutes / 43800)
        let years = Math.floor(minutes / 525600)
      
        seconds %= 60
        minutes %= 60
        hours %= 24
        days %= 30
        months %= 12
      
        return `${years} yrs, ${months} mths`
      }
}

export class Rooms {
    private roomName: string
    private childrenAttending: Children[] = []
    private educatorsPresent: User[] = []
    private isCompliant: boolean = false

    constructor(roomName: string) {
        this.roomName = roomName
    }

    public addChild(newChild: Children) {
        this.childrenAttending.push(newChild)
        this.setCompliance()
    }
    public setCompliance() {
        let ratio: number

        if (this.childrenAttending.length === 0) {
            this.isCompliant = true
        }
        
        else if (this.childrenAttending.length > 0 && this.educatorsPresent.length > 0) {
            switch (this.roomName) {
                case "Babies":
                    ratio = 4
                    break;
            
                case "Toddlers":
                    ratio = 5
                    break;
                
                case "Pre Kindergarten":
                    ratio = 8
                    break;
                
                case "Kindergarten":
                    ratio = 11
                    break;
                
                case "Preschool":
                    ratio = 12
                    break;
                
                default:
                    throw new Error(`Room name ${this.roomName} does not match any hard coded room name`)
            }

            const requiredEducators = Math.ceil(this.childrenAttending.length / ratio)
            this.isCompliant = this.educatorsPresent.length >= requiredEducators
        }
    }

    public removeChild(childToRemove: Children) {
        this.childrenAttending = this.childrenAttending.filter(
            child => child.getId() !== childToRemove.getId()
        )
        this.setCompliance()
    }

    public checkCompliance() {
        return this.isCompliant
    }
    public getChildren() {
        return this.childrenAttending
    }
    public getRoomName() {
        if (this.roomName)
            return this.roomName
        else
            throw new Error("Unable to fetch room name from class Rooms")
    }
    public getChildrenCount() {
        if (this.childrenAttending)
            return this.childrenAttending.length
        else
            throw new Error(`Unable to return number of children in room ${this.roomName}`)
    }
    public getEducatorCount() {
        if (this.educatorsPresent)
            return this.educatorsPresent.length
        else
            throw new Error(`Unable to return number of educators present in room ${this.roomName}`)
    }
    public async loadChildren() {
        try {
            const childArray = await getChildrenByRoomName(this.roomName)
            this.childrenAttending = childArray
            this.setCompliance()
        } catch (error) {
            console.error(`Error fetching children for room ${this.roomName}:`, error)
            this.childrenAttending = []
            this.setCompliance()
        }
    }
    public async loadEducators() {
        try {
            const educatorArray = await getEducatorsByRoomName(this.roomName)
            this.educatorsPresent = educatorArray
            this.setCompliance()
        } catch (error) {
            console.error(`Error fetching educators for room ${this.roomName}:`, error)
            this.educatorsPresent = []
            this.setCompliance()
        }
    }
}