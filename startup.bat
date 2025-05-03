@echo off
echo Initalizing environment...
set VENV_DIR=C:\Git\Github\Care-Central\Server\.venv
set PYTHON_APP_DIR=C:\Git\Github\Care-Central\Server\API
if not exist %VENV_DIR% (
   echo Creating virtual environment...
   python -m venv %VENV_DIR%
)

echo Activating virtual environment...
call %VENV_DIR%\Scripts\activate

echo Checking API installation....
pip install fastapi uvicorn

echo Checking API dependencies....
pip install -r %PYTHON_APP_DIR%\requirements.txt

echo Starting server...
if exist %PYTHON_APP_DIR%\api.py (
   echo API found, initalizing server...
   cd /d %PYTHON_APP_DIR%
   start cmd /k "%VENV_DIR%\Scripts\python.exe -m uvicorn api:app --reload"
) else (
   echo Error: API not found in %PYTHON_APP_DIR%
)

echo Starting Care Central...
set REACT_APP_DIR=C:\Git\Github\Care-Central\React
start cmd /k "cd /d %REACT_APP_DIR% && npm start"

echo **********Care Central initalized**********
pause