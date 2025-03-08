from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute
import sqlite3 as sql
from pydantic import BaseModel
import base64
import bcrypt
from typing import Optional, List, Union
import pandas as pd
import json
import datetime

class UserFormData(BaseModel):
    username: str
    profileImage: Optional[str] = None  # File handling needs to be separate
    role: str
    jobTitle: Optional[str] = None
    qualification: Optional[str] = None
    qualificationInstitution: Optional[str] = None
    emergencyContactName: str
    emergencyContactNumber: str

class ChildrenFormData(BaseModel):
    firstName: str
    lastName: str
    dateOfBirth: Optional[str] = None
    parentUsername: str
    allergies: Optional[str] = None
    authorizedPersons: Optional[str] = None
    emergencyContact1Name: str
    emergencyContact1Number: str
    emergencyContact2Name: str
    emergencyContact2Number: str

SingleEntry = Union[UserFormData, ChildrenFormData]

pd.options.display.max_rows = 9999
pd.options.display.max_columns = 9999
pd.options.display.max_colwidth = 9999

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def safe_json_response(data):
    return json.dumps(data, allow_nan=False)

def process_user(user_data):
    filtered_data = {}
    for key, value in user_data.items():
        if value and key != "confirmPassword":
            if key == "emergencyContactName":
                filtered_data["emergencyContact"] = value
            elif key == "emergencyContactNumber":
                filtered_data["emergencyNumber"] = value
            else:
                filtered_data[key] = value

    if not filtered_data:
        print("No valid data provided")
        return
    
    hashed_password = bcrypt.hashpw(filtered_data["password"].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    filtered_data["password"] = hashed_password
    
    columns = ", ".join(filtered_data.keys())
    placeholders = ", ".join(["?"] * len(filtered_data))

    query = f"INSERT INTO Users ({columns}) VALUES ({placeholders})"

    try:
        conn = sql.connect("../CareCentral.db")
        cur = conn.cursor()
        cur.execute(query, tuple(filtered_data.values()))
        conn.commit()
        print("User data inserted successfully")
    except sql.Error as e:
        print("Error inserting user:", e)
    finally:
        conn.close()

def process_child(child_data):
    filtered_data = {}
    for key, value in child_data.items():
        if value and key:
            if key == "parentUsername":
                filtered_data["userKey"] = value
            if key == "emergencyContact1Name":
                emergency_number = child_data.get("emergencyContact1Number", "")
                filtered_data["emergencyContact1"] = value + " " + emergency_number
            else:
                filtered_data[key] = value

    filtered_data.pop("parentUsername", None)
    filtered_data.pop("emergencyContact1Number", None)

    if "userKey" in filtered_data:
        parentObj = read_user(filtered_data["userKey"])
        if parentObj:
            filtered_data["userKey"] = parentObj["id"]
        else:
            print(f"Parent username {filtered_data['userKey']} not found in Users table")
            return

    columns = ", ".join(filtered_data.keys())
    placeholders = ", ".join(["?"] * len(filtered_data))
    query = f"INSERT INTO Children ({columns}) VALUES ({placeholders})"

    print("Generated SQL Query:", query)  # Debugging Line
    print("Values:", tuple(filtered_data.values()))  # Debugging Line

    try:
        conn = sql.connect("../CareCentral.db")
        cur = conn.cursor()
        cur.execute(query, tuple(filtered_data.values()))
        conn.commit()
        print("Child data inserted successfully")
    except sql.Error as e:
        print("Error inserting child:", e)
    finally:
        conn.close()

def delete_user(user_data):
    conn = sql.connect("../CareCentral.db")
    cur = conn.cursor()

    try:
        cur.execute("DELETE FROM Users WHERE username = ?", (user_data["username"],))
        conn.commit()
        print(f"User {user_data['username']} deleted successfully")
    except sql.Error as e:
        print("Error deleting user:", e)
    finally:
        conn.close()

def delete_child(user_data):
    conn = sql.connect("../CareCentral.db")
    cur = conn.cursor()

    try:
        cur.execute("DELETE FROM Children WHERE firstName = ? AND lastName = ?", (user_data["firstName"], user_data["lastName"],))
        conn.commit()
        print(f"Child {user_data['firstName']} deleted successfully")
    except sql.Error as e:
        print("Error deleting child:", e)
    finally:
        conn.close()

@app.delete("/offboard")
def offboarding(data: List[dict]):
    if not data:
        raise HTTPException(status_code=400, detail="No data provided")
    
    for entry in data:
        if "username" in entry:
            print("Deleting user:", entry)
            delete_user(entry)

        elif "firstName" in entry and "lastName" in entry:
            print("Deleting child:", entry)
            delete_child(entry)

    return {
            "status": "OK",
            "message": "Entries deleted successfully"
        }

@app.post("/onboard/single_entries")
def onboard_single_entries(data: List[dict]):
    if not data:
        raise HTTPException(status_code=400, detail="No data provided")
    
    for entry in data:
        if "username" in entry and "role" in entry:
            print("Processing User data:", entry)
            process_user(entry)

        elif "firstName" in entry and "lastName" in entry:
            print("Processing Child data:", entry)
            process_child(entry)

        else:
            raise HTTPException(status_code=400, detail="Invalid entry format")

    return {
            "status": "OK",
            "message": "Entries processed successfully"
        }

@app.post("/onboarding/users", include_in_schema=True)
def onboard_users(file: UploadFile = File(...)):
    try:
        df = pd.read_csv(file.file)
        dataList = []

        for index, row in df.iterrows():
            userData = {
                "id": row['userId'],
                "userName": row['username'],
                "role": row['role'],
                "profileImage": row['profileImage'],
                "jobTitle": row['jobTitle'],
                "qualification": row['qualification'],
                "qualificationInstitution": row['qualificationInstitution'],
                "emergencyContact": row['emergencyContact'],
                "emergencyNumber": row['emergencyNumber']
            }
            if row['jobTitle'] == "":
                userData["jobTitle"] = None
            if row['qualification'] == "":
                userData['qualification'] == None
                userData['qualificationInstitution'] == None
            if row['profileImage'] == "":
                userData["profileImage"] == None
            dataList.append(userData)
        
            # Should be able to put the data into the SQL database from here
            con = sql.connect("../CareCentral.db")
            cur = con.cursor()
            query = "INSERT INTO Users (username, role, profileImage, jobTitle, qualification, qualificationInstitution, emergencyContact, emergencyNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
            cur.execute(query, (
                userData['userName'],
                userData['role'],
                userData['profileImage'],
                userData['jobTitle'],
                userData['qualification'],
                userData['qualificationInstitution'],
                userData["emergencyContact"],
                userData["emergencyNumber"]
            ))
            con.commit()
            con.close()

        print(df.head().to_dict())

        return {
            "status": "OK",
            "message": "New users onboarded processed"
        }
    except Exception as e:
        if 'UNIQUE' in str(e):
            return {
                "status": "ERROR",
                "message": "Duplicate username found. Usernames must be unique"
            }
        return {
            "status": "FAILED",
            "message": f"Error processing file: {str(e)}"
        }
    finally:
        file.file.close()

@app.post("/onboarding/children", include_in_schema=True)
def onboard_children(file: UploadFile = File(...)):
    try:
        df = pd.read_csv(file.file)
        dataList = []

        for index, row in df.iterrows():
            childData = {
                "id": row['id'],
                "firstName": row['firstName'],
                "lastName": row['lastName'],
                "yearOfBirth": row['dateOfBirth'].split("-")[0],
                "monthOfBirth": row['dateOfBirth'].split("-")[1],
                "dayOfBirth": row['dateOfBirth'].split("-")[2],
                "attending": row['attending'],
                "medicalPlan": row['medicalPlan'],
                "allergies": row['allergies'],
                "authorizedPersons": row['authorizedPersons'],
                "emergencyContact1Name": row["emergencyContact1Name"],
                "emergencyContact1Number": row["emergencyContact1Number"],
                "emergencyContact2Name": row["emergencyContact1Name"],
                "emergencyContact2Number": row["emergencyContact1Number"],
                "userKey": row["userKey"]
            }
            dataList.append(childData)

            childDOB = datetime.date(int(childData["yearOfBirth"]), int(childData["monthOfBirth"]), int(childData["dayOfBirth"]))

            con = sql.connect("../CareCentral.db")
            cur = con.cursor()
            query = "INSERT INTO Children (firstName, lastName, dateOfBirth, attending, userKey, medicalPlan, allergies, authorizedPersons, emergencyContact1, emergencyContact2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            cur.execute(query, (
                childData['firstName'],
                childData['lastName'],
                childDOB,
                childData['attending'],
                childData['userKey'],
                childData['medicalPlan'],
                childData['allergies'],
                childData['authorizedPersons'],
                childData["emergencyContact1Name"] + " " + str(childData["emergencyContact1Number"]),
                childData["emergencyContact2Name"] + " " + str(childData["emergencyContact2Number"])
            ))
            con.commit()
            con.close()

        return {
            "status": "OK",
            "message": "Children onboarded"
        }
    except Exception as e:
        if 'UNIQUE' in str(e):
            return {
                "status": "ERROR",
                "message": "Duplicate first and last name combination found. Children must have a unique first name and last name combination"
            }
        return {
            "status": "FAILED",
            "message": f"Error processing file: {str(e)}"
        }
    finally:
        file.file.close()

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
