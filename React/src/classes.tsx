import { error } from "console"
import { getChildrenByRoomName, getEducatorsByRoomName } from "./componants/backend/fetchData"

export class User {
    private userId: number
    private username: string | null
    private role?: string
    private children: Children[] = []
    private profileImage?: Blob | string
    private profileImageUrl?: string
    private room?: string

    constructor(userId: number, username: string | null) {
        this.username = username
        this.userId = userId
    }

    public setRoom(room: string) {
        this.room = room
    }
    public setRole(role: string) {
        this.role = role
    }
    public setChild(child: Children) {
        this.children?.push(child)
    }
    public setBlob(blob: Blob | string) {
        if (this.profileImageUrl) {
            URL.revokeObjectURL(this.profileImageUrl);
        }
        this.profileImage = blob;
        if (blob instanceof Blob) {
            this.profileImageUrl = URL.createObjectURL(blob);
        } else {
            this.profileImageUrl = undefined;
        }
    }

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
}

export class Children {
    private id: number
    private firstName: string
    private lastName: string
    private dateOfBirth?: Date
    private attending: boolean
    private room?: string

    constructor(id: number, firstName: string, lastName: string, isAttending: boolean) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.attending = isAttending
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