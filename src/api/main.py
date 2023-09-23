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
    children: list | None = []
    room: str | None = None
    clockedIn: bool | None = False

class Child(BaseModel):
    name: str
    DOB: str
    isAttending: bool | None = False
    allergies: list | None = []
    medications: list | None = []
    special_needs: list | None = []
    notes: list | None = []

class Room(BaseModel):
    name: str
    children: list | None = []
    educators: list | None = []

# Get requests
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users/{username}")
def read_user(username: str):
    # Gets user from database
    db_response = db.get_filtered_entries("users", {"username": username})
    for user in db_response:
        user["_id"] = str(user["_id"])
        user["password"] = None
        return user

# Put requests
@app.put("/users/{username}")
def update_user(username: str, user: User):
    # Updates user
    db_response = db.update_entry("users", {"username": username}, user)
    for user in db_response:
        user["_id"] = str(user["_id"])
        return user

# Post requests
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
    
# Delete requests
@app.delete("/users/{username}")
def delete_user(username: str):
    # Deletes user from database
    db_response = db.delete_all_filtered_entries("users", {"username": username})
    for user in db_response:
        user["_id"] = str(user["_id"])
        return user

# Login requests
@app.post("/login")
def login(username: str, password: str):
    # Validate user credentials
    if db.validate_user(username, password):
        return {"message": "Login successful"}
    else:
        return {"message": "Login failed"}