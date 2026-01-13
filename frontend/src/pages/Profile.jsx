import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { userAPI } from '../services/api';
import { removeToken } from '../utils/auth';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setUser(response.data);
      setFormData({
        email: response.data.email,
        username: response.data.username,
        password: '',
      });
    } catch (err) {
      setError('Failed to load profile');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updateData = {
        email: formData.email,
        username: formData.username,
      };

      // Only include password if it's provided
      if (formData.password) {
        updateData.password = formData.password;
      }

      await userAPI.updateProfile(updateData);
      setSuccess('Profile updated successfully');
      setFormData({ ...formData, password: '' });
      await fetchProfile();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      await userAPI.deleteAccount();
      removeToken();
      navigate('/login');
    } catch (err) {
      setError('Failed to delete account');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field"
                placeholder="••••••••"
                minLength={6}
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum 6 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h2>
            <button
              onClick={handleDeleteAccount}
              className="btn btn-danger"
            >
              Delete Account
            </button>
            <p className="text-sm text-gray-500 mt-2">
              This will permanently delete your account and all your tasks. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
