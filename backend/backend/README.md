# Charging Stations Backend

## Setup and Run

1. Copy `.env.example` to `.env` and fill in your environment variables:
   ```
   cp .env.example .env
   ```
   Update `.env` with your MongoDB connection string and JWT secret.

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   The server will run on the port specified in `.env` or default to 5000.

## API Endpoints

- `POST /api/auth/register` - Register a new user. Requires `username`, `email`, and `password`.
- `POST /api/auth/login` - Login with `username` or `email` and `password`. Returns JWT token.
- `GET /api/stations` - Get all stations. Requires Authorization header with Bearer token.
- `POST /api/stations` - Create a new station. Requires Authorization header.
- `PUT /api/stations/:id` - Update a station by ID. Requires Authorization header.
- `DELETE /api/stations/:id` - Delete a station by ID. Requires Authorization header.

## Notes

- Ensure MongoDB is running and accessible.
- Use the JWT token returned from login in the Authorization header for protected routes:
  ```
  Authorization: Bearer <token>
