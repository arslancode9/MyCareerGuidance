import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmail } from '../redux/authSlice';
import { toast } from 'react-toastify';
import { Settings, Mail, User, Save, X } from 'lucide-react';

export default function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [user, setUser] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Error parsing user:', e);
        }
      }
    }
  }, [currentUser]);

  const handleUpdateEmail = () => {
    if (!newEmail || !confirmEmail) {
      toast.error('Please fill in both email fields');
      return;
    }

    if (newEmail !== confirmEmail) {
      toast.error('Emails do not match');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = users.some(
      (u) => u.email === newEmail && u.email !== user?.email
    );

    if (emailExists) {
      toast.error('This email is already registered');
      return;
    }

    if (user?.email) {
      dispatch(updateEmail({ oldEmail: user.email, newEmail }));

      const updatedUser = { ...user, email: newEmail };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      toast.success('Email updated successfully!');
      setShowEmailModal(false);
      setNewEmail('');
      setConfirmEmail('');
    }
  };

  const profilePic = user?.profilePicture || '/profile.jpg';

  return (
    <div className="min-h-screen mt-10 sm:mt-20 p-4 sm:p-2 lg:p-8 lg:ml-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Profile Settings
        </h1>
        <p className="text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        {/* Profile Picture Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:p-1 gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="relative">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500"
              onError={(e) => {
                e.target.src = '/profile.jpg';
              }}
            />
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 border-4 border-white">
              <Settings size={16} className="text-white" />
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {user?.FullName || user?.fullName || 'User'}
            </h2>
            <p className="text-gray-600 mb-4">{user?.email || 'No email'}</p>
            <p className="text-sm text-gray-500">
              Profile picture can be updated during signup
            </p>
          </div>
        </div>

        {/* Settings Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Account Settings
          </h3>

          {/* Email Update Section */}
          <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Email Address
                  </h4>
                  <p className="text-sm text-gray-500">
                    {user?.email || 'No email set'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEmailModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Settings size={16} />
                Update Email
              </button>
            </div>
          </div>

          {/* User Info Section */}
          <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <User className="text-green-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Personal Information
                </h4>
                <p className="text-sm text-gray-500">
                  View your account details
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Full Name:</span>
                <span className="font-medium text-gray-800">
                  {user?.FullName || user?.fullName || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">School:</span>
                <span className="font-medium text-gray-800">
                  {user?.school || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Country:</span>
                <span className="font-medium text-gray-800">
                  {user?.country || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Date of Birth:</span>
                <span className="font-medium text-gray-800">
                  {user?.month && user?.day && user?.year
                    ? `${user.month} ${user.day}, ${user.year}`
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Update Modal */}
      {showEmailModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2"
          onClick={() => setShowEmailModal(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-sm p-5 shadow-xl mx-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Update Email
              </h2>
              <button
                onClick={() => setShowEmailModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Email
                </label>
                <input
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder="Confirm new email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUpdateEmail}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Update Email
              </button>
              <button
                onClick={() => {
                  setShowEmailModal(false);
                  setNewEmail('');
                  setConfirmEmail('');
                }}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
