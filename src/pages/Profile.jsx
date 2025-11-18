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
    <div className="min-h-screen mt-6 p-3 sm:mt-20 sm:p-2 lg:p-8 lg:ml-10">
      
      {/* HEADER */}
      <div className="mb-5 mt-7">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
          Profile Settings
        </h1>
        <p className="text-sm text-gray-500">Manage your account settings</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8">

        {/* PROFILE SECTION */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8 pb-6 border-b">
          <div className="relative">
            <img
              src={profilePic}
              alt="Profile"
              className="w-20 h-20 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500"
              onError={(e) => (e.target.src = '/profile.jpg')}
            />
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 border-4 border-white">
              <Settings size={14} className="text-white" />
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-800">
              {user?.FullName || user?.fullName || "User"}
            </h2>
            <p className="text-gray-600">{user?.email || "No email"}</p>
          </div>
        </div>

        {/* ACCOUNT SETTINGS */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Settings</h3>

        <div className="border rounded-lg p-4 hover:border-blue-300 transition">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold">Email Address</h4>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={() => setShowEmailModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 flex items-center gap-2"
            >
              <Settings size={16} /> Update Email
            </button>
          </div>
        </div>

        {/* PERSONAL INFO */}
        <div className="border rounded-lg p-4 mt-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <User size={20} className="text-green-600" />
            </div>
            <h4 className="font-semibold">Personal Info</h4>
          </div>

          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Full Name:</span>
              <span>{user?.fullName || "N/A"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">School:</span>
              <span>{user?.school || "N/A"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Country:</span>
              <span>{user?.country || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* EMAIL MODAL */}
      {showEmailModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3"
          onClick={() => setShowEmailModal(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-xs sm:max-w-sm p-4 shadow-xl mx-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Update Email</h2>
              <button onClick={() => setShowEmailModal(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Modal Fields */}
            <div className="space-y-3">
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-3 py-2 bg-gray-100 rounded border"
              />

              <input
                type="email"
                placeholder="New Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />

              <input
                type="email"
                placeholder="Confirm Email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleUpdateEmail}
                className="flex-1 bg-blue-500 text-white py-2 rounded"
              >
                Update
              </button>

              <button
                onClick={() => setShowEmailModal(false)}
                className="flex-1 border py-2 rounded"
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
