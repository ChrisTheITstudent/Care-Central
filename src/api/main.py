import sys
sys.path.append('C:/Users/c_mil/Desktop/Dev/React/CareCentralV2_0/carecentral/src/api/security')

from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import encryption as enc
import db_qurries as db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    username: str
    password: str
    role: str
    children: list[dict] | None = []
    room: str | None = None
    clockedIn: bool | None = False

class Child(BaseModel):
    name: str
    DOB: str
    parent: list[dict]
    room: str | None = None
    isAttending: bool | None = False
    authorizedPersons: list | None = []
    allergies: list | None = []
    medications: list | None = []
    special_needs: list | None = []
    notes: list | None = []

class Room(BaseModel):
    name: str
    children: list | None = []
    educators: list | None = []

# Get root
@app.get("/")
def read_root():
    return {"Hello": "World"}

# ---------------------- USERS ----------------------

# Get user
@app.get("/users/{username}")
def read_user(username: str):
    # Gets user from database
    db_response = db.get_filtered_entries("users", {"username": username})
    for user in db_response:
        user["_id"] = str(user["_id"])
        user["password"] = None
        return user

# Get users
@app.get("/users")
def read_users():
    # Gets users from database
    db_response = db.get_all_entries("users")
    for user in db_response:
        user["_id"] = str(user["_id"])
        user["password"] = None
    return db_response

# Get users by room
@app.get("/users/rooms/{room}")
def read_users_by_room(room: str):
    return_data = []
    # Gets users from database
    db_response = db.get_filtered_entries("users", {"room": room})
    for user in db_response:
        user["_id"] = str(user["_id"])
        user["password"] = None
        return_data.append(user)
    return return_data

# Update user
@app.put("/users/{username}")
def update_user(username: str, user: User):
    # Updates user
    db_response = db.update_entry("users", {"username": username}, user)
    for user in db_response:
        user["_id"] = str(user["_id"])
        return user

# Post requests
# Create user
@app.post("/users")
def create_user(user: User):
    # Encrypt password for database storage
    pubKey = enc.request_pubKey()
    signature, cypher = enc.encrypt(user.password, pubKey)
    user.password = cypher.decode('latin1')
    print(type(user))
    # Create user in database
    db_response = db.insert_entry("users", user.__dict__)
    return db_response
    
# Delete user
@app.delete("/users/{username}")
def delete_user(username: str):
    # Deletes user from database
    db_response = db.delete_all_filtered_entries("users", {"username": username})
    for user in db_response:
        user["_id"] = str(user["_id"])
        return user

# Login
@app.post("/login")
def login(username: str, password: str):
    # Validate user credentials
    if db.validate_user(username, password):
        return True
    else:
        return False
    
# ---------------------- CHILDREN ----------------------
# Get children
@app.get("/children")
def read_children():
    # Gets children from database
    db_response = db.get_all_entries("children")
    for child in db_response:
        child["_id"] = str(child["_id"])
    return db_response

# Get user's children
@app.get("/children/{username}")
def read_user_children(username: str):
    return_data = []
    # Gets user from database
    db_response = db.get_filtered_entries("users", {"username": username})
    for user in db_response:
        user["_id"] = str(user["_id"])
        # Gets children from database
            # DEBUG: db.get_all_entries("children") returns empty list
        children = db.get_filtered_entries("children", {"parent.username": username})
        
        for child in children:
            child["_id"] = str(child["_id"])
            return_data.append(child)

        return return_data
    
# Get children by room
@app.get("/children/rooms/{room}")
def read_children_by_room(room: str):
    return_data = []
    # Gets children from database
    db_response = db.get_filtered_entries("children", {"room": room})
    for child in db_response:
        child["_id"] = str(child["_id"])
        return_data.append(child)
    return return_data

# Update child by id
@app.put("/children/{id}")
def update_child(id: str, child: dict):
    # Updates child
    if db.update_entry("children", {"_id": id}, child):
        return True
    
# ---------------------- DEVELOPER TOOLS ----------------------
# Create collection and insert a single entry
@app.post("/create_collection/single_entry")
def create_collection_single_entry(collection_name: str, entry: Child):
    # Create collection
    db.create_collection(collection_name)
    # Insert a single entry
    db_response = db.insert_entry(collection_name, entry.__dict__)
    return db_response

# Create collection and insert multiple entries
@app.post("/create_collection/multiple_entries")
def create_collection_multiple_entries(collection_name: str, entries: list[Child]):
    formatted_entries = []
    # Create collection
    db.create_collection(collection_name)
    # Insert multiple entries
    for entry in entries:
        formatted_entries.append(entry.__dict__)
    db_response = db.insert_entries(collection_name, formatted_entries)
    return db_response

# Insert a single entry
@app.post("/insert_entry")
def insert_entry(collection_name: str, entry: Child):
    # Insert a single entry
    db_response = db.insert_entry(collection_name, entry.__dict__)
    return db_response

# Insert multiple entries
@app.post("/insert_entries")
def insert_entries(collection_name: str, entries: list[Child]):
    formatted_entries = []
    # Insert multiple entries
    for entry in entries:
        formatted_entries.append(entry.__dict__)
    db_response = db.insert_entries(collection_name, formatted_entries)
    return db_response