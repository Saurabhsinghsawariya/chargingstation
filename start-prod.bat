@echo off
REM Install backend dependencies
cd backend/backend
npm install

REM Install frontend dependencies and build frontend
cd ../../frontend
npm install
npm run build

REM Start backend server
cd ../backend/backend
set NODE_ENV=production
npm start
