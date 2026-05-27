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

## How to Run the App

### 1. Clone the repository

```bash
git clone https://github.com/your-username/greencards-app.git
then run this command: npm run dev and click on the local host link to view the website.