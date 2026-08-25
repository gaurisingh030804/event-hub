# EventHub – College Event Management System

A MERN-based event management platform that enables societies to create and manage college events while allowing students to discover and register for events.

## Tech Stack

- **Frontend:** React.js, React Router, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT
- **Email:** Nodemailer

## Features

- JWT-based authentication
- Role-based access control for Students and Societies
- Societies can create and manage events
- Students can view available events
- Students can register for events
- Email notifications after registration
- Protected routes and APIs
- MongoDB database integration

## Project Structure

```text
event-hub/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── index.js
│
├── .gitignore
└── README.md

Prerequisites
Node.js installed
MongoDB running locally or MongoDB Atlas
Installation
1. Clone the Repository
git clone https://github.com/gaurisingh030804/event-hub.git
cd event-hub

2. Install Dependencies
cd server
npm install

cd ../client
npm install

3. Configure Environment Variables

Inside the server folder:

cp .env.example .env

Update the .env file:

MONGO_URI=mongodb://localhost:27017/college-events
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

4. Run the Application

Start the backend:

cd server
npm run dev

Start the frontend in another terminal:

cd client
npm run dev

Frontend:

http://localhost:5173

Backend:

http://localhost:5000
Demo Accounts
Student
Email: student@jss.com
Password: 123456
Society
Email: society@jss.com
Password: 123456
Future Improvements
Admin dashboard
Event search and filtering
Event categories
Event image uploads
QR-based event check-in
Event analytics
MongoDB Atlas integration
Cloud deployment
Author

Gauri Singh

GitHub: https://github.com/gaurisingh030804


```
