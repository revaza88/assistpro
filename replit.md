# Overview

This is a modern full-stack web application for "ასისტი" (Assist), a Georgian accounting and legal services company. The application serves as a corporate website with contact forms, job applications, and service information. It's built with a React frontend, Express.js backend, and uses PostgreSQL with Drizzle ORM for data persistence.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling

## Backend Architecture
- **Runtime**: Node.js 20 with Express.js
- **Language**: TypeScript with ES modules
- **API Style**: REST API with JSON responses
- **Request Handling**: Express middleware for logging, parsing, and error handling
- **Development**: Hot reload with Vite integration in development mode

## Data Storage
- **Database**: PostgreSQL 16
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Shared schema definitions between client and server
- **Migrations**: Drizzle Kit for database migrations
- **Connection**: Neon Database serverless driver for PostgreSQL connections

# Key Components

## Database Schema
The application uses three main tables:
- **contacts**: Stores contact form submissions with fields for personal info, service requests, and messages
- **job_applications**: Manages job application data including resume and cover letter information
- **users**: Basic user authentication structure (legacy compatibility)

## API Endpoints
- `POST /api/contacts`: Submit contact form data
- `GET /api/contacts`: Retrieve all contact submissions (admin)
- `POST /api/job-applications`: Submit job application
- `GET /api/job-applications`: Retrieve all job applications (admin)

## Frontend Components
- **Navigation**: Responsive navigation with smooth scrolling to sections
- **Hero Section**: Company introduction with call-to-action buttons
- **About Section**: Company information and statistics
- **Services Section**: Detailed breakdown of accounting and legal services
- **Team Section**: Company team member profiles
- **Career Section**: Job listings with application modal
- **Contact Section**: Contact form with service selection
- **Footer**: Company links and social media

# Data Flow

1. **User Interaction**: Users navigate the single-page application and interact with forms
2. **Form Submission**: React Hook Form validates data using Zod schemas before submission
3. **API Request**: TanStack Query manages HTTP requests to the Express backend
4. **Server Processing**: Express routes validate data and interact with the database via Drizzle ORM
5. **Database Storage**: PostgreSQL stores the submitted data using the defined schema
6. **Response Handling**: Success/error responses are displayed to users via toast notifications

# External Dependencies

## Core Dependencies
- **Database**: Neon Database (@neondatabase/serverless) for PostgreSQL hosting
- **UI Library**: Radix UI components for accessible UI primitives
- **Validation**: Zod for schema validation and type safety
- **Date Handling**: date-fns for date manipulation
- **Session Management**: connect-pg-simple for PostgreSQL session storage

## Development Tools
- **TypeScript**: Full type safety across the application
- **Drizzle Kit**: Database schema management and migrations
- **ESBuild**: Server-side bundling for production
- **PostCSS**: CSS processing with Tailwind CSS

# Deployment Strategy

## Build Process
1. **Frontend Build**: Vite builds the React application to `dist/public`
2. **Backend Build**: ESBuild bundles the Express server to `dist/index.js`
3. **Static Assets**: Frontend assets are served by the Express server in production

## Production Configuration
- **Environment**: NODE_ENV=production
- **Port**: Application runs on port 5000 (mapped to external port 80)
- **Database**: Uses DATABASE_URL environment variable for PostgreSQL connection
- **Static Serving**: Express serves built frontend assets in production
- **Process Management**: Single Node.js process handles both API and static file serving

## Replit Configuration
- **Modules**: nodejs-20, web, postgresql-16
- **Development**: `npm run dev` starts development server with hot reload
- **Production**: `npm run start` serves the built application
- **Database**: Integrated PostgreSQL 16 instance

# Recent Changes
- June 24, 2025: Added multilingual support (Georgian, English, Russian)
- June 24, 2025: Created services carousel on homepage
- June 24, 2025: Added dedicated service pages for accounting, tax, and legal services
- June 24, 2025: Integrated language selector in navigation
- June 24, 2025: Updated all components to use translation system

# Changelog
- June 24, 2025. Initial setup
- June 24, 2025. Enhanced with multilingual support and improved navigation

# User Preferences

Preferred communication style: Simple, everyday language.
Requested features: 
- Professional accounting and legal services carousel
- Separate detailed pages for each service category
- Multilingual support (Georgian, English, Russian)