# Money Manager

This is a full-stack expense tracker application built with the java (MySQL, Express, React, Node.js).

## Features

- User registration and login with JWT authentication
- Add, view, edit, and delete income and expense transactions
- Dashboard with a summary of your financial status
- Sort transactions by date or amount
- Responsive design for use on desktop and mobile devices

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MySQL, JWT
- **Database:** MySQL

## Prerequisites

- Node.js and npm
- MySQL
- Postman (for API testing)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/money-manager.git
cd money-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file in the `backend` directory and add the following:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=moneymanager
JWT_SECRET=your_jwt_secret
```

- Create the database and tables using the `schema.sql` file.

- Start the backend server:

```bash
npm start
```

The backend will be running on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

- Start the frontend development server:

```bash
npm start
```

The frontend will be running on `http://localhost:3000`.

## API Testing with Postman

- **Register:** `POST /api/auth/register`
- **Login:** `POST /api/auth/login`
- **Get Transactions:** `GET /api/transactions` (requires `x-auth-token` header)
- **Add Transaction:** `POST /api/transactions` (requires `x-auth-token` header)
- **Update Transaction:** `PUT /api/transactions/:id` (requires `x-auth-token` header)
- **Delete Transaction:** `DELETE /api/transactions/:id` (requires `x-auth-token` header)
