import pandas as pd
import random
from faker import Faker

# Initialize Faker instance
fake = Faker()

# Function to generate educator or family data
def generate_user(user_id, role):
    if role == "Educator":
        job_titles = [
            "Lead Educator", "Educator", "Manager", "Assistant Director",
            "Director", "Cook", "Relief Educator"
        ]
        qualifications = {
            "Lead Educator": "Diploma in Early Childhood Education and Care",
            "Educator": "Certificate III in Early Childhood Education and Care",
            "Manager": "Bachelor of Education (Early Childhood)",
            "Assistant Director": "Bachelor of Education (Early Childhood)",
            "Director": "Bachelor of Education (Early Childhood)",
            "Cook": "",
            "Relief Educator": ""
        }
        job_title = random.choices(
            population=job_titles,
            weights=[4, 8, 1, 2, 1, 2, 4],  # Weights to meet requirements
            k=1
        )[0]
        qualification = qualifications[job_title]
        qualification_institution = fake.company() if qualification else ""
    else:
        job_title = ""
        qualification = ""
        qualification_institution = ""

    return {
        "userId": user_id,
        "username": fake.user_name(),
        "role": role,
        "profileImage": "Blob",
        "jobTitle": job_title,
        "qualification": qualification,
        "qualificationInstitution": qualification_institution,
        "emergencyContact": fake.name(),
        "emergencyNumber": random.randint(1000000000, 9999999999)
    }

# Generate 40 educators and 200 families
user_data = []
user_id = 1

# Generate educators
for _ in range(40):
    user_data.append(generate_user(user_id, "Educator"))
    user_id += 1

# Generate families
for _ in range(200):
    user_data.append(generate_user(user_id, "Family"))
    user_id += 1

# Convert to DataFrame and save as CSV
user_df = pd.DataFrame(user_data)
user_df.to_csv("educators_and_families.csv", index=False)

# Function to generate child entries
def generate_child(child_id, user_key):
    max_age_days = (5 * 365) + (11 * 30)
    birth_date = fake.date_between(start_date=f'-{max_age_days}d', end_date='today').strftime('%Y-%m-%d')
    possible_allergies = ["Peanuts", "Shellfish", "Dairy", "Gluten", "Eggs"]
    allergies = random.sample(possible_allergies, k=random.randint(0, 3))
    authorized_persons = [fake.name() for _ in range(random.randint(1, 3))]
    emergency_contact1_name = fake.name()
    emergency_contact1_number = str(abs(random.randint(1000000000, 9999999999)))
    emergency_contact2_name = fake.name()
    emergency_contact2_number = str(abs(random.randint(1000000000, 9999999999)))

    return {
        "id": child_id,
        "firstName": fake.first_name(),
        "lastName": fake.last_name(),
        "dateOfBirth": birth_date,
        "attending": random.choice([True, False]),
        "medicalPlan": random.choice([True, False]),
        "allergies": ', '.join(allergies),
        "authorizedPersons": ', '.join(authorized_persons),
        "emergencyContact1Name": emergency_contact1_name,
        "emergencyContact1Number": emergency_contact1_number,
        "emergencyContact2Name": emergency_contact2_name,
        "emergencyContact2Number": emergency_contact2_number,
        "userKey": user_key
    }

# Generate children for each user
child_data = []
child_id = 1

for user_key in user_df['userId']:
    num_children = random.randint(2, 5)
    for _ in range(num_children):
        child_data.append(generate_child(child_id, user_key))
        child_id += 1

# Convert child data to DataFrame and save as CSV
child_df = pd.DataFrame(child_data)
child_df['dateOfBirth'] = child_df['dateOfBirth'].astype(str)
child_df.to_csv("children_data.csv", index=False)

print("CSV files generated successfully.")
