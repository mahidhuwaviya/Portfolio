# Portfolio Showcase Application

## Overview

A full-stack portfolio showcase platform that allows users to browse and discover creative portfolios. The application features a modern React frontend with a Node.js/Express backend, designed to display designer portfolios with advanced filtering and search capabilities. Users can browse as guests, stalkers (detailed exploration), or recruiters (hiring-focused view), with each visitor type receiving a tailored experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/UI component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming support
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful API with structured error handling
- **Middleware**: Custom logging middleware for API request tracking
- **Development**: Hot reloading with Vite integration in development mode

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL connector
- **Current Implementation**: In-memory storage with sample data for development

### Database Schema
- **Portfolios Table**: Stores portfolio information including name, title, skills (JSON array), discipline, description, experience level, availability, contact details, and featured status
- **Search Functionality**: Supports filtering by visitor type, discipline, skills, and availability status

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Basic session infrastructure prepared with connect-pg-simple

### API Structure
- **GET /api/portfolios**: Retrieve all portfolios
- **GET /api/portfolios/:id**: Get specific portfolio by ID
- **GET /api/portfolios/search**: Search portfolios with filters
- **Response Format**: Consistent JSON responses with proper error handling
- **Validation**: Zod schemas for request validation

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **Build Tools**: Vite with TypeScript support and React plugin
- **Routing**: Wouter for client-side navigation

### UI and Styling
- **Component Library**: Shadcn/UI with Radix UI primitives
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React icon library
- **Animations**: Class Variance Authority for component variants

### Backend Infrastructure
- **Web Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Database Connection**: Neon Database serverless connector
- **Session Storage**: connect-pg-simple for PostgreSQL session store

### Development Tools
- **Runtime**: tsx for TypeScript execution
- **Build**: esbuild for server bundling
- **Database Management**: Drizzle Kit for schema migrations
- **Development Enhancement**: Replit-specific plugins for error handling and cartographer

### Data Management
- **Server State**: TanStack Query for caching and synchronization
- **Validation**: Zod for schema validation and type safety
- **Form Management**: React Hook Form with Hookform resolvers
- **Date Handling**: date-fns for date manipulation

### UI Enhancement Libraries
- **Carousel**: Embla Carousel React for image/content carousels
- **Command Palette**: cmdk for search and command interfaces
- **Utility**: clsx and tailwind-merge for conditional styling