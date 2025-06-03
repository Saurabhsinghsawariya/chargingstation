# Charging Stations Application

This repository contains the backend and frontend code for the Charging Stations application.

## Project Structure

- `/backend` - Express.js backend API server
- `/frontend` - Vue.js frontend application

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```
   cd backend/backend
   ```

2. Copy `.env.example` to `.env` and fill in your environment variables:
   ```
   cp .env.example .env
   ```
   Update `.env` with your MongoDB connection string and JWT secret.

3. Install dependencies:
   ```
   npm install
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run serve
   ```

## Deployment Instructions

### Production Build and Start

A script `start-prod.bat` is provided to build the frontend and start the backend server in production mode.

Run the following command from the root directory:

```
start-prod.bat
```

This will:

- Install backend and frontend dependencies
- Build the frontend for production
- Start the backend server with `NODE_ENV=production`
- Serve the frontend static files from the backend server

### Environment Variables

Ensure the following environment variables are set in your `.env` file in the backend directory:

- `MONGODB_URI` - MongoDB connection string
- `PORT` - (optional) port for backend server (default: 5001)
- `JWT_SECRET` - secret key for JWT authentication

### Deployment Platforms

You can deploy the backend and frontend on cloud platforms such as:

- Backend: Heroku, Render, AWS Elastic Beanstalk, etc.
- Frontend: Vercel, Netlify, Firebase Hosting, etc.

Alternatively, deploy the backend and frontend together by serving the built frontend from the backend as configured.

## API Documentation

A Postman collection is provided in `postman_collection.json` for testing the backend API endpoints.

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/stations` - Get all stations (requires Authorization header)
- `POST /api/stations` - Create a new station (requires Authorization header)
- `PUT /api/stations/:id` - Update a station by ID (requires Authorization header)
- `DELETE /api/stations/:id` - Delete a station by ID (requires Authorization header)

## Notes

- The backend server serves the frontend static files in production mode.
- Use the JWT token returned from login in the Authorization header for protected routes:
  ```
  Authorization: Bearer <token>
