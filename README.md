# GPT Rewards Website - RewardHub

A comprehensive Get-Paid-To (GPT) reward platform similar to freecash.com, built with React, Node.js, and MongoDB.

## 🚀 Features

### User Features
- **Multiple Task Types**: Surveys, games, app downloads, video watching, offers
- **Real Money Rewards**: Earn real cash for completing simple tasks
- **Multiple Payment Options**: PayPal, cryptocurrency, gift cards
- **Low Payout Threshold**: Minimum withdrawal starting at $0.50
- **Referral System**: Earn $5 for each friend you refer
- **Level System**: Unlock higher-paying tasks as you level up
- **User Dashboard**: Comprehensive earnings overview and analytics

### Technical Features
- **Modern React Frontend**: Built with TypeScript and Material-UI
- **Secure Authentication**: JWT-based auth with bcrypt password hashing
- **RESTful API**: Express.js backend with MongoDB
- **Responsive Design**: Mobile-first approach with Material-UI
- **Real-time Updates**: Live balance updates and notifications
- **Data Visualization**: Charts and graphs for earnings tracking

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for components and styling
- **React Router** for navigation
- **Recharts** for data visualization
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Helmet** for security headers
- **CORS** for cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd gpt-rewards-website
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (frontend + backend)
npm run install-deps
```

### 3. Environment Setup

#### Backend Environment
Create a `.env` file in the `server` directory:
```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/gptrewards

# JWT Secret (generate a secure random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Payment Providers
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

# Add other environment variables as needed
```

#### Frontend Environment
Create a `.env` file in the `client` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Database Setup
Make sure MongoDB is running on your system or configure a cloud MongoDB instance.

### 5. Start the Application
```bash
# Development mode (runs both frontend and backend)
npm run dev

# Or run separately:
# Backend only
npm run server

# Frontend only
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🏗️ Project Structure

```
gpt-rewards-website/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── auth/       # Authentication components
│   │   │   ├── dashboard/  # Dashboard components
│   │   │   ├── layout/     # Layout components
│   │   │   ├── tasks/      # Task-related components
│   │   │   └── ...
│   │   ├── context/        # React context providers
│   │   ├── utils/          # Utility functions
│   │   └── App.tsx         # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── middleware/         # Express middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### Tasks
- `GET /api/tasks` - Get available tasks
- `POST /api/tasks/:id/start` - Start a task
- `POST /api/tasks/:id/complete` - Complete a task

### Payments
- `GET /api/payments` - Get payment history
- `POST /api/payments/withdraw` - Request withdrawal

### Admin (Admin only)
- `GET /api/admin/users` - Get all users
- `POST /api/admin/tasks` - Create new task
- `PUT /api/admin/tasks/:id` - Update task

## 📊 Database Models

### User Model
- Personal information (name, email, username)
- Balance and earnings tracking
- Level and XP system
- Referral system
- Payment methods
- User preferences and statistics

### Task Model
- Task details (title, description, type)
- Reward amount and requirements
- Provider information
- Usage limits and statistics

### Additional Models
- TaskCompletion (tracks user task completions)
- Payment (tracks withdrawal requests)
- Referral (tracks referral relationships)

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Express-validator for all inputs
- **Rate Limiting**: Prevent API abuse
- **CORS Protection**: Configured for specific origins
- **Helmet**: Security headers
- **MongoDB Injection Protection**: Mongoose built-in protection

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `cd client && npm run build`
2. Deploy the `build` folder to your hosting provider
3. Set environment variables for production API URL

### Backend Deployment (Heroku/DigitalOcean)
1. Set up production environment variables
2. Configure MongoDB connection for production
3. Deploy the `server` directory
4. Set up domain and SSL certificate

### Environment Variables for Production
- Use strong JWT secrets
- Configure payment provider APIs
- Set up email service for notifications
- Configure proper CORS origins

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Advanced admin dashboard
- [ ] Real-time notifications
- [ ] Social features and user interaction
- [ ] AI-powered task recommendations
- [ ] Cryptocurrency rewards
- [ ] Multi-language support
- [ ] Advanced analytics and reporting

## 🐛 Known Issues

- Registration component needs to be implemented
- Task system requires integration with third-party providers
- Payment processing needs real payment gateway integration
- Admin panel requires full implementation

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

Built with ❤️ using React, Node.js, and MongoDB