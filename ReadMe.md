# User Management System

A full-stack web application for managing users with **Admin** and **User** roles. The Admin Dashboard allows viewing, activating/deactivating users, and paginating through user data. The project is built with **React**, **Node.js/Express**, and **MongoDB**.

---

## Features

- User authentication with JWT tokens  
- Admin Dashboard:
  - View all registered users  
  - Activate/Deactivate users  
  - Pagination for user list  
- Role-based access control (Admin/User)  
- Secure password storage with hashing  
- Responsive UI built with React  

---

## Tech Stack

- Frontend: React.js, React Router, CSS  
- Backend: Node.js, Express.js  
- Database: MongoDB (Mongoose)  
- Authentication: JWT (JSON Web Tokens)  
- API Client: Axios  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Userunknown84/UserManagementSystem.git
cd user-management-system

Install dependencies for both frontend and backend:
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install


Start the servers:
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start

