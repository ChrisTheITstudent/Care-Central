from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3 as sql
import base64
import bcrypt
from typing import Optional

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/users/{username}")
def read_user(username: str):
    con = sql.connect("../CareCentral.db")
    cur = con.cursor()
    # Check username for injection

    query = "SELECT * FROM Users WHERE username = ?"
    
    cur.execute(query, (username,))
    res = cur.fetchone()

    con.close()

    if res:
        user_data = {
            "id": res[0],
            "username": res[1],
            "profileImage": base64.b64encode(res[4]).decode("utf-8") if res[4] else None,
            "role": res[3] if res[3] else None,
            "room": res[5] if res[5] else None
        }

        return user_data
    
    return {
        "username": 'Error',
    }

@app.post("/users/register")
def register_user(username: str, password: str, role: str, profileImage: str | None, room: str | None):
    con = sql.connect("../CareCentral.db")
    cur = con.cursor()

    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt()).decode("utf-8")
    query = "INSERT INTO Users (username, password, role, profileImage, room) VALUES (?, ?, ?, ?, ?)"

    cur.execute(query, (username, hashed_password, role, profileImage, room))
    con.commit()
    con.close()

    return {
        "status": "OK",
        "message": "User registered successfully"
    }

@app.patch("/users/{userId}/update")
def update_user(userId: int, username: Optional[str] = None, password: Optional[str] = None, role: Optional[str] = None, profileImage: Optional[str] = None, room: Optional[str] = None):
    con = sql.connect("../CareCentral.db")
    cur = con.cursor()
    # Check id for injection

    data = get_user_by_id(userId)
    if "error" in data:
        return {
            "status": "FAILED",
            "message": "Unable to return data"
    }

    if password:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode("utf-8")

    if not username:
        username = data["username"]
    if not role:
        role = data["role"]
    if not profileImage:
        profileImage = data["profileImage"]
    if not room:
        room = data["room"]

    query = "UPDATE Users SET username = ?, password = ?, role = ?, profileImage = ?, room = ? WHERE id = ?"
    cur.execute(query, (username, hashed_password, role, profileImage, room, data["id"]))
    con.commit()
    con.close()

    return {
        "status": "OK",
        "message": "User updated successfully"
    }

@app.get("/users/login/{username}/{password}")
def login_user(username: str, password: str):
    con = sql.connect("../CareCentral.db")
    cur = con.cursor()
    cur.execute("SELECT * FROM Users WHERE username = ?", (username,))
    stored_hashed_password = cur.fetchone()[2]
    con.close()

    if bcrypt.checkpw(password.encode("utf-8"), stored_hashed_password.encode("utf-8")):
        return {
            "status": "OK",
            "message": "Login successful"
        }
    else:
        return {
            "status": "FAILED",
            "message": "Login failed"
        }

@app.get("/user/findById/{userId}")
def get_user_by_id(userId: int):
    con = sql.connect("../CareCentral.db")
    cur = con.cursor()
    # Check id for injection

    query = "SELECT * FROM Users WHERE id = ?"

    cur.execute(query, (userId,))
    res = cur.fetchone()

    con.close()

    if res:
        user_data = {
            "id": res[0],
            "username": res[1],
            "profileImage": base64.b64encode(res[4]).decode("utf-8") if res[4] else None,
            "role": res[3] if res[3] else None,
            "room": res[5] if res[5] else None
        }

        return user_data
    
    return {
        "username": 'Error',
    }

@app.get("/educators/rooms/{roomName}")
def get_educators_by_room(roomName: str):
    con = sql.connect("../CareCentral.db")
    cur = con.cursor()
    userArray = []
    # Check id for injection

    query = "SELECT * FROM Users WHERE room = ?"

    cur.execute(query, (roomName, ))
    res = cur.fetchall()

    con.close()

    for user in res:
        user_data = {
            "id": user[0],
            "username": user[1],
            "profileImage": base64.b64encode(user[4]).decode("utf-8") if user[4] else None,
            "role": user[3] if user[3] else None,
            "room": user[5] if user[5] else None
        }
        userArray.append(user_data)
    return userArray   

@app.get("/children/family/{familyId}")
def find_family_by_Id(familyId: int):
    con = sql.connect("../CareCentral.db")
    cur = con.cursor()
    # Check id for injection

    childrenObj = {}
    query = "SELECT * FROM Children WHERE userKey = ?"

    cur.execute(query, (familyId, ))
    res = cur.fetchall()

    con.close()

    if res:
        for child in res:
            childrenObj[child[0]] = child
        return childrenObj
    
    return {
        "username": "Error"
    }

@app.get("/children/{childId}")
def find_child_by_id(childId: int):
    con = sql.connect("../CareCentral.db")
    cur = con.cursor()
    # Check id for injection

    query = "SELECT * FROM Children WHERE id = ?"

    cur.execute(query, (childId, ))
    res = cur.fetchone()

    con.close()

    if res:
        child_data = {
            "id": res[0],
            "firstName": res[1],
            "lastName": res[2],
            "dateOfBirth": res[3],
            "isAttending": res[4],
            "room": res[5]
        }
        return child_data
    
    return {
        "error": "Unable to return child data"
    }

@app.get("/rooms/{roomName}")
def get_children_by_room(roomName: str):
    con = sql.connect("../CareCentral.db")
    cur = con.cursor()
    # Check id for injection

    # Return array of children objects
    query = "SELECT * FROM Children WHERE room = ?"

    cur.execute(query, (roomName, ))
    res = cur.fetchall()

    con.close()

    return res

@app.patch("/children/{childId}/attendance")
def change_is_child_attending(childId: int):
    con = sql.connect("../CareCentral.db")
    cur = con.cursor()
    # Check id for injection

    data = find_child_by_id(childId)
    if "error" in data:
        return {
            "status": "FAILED",
            "message": f"Unable to return data"
        }
    newAttendingStatus = not data["isAttending"]
    query = "UPDATE Children SET attending = ? WHERE id = ?"

    cur.execute(query, (newAttendingStatus, data["id"]))
    con.commit()
    con.close()

    return {
        "status": "OK",
        "message": f"Child with ID {childId} is now {'attending' if newAttendingStatus else 'not attending'}."
    }

@app.patch("/users/{userId}/room/{room}")
def change_user_room(userId: int, room: str | None):
    con = sql.connect("../CareCentral.db")
    cur = con.cursor()
    # Check id for injection

    data = get_user_by_id(userId)
    if "error" in data:
        return {
            "status": "FAILED",
            "message": "Unable to return data"
    }

    query = "UPDATE Users SET room = ? WHERE id = ?"

    if room != "null":
        cur.execute(query, (room, data["id"]))
    else:
        cur.execute(query, (None, data["id"]))
    
    con.commit()
    con.close

    return {
        "status": "OK",
        "message": f"User ID {userId} is now allocated to room named {room}."
    }