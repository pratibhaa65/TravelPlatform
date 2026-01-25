# TravelPlatform

**TravelPlatform** is a full-stack web application for booking travel packages, built with **React, Node.js, Express, MongoDB**, and **Tailwind CSS**.

## Features

- User/Admin authentication (JWT, role-based)
- Browse, book, and manage travel packages
- Payment via Khalti integration
- Admin analytics and dashboards (Recharts)
- Responsive and intuitive UI

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Frontend:** React (Vite), Tailwind CSS, React Router
- **Authentication:** JWT-based
- **Charts & Analytics:** Recharts

## Backend

**Models:**
- User, TravelPackage, Booking

**Controllers:**
- User, Package, Booking, Admin (users, packages, bookings, analytics)

**Routes:**
- `/api/users`, `/api/packages`, `/api/bookings`, `/api/payments`, `/api/admin`

**Middleware:**
- `authMiddleware`, `adminMiddleware`

## Frontend

- Public: Landing pages, Login, Register
- User: Dashboard, MyBookings, Packages
- Admin: Dashboard, Analytics, Manage Packages & Bookings, Users

## Processes

1. **User Registration/Login**
2. **Package Booking**
3. **Payment Verification (Khalti)**
4. **Admin Analytics & Management**
5. **Cancellation & Refund Handling**

## Installation

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
