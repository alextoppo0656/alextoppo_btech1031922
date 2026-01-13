import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary cursor-pointer" onClick={() => navigate('/dashboard')}>
              Task Manager
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-primary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
