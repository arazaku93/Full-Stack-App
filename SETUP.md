# Environment Setup Guide

This project uses environment variables to protect sensitive information like database credentials and API keys.

## Quick Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your actual values:**
   - Update database credentials (DB_USER, DB_PASSWORD, DB_NAME, etc.)
   - Update any other configuration values as needed

3. **For Frontend (optional):**
   ```bash
   cd frontend
   cp .env.example .env
   ```
   - Update `VITE_API_URL` if your backend runs on a different port/URL

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_HOST` | Database host | `localhost` |
| `DB_NAME` | Database name | `mydb` |
| `DB_PASSWORD` | Database password | `your_password` |
| `DB_PORT` | Database port | `5432` |
| `PORT` | Express server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `VITE_API_URL` | API URL for frontend | `http://localhost:3000` |

### Frontend (frontend/.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` |

**Note:** Vite requires the `VITE_` prefix for environment variables to be exposed to the client-side code.

## Security Best Practices

✅ **DO:**
- Keep `.env` files in `.gitignore` (already configured)
- Use `.env.example` as a template for required variables
- Use different `.env` files for different environments (development, production)
- Never commit `.env` files to version control

❌ **DON'T:**
- Commit `.env` files to Git
- Share `.env` files in public repositories
- Hardcode sensitive values in source code
- Use production credentials in development

## Verifying Setup

After setting up your `.env` file, verify it's working:

1. **Check if .env is ignored by Git:**
   ```bash
   git status
   ```
   The `.env` file should NOT appear in the list.

2. **Test the backend connection:**
   ```bash
   node index.js
   ```
   The server should start and connect to your database.

3. **Test the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend should connect to the backend API.

## Troubleshooting

- **"Cannot find module 'dotenv'"**: Run `npm install` in the root directory
- **Database connection errors**: Verify your `.env` database credentials are correct
- **Frontend can't connect to API**: Check `VITE_API_URL` in `frontend/.env` matches your backend URL

