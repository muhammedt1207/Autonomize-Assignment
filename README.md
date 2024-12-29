# GitHub User Explorer - Full Stack Application

A full-stack application that allows users to explore GitHub profiles and repositories. Built with React (TypeScript) for the frontend and Express.js/Node.js for the backend, featuring a modern UI and robust security measures.

## 🌟 Project Overview

This project consists of two main parts:
- **Frontend**: React application with Redux for state management
- **Backend**: Express.js API with MongoDB integration

### Frontend Features
- Search GitHub users
- View detailed user profiles
- Explore user repositories
- Responsive design
- Error handling with toast notifications
- State management with Redux
- Type safety with TypeScript

### Backend Features
- GitHub API integration
- Secure API implementation
- Rate limiting
- Data persistence with MongoDB
- Comprehensive error handling
- Request logging

## 🛠️ Technology Stack

### Frontend
- React 18
- TypeScript
- Redux Toolkit
- React Router v6
- Sonner (Toast notifications)
- Axios


### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Security packages:
  - Helmet
  - Express Rate Limit
  - CORS
  - MongoDB Sanitize

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- GitHub API access token

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/muhammedt1207/Autonomize-Assignment.git
cd github-user-explorer
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
PORT=8080
MONGODB_URI=your_mongodb_connection_string
GITHUB_TOKEN=your_github_api_token


# Start the server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
VITE_API_URL=http://localhost:8080

# Start the development server
npm run dev
```

## 🏗️ Project Structure

```
github-user-explorer/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── styles/
│   │   └── types/
│   ├── package.json
│   └── tsconfig.json
│
└── server/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── models/
    │   ├── routes/
    │   └── types/
    ├── package.json
    └── tsconfig.json
```

## 🖥️ Frontend Components

### Key Components
1. **SearchPage**
   - User search functionality
   - Error handling
   - Navigation to user profiles

2. **UserProfile**
   - Displays user information
   - Shows user repositories
   - Error handling with toast notifications

3. **ProfileDetails**
   - User statistics
   - Profile information display

4. **Repos**
   - Repository list
   - Repository details

## 🔌 Backend API Endpoints

### User Routes
```http
GET /user/:username     - Get user profile
GET /user/:username/repos - Get user repositories
```

## 🔒 Security Features

1. **Frontend**
   - Input validation
   - Error boundary implementation
   

2. **Backend**
   - Helmet.js security headers
   - Rate limiting
   - CORS configuration
   - Data sanitization
   

## 🧪 Testing

### Frontend Tests
```bash
cd client
npm test
```

### Backend Tests
```bash
cd server
npm test
```

## 📦 Building for Production

### Frontend Build
```bash
cd client
npm run build
```

### Backend Build
```bash
cd server
npm run build
```

## 🚀 Deployment

1. **Backend Deployment**
   - Set up MongoDB Atlas cluster
   - Configure environment variables
   - Deploy to your preferred hosting service (e.g., Heroku, Render)

2. **Frontend Deployment**
   - Build the frontend application
   - Deploy to static hosting service (e.g., Netlify, Vercel)
   - Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

### Frontend
- Follow React best practices
- Use TypeScript for type safety
- Implement proper error handling
- Follow component composition patterns
- Use Redux for state management

### Backend
- Follow RESTful API design principles
- Implement proper validation
- Handle errors appropriately
- Use TypeScript for type safety
- Follow security best practices


## 👥 Authors

- Muhammed T - Initial work

## 🙏 Acknowledgments

- GitHub API Documentation
- React Documentation
- Express.js Community
- All contributors

