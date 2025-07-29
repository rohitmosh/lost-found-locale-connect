# 🔍 Lost & Found Locale Connect

A modern, community-driven web application that helps people reconnect with their lost items through location-based matching, real-time notifications, and an intuitive user interface. Built specifically for local communities with advanced mapping, clustering, and smooth animations.

![Lost & Found Locale Connect](https://via.placeholder.com/800x200/8B5CF6/ffffff?text=Lost+%26+Found+Locale+Connect)

## 🌟 Features

### Core Functionality
- **📍 Real-time Map Integration**: Interactive maps with clustering to avoid pin overcrowding
- **🔐 User Authentication**: Secure registration and login system with Supabase Auth
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🔔 Real-time Notifications**: Instant alerts when potential matches are found
- **🎯 Location-Specific Data**: Bangalore-based reports with precise location handling
- **🗺️ Advanced Mapping**: Smooth animations and microanimations throughout map interactions

### User Experience
- **🎨 Modern UI/UX**: Clean, intuitive interface with dark theme support and smooth animations
- **⚡ Performance Optimized**: Built with React.memo, useCallback, and useMemo for optimal performance
- **🔍 Advanced Search**: Filter and search through lost/found items efficiently with debounced input
- **📊 User Dashboard**: Personal dashboard to manage your items and account
- **🏆 Trust Score System**: Community-driven reputation system for users
- **🎭 Interactive Elements**: Hover effects, microanimations, and smooth transitions

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks, functional components, and performance optimizations
- **TypeScript** - Type-safe development for better code quality
- **Vite** - Next-generation frontend tooling for fast builds and hot module replacement
- **Tailwind CSS** - Utility-first CSS framework with custom animations and microinteractions
- **React Router** - Client-side routing for single-page application
- **Framer Motion** - Production-ready motion library for smooth animations

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **Supabase Auth** - Authentication and user management
- **Row Level Security (RLS)** - Database-level security policies
- **Real-time Subscriptions** - Live updates using Supabase realtime

### Performance & Optimization
- **React.memo** - Component memoization to prevent unnecessary re-renders
- **useCallback & useMemo** - Hook optimizations for expensive computations
- **Debounced Search** - Optimized search input with performance hooks
- **Virtual Scrolling** - Efficient rendering of large lists
- **Lazy Loading** - Image and component lazy loading with intersection observer
- **Bundle Optimization** - Code splitting and tree shaking for smaller bundles

### Additional Tools
- **Google Maps API** - Interactive maps with clustering and location services
- **Model Context Protocol (MCP)** - Advanced integration patterns
- **React Query** - Server state management and caching
- **Zod** - Runtime type validation

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Supabase account
- Google Maps API key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/lost-found-locale-connect.git
cd lost-found-locale-connect
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Maps API
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Optional: MongoDB (if using hybrid setup)
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Database Setup
Apply the database migrations to set up the required tables:

```bash
# Option 1: Using the migration script
node apply-migrations.js

# Option 2: Apply SQL manually through Supabase dashboard
# Copy the contents of supabase/migrations/20250717000000_create_users_table.sql
# and run it in the Supabase SQL editor
```

### 5. Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### 6. Performance Monitoring (Optional)
Enable performance monitoring in development:

```bash
# Set environment variable for performance tracking
echo "VITE_ENABLE_PERFORMANCE_MONITORING=true" >> .env.local
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Additional Tables (Implemented)
- `reports` - Lost and found item reports with location data
- `categories` - Item categories for better organization
- `notifications` - Real-time user notifications
- `user_profiles` - Extended user profile information
- `trust_metrics` - Community trust scoring system
- `item_matches` - AI-powered matching between lost and found items

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the API settings
3. Enable Row Level Security (RLS) on all tables
4. Configure authentication providers as needed

### Google Maps Setup
1. Create a project in [Google Cloud Console](https://console.cloud.google.com)
2. Enable the Maps JavaScript API
3. Create an API key and restrict it to your domain
4. Add the API key to your environment variables

### MCP Integration
The project includes Model Context Protocol integration for advanced Supabase operations:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "uvx",
      "args": ["supabase-mcp-server@latest"],
      "env": {
        "SUPABASE_URL": "${env:VITE_SUPABASE_URL}",
        "SUPABASE_KEY": "${env:VITE_SUPABASE_ANON_KEY}",
        "SUPABASE_PROJECT_ID": "your_project_id"
      }
    }
  }
}
```

## 🚦 Usage

### For Users
1. **Register**: Create an account with email and password
2. **Report Lost Item**: Add details, photos, and precise location of lost items
3. **Report Found Item**: Upload found items with location and description
4. **Interactive Map**: Explore lost/found items on a real-time map with clustering
5. **Smart Search**: Use debounced search with advanced filtering options
6. **Real-time Notifications**: Get instant alerts for potential matches
7. **Trust Score System**: Build community reputation through successful helps
8. **Contact Owners**: Securely communicate with item owners through the platform

### For Developers
1. **Authentication**: Supabase Auth integration in `src/contexts/AuthContext.jsx`
2. **Database Operations**: Supabase client in `src/integrations/supabase/client.js`
3. **Components**: Reusable UI components in `src/components/`
4. **Performance Hooks**: Custom hooks in `src/hooks/usePerformance.js`
5. **Routing**: React Router setup in `src/App.jsx`
6. **State Management**: Context-based state management for theme and auth

## 📱 Database Operations (Supabase)

### Authentication (Built-in Supabase Auth)
- User registration with email/password
- Secure login and session management
- Password reset functionality
- Social authentication providers

### Reports Table Operations
- `SELECT` - Get lost/found reports with filtering
- `INSERT` - Create new lost/found reports
- `UPDATE` - Modify existing reports
- `DELETE` - Remove reports (with RLS policies)

### Real-time Features
- Live notifications for new matches
- Real-time report updates
- Location-based subscriptions
- Community interaction tracking

## 🧪 Testing

### Connection Testing
Test your Supabase connection:
```bash
node check-supabase-connection.js
```

### Component Testing
```bash
npm run test
# or
yarn test
```

### E2E Testing
```bash
npm run test:e2e
# or
yarn test:e2e
```

### Performance Testing
```bash
# Run performance benchmarks
npm run test:performance
# or
yarn test:performance

# Analyze bundle size
npm run analyze
# or
yarn analyze
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

### Manual Deployment
```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the amazing backend platform
- [React](https://reactjs.org) team for the excellent framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Vite](https://vitejs.dev) for the fast build tool
- Community contributors and testers

## 📞 Support

- 📧 Email: support@lostfoundlocale.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/lost-found-locale-connect/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/lost-found-locale-connect/discussions)
- 📖 Documentation: [Wiki](https://github.com/yourusername/lost-found-locale-connect/wiki)

## ⚡ Performance Optimizations Implemented

### React Performance
- **React.memo** - Applied to Hero, ContactOwnerModal components to prevent unnecessary re-renders
- **useCallback** - Optimized event handlers and async functions in Dashboard, ContactOwnerModal
- **useMemo** - Memoized expensive computations like filtering/sorting in Reports component
- **Debounced Search** - 300ms debounce on search inputs to reduce API calls

### Map Performance
- **Marker Clustering** - Prevents pin overcrowding with efficient clustering
- **Performance Monitoring** - Built-in performance tracking for Map component
- **Smooth Animations** - Optimized animations with Framer Motion

### Bundle Optimization
- **Code Splitting** - Lazy loading for non-critical components
- **Tree Shaking** - Unused code elimination with Vite
- **Hot Module Replacement** - Fast development builds

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] User authentication system
- [x] Basic UI/UX implementation with smooth animations
- [x] Supabase integration with real-time features
- [x] Database schema setup
- [x] Performance optimizations implemented
- [x] Interactive maps with clustering

### Phase 2 (Completed)
- [x] Lost/Found item reporting
- [x] Interactive maps integration
- [x] Image upload functionality
- [x] Basic matching algorithm
- [x] Real-time notifications

---

<div align="center">
  <p>Author : Rohit Mohanty</p>
  <p>
    <a href="https://github.com/yourusername/lost-found-locale-connect">⭐ Star this repo</a> •
    <a href="https://github.com/yourusername/lost-found-locale-connect/issues">🐛 Report Bug</a> •
    <a href="https://github.com/yourusername/lost-found-locale-connect/issues">✨ Request Feature</a>
  </p>
</div>
