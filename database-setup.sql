-- Database Setup Script
-- Run this script in your PostgreSQL database to create the users table

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert sample data (optional)
-- INSERT INTO users (name, email) VALUES 
--     ('John Doe', 'john.doe@example.com'),
--     ('Jane Smith', 'jane.smith@example.com');

-- Verify the table was created
SELECT * FROM users;

