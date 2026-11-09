import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, Mail, Lock, ArrowRight, AlertCircle, KeyRound } from 'lucide-react';
import api from '../services/api';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return;

    try {
      setForgotLoading(true);
      const res = await api.post('/auth/forgot-password', { email: forgotEmail });
      setForgotMessage(res.data.message || 'Password reset link sent to your inbox.');
    } catch (err) {
      setForgotMessage(
        err.response?.data?.message || 'Error requesting reset. Please verify email.'
      );
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-campus-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-md shadow-campus-600/30">
            <Car className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">
            Welcome to CampusRide
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Sign in with your student or campus transport account
          </p>
        </div>

        {/* Demo Quick-Fill Credentials */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-2">
          <p className="font-semibold text-slate-700 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-campus-600" />
            Quick Demo Login (1-Click Fill):
          </p>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => fillDemoAccount('alex@campusride.edu', 'Student@123')}
              className="px-2.5 py-1 bg-white hover:bg-campus-50 hover:text-campus-700 hover:border-campus-300 border border-slate-200 rounded-lg font-medium text-slate-700 transition-colors"
            >
              🚗 Driver (Alex)
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('sarah@campusride.edu', 'Student@123')}
              className="px-2.5 py-1 bg-white hover:bg-campus-50 hover:text-campus-700 hover:border-campus-300 border border-slate-200 rounded-lg font-medium text-slate-700 transition-colors"
            >
              🎒 Passenger (Sarah)
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('admin@campusride.edu', 'Admin@123')}
              className="px-2.5 py-1 bg-white hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 border border-slate-200 rounded-lg font-medium text-purple-700 transition-colors"
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 text-xs text-red-700 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student / Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs font-medium text-campus-600 hover:text-campus-800"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-campus-600 hover:bg-campus-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-campus-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          New to CampusRide?{' '}
          <Link to="/register" className="font-bold text-campus-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-900">Reset Password</h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your registered campus email to receive recovery instructions.
            </p>

            {forgotMessage && (
              <div className="mt-3 p-3 bg-blue-50 text-campus-800 text-xs rounded-xl font-medium">
                {forgotMessage}
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="mt-4 space-y-3">
              <input
                type="email"
                required
                placeholder="student@university.edu"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-campus-500"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setForgotModalOpen(false);
                    setForgotMessage('');
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="px-4 py-2 text-xs font-semibold text-white bg-campus-600 hover:bg-campus-700 rounded-xl"
                >
                  {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
