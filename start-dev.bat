@echo off
start cmd /k "cd backend/backend && npm install && npm run start"
start cmd /k "cd frontend && npm install && npm run serve"
