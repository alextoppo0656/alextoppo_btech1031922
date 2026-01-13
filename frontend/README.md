# Task Management System - Frontend

React-based frontend with Kanban board for task management.

## Tech Stack

- React 18 - UI library
- Vite - Build tool
- Tailwind CSS - Styling
- @dnd-kit - Drag and drop
- React Router - Navigation
- Axios - HTTP client
- date-fns - Date formatting

## Setup Instructions

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Create & Edit `.env` as:
```
VITE_API_URL=http://localhost:8000 (or your backend link)
```

4. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.jsx
│   ├── TaskCard.jsx
│   ├── KanbanColumn.jsx
│   └── ProtectedRoute.jsx
├── pages/           # Page components
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── Profile.jsx
├── services/        # API calls
│   └── api.js
├── utils/           # Helper functions
│   └── auth.js
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

## Features

### Authentication
- Sign up with email, username, and password
- Login with email and password
- JWT token stored in localStorage
- Protected routes redirect to login if not authenticated

### Kanban Board
- Three columns: Pending, In Progress, Completed
- Drag and drop tasks between columns
- Task cards show title, description, and due date
- Create new tasks with modal form
- Edit existing tasks
- Delete tasks with confirmation

### Profile Management
- View current user info
- Update email and username
- Change password
- Delete account (with all tasks)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Configuration

The frontend connects to the backend at `http://localhost:8000` by default. This is configured in `src/services/api.js`.

To change the API URL, update the `API_BASE_URL` constant:

```javascript
const API_BASE_URL = 'your-api-url-here';
```

## Building for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

## Mobile Responsive

The app is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

On mobile, Kanban columns stack vertically for better usability.
