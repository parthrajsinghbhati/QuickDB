# QuickDB Frontend

QuickDB is a visual database management tool that allows users to create databases, tables, and APIs without writing code. This is the frontend application built with React and Vite.

**Live URL:** [https://quick-db.vercel.app/](https://quick-db.vercel.app/)
**Backend Repo:** [https://github.com/parthrajsinghbhati/quickdb_backend](https://github.com/parthrajsinghbhati/quickdb_backend)
**Backend Live URL:** [https://quickdb-backend.onrender.com](https://quickdb-backend.onrender.com)

## Features

- **Visual Database Management**: Create and manage databases and tables via an intuitive UI.
- **Dynamic API Generation**: Automatically generates REST APIs for your data.
- **Dashboard**: View recent activity, quick stats, and manage your projects.
- **Authentication**: Secure user login and registration.
- **Responsive Design**: Built with Tailwind CSS for a modern, responsive experience.
- **Sorting & Filtering**: Easily organize your databases and tables.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Routing**: React Router 7

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd QuickDB/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your backend URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   *(For production, use: `https://quickdb-backend.onrender.com/api`)*

4. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint to check for code quality issues.

## Project Structure

- `src/components`: Reusable UI components.
- `src/pages`: Main application pages (Dashboard, Databases, Auth, etc.).
- `src/context`: React Context for state management (DatabaseContext).
- `src/hooks`: Custom hooks (useDatabases, useTables).
- `src/services`: API service configuration.
