# Csv Search Application

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- Git installed (optional).

## Getting Started

To set up and run the project: 

1. Clone the repository (if you haven't already). Enter the following into your terminal:

   ```bash
   git clone https://github.com/micaellaa/csv-search-app.git
   ```

   Alternatively, you can download the project as a ZIP archive from GitHub.

## Running the Application

1. Navigate to the project's root directory by entering the following into your terminal:
   ```bash
   cd csv-search-app
   ```
   Check that the content of this directory includes folders like "backend", and "csv-search-app" (the frontend project folder).
   Ensure that you are not inside the project frontend folder before running the next commands.
3. Install dependencies for the frontend and backend by entering the following into your terminal:
   ```bash
   npm install concurrently
   ```
   ```bash
   npm run install-all
   ```
5. Start the frontend and backend concurrently by entering the following into your terminal:
   ```bash
   npm start
   ```
6. Access the application:

- Frontend: Open your web browser and go to `http://localhost:3000`.
- Backend: Your backend server should be running on `http://localhost:3001`. You can access backend APIs using this base URL.
