import { User, Children } from "../../classes"

// let db = new sql.Database("d:\CareCentral.db", (err) => {
//         if (err) {
//             return console.error(err.message)
//         }
//         console.log('Connected to Care Central')
//     })

interface PostResolved {
    "Status": string,
    "Message": string
}

const url: string = "http://127.0.0.1:8000/"

export async function createUser(username: string | null): Promise<User> {
    return new Promise((resolve, reject) => {
        fetch(url + "users/" + username)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                let newUser = new User(json.id, json.username)
                if (json.role) {
                    newUser.setRole(json.role)
                }
                if (json.profileImage) {
                    newUser.setBlob(json.profileImage)
                }
                if (json.room) {
                    newUser.setRoom(json.room)
                }
                if (json.id) {
                    fetch(url + "children/family/" + json.id)
                        .then(response => response.json())
                        .then(json2 => {
                            Object.keys(json2).forEach((key: string) => {
                                const childData = json2[key];
                                const child = new Children(childData.id, childData.firstName, "", childData.attending);
                                newUser.setChild(child)
                            })
                            resolve(newUser)
                        })
                        .catch(err => {
                            console.error(err.message)
                            reject(err)
                        })
                } else {
                    resolve(newUser)
                }
            })
            .catch(err => {
                console.error(err.message)
                reject(err)
            })
    })
}

export async function verifyPassword(username: string, password: string): Promise<Boolean | Error> {
    return new Promise((resolve, reject) => {
        fetch(url + "users/login/" + username + "/" + password)
            .then(response => response.json())
            .then(json => {
                if (json.status === "OK") {
                    resolve(true)
                } else if (json.status === "FAILED") {
                    reject(false)
                }
            })
            .catch(err => {
                console.error(err.message)
                reject(err)
            })
    })
}

export async function toggleChildIsAttending(childId: number): Promise<PostResolved> {
    return new Promise((resolve, reject) => {
        fetch(url + "children/" + childId + "/attendance", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(json => {
                resolve(json.message)
            })
            .catch(err => {
                console.error(err.message)
                reject(new Error(err.message))
            })
    })
}

export async function toggleUserRoom(userId: number, room: string | null): Promise<PostResolved> {
    return new Promise((resolve, reject) => {
        fetch(url + "users/" + userId + "/room/" + room, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(json => {
                resolve(json.message)
            })
            .catch(err => {
                console.error(err.message)
                reject(new Error(err.message))
            })
    })
}

export async function createChildrenList(username: string): Promise<Children[]> {
    return new Promise((resolve, reject) => {
        
        let userId: Number
        let childArray: Children[] = []
        let child: Children
        
        fetch(url + "users/" + username)
            .then(response => response.json())
            .then(json => {
                userId = json.id

                return fetch(url + "children/family/" + userId)
            })
            .then(response => response.json())
            .then(json => {
                Object.keys(json).forEach((key: string) => {
                    if (json[key]["4"] === 1) {
                        child = new Children(json[key][0], json[key]["1"], json[key]["2"], true)
                    } else {
                        child = new Children(json[key][0], json[key]["1"], json[key]["2"], false)
                    }

                    let splitStringArray: string[]
                    splitStringArray = json[key]["3"].split("/")
                    let childDay: number = +splitStringArray[2]
                    let childMonth: number = +splitStringArray[1]
                    let childYear: number = +splitStringArray[0]
                    child.setDateOfBirth(childDay, childMonth, childYear)

                    childArray.push(child)
                })
                resolve(childArray)
            })
            .catch(err => {
                console.error("Unable to fetch children for user: " + err.message)
                reject(new Error(err.message))
        })
    })
}

export async function getChildrenByRoomName(roomName: String): Promise<Children[]> {
    return new Promise((resolve, reject) => {
    let childArray: Children[] = []
    let child: Children

    fetch(url + "rooms/" + roomName)
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                reject(new Error(json.error))
                return
            }
            Object.keys(json).forEach((key: string) => {
            if (json[key]["4"] === 1) {
                child = new Children(json[key][0], json[key]["1"], json[key]["2"], true)
            } else {
                child = new Children(json[key][0], json[key]["1"], json[key]["2"], false)
            }

            let splitStringArray: string[]
            splitStringArray = json[key]["3"].split("/")
            let childDay: number = +splitStringArray[2]
            let childMonth: number = +splitStringArray[1]
            let childYear: number = +splitStringArray[0]
            child.setDateOfBirth(childDay, childMonth, childYear)

            childArray.push(child)
        })
        resolve(childArray)
    })
    .catch(err => {
        console.error("Unable to fetch children for room: " + err.message)
        reject(new Error(err.message))
        })
    })
}

export async function getEducatorsByRoomName(roomName: String): Promise<User[]> {
    return new Promise((resolve, reject) => {
    let educatorArray: User[] = []
    let educator: User

    fetch(url + "educators/rooms/" + roomName)
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                reject(new Error(json.error))
            }
            Object.keys(json).forEach((key: string) => {
                educator = new User(json[key][0], json[key]["1"])
                educatorArray.push(educator)
        })
        resolve(educatorArray)
    })
    .catch(err => {
        console.error("Unable to fetch educators for room: " + err.message)
        reject(new Error(err.message))
        })
    })
}