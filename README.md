# Online Service Booking System

Full-stack booking platform for home services built with Node.js, Express, React, and MongoDB.

## Features

- JWT-based registration and login
- Services catalog for electrician, plumbing, AC repair, and cleaning
- Booking creation with browser geolocation capture
- Automatic unique booking ID generation
- Automatic worker assignment per selected service
- Booking history with status tracking and worker details
- Optional location map preview in history

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT
- Frontend: React, Vite

## Run Locally

1. Install dependencies:

```bash
npm install
npm run install:all
```

2. Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/service-booking-system
JWT_SECRET=replace-with-a-secure-secret
CLIENT_URL=http://localhost:5173
```

3. Start MongoDB locally or point `MONGODB_URI` to your cluster.

4. Run the app:

```bash
npm run dev
```

5. Open `http://localhost:5173`.
