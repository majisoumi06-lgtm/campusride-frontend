# CampusRide - React Frontend Application

CampusRide is a modern, responsive, and intuitive web application designed for campus carpooling and ride sharing.

This client is built with React 18, Vite, Tailwind CSS, React Router v6, Axios, and Lucide React icons.

---

## 🚀 Features

- **Campus Visual Identity:** Deep navy blue, sky blue, subtle elevation, and responsive typography tailored for university life.
- **Student Authentication:** JWT-based login, registration with student verification (College, Student ID, Vehicle details), and 1-click Demo credentials.
- **Find Rides:** Search by pickup location, destination, departure date, and minimum seats with real-time API filtering.
- **Offer Rides:** Publish empty seats with departure time, landmark pickup spots, and fuel contribution price.
- **Atomic Booking System:** Concurrency-safe seat reservations, pickup location notes, and real-time seat decrement.
- **Driver Management Portal (My Rides):** Accept or decline pending booking requests with one click, view confirmed passenger contacts, and cancel rides with automated notifications.
- **Passenger Booking Tracker (My Bookings):** Track status (Awaiting Driver, Confirmed, Declined, Cancelled), cancel bookings, and rate completed rides.
- **Peer Review & Rating System:** Star ratings (1-5) and written feedback with dynamic average recalculation.
- **In-App Notifications:** Real-time notification bell with unread counters and 1-click mark-all-read.
- **Admin Oversight Console:** Full administrative dashboard to monitor students, suspend inappropriate accounts, and audit all campus rides and bookings.

---

## 📁 Project Structure

```
campusride-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BookingCard.jsx         # Card for passenger bookings with status badges
│   │   ├── Footer.jsx              # Campus-themed footer with safety guidelines
│   │   ├── Navbar.jsx              # Responsive navigation & student profile drawer
│   │   ├── NotificationDropdown.jsx# Notification bell & unread alert tray
│   │   ├── ProtectedRoute.jsx      # Role & auth route guard
│   │   ├── ReviewModal.jsx         # Star rating & feedback modal
│   │   └── RideCard.jsx            # Modern ride offering card
│   ├── context/
│   │   └── AuthContext.jsx         # Global user state, JWT storage & helpers
│   ├── pages/
│   │   ├── AdminDashboardPage.jsx  # Student moderation & transportation auditing
│   │   ├── DashboardPage.jsx       # Student dashboard with live ride feeds
│   │   ├── FindRidesPage.jsx       # Search & multi-parameter filter interface
│   │   ├── LandingPage.jsx         # Public landing page with hero & testimonials
│   │   ├── LoginPage.jsx           # Student login with 1-click demo buttons
│   │   ├── MyBookingsPage.jsx      # Passenger booking manager
│   │   ├── MyRidesPage.jsx         # Driver rides & request approval portal
│   │   ├── NotFoundPage.jsx        # 404 handler
│   │   ├── OfferRidePage.jsx       # Ride listing form
│   │   ├── ProfilePage.jsx         # User & vehicle profile editor
│   │   └── RideDetailsPage.jsx     # Detailed ride view & booking widget
│   ├── services/
│   │   └── api.js                  # Axios instance with JWT interceptor
│   ├── App.jsx                     # Route definitions
│   ├── index.css                   # Tailwind styles & gradients
│   └── main.jsx                    # React entry point
├── .env.example
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 🛠 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **CampusRide Backend** running on `http://localhost:5000`

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `VITE_API_URL` points to your backend:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

The application will launch on `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
```
Build output is saved to the `dist/` directory.
