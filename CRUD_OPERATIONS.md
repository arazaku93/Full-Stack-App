# CRUD Operations Guide

This document describes how the React application performs Create, Read, Update, and Delete operations on the database.

## Database Setup

First, ensure your database table exists. Run the SQL script:

```bash
psql -U your_username -d your_database -f database-setup.sql
```

Or manually create the table:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## CRUD Operations

### ✅ CREATE - Add New Users

**Frontend Implementation:**
- Location: `frontend/src/App.jsx` - `handleSubmit()` function
- When: User fills out the form and clicks "Add User" button
- API Call: `POST /users`
- Backend: `queries.js` - `createUser()` function
- Database: `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`

**How to Use:**
1. Fill in the "Name" and "Email" fields in the form
2. Click "Add User" button
3. The user is created in the database and appears in the users list

### ✅ READ - View All Users

**Frontend Implementation:**
- Location: `frontend/src/App.jsx` - `fetchUsers()` function
- When: Component mounts and after any CRUD operation
- API Call: `GET /users`
- Backend: `queries.js` - `getUsers()` function
- Database: `SELECT * FROM users ORDER BY id ASC`

**How to Use:**
- Users are automatically loaded when the page loads
- Users list refreshes after Create, Update, or Delete operations

### ✅ UPDATE - Edit Existing Users

**Frontend Implementation:**
- Location: `frontend/src/App.jsx` - `handleSubmit()` and `handleEdit()` functions
- When: User clicks "Edit" button on a user card
- API Call: `PUT /users/:id`
- Backend: `queries.js` - `updateUser()` function
- Database: `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`

**How to Use:**
1. Click the "Edit" button on any user card
2. The form populates with the user's current data
3. Modify the name or email
4. Click "Update User" button
5. The user is updated in the database

### ✅ DELETE - Remove Users

**Frontend Implementation:**
- Location: `frontend/src/App.jsx` - `handleDelete()` function
- When: User clicks "Delete" button on a user card
- API Call: `DELETE /users/:id`
- Backend: `queries.js` - `deleteUser()` function
- Database: `DELETE FROM users WHERE id = $1 RETURNING *`

**How to Use:**
1. Click the "Delete" button on any user card
2. Confirm the deletion in the popup dialog
3. The user is removed from the database

## API Endpoints

All endpoints are available at `http://localhost:3000` (or your configured API URL):

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/users` | Get all users | - |
| GET | `/users/:id` | Get user by ID | - |
| POST | `/users` | Create new user | `{ "name": "string", "email": "string" }` |
| PUT | `/users/:id` | Update user | `{ "name": "string", "email": "string" }` |
| DELETE | `/users/:id` | Delete user | - |

## Error Handling

All operations include comprehensive error handling:

- **Network Errors**: Displayed when the backend server is not running
- **Validation Errors**: Displayed for invalid data (e.g., duplicate emails)
- **Database Errors**: Displayed when database operations fail
- **Success Messages**: Confirmed when operations complete successfully

## Testing CRUD Operations

1. **Start the backend server:**
   ```bash
   node index.js
   ```

2. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test CREATE:**
   - Add a new user with name and email
   - Verify it appears in the users list

4. **Test READ:**
   - Verify all users are displayed on page load
   - Check that user IDs, names, and emails are shown

5. **Test UPDATE:**
   - Click "Edit" on a user
   - Modify the name or email
   - Click "Update User"
   - Verify the changes are reflected

6. **Test DELETE:**
   - Click "Delete" on a user
   - Confirm the deletion
   - Verify the user is removed from the list

## Data Flow

```
React Frontend (App.jsx)
    ↓
API Service (services/api.js)
    ↓
Express Backend (index.js)
    ↓
Database Queries (queries.js)
    ↓
PostgreSQL Database
```

All operations are fully functional and connected end-to-end!

