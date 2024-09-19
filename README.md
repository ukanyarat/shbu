# My PostgreSQL Project

This project sets up a PostgreSQL database using Docker.

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone this repository
2. Run `docker-compose up -d` to start the database
3. Connect to the database using:
   - Host: localhost
   - Port: 5432
   - Database: mywebapp
   - Username: postgres
   - Password: mysecretpassword

## Initial Data

The database is initialized with a `users` table and some sample data.