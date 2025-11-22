# React → Express API → PostgreSQL Connection Guide

This document explains how the React frontend connects to the PostgreSQL database through the Express API.

## Architecture Overview

```
┌─────────────────┐
│  React Frontend │  (Port 5173)
│   (Vite + JSX)  │
└────────┬────────┘
         │ HTTP Requests (axios)
         │
         ▼
┌─────────────────┐
│  Express API    │  (Port 3000)
│   (REST API)    │
└────────┬────────┘
         │ SQL Queries (pg)
         │
         ▼
┌─────────────────┐
│  PostgreSQL DB  │  (Port 5432)
│   (Database)    │
└─────────────────┘
```

## Connection Flow

### 1. React Frontend → Express API

**Location:** `frontend/src/services/api.js`

- Uses **axios** for HTTP requests
- Base URL: `http://localhost:3000` (configurable via `VITE_API_URL`)
- Sends JSON data in request body
- Receives JSON responses

**Example Request:**
```javascript
// Create user
const response = await api.post('/users', { name: 'John', email: 'john@example.com' });
```

### 2. Express API → PostgreSQL Database

**Location:** `queries.js`

- Uses **pg** (node-postgres) library
- Connection pool configured via environment variables
- Executes SQL queries with parameterized statements (prevents SQL injection)
- Returns JSON responses to frontend

**Example Query:**
```javascript
pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email])
```

## Complete Data Flow Example

### CREATE Operation

1. **User Action:** Fills form and clicks "Add User"
2. **React:** `App.jsx` → `handleSubmit()` → `userAPI.create(formData)`
3. **API Service:** `api.js` → `POST http://localhost:3000/users`
4. **Express:** `index.js` → Route `/users` → `db.createUser()`
5. **Database:** `queries.js` → `INSERT INTO users ...` → PostgreSQL
6. **Response:** PostgreSQL → `queries.js` → `index.js` → `api.js` → `App.jsx`
7. **UI Update:** React state updates, user list refreshes

## Configuration

### Environment Variables

**Backend (.env):**
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=mydb
DB_PASSWORD=your_password
DB_PORT=5432
PORT=3000
```

**Frontend (frontend/.env):**
```env
VITE_API_URL=http://localhost:3000
```

### Database Setup

Run the SQL script to create the users table:
```bash
psql -U your_username -d your_database -f database-setup.sql
```

Or manually:
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

All endpoints are RESTful and follow standard conventions:

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/users` | Get all users | - |
| GET | `/users/:id` | Get user by ID | - |
| POST | `/users` | Create new user | `{ "name": "string", "email": "string" }` |
| PUT | `/users/:id` | Update user | `{ "name": "string", "email": "string" }` |
| DELETE | `/users/:id` | Delete user | - |

## Security Features

1. **CORS Enabled:** Allows frontend to make requests from different origin
2. **Parameterized Queries:** Prevents SQL injection attacks
3. **Environment Variables:** Sensitive data stored in `.env` (not committed to Git)
4. **Error Handling:** Comprehensive error handling at all layers

## Running the Application

### 1. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your database credentials.

### 3. Start Backend Server

```bash
npm start
# or
node index.js
```

Server runs on `http://localhost:3000`

### 4. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

### 5. Verify Connection

1. Open browser to `http://localhost:5173`
2. Check browser console for API requests
3. Check backend console for incoming requests
4. Test CRUD operations:
   - Create a user
   - View users list
   - Edit a user
   - Delete a user

## Troubleshooting

### Frontend can't connect to API

- **Check:** Is the backend server running on port 3000?
- **Check:** Is `VITE_API_URL` correctly set in `frontend/.env`?
- **Check:** Browser console for CORS errors

### Database connection errors

- **Check:** PostgreSQL is running
- **Check:** `.env` file has correct database credentials
- **Check:** Database exists and table is created
- **Check:** User has proper permissions

### CORS errors

- **Check:** `cors` package is installed: `npm install cors`
- **Check:** `app.use(cors())` is in `index.js`

## Testing the Connection

### Test Backend API Directly

```bash
# Get all users
curl http://localhost:3000/users

# Create user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

### Test Frontend Connection

Open browser DevTools → Network tab → Perform actions in React app → Verify requests to `/users` endpoint.

## Summary

✅ **React Frontend** (Port 5173) - User interface  
✅ **Express API** (Port 3000) - REST API server  
✅ **PostgreSQL** (Port 5432) - Database  
✅ **CRUD Operations** - Create, Read, Update, Delete  
✅ **Error Handling** - Comprehensive at all layers  
✅ **Security** - CORS, parameterized queries, environment variables  

The complete connection chain is working and ready for use!

