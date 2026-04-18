# ShopX - Full-Stack Online Store

This project is a full-stack e-commerce application with:

- JWT auth (register/login)
- Product listing, search/filter, product details
- Cart with `localStorage` persistence
- Checkout and order history
- Admin dashboard with product and order management
- Role-based access control (USER/ADMIN)

## Tech Stack

- Frontend: React + Vite + React Router + Framer Motion
- Backend: Node.js + Express + Prisma + MySQL

## Setup

### 1) Backend

```bash
cd server
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Default admin credentials:

- Email: `admin@store.com`
- Password: `Admin123!`

### 2) Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`.

## API Overview

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- Products: `GET /api/products`, `GET /api/products/:id`, admin CRUD on `/api/products`
- Orders: `POST /api/orders/checkout`, `GET /api/orders/my`, admin `GET /api/orders`

## Optional Payment Integration

Integrate Stripe/Razorpay in the checkout page before calling `/api/orders/checkout`.
