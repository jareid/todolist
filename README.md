# To-Do List Application
This is a full-stack To-Do List web application. The frontend is built with React and TypeScript, while the backend is powered by Node.js with PostgreSQL as the database.

#Features
Create, edit, and view to-do items.
Independent frontend and backend setup.
Data stored in PostgreSQL.
Built with TypeScript for both frontend and backend.

#Prerequisites
To run the application, ensure you have the following installed:

Node.js (v14 or higher)
npm (comes with Node.js)
PostgreSQL (v12 or higher)

#Setup Instructions
##1. Clone the Repository
First, clone the repository to your local machine:

git clone https://github.com/your-username/todo-list.git
cd todo-list

##2. Backend Setup
###2.1. Install Backend Dependencies
Navigate to the backend/ directory and install all dependencies:

bash
Copiar código
cd backend
npm install

##2.2. Configure the PostgreSQL Database

Ensure PostgreSQL is installed and running.

Create a new PostgreSQL database:
psql -U postgres
CREATE DATABASE todolist;
Create the duties table by executing the following SQL:

CREATE TABLE duties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

In the backend/src/db.ts file, update the PostgreSQL connection settings:

const pool = new Pool({
  user: 'your_postgres_username',
  host: 'localhost',
  database: 'todolist',
  password: 'your_postgres_password',
  port: 5432,
});

##2.3. Run the Backend Server
Start the backend server by running:

bash
npm start
This will start the backend server on http://localhost:5000.

#3. Frontend Setup
##3.1. Install Frontend Dependencies
Navigate to the frontend/ directory and install the dependencies:

bash
cd ../frontend
npm install

##3.2. Configure Proxy for API Calls
To ensure the frontend communicates with the backend, add the following proxy entry in the frontend/package.json file:

"proxy": "http://localhost:5000"

##3.3. Run the Frontend
To run the frontend, use the following command:

npm start
This will start the frontend server on http://localhost:3000.

#Running the Application
Once both the frontend and backend servers are running:

Visit http://localhost:3000 to interact with the To-Do List app.
The frontend will communicate with the backend API to fetch, create, and update to-do items.

#Running Tests

Run the backend tests with:

cd backend
npm test
Frontend Tests
Run the frontend tests with:

cd frontend
npm test

#Troubleshooting
If you encounter any issues:

Ensure PostgreSQL is running and the database is set up correctly.
Check the backend logs for database connection errors.
Make sure both servers are running on the correct ports.

#Conclusion
Now you're ready to manage your tasks with the To-Do List app! If you encounter any issues or have any questions, feel free to reach out.

#License
This project is licensed under the MIT License.
