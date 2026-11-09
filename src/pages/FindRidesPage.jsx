import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, RotateCcw, Car, AlertCircle } from 'lucide-react';
import api from '../services/api';
import RideCard from '../components/RideCard';

const FindRidesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [origin, setOrigin] = useState(searchParams.get('origin') || '');
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [date, setDate] = useState(searchParams.get('date') || '');
  const [minSeats, setMinSeats] = useState(searchParams.get('minSeats') || '');

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchRides = async () => {
    try {
      setLoading(true);
      const params = {};
      if (origin) params.origin = origin;
      if (destination) params.destination = destination;
      if (date) params.date = date;
      if (minSeats) params.minSeats = minSeats;

      const res = await api.get('/rides', { params });
      if (res.data.success) {
        setRides(res.data.rides);
        setTotalCount(res.data.total);
      }
    } catch (err) {
      console.error('Failed to query rides:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = {};
    if (origin) newParams.origin = origin;
    if (destination) newParams.destination = destination;
    if (date) newParams.date = date;
    if (minSeats) newParams.minSeats = minSeats;
    setSearchParams(newParams);
  };

  const handleReset = () => {
    setOrigin('');
    setDestination('');
    setDate('');
    setMinSeats('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search & Filter Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
        <div className="max-w-3xl mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-campus-600">
            Ride Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans'] mt-1">
            Find Available Campus Rides
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Browse trips scheduled by verified fellow students. Filter by starting point, destination, or departure date.
          </p>
        </div>

        {/* Filter Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Starting Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="e.g. North Library"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Destination
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="e.g. Metro Station"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Travel Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Min Available Seats
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Users className="w-4 h-4" />
              </div>
              <select
                value={minSeats}
                onChange={(e) => setMinSeats(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
              >
                <option value="">Any Seats</option>
                <option value="1">1+ Seat</option>
                <option value="2">2+ Seats</option>
                <option value="3">3+ Seats</option>
                <option value="4">4+ Seats</option>
              </select>
            </div>
          </div>

          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="flex-1 py-2 px-3 bg-campus-600 hover:bg-campus-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              title="Reset filters"
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">
          Showing {rides.length} of {totalCount} matching rides
        </h2>

        <Link
          to="/offer-ride"
          className="text-xs font-bold text-campus-600 hover:underline"
        >
          Have empty seats? Offer a ride &rarr;
        </Link>
      </div>

      {/* Rides Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 space-y-2">
          <div className="w-8 h-8 border-4 border-campus-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm">Searching campus trips...</p>
        </div>
      ) : rides.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 space-y-4">
          <Car className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No matching rides found</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search criteria or clearing filters. You can also publish your own trip if you are driving!
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Clear Filters
            </button>
            <Link
              to="/offer-ride"
              className="px-4 py-2 text-xs font-bold text-white bg-campus-600 hover:bg-campus-700 rounded-xl shadow-md"
            >
              Offer This Ride
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rides.map((ride) => (
            <RideCard key={ride._id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FindRidesPage;
