# College Event Management System - JSS Academy Noida

## Tech Stack
- **Frontend:** React, React Router, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** JWT
- **Email:** Nodemailer

## Setup

### Prerequisites
- Node.js installed
- MongoDB running locally (or MongoDB Atlas URL)

### 1. Install Dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment

```bash
cd server
cp .env.example .env
```

Edit `.env` with your MongoDB URI and email credentials:
```
MONGO_URI=mongodb://localhost:27017/college-events
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Run the App

```bash
# Terminal 1 - Start backend
cd server && npm run dev

# Terminal 2 - Start frontend
cd client && npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:5000

## Demo Accounts
- Student: student@jss.com / 123456
- Society: society@jss.com / 123456

## Features
1. Societies can create events
2. Students can view events
3. Students can register for events
4. Email notifications on registration
5. JWT authentication with role-based access
