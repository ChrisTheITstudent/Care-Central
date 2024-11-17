@echo off
echo Initalizing environment...
set VENV_DIR=D:\.venv
set PYTHON_APP_DIR=D:\API
if not exist %VENV_DIR% (
   echo Creating virtual environment...
   python -m venv %VENV_DIR%
)

echo Activating virtual environment...
call %VENV_DIR%\Scripts\activate

echo Checking API installation....
pip install fastapi uvicorn

echo Starting server...
if exist %PYTHON_APP_DIR%\api.py (
   echo API found, initalizing server...
   cd /d %PYTHON_APP_DIR%
   start cmd /k "%VENV_DIR%\Scripts\python.exe -m uvicorn api:app --reload"
) else (
   echo Error: API not found in %PYTHON_APP_DIR%
)

echo Starting Care Central...
set REACT_APP_DIR=C:\Users\c_mil\Desktop\Dev\Typescript\care-central
start cmd /k "cd /d %REACT_APP_DIR% && npm start"

echo **********Care Central initalized**********
pause