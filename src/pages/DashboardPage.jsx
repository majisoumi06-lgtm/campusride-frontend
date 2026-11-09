import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Car,
  Compass,
  CalendarCheck,
  PlusCircle,
  Star,
  Clock,
  ArrowRight,
  TrendingUp,
  MapPin,
  Sparkles,
} from 'lucide-react';
import api from '../services/api';
import RideCard from '../components/RideCard';

const DashboardPage = () => {
  const { user } = useAuth();
  const [profileStats, setProfileStats] = useState(null);
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [profileRes, ridesRes, bookingsRes] = await Promise.all([
          api.get('/users/profile'),
          api.get('/rides?limit=4'),
          api.get('/bookings/my-bookings'),
        ]);

        if (profileRes.data.success) {
          setProfileStats(profileRes.data.stats);
        }
        if (ridesRes.data.success) {
          setUpcomingRides(ridesRes.data.rides);
        }
        if (bookingsRes.data.success) {
          setMyBookings(bookingsRes.data.bookings.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-800 to-campus-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 hidden md:block"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={
                user?.avatar ||
                `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
                  user?.name || 'User'
                )}`
              }
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/10 bg-slate-800"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-campus-500/20 text-sky-300 text-xs font-semibold mb-1 border border-campus-400/20">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Verified Student
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans']">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {user?.college} • ID: {user?.studentId}
              </p>
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/find-rides"
              className="px-4 py-2.5 bg-white text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-campus-600" />
              Find a Ride
            </Link>
            <Link
              to="/offer-ride"
              className="px-4 py-2.5 bg-campus-600 hover:bg-campus-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Offer a Ride
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-campus-100 text-campus-600 flex items-center justify-center shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Bookings Made
            </p>
            <p className="text-2xl font-black text-slate-900">
              {profileStats?.bookingsMade ?? 0}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Rides Offered
            </p>
            <p className="text-2xl font-black text-slate-900">
              {profileStats?.ridesOffered ?? 0}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Community Rating
            </p>
            <p className="text-2xl font-black text-slate-900">
              {user?.rating?.average || 5.0}{' '}
              <span className="text-xs font-normal text-slate-400">
                ({user?.rating?.count || 0})
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Account Status
            </p>
            <p className="text-lg font-bold text-emerald-600 capitalize">
              {user?.status || 'Active'}
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Upcoming User Bookings & Quick Search */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Available Rides */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                Available Campus Rides
              </h2>
              <p className="text-xs text-slate-500">Live rides shared by campus students</p>
            </div>
            <Link
              to="/find-rides"
              className="text-xs font-bold text-campus-600 hover:text-campus-800 flex items-center gap-1"
            >
              See all rides &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Loading available rides...
            </div>
          ) : upcomingRides.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
              <Car className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No active rides right now</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Be the first to list a trip or check back shortly as more students publish rides.
              </p>
              <Link
                to="/offer-ride"
                className="inline-block px-4 py-2 bg-campus-600 text-white font-bold text-xs rounded-xl"
              >
                Offer a Ride Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingRides.map((ride) => (
                <RideCard key={ride._id} ride={ride} />
              ))}
            </div>
          )}
        </div>

        {/* Right Col: My Upcoming Trips Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
              My Trips Preview
            </h2>
            <Link
              to="/my-bookings"
              className="text-xs font-bold text-campus-600 hover:text-campus-800"
            >
              View all
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
            {myBookings.length === 0 ? (
              <div className="text-center py-6 text-slate-400 space-y-2">
                <CalendarCheck className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-medium">You don't have any booked rides yet</p>
                <Link
                  to="/find-rides"
                  className="text-xs text-campus-600 font-bold hover:underline block"
                >
                  Find a ride heading your way
                </Link>
              </div>
            ) : (
              myBookings.map((b) => (
                <div
                  key={b._id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 truncate">
                      {b.ride?.origin} &rarr; {b.ride?.destination}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        b.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {b.ride?.departureTime}
                    </span>
                    <span className="font-semibold text-slate-700">${b.totalPrice}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Campus Transit Tip Card */}
          <div className="bg-gradient-to-br from-campus-50 to-sky-100 border border-campus-200 rounded-2xl p-4 text-xs space-y-2 text-campus-900">
            <h4 className="font-bold flex items-center gap-1.5 text-campus-800">
              <MapPin className="w-4 h-4 text-campus-600" /> Campus Commute Tip
            </h4>
            <p className="text-campus-700 leading-relaxed">
              Designate common pickup zones like North Library or Student Center to meet safely and avoid stopping in busy bus lanes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
