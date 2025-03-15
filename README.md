# Kazi_Connect

## Overview
Kazi_Connect is a web application that connects job seekers with employers and allows local service providers to offer their services. Job seekers can register, browse job listings, and apply for jobs, while individuals looking for specific services can find and contact local service providers.

## Features
- **Job Seeker Portal**: Register, view job listings, and apply for jobs.
- **Employer Portal**: Post job listings and manage applications.
- **Service Provider Listing**: Local users can list their services.
- **Service Seeker Portal**: Find and contact service providers.
- **User Authentication**: Secure login and registration.
- **Responsive UI**: Optimized for mobile and desktop.

## Tech Stack
### Frontend:
- React.js
- Tailwind CSS 

### Backend:
- Node.js with Express.js
- MySQL
- JWT 

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn
- MySQL Client

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/Alloysj/Kazi_connect.git
   cd Kazi_Connect
   ```
2. **Install dependencies**
   ```sh
   cd client 
   npm install 
   ```
   ```sh
   cd ../server  
   npm install 
   ```
3. **Set up environment variables**
   - Create a `.env` file in the `server` directory and add:
     ```env
     DB connection password
     JWT_SECRET=your_secret_key
     PORT=5000
     ```
4. **Run the application**
   - Start the backend server:
     ```sh
     cd server
     npm start
     ```
   - Start the frontend:
     ```sh
     cd client
     npm start
     ```
   - The application will be accessible at `http://localhost:3000/`

## API Endpoints (Backend)
- **Auth Routes**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - User login
- **Job Routes**
  - `GET /api/jobs` - Fetch job listings
  - `POST /api/jobs` - Post a new job
  - `POST /api/jobs/apply/:id` - Apply for a job
- **Service Routes**
  - `GET /api/services` - Get listed services
  - `POST /api/services` - Add a service listing

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes and push.
4. Create a Pull Request.

## License
This project is licensed under the MIT License.

