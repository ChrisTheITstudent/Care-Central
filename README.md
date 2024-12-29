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
   - Update these paths to match your local system.

2. **Run `startup.bat`**:
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
- No known issues at the moment.

---

## 📅 Changelog

### [Unreleased]
- Feature: Onboarding
- Feature: Profile
- Feature: Settings
- Feature: Help documentation

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
    bash ```
    npm run coverage
    ```
- Feature: Introduced sign-in/out functionality for educators.

### [v1.0.2] - 2024-12-30
- Feature: Introduced user logon functionality

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
