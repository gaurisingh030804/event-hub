# EventHub – College Event Management System

EventHub is a MERN (MongoDB, Express, React, Node) based college event management platform. It enables societies to create and manage events and allows students to discover, register, and receive notifications for events.

Key goals:
- Simple event creation and management for societies
- Easy browsing and registration for students
- Secure authentication and role-based access control
- Email notifications for important event actions

---

## Tech stack

- Frontend: React, Vite, React Router
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Auth: JSON Web Tokens (JWT)
- Email: Nodemailer

---

## Main features

- JWT-based authentication (Student / Society roles)
- Role-based access control and protected routes
- Society: create, update, and manage events
- Student: browse events and register
- Email notifications upon registration
- RESTful API with MongoDB persistence

---

## Project structure

```text
/ (project root)
├── client/        # React frontend (Vite)
├── server/        # Express backend
├── .gitignore
└── README.md
```

(See [client/](/Users/anuragsingh/Desktop/project1/client) and [server/](/Users/anuragsingh/Desktop/project1/server) for implementation details.)

---

## Prerequisites

- Node.js (>= 16 recommended)
- npm or yarn
- MongoDB (local or Atlas)

---

## Quick start (development)

1. Clone the repository and change into it:

   git clone https://github.com/gaurisingh030804/event-hub.git
   cd event-hub

2. Install backend dependencies and frontend dependencies:

   cd server && npm install
   cd ../client && npm install

3. Configure environment variables for the server

   - Copy the example env file inside the server folder:

     cd ../server
     cp .env.example .env

   - Edit `.env` and set these values (example):

     MONGO_URI=mongodb://localhost:27017/college-events
     PORT=5000
     JWT_SECRET=your_jwt_secret_here
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-email-app-password

   Notes:
   - For Gmail, generate an App Password (if using 2FA) or enable "Less secure app access" (not recommended).
   - When using MongoDB Atlas, use the provided connection string for MONGO_URI.

4. Run the backend and frontend

   - Start backend (from server/):
     npm run dev

   - Start frontend (from client/):
     npm run dev

   - Default URLs:
     Frontend: http://localhost:5173
     Backend API: http://localhost:5000

---

## Demo accounts

- Student
  - Email: student@jss.com
  - Password: 123456

- Society
  - Email: society@jss.com
  - Password: 123456

(Use these for manual testing if seeded by the server. If they are not present, create accounts through the signup flow.)

---

## API (quick examples)

- Get events (public):

  curl http://localhost:5000/api/events

- Register for an event (authenticated):

  curl -X POST http://localhost:5000/api/events/:id/register \
    -H "Authorization: Bearer <TOKEN>" \
    -H "Content-Type: application/json"

Adjust endpoints according to the server routes in [server/](/Users/anuragsingh/Desktop/project1/server).

---

## Environment & production notes

- Use a strong JWT_SECRET in production
- Use MongoDB Atlas or a managed DB for reliability
- Configure a real transactional email provider (SendGrid, Mailgun) for higher deliverability
- Consider environment-specific config (staging/production)

---

## Future improvements (ideas)

- Admin dashboard for site-wide management
- Event search, filters, and categories
- Event image uploads and rich descriptions
- QR-based check-in and attendance tracking
- Event analytics and reporting
- CI/CD and cloud deployment (Heroku, Vercel, Railway, or Docker + Kubernetes)

---

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a feature branch: git checkout -b feat/your-feature
3. Make changes and add tests if applicable
4. Open a PR with a clear description of the change

Please keep changes focused and run the app locally to verify functionality.

---

## License

Include a license file in the repo (e.g., MIT). If none exists, add one or update this section accordingly.

---

## Author

Gauri Singh — https://github.com/gaurisingh030804

---

If any of these instructions need to be tailored for a specific deployment environment (Docker, CI, or cloud provider), mention the target and the README can be extended with deployment steps.

