# Ecom Backend

A Node.js and Express-based backend API for an e-commerce application. This API provides functionality for user, seller, product, order, and admin management. It includes role-based authentication, authorization, and robust CRUD operations.

---

## Features

- **User Management:** User registration, login, profile updates, and deletion.
- **Seller Management:** Sellers can manage products and view orders.
- **Order Management:** Users can place, view, and cancel orders.
- **Product Management:** CRUD operations for products by sellers.
- **Admin Operations:** Manage users, sellers, and view all placed orders.
- **Role-Based Access Control:** Authentication and authorization for `user`, `seller`, and `admin`.
- **Structured Codebase:** Follows MVC pattern for scalability and maintainability.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)
- **Environment Configuration:** dotenv

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/utkarshh0/ecom-backend.git
   cd ecom-backend
   

2. Install dependencies:
   ```bash
   npm install

  
3. Set up the environment variables. Create a .env file in the root directory and configure the following:
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret


2. Start the server:
   ```bash
   npm start

## API Documentation

Detailed API documentation is available here.

[API Documentation.pdf](https://github.com/user-attachments/files/17964588/API.Documentation.pdf)
