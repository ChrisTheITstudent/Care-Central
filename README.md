# Care Central

**Care Central** is an all-in-one application designed for the early childhood industry. It aims to simplify administrative tasks and enhance efficiency with features like automatic ratio calculations, sign-in/out for children, and sign-in/out for educators.

A SQLite database is required to run **Care Central**. Database hosting is currently unavaliable through **Care Central**.

---

## 🛠️ Technologies Used
- **Frontend**: React (TypeScript)
- **Backend**: Python FastAPI
- **Database**: SQLite3

---

## 🚀 Features
- Automatic ratio calculations for compliance.
- Easy sign-in/out for children.
- Seamless sign-in/out for educators.
- Secure login/logout.
- User profiles with children information
- Random sample data generation file
- Onboarding through csv files for user data and children data

---

## 📦 Prerequisites
Ensure the following are installed:
- Node.js (latest version with npm)
- Python 3
- `create-react-app`
- TypeScript

---

## 📝 Environment Variables
The Python environment and API settings will be configured automatically after running `startup.bat`.

---

## ⚙️ Setup and Startup

1. **Edit Paths in `startup.bat`**:
   - Locate the hardcoded paths in `startup.bat` for:
     - Python environment
     - API
     - Care Central project directory
     - React App directory
   - Update these paths to match your local system.

2. **Generating Sample Data**:
   - If you choose to regenerate random sample data:
     - Simply run `GenerateRandomData.py`

3. **Run `startup.bat`**:
   - Once the paths are updated, run `startup.bat` to start:
     - The development environment
     - The Care Central server locally

---

## 🔗 API Endpoints
All API calls are managed through the `api.py` file in the Python backend.

---

## 📡 Hosting
Care Central is currently not hosted. Hosting solutions are under consideration.

---

## 🧪 Testing
- **Testing Frameworks**:
  - Jest
  - React testing libary

---

## ⚠️ Known Issues
- Sets children for admin roles

---

## 📅 Changelog

### [Unreleased]
- Feature: Editable profiles and children information
- Feature: Settings
- Feature: Help documentation
  - Onboarding
  - Offboarding
  - User guide
- Feature: Allow educators to move older children to younger rooms. Show these in the UI

<!-- ### [v1.0.2] - YYYY-MM-DD
- Feature: Introduced sign-in/out functionality for educators.
- Bugfix: Fixed incorrect ratio calculations for mixed age groups.
-->

### [v1.0.0] - 2024-10-25
- Initial release with core features:
  - Automatic ratio calculations.
  - Sign-in/out for children.

### [v1.0.1] - 2024-12-27
- Testing release
  - Added unit testing. 
    bash
    npm run coverage

- Feature: Introduced sign-in/out functionality for educators.

### [v1.0.2] - 2024-12-30
- Feature: Introduced user logon functionality

### [v1.0.3] - 2025-01-24
- Feature: Unit testing added for all relevant functions

### [v1.0.4] - 2025-02-16
- Feature: CI pipeline through GitHub Actions introduced
- Bugfix: Throws TypeError that requires a bytes-like object but recieves a string when decoding hashed password on login
- Bugfix: Loops fetch calls when logging in as educator
- Testing: Jest tests introduced into CI pipeline

### [v1.0.5] - 2025-02-23
- Feature: Introduced profile features adding more data for educators and children
- Bugfix: CCS errors making the grinds look bad
- Testing: Profile tests still required

### [v1.1.0] - 2025-03-08
- Feature: API endpoints added for onboarding of Users and Children via CSV files
- Feature: Admin dashboard
  - Onboarding bulk users and children
  - Add users/children one by one
- Update: Remove redundant /users/register endpoint
- Bugfix: Added unique constraints to database for Users(username) and unique combination constraint for Children(firstName, lastName)

### [v1.1.1] - 2025-03-09
- Testing: Added jest tests for 1.1.0 features

---

## 🤝 Contributing

We welcome contributions to Care Central! To contribute:
1. Clone the repository.
2. Fork the repository.
3. Create a pull request with your changes.

---

## 📞 Contact
For questions or feedback, please contact the email provided on the GitHub repository.

---

## 📜 License
Care Central is licensed as stated in the repository.

---

## 🌐 Live Demo
- A live demo is not yet available.

---

Thank you for using **Care Central**! Stay tuned for updates and improvements.
