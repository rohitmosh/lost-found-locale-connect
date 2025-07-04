# Lost & Found Locale Connect

A location-based lost and found application that helps users report and find lost items in their area.

## Features

- Report lost items with details and location
- Report found items to help others
- Search for items on an interactive map
- User authentication and profiles
- Real-time notifications

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Maps**: Google Maps API

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB account and database
- Google Maps API key

### Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:

```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/lost-found-locale-connect.git
cd lost-found-locale-connect
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
# Start the backend server
npm run dev:server

# In a separate terminal, start the frontend
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile
- `PUT /api/auth/change-password` - Change user password

### Lost Items

- `GET /api/lost-items` - Get all lost items
- `GET /api/lost-items/:id` - Get a specific lost item
- `POST /api/lost-items` - Create a new lost item
- `PUT /api/lost-items/:id` - Update a lost item
- `DELETE /api/lost-items/:id` - Delete a lost item

### Found Items

- `GET /api/found-items` - Get all found items
- `GET /api/found-items/:id` - Get a specific found item
- `POST /api/found-items` - Create a new found item
- `PUT /api/found-items/:id` - Update a found item
- `DELETE /api/found-items/:id` - Delete a found item

## MongoDB Setup

This application uses MongoDB as its database. Follow these steps to set up the MongoDB connection:

1. **Create a MongoDB Atlas account** (if you don't have one already)
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new cluster (the free tier is sufficient for development)

2. **Get your MongoDB connection string**
   - In your cluster, click on "Connect"
   - Choose "Connect your application"
   - Select "Node.js" as the driver
   - Copy the connection string

3. **Set up environment variables**
   - Run `npm run setup:env` in the project root
   - When prompted, paste your MongoDB connection string
   - Provide values for the other required variables

4. **Test the connection**
   - Run `npm run test:db` to verify that the connection works

5. **Start the server**
   - Run `npm run dev:server` to start the Node.js server
   - Run `npm run dev` in a separate terminal to start the frontend

## Troubleshooting MongoDB Connection

If you encounter issues connecting to MongoDB:

1. **Check your connection string**
   - Make sure it's correctly formatted
   - Ensure username and password are correct
   - Replace `<password>` with your actual password

2. **Network issues**
   - Check if MongoDB Atlas IP whitelist includes your IP
   - Go to Network Access in MongoDB Atlas and add your current IP

3. **Environment variables**
   - Make sure your `.env.local` file is in the project root
   - Check that MONGODB_URI is correctly set

4. **Run the test script**
   - Use `npm run test:db` to diagnose connection issues

## License

MIT 