import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Car,
  Compass,
  PlusCircle,
  LayoutDashboard,
  CalendarCheck,
  User,
  LogOut,
  ShieldAlert,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-campus-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-campus-500/20 group-hover:scale-105 transition-transform">
                <Car className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                Campus<span className="text-campus-600">Ride</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/find-rides"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive('/find-rides')
                    ? 'text-campus-600 bg-campus-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-4 h-4" />
                Find Ride
              </Link>

              <Link
                to="/offer-ride"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive('/offer-ride')
                    ? 'text-campus-600 bg-campus-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                Offer Ride
              </Link>

              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      isActive('/dashboard')
                        ? 'text-campus-600 bg-campus-50 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <Link
                    to="/my-bookings"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      isActive('/my-bookings')
                        ? 'text-campus-600 bg-campus-50 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <CalendarCheck className="w-4 h-4" />
                    My Bookings
                  </Link>

                  <Link
                    to="/my-rides"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      isActive('/my-rides')
                        ? 'text-campus-600 bg-campus-50 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Car className="w-4 h-4" />
                    My Rides
                  </Link>
                </>
              )}

              {isAdmin && (
                <Link
                  to="/admin"
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 text-purple-700 bg-purple-50 hover:bg-purple-100 ${
                    isActive('/admin') ? 'ring-1 ring-purple-400' : ''
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* Right Action Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <NotificationDropdown />

                {/* User menu dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 transition-all focus:outline-none"
                  >
                    <img
                      src={
                        user?.avatar ||
                        `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
                          user?.name || 'User'
                        )}`
                      }
                      alt={user?.name}
                      className="w-7 h-7 rounded-full object-cover bg-slate-100"
                    />
                    <span className="text-sm font-medium text-slate-800 max-w-[120px] truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 py-2 z-50 divide-y divide-slate-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {user?.email}
                        </p>
                        <span className="inline-block mt-1 text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                          {user?.role === 'admin' ? 'Campus Admin' : 'Student'}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          My Profile
                        </Link>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-400" />
                          Student Dashboard
                        </Link>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-campus-600 hover:bg-campus-700 rounded-xl shadow-sm transition-all shadow-campus-500/25"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated && <NotificationDropdown />}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <Link
            to="/find-rides"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
          >
            <Compass className="w-5 h-5 text-campus-600" /> Find a Ride
          </Link>
          <Link
            to="/offer-ride"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
          >
            <PlusCircle className="w-5 h-5 text-campus-600" /> Offer a Ride
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
              >
                <LayoutDashboard className="w-5 h-5 text-campus-600" /> Dashboard
              </Link>
              <Link
                to="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
              >
                <CalendarCheck className="w-5 h-5 text-campus-600" /> My Bookings
              </Link>
              <Link
                to="/my-rides"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
              >
                <Car className="w-5 h-5 text-campus-600" /> My Rides (Driver)
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
              >
                <User className="w-5 h-5 text-campus-600" /> My Profile
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-purple-700 bg-purple-50 font-semibold"
                >
                  <ShieldAlert className="w-5 h-5" /> Admin Dashboard
                </Link>
              )}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 font-semibold"
                >
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-xl"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-white bg-campus-600 rounded-xl shadow-md"
              >
                Sign Up Free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
