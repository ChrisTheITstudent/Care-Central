import axios from 'axios';

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

const updateHeaders = {
    'Content-Type': 'application/json'
}

// User account functions
export async function getAllUsers() {
    return axios.get('http://localhost:3001/users')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

export async function getUser(username) {
    let response = await axios.get('http://localhost:3001/users')
    let users = response.data;
    let user = null;
    users.forEach((u) => {
        if (u.username === username) {
            user = u;
        }
    });
    
    try {
        if (user === null) {
            throw new Error("No users found");
        }
        else {
            if (user.password === null) {
                throw new Error("Password is null");
            }
            else if (user.password === undefined) {
                throw new Error("Password is undefined");
            }
            else {
                return user;
            }
        }
    }
    catch (error) {
        alert("Get user error: " + error);
        return null;
    }
}

export function createUser(username, password) {
    axios.post('http://localhost:3001/users', new User(username, password))
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("Get request error: " + error);
        });
}

// Get user by room
export async function getUserByRoom(room) {
    return axios.get(`http://localhost:3001/users?room=${room}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            alert("Get request error: " + error);
        });
}

// Update user
export function updateUser(user) {
    axios.put(`http://localhost:3001/users/${user.id}`, {
        id: user.id,
        username: user.user,
        password: user.password,
        role: user.role,
        children: user.children,
        room: user.room,
        clockedIn: user.clockedIn
    }, { headers: updateHeaders})
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.log("Update request error: " + error);
    });
}
// Clock user in
export async function clockUserInOut(user) {
    axios.put(`http://localhost:3001/users/${user.id}`, {
        id: user.id,
        username: user.user,
        password: user.password,
        role: user.role,
        children: user.children,
        room: user.room,
        clockedIn: user.clockedIn
    }, { headers: updateHeaders })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("Update request error: " + error);
        });
}

// Children account functions
export async function getChildren(username) {
    return axios.get('http://localhost:3001/children')
        .then((response) => {
            let children = []
            let data = response.data;
            
            for (let i = data.length - 1; i >= 0; i--) {

                for (let ii = data[i].parent.length - 1; ii >= 0; ii--) {

                    if (data[i].parent[ii].username === username) {
                        
                        children.push(data[i])
                    }
                }
            }
            return children;
        })
        .catch((error) => {
            alert("Get request error: " + error);
        });
        
}
// Get all children
export async function getAllChildren() {
    return axios.get('http://localhost:3001/children')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            alert("Get request error: " + error);
        });
}
// Get child by ID
export async function getChild(id) {
    return axios.get(`http://localhost:3001/children/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            alert("Get request error: " + error);
        });
}
// Get children by room
export async function getChildrenByRoom(room) {
    if (room === null) {
        return [];
    }
    return axios.get(`http://localhost:3001/children?room=${room}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            alert("Get request error: " + error);
        });
}
// Update child
export function updateChild(child) {
    axios.put(`http://localhost:3001/children/${child.id}`, child, { headers: updateHeaders })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("Get request error: " + error);
        });
}

// Calculate age in years from DOB
export function calculateAgeYrs(DOB) {
    let today = new Date();
    let birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { 
        age--; 
    }
    return age;
}
// Calculate age in months from DOB
export function calculateAgeMths(DOB) {
    let today = new Date();
    let birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let months = m + (age * 12);
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { 
        months--; 
    }
    return months;
}
// Calculate age in years and months from DOB
export function calculateAge(DOB) {
    let m = calculateAgeMths(DOB);
    let y = calculateAgeYrs(DOB);
    if (m >= 12) {
        m = m % 12;
    }
    if (y === 0) {
        return m + "m";
    } else if (m === 0) {
        return y + "y";
    } else {
        return y + "y " + m + "m";
    }
}
// Calculate educators required
export function calculateEducatorsRequired(childrenList) {
    let educatorsRequired = 0;
    let childrenCount = childrenList.length;

    // Age limits
    const AgeGroupRatios = {
        "0-2": 4,
        "0-3": 5,
        "15m-3": 5,
        "2-3": 6,
        "2.5-3": 8,
        "3-12": 12
    }
    // Age group attendance
    let ageGroupAttendance = {
        "0-2": 0,
        "0-3": 0,
        "15m-3": 0,
        "2-3": 0,
        "2.5-3": 0,
        "3-12": 0
    }
    // Check for no children
    if (!childrenCount > 0) {
        return educatorsRequired;
    }
    // Assign each child to an age group
    childrenList.forEach((child) => {
        if (calculateAgeMths(child.DOB) > (12 * 12)) {
            throw new Error("Child is older than 12 years");
        }
        else if (calculateAgeMths(child.DOB) > (3 * 12) && calculateAgeMths(child.DOB) < (12 * 12)) {
            ageGroupAttendance["3-12"]++;
        }
        else if (calculateAgeMths(child.DOB) > (2.5 * 12) && calculateAgeMths(child.DOB) < (3 * 12)) {
            ageGroupAttendance["2.5-3"]++;
        }
        else if (calculateAgeMths(child.DOB) > (2 * 12) && calculateAgeMths(child.DOB) < (2.5 * 12) && calculateAgeMths(child.DOB) < (3 * 12)) {
            ageGroupAttendance["2-3"]++;
        }
        else if (calculateAgeMths(child.DOB) > (15) && calculateAgeMths(child.DOB) < (3 * 12)) {
            ageGroupAttendance["15m-3"]++;
        }
        else if (calculateAgeMths(child.DOB) > (0) && calculateAgeMths(child.DOB) < (2 * 12)) {
            ageGroupAttendance["0-3"]++;
        }
        else if (calculateAgeMths(child.DOB) > (0) && calculateAgeMths(child.DOB) < (3 * 12)) {
            ageGroupAttendance["0-2"]++;
        }
        else {
            throw new Error("Child is younger than 0 years");
        }
    });
    // Calculate educators required
    if (ageGroupAttendance["0-2"] > 0) {
        educatorsRequired += Math.floor(ageGroupAttendance["0-2"] / AgeGroupRatios["0-2"]);
        ageGroupAttendance["0-2"] = ageGroupAttendance["0-2"] % AgeGroupRatios["0-2"];
    }
    if (ageGroupAttendance["0-3"] > 0) {
        educatorsRequired += Math.floor(ageGroupAttendance["0-3"] / AgeGroupRatios["0-3"]);
        ageGroupAttendance["0-3"] = ageGroupAttendance["0-3"] % AgeGroupRatios["0-3"];
    }
    if (ageGroupAttendance["15m-3"] > 0) {
        educatorsRequired += Math.floor(ageGroupAttendance["15m-3"] / AgeGroupRatios["15m-3"]);
        ageGroupAttendance["15m-3"] = ageGroupAttendance["15m-3"] % AgeGroupRatios["15m-3"];
    }
    if (ageGroupAttendance["2-3"] > 0) {
        educatorsRequired += Math.floor(ageGroupAttendance["2-3"] / AgeGroupRatios["2-3"]);
        ageGroupAttendance["2-3"] = ageGroupAttendance["2-3"] % AgeGroupRatios["2-3"];
    }
    if (ageGroupAttendance["2.5-3"] > 0) {
        educatorsRequired += Math.floor(ageGroupAttendance["2.5-3"] / AgeGroupRatios["2.5-3"]);
        ageGroupAttendance["2.5-3"] = ageGroupAttendance["2.5-3"] % AgeGroupRatios["2.5-3"];
    }
    if (ageGroupAttendance["3-12"] > 0) {
        educatorsRequired += Math.floor(ageGroupAttendance["3-12"] / AgeGroupRatios["3-12"]);
        ageGroupAttendance["3-12"] = ageGroupAttendance["3-12"] % AgeGroupRatios["3-12"];
    }
    // Allocate remaining children to different rooms
    if (ageGroupAttendance["3-12"] > 0) {
        ageGroupAttendance["2.5-3"] += ageGroupAttendance["3-12"];
        ageGroupAttendance["3-12"] = 0;
    }
    if (ageGroupAttendance["2.5-3"] > 0 && ageGroupAttendance["2.5-3"] > AgeGroupRatios["2.5-3"]) {
        ageGroupAttendance["2-3"] += ageGroupAttendance["2.5-3"];
        ageGroupAttendance["2.5-3"] = 0;
    }
    if (ageGroupAttendance["2-3"] > 0 && ageGroupAttendance["2-3"] > AgeGroupRatios["2-3"]) {
        ageGroupAttendance["15m-3"] += ageGroupAttendance["2-3"];
        ageGroupAttendance["2-3"] = 0;
    }
    if (ageGroupAttendance["15m-3"] > 0 && ageGroupAttendance["15m-3"] > AgeGroupRatios["15m-3"]) {
        ageGroupAttendance["0-2"] += ageGroupAttendance["15m-3"];
        ageGroupAttendance["15m-3"] = 0;
    }
    if (ageGroupAttendance["0-2"] > 0 && ageGroupAttendance["0-2"] > AgeGroupRatios["0-2"]) {
        ageGroupAttendance["0-3"] += ageGroupAttendance["0-2"];
        ageGroupAttendance["0-2"] = 0;
    }
    if (ageGroupAttendance["0-3"] > 0 && ageGroupAttendance["0-3"] > AgeGroupRatios["0-3"]) {
        educatorsRequired++;
        ageGroupAttendance["0-3"] = 0;
    }
    return educatorsRequired;
}

// Inbox functions
export function getInbox(username) {
    // TODO: Get inbox from database
    return [
        {
            id: 0,
            from: "Educator",
            subject: "Subject",
            message: "Message",
            date: "2020-01-01"
        },
        {
            id: 1,
            from: "Educator",
            subject: "Subject",
            message: "Message",
            date: "2020-01-01"
        },
        {
            id: 2,
            from: "Educator",
            subject: "Subject",
            message: "Message",
            date: "2020-01-01"
        },
        {
            id: 3,
            from: "Educator",
            subject: "Subject",
            message: "Message",
            date: "2020-01-01"
        },
        {
            id: 4,
            from: "Educator",
            subject: "Subject",
            message: "Message",
            date: "2020-01-01"
        },
        {
            id: 5,
            from: "Educator",
            subject: "Subject",
            message: "Message",
            date: "2020-01-01"
        },
        {
            id: 6,
            from: "Educator",
            subject: "Subject",
            message: "Message",
            date: "2020-01-01"
        },
        {
            id: 7,
            from: "Educator",
            subject: "Subject",
            message: "Message",
            date: "2020-01-01"
        }
    ];
}