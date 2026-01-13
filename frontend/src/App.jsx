import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated } from './utils/auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
