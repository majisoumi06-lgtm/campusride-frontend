import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Phone,
  School,
  Contact,
  Car,
  Lock,
  Star,
  CheckCircle2,
  AlertCircle,
  Save,
} from 'lucide-react';
import api from '../services/api';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();

  const [activeTab, setActiveTab] = useState('profile');

  // Profile fields
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [college, setCollege] = useState(user?.college || '');
  const [studentId, setStudentId] = useState(user?.studentId || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  // Vehicle fields
  const [hasVehicle, setHasVehicle] = useState(user?.vehicle?.hasVehicle || false);
  const [vehicleType, setVehicleType] = useState(user?.vehicle?.type || 'Car');
  const [vehicleModel, setVehicleModel] = useState(user?.vehicle?.model || '');
  const [vehicleRegNo, setVehicleRegNo] = useState(user?.vehicle?.regNo || '');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Reviews
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/users/profile');
        if (res.data.success) {
          setReviews(res.data.reviews || []);
        }
      } catch (err) {
        console.error('Failed to load profile reviews:', err);
      }
    };
    fetchReviews();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setMessage('');

      const res = await api.put('/users/profile', {
        name,
        phone,
        college,
        studentId,
        avatar,
        vehicle: {
          hasVehicle,
          type: hasVehicle ? vehicleType : '',
          model: hasVehicle ? vehicleModel : '',
          regNo: hasVehicle ? vehicleRegNo : '',
        },
      });

      if (res.data.success) {
        updateUser(res.data.user);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMessage('');

      const res = await api.put('/users/change-password', {
        currentPassword,
        newPassword,
      });

      if (res.data.success) {
        setMessage('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Password update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
        <img
          src={
            avatar ||
            user?.avatar ||
            `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
              user?.name || 'User'
            )}`
          }
          alt={user?.name}
          className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-100 bg-slate-50"
        />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">
            {user?.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {user?.college} • Student ID: {user?.studentId}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-700">
              {user?.rating?.average || 5.0}
            </span>
            <span className="text-[11px] text-slate-400">
              ({user?.rating?.count || 0} reviews received)
            </span>
          </div>
        </div>
      </div>

      {message && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold text-slate-500">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'profile'
              ? 'bg-campus-600 text-white shadow-sm'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Profile & Vehicle Details
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'security'
              ? 'bg-campus-600 text-white shadow-sm'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Change Password
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'reviews'
              ? 'bg-campus-600 text-white shadow-sm'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Reviews Received ({reviews.length})
        </button>
      </div>

      {/* Tab 1: Profile & Vehicle Form */}
      {activeTab === 'profile' && (
        <form onSubmit={handleUpdateProfile} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address (Read-only)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                College / University
              </label>
              <input
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student ID
              </label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Avatar Image URL (Optional)
              </label>
              <input
                type="text"
                placeholder="https://..."
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
              />
            </div>
          </div>

          {/* Vehicle section */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasVehicle}
                onChange={(e) => setHasVehicle(e.target.checked)}
                className="w-4 h-4 text-campus-600 rounded focus:ring-campus-500"
              />
              <span className="text-xs font-bold text-slate-800">
                I have a vehicle available for offering campus rides
              </span>
            </label>

            {hasVehicle && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="Car">Car</option>
                    <option value="SUV">SUV</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Scooter">Scooter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Vehicle Model
                  </label>
                  <input
                    type="text"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    placeholder="Toyota Camry"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Registration Plate
                  </label>
                  <input
                    type="text"
                    value={vehicleRegNo}
                    onChange={(e) => setVehicleRegNo(e.target.value)}
                    placeholder="ABC-1234"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-campus-600 hover:bg-campus-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </form>
      )}

      {/* Tab 2: Security & Password */}
      {activeTab === 'security' && (
        <form onSubmit={handleChangePassword} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-md space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-campus-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              New Password (min 6 chars)
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-campus-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-campus-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-campus-600 hover:bg-campus-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            {loading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      )}

      {/* Tab 3: Reviews Received */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          {reviews.length === 0 ? (
            <p className="text-center py-8 text-xs text-slate-400">
              No reviews received yet. Complete campus rides to receive peer feedback!
            </p>
          ) : (
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          rev.reviewer?.avatar ||
                          `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
                            rev.reviewer?.name || 'Student'
                          )}`
                        }
                        alt={rev.reviewer?.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="font-bold text-slate-900">
                        {rev.reviewer?.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
