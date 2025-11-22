# React + Express + PostgreSQL Full-Stack Application

A complete full-stack application with React frontend, Express REST API, and PostgreSQL database with full CRUD functionality.

## 🏗️ Architecture

```
React Frontend (Vite) → Express API → PostgreSQL Database
```

- **Frontend:** React with Vite (Port 5173)
- **Backend:** Express.js REST API (Port 3000)
- **Database:** PostgreSQL (Port 5432)

## ✨ Features

- ✅ **Create** - Add new users to the database
- ✅ **Read** - View all users and individual user details
- ✅ **Update** - Edit existing user information
- ✅ **Delete** - Remove users from the database
- ✅ **Error Handling** - Comprehensive error handling at all layers
- ✅ **Environment Variables** - Secure configuration management
- ✅ **CORS Enabled** - Cross-origin resource sharing configured
- ✅ **Modern UI** - Beautiful, responsive user interface

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

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

### 2. Database Setup

Create your PostgreSQL database and run the setup script:

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

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update with your database credentials:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=mydb
DB_PASSWORD=your_password
DB_PORT=5432
PORT=3000
VITE_API_URL=http://localhost:3000
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000

## 📁 Project Structure

```
Project2/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Styles
│   │   ├── main.jsx         # React entry point
│   │   └── services/
│   │       └── api.js       # API service layer
│   ├── package.json
│   └── vite.config.js
├── index.js                  # Express server entry point
├── queries.js                # PostgreSQL database queries
├── package.json              # Backend dependencies
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment template
├── database-setup.sql        # Database schema
└── README.md                  # This file
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

### Example API Requests

**Create User:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

**Get All Users:**
```bash
curl http://localhost:3000/users
```

## 🛠️ Technologies Used

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **pg** - PostgreSQL client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database
- **PostgreSQL** - Relational database

## 🔒 Security

- ✅ Environment variables for sensitive data
- ✅ Parameterized SQL queries (prevents SQL injection)
- ✅ CORS configuration
- ✅ Error handling and validation
- ✅ `.env` files excluded from Git

## 📚 Documentation

- [CRUD Operations Guide](./CRUD_OPERATIONS.md) - Detailed CRUD operation documentation
- [Connection Guide](./CONNECTION_GUIDE.md) - How React connects to PostgreSQL
- [Setup Guide](./SETUP.md) - Environment setup instructions

## 🧪 Testing

### Test Backend API

```bash
# Test server is running
curl http://localhost:3000/

# Get all users
curl http://localhost:3000/users

# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

### Test Frontend

1. Open http://localhost:5173
2. Open browser DevTools → Network tab
3. Perform CRUD operations
4. Verify API requests in Network tab

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify `.env` file has correct database credentials
- Ensure port 3000 is not in use

### Frontend can't connect to API
- Verify backend server is running on port 3000
- Check `VITE_API_URL` in `frontend/.env`
- Look for CORS errors in browser console

### Database connection errors
- Verify PostgreSQL service is running
- Check database credentials in `.env`
- Ensure database and table exist
- Verify user has proper permissions

## 📝 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Built with ❤️ using React, Express, and PostgreSQL**

