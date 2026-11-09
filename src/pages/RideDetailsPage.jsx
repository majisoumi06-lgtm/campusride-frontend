import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  ShieldCheck,
  Star,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageSquare,
} from 'lucide-react';
import api from '../services/api';

const RideDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Booking states
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('');
  const [passengerNote, setPassengerNote] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const fetchRide = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/rides/${id}`);
      if (res.data.success) {
        setRide(res.data.ride);
        setPickupLocation(res.data.ride.pickupPoint || res.data.ride.origin);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load ride details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRide();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setBookingLoading(true);
      setBookingError('');

      const res = await api.post('/bookings', {
        rideId: ride._id,
        seatsBooked: seatsToBook,
        pickupLocation,
        passengerNote,
      });

      if (res.data.success) {
        setBookingSuccess(true);
        setTimeout(() => {
          navigate('/my-bookings');
        }, 1800);
      }
    } catch (err) {
      setBookingError(
        err.response?.data?.message || 'Could not complete booking request.'
      );
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400">
        <div className="w-8 h-8 border-4 border-campus-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm">Loading ride details...</p>
      </div>
    );
  }

  if (error || !ride) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">{error || 'Ride not found'}</h2>
        <Link
          to="/find-rides"
          className="inline-block px-4 py-2 bg-campus-600 text-white rounded-xl font-bold text-xs"
        >
          Back to Available Rides
        </Link>
      </div>
    );
  }

  const isDriver = user?._id === ride.driver?._id;
  const isSoldOut = ride.availableSeats <= 0;
  const departureDate = new Date(ride.departureDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          to="/find-rides"
          className="text-xs font-bold text-campus-600 hover:text-campus-800"
        >
          &larr; Back to all rides
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Complete Ride & Driver Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-campus-600">
                  Campus Trip Overview
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans'] mt-1">
                  {ride.origin} &rarr; {ride.destination}
                </h1>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-campus-600" />
                  {departureDate} at {ride.departureTime}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-3xl font-black text-slate-900 font-['Plus_Jakarta_Sans']">
                  ${ride.pricePerSeat}
                </span>
                <span className="text-xs block text-slate-400">per passenger seat</span>
              </div>
            </div>

            {/* Route Stops */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Route & Landmark Stops
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">
                      Origin & Pickup Landmark
                    </p>
                    <p className="text-sm font-bold text-slate-900">{ride.origin}</p>
                    <p className="text-xs text-slate-500">{ride.pickupPoint}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-50 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">
                      Destination & Drop-off Landmark
                    </p>
                    <p className="text-sm font-bold text-slate-900">{ride.destination}</p>
                    <p className="text-xs text-slate-500">{ride.dropoffPoint}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle & Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white border border-slate-200 p-4 rounded-2xl">
              <div>
                <span className="text-slate-400 block mb-0.5">Vehicle Type</span>
                <span className="font-bold text-slate-800">{ride.vehicle?.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Model</span>
                <span className="font-bold text-slate-800">{ride.vehicle?.model}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Reg Number</span>
                <span className="font-bold text-slate-800">{ride.vehicle?.regNo}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Total Capacity</span>
                <span className="font-bold text-slate-800">{ride.totalSeats} seats</span>
              </div>
            </div>

            {/* Driver Notes */}
            {ride.notes && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-700">Driver's Notes:</h4>
                <p className="text-xs text-slate-600 bg-blue-50/60 border border-blue-100 p-3 rounded-xl leading-relaxed">
                  "{ride.notes}"
                </p>
              </div>
            )}

            {/* Driver Profile Section */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={
                    ride.driver?.avatar ||
                    `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
                      ride.driver?.name || 'Driver'
                    )}`
                  }
                  alt={ride.driver?.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 bg-slate-50"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{ride.driver?.name}</h4>
                  <p className="text-xs text-slate-500">{ride.driver?.college}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-700">
                      {ride.driver?.rating?.average || 5.0}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({ride.driver?.rating?.count || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Driver
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Booking Card Form */}
        <div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-6 sticky top-24">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                Book Your Seat
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Instant confirmation request sent to driver
              </p>
            </div>

            {bookingSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Booking Requested!</h4>
                <p className="text-xs text-emerald-700">
                  Redirecting to your bookings dashboard...
                </p>
              </div>
            ) : isDriver ? (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xs text-slate-600 space-y-2">
                <Car className="w-8 h-8 text-campus-600 mx-auto" />
                <p className="font-bold text-slate-800">You are the driver of this ride.</p>
                <Link
                  to="/my-rides"
                  className="inline-block text-campus-600 font-bold hover:underline"
                >
                  Manage passenger requests in My Rides &rarr;
                </Link>
              </div>
            ) : isSoldOut ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-center text-xs text-red-700 font-bold space-y-1">
                <AlertCircle className="w-6 h-6 mx-auto text-red-500" />
                <p>This ride is fully booked.</p>
                <Link
                  to="/find-rides"
                  className="font-normal underline block text-slate-600"
                >
                  Search alternative rides
                </Link>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                {bookingError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium">
                    {bookingError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Number of Seats
                  </label>
                  <select
                    value={seatsToBook}
                    onChange={(e) => setSeatsToBook(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-campus-500"
                  >
                    {[...Array(ride.availableSeats)].map((_, idx) => (
                      <option key={idx + 1} value={idx + 1}>
                        {idx + 1} seat{idx > 0 ? 's' : ''} (${(idx + 1) * ride.pricePerSeat})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Pickup Landmark
                  </label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="e.g. North Gate Bus Shelter"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-campus-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Note for Driver (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={passengerNote}
                    onChange={(e) => setPassengerNote(e.target.value)}
                    placeholder="e.g. Carrying 1 gym backpack."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-campus-500 resize-none"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">Total Contribution:</span>
                  <span className="text-xl font-black text-slate-900">
                    ${(seatsToBook * ride.pricePerSeat).toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full py-3 px-4 bg-campus-600 hover:bg-campus-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-campus-600/30 text-sm transition-all"
                >
                  {bookingLoading ? 'Reserving Seat...' : 'Request to Book'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetailsPage;
