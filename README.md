# Full Stack E-Commerce Application

A modern e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring a responsive design and essential e-commerce functionality.
**Developer: [Zain Hassan](https://zainhassan.vercel.app/)**
## Features

- User authentication and authorization
- Product browsing and searching
- Shopping cart functionality
- Secure payment processing
- Admin dashboard
- Responsive design
- Category-based product filtering
- Order management
- User profile management

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Tailwind CSS for styling
- Zustand for state management
- Axios for API calls
- React Hot Toast for notifications

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payment processing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/zainhassanee/Full-Stack-Ecom.git
cd Full-Stack-Ecom
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

5. Create a `.env` file in the frontend directory with the following variables:
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Project Structure

```
Full-Stack-Ecom/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

