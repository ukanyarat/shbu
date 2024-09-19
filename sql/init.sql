-- Create the database
CREATE DATABASE Shabu;

-- Connect to the new database
\c mywebapp

-- Create the users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20)
);

-- Insert some initial data
INSERT INTO users (username, password, phone)
VALUES 
    ('user1', 'password1', '1234567890'),
    ('user2', 'password2', '0987654321');

----------------------------------------------------------------------table
CREATE TABLE IF NOT EXISTS public."Tables"
(
    table_id character(1) COLLATE pg_catalog."default" NOT NULL,
    table_name text COLLATE pg_catalog."default" NOT NULL,
    table_status boolean NOT NULL,
    CONSTRAINT "Tables_pkey" PRIMARY KEY (table_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Tables"
    OWNER to postgres;