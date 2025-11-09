Project Title
Task Management API – Node.js & Express

Overview
This project is a simple Task Management REST API built using Node.js and Express.js.
It allows users to perform CRUD operations on tasks: create, read, update, and delete.


Key Features
CRUD Endpoints: Create, read, update, and delete tasks
Validation: Ensures title and description are provided
Error Handling: Handles missing routes and invalid task IDs gracefully


Tech Stack
Runtime: Node.js
Framework: Express.js
Language: JavaScript (ES6)

Project Structure
task-api/
│
├── routes.js       
├── server.js        
└── package.json

Setup & Usage
1️. Clone the Repository
git clone https://github.com/<your-username>/task-management-api.git
cd task-management-api

2️. Install Dependencies
npm install

3️. Run the Server
node server.js

You should see:
Server running on http://localhost:3000
