# GreenCards Learning App

## Project Description

GreenCards is a full-stack flashcard learning website built to help users create, manage, and study digital flashcards in one place. The problem this website solves is that students often use scattered notes or static documents for revision, which makes it harder to organise questions, review answers, and track learning progress.

This app allows users to register, log in, create flashcards, search through them in real time, study them using study mode, and view their own learning history. Admin users can also view all users' learning history, which supports a basic learning management use case.

The app behaves like a single-page application because React dynamically updates the page content without loading separate HTML pages.

---

## Main Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control for normal users and admins
- Create, read, update, and delete flashcards
- Live search for flashcards
- Difficulty filtering
- Study mode with "Got it" and "Review again"
- User learning history
- Admin view for all users' learning history
- Responsive pastel green interface

---

## Technical Stack

### Frontend
- React
- JavaScript
- CSS
- Vite

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Security and Authentication
- bcryptjs for password hashing
- jsonwebtoken for JWT authentication
- Role-based access control for admin-only pages

### Other Dependencies
- cors
- dotenv
- nodemon

---

## Folder Structure

```text
greencards-app/
  client/
    src/
      api/
        api.js
      components/
        FlashcardCard.jsx
        FlashcardModal.jsx
        Navbar.jsx
        StudyMode.jsx
      pages/
        AdminHistory.jsx
        Dashboard.jsx
        Login.jsx
        MyHistory.jsx
        Register.jsx
      App.jsx
      main.jsx
      style.css
    index.html
    package.json

  server/
    middleware/
      adminMiddleware.js
      authMiddleware.js
    models/
      Flashcard.js
      LearningHistory.js
      User.js
    routes/
      authRoutes.js
      flashcardRoutes.js
      historyRoutes.js
    .env
    .gitignore
    package.json
    server.js

  .gitignore
  README.md
```

---

## Folder Explanation

client

This folder contains the React frontend of the app.

client/src/api

This folder contains reusable API helper functions for sending requests from React to the backend.

client/src/components

This folder contains reusable UI components such as the navigation bar, flashcard card, modal form, and study mode.

client/src/pages

This folder contains the main page components, including login, register, dashboard, user history, and admin history.

server

This folder contains the Express.js backend.

server/models

This folder contains the Mongoose database models for User, Flashcard, and LearningHistory.

server/routes

This folder contains backend API routes for authentication, flashcard CRUD operations, and learning history.

server/middleware

This folder contains middleware for checking JWT authentication and admin access.

---

## Database Entities

The app uses three main conceptual entities.

1. User

Stores user account details, hashed password, and role.

2. Flashcard

Stores the flashcard question, answer, category, difficulty, and the user who created it.

3. LearningHistory

Stores the user's study activity, including the flashcard studied, result, and date.

---

## Workload Allocation

### Krithik's Contribution

Krithik implemented the registration and login functionality, including:

server/models/User.js
server/routes/authRoutes.js
server/middleware/authMiddleware.js
client/src/pages/Login.jsx
client/src/pages/Register.jsx

Krithik's work focused on:

user registration
user login
password hashing
JWT token creation
storing logged-in user details
protecting private routes

### Divya's Contribution

Divya implemented the flashcard functionality and live search, including:

server/models/Flashcard.js
server/routes/flashcardRoutes.js
client/src/pages/Dashboard.jsx
client/src/components/FlashcardCard.jsx
client/src/components/FlashcardModal.jsx
client/src/style.css

Divya's work focused on:

flashcard CRUD
live search
difficulty filtering
flashcard display
add/edit modal
responsive interface styling
Shared Krithik and Divya Contribution

### Both Krithik and Divya worked on the user profile and learning history requirement, including:

server/models/LearningHistory.js
server/routes/historyRoutes.js
server/middleware/adminMiddleware.js
client/src/pages/MyHistory.jsx
client/src/pages/AdminHistory.jsx
client/src/components/StudyMode.jsx
client/src/api/api.js
client/src/App.jsx
client/src/main.jsx
client/src/components/Navbar.jsx
server/server.js

This shared work focused on:

saving learning history
displaying user learning history
allowing admins to view all users' history
connecting frontend and backend API requests
managing the single-page app flow

Each file also includes a file-level author comment to make the contribution clear.

---

## How to Run the App

### 1. Clone the repository

If you are using Github, clone the project:

git clone https://github.com/your-username/greencards-app.git
cd greencard-app

If you are using a downloaded ZIP file, unzip the file and open it in VS Code.

### 2. Install Backend Dependencies

Open a terminal in VS Code and run:

cd server
npm install

### 3. Create the Backend Environment File

Inside the server folder, create a file named:

.env

Add the following:

MONGO_URI=mongodb://127.0.0.1:27017/greencards_app
JWT_SECRET=greencards_secret_key_change_later
PORT=3000

### 4. Start MongoDB

Make sure MongoDB is running locally on your computer.

The app uses this local MongoDB connection:

mongodb://127.0.0.1:27017/greencards_app

### 5. Run the Backend Server

In the server folder, run:

npm run dev

The backend should run on:

http://localhost:3000

You can test the backend by opening:

http://localhost:3000

It should show:

GreenCards API is running

### 6. Install Frontend Dependencies

Open a second terminal in VS Code and run:

cd client
npm install

### 7. Run the Frontend

In the client folder, run:

npm run dev

The frontend should run on:

http://localhost:5173

Test the following functions:
- register
- login
- add flashcard
- edit flashcard
- delete flashcard
- live search
- study mode
- my history
- admin history

---

## Security Notes

- Passwords are hashed using bcryptjs before being stored in MongoDB.
- JWT tokens are used to authenticate users.
- Admin-only routes are protected using role-based access control.
- Sensitive values such as MONGO_URI and JWT_SECRET are stored in .env.
- .env and node_modules are excluded from GitHub using .gitignore.

---

## API Routes

### Authentication Routes

POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

### Flashcard Routes

GET    /api/flashcards
POST   /api/flashcards
PUT    /api/flashcards/:id
DELETE /api/flashcards/:id

### Learning History Routes

POST /api/history
GET  /api/history/me
GET  /api/history/all

The /api/history/all route is protected and only available to admin users.