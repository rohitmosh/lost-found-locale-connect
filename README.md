# FindIt - Lost & Found Application

A community-based lost and found application that helps people find their lost items and return found items to their owners.

## Features

- User authentication (login/register)
- Report lost items
- Report found items
- Interactive map to view lost and found items
- User trust score system
- Notifications for potential matches

## Tech Stack

- Frontend: React, Tailwind CSS, Shadcn UI
- Backend: Express.js, Node.js
- Database: MongoDB

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB account (Atlas or local MongoDB)
- Google Maps API key (for map functionality)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd lost-found-locale-connect
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   npm run setup:env
   ```
   This will create a `.env.local` file. Update it with your MongoDB connection string, JWT secret, and Google Maps API key.

4. Test MongoDB connection:
   ```
   npm run test:db
   ```

5. Import mock data:
   ```
   npm run import:mockdata
   ```

6. Check database collections:
   ```
   npm run check:db
   ```

### Running the Application

Run both frontend and backend concurrently:
```
npm run dev:full
```

Or run them separately:
```
npm run dev        # Frontend only
npm run dev:server # Backend only
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Lost Items
- `GET /api/lost-items` - Get all lost items
- `GET /api/lost-items/:id` - Get single lost item
- `POST /api/lost-items` - Create lost item
- `PUT /api/lost-items/:id` - Update lost item
- `DELETE /api/lost-items/:id` - Delete lost item

### Found Items
- `GET /api/found-items` - Get all found items
- `GET /api/found-items/:id` - Get single found item
- `POST /api/found-items` - Create found item
- `PUT /api/found-items/:id` - Update found item
- `DELETE /api/found-items/:id` - Delete found item

## Test User Credentials

For testing purposes, you can use the following credentials:

- Email: aditya.sharma@gmail.com
- Password: Aditya@123

## License

[MIT](LICENSE) 