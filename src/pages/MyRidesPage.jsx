import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Calendar,
  Clock,
  Users,
  Check,
  X,
  AlertTriangle,
  PlusCircle,
  CheckCircle2,
  Phone,
  Trash2,
} from 'lucide-react';
import api from '../services/api';

const MyRidesPage = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  const fetchMyRides = async () => {
    try {
      setLoading(true);
      const res = await api.get('/rides/my-rides');
      if (res.data.success) {
        setRides(res.data.rides);
      }
    } catch (err) {
      console.error('Failed to fetch my rides:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRides();
  }, []);

  const handleAcceptBooking = async (bookingId) => {
    try {
      await api.put(`/bookings/${bookingId}/accept`);
      setActionMessage('Passenger booking confirmed!');
      fetchMyRides();
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept booking');
    }
  };

  const handleRejectBooking = async (bookingId) => {
    try {
      await api.put(`/bookings/${bookingId}/reject`);
      setActionMessage('Booking request declined and seat restored.');
      fetchMyRides();
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to decline booking');
    }
  };

  const handleCancelRide = async (rideId) => {
    if (
      !window.confirm(
        'Are you sure you want to cancel this ride? Confirmed passengers will be notified.'
      )
    ) {
      return;
    }

    try {
      await api.delete(`/rides/${rideId}`);
      setActionMessage('Ride cancelled.');
      fetchMyRides();
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel ride');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-campus-600">
            Driver Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans'] mt-0.5">
            My Offered Rides
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage your scheduled campus departures and passenger requests.
          </p>
        </div>

        <Link
          to="/offer-ride"
          className="px-4 py-2.5 bg-campus-600 hover:bg-campus-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Offer New Ride
        </Link>
      </div>

      {actionMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionMessage}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <div className="w-8 h-8 border-4 border-campus-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm">Loading your rides...</p>
        </div>
      ) : rides.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 space-y-4">
          <Car className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">You haven't offered any rides yet</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Heading to campus or driving home? Share your vehicle's empty seats and split fuel expenses.
          </p>
          <Link
            to="/offer-ride"
            className="inline-block px-5 py-2.5 bg-campus-600 hover:bg-campus-700 text-white text-xs font-bold rounded-xl shadow-md"
          >
            Offer a Ride Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {rides.map((ride) => {
            const isCancelled = ride.status === 'cancelled';
            const departureDate = new Date(ride.departureDate).toLocaleDateString(
              'en-US',
              { weekday: 'short', month: 'short', day: 'numeric' }
            );

            return (
              <div
                key={ride._id}
                className={`bg-white rounded-3xl border ${
                  isCancelled ? 'border-slate-200 opacity-60' : 'border-slate-200'
                } p-6 shadow-sm space-y-5`}
              >
                {/* Ride Summary Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {ride.vehicle?.type} • {ride.vehicle?.model}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          ride.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {ride.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {ride.origin} &rarr; {ride.destination}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xl font-black text-slate-900">
                        ${ride.pricePerSeat}
                      </span>
                      <span className="text-[11px] block text-slate-400">per seat</span>
                    </div>

                    {!isCancelled && (
                      <button
                        onClick={() => handleCancelRide(ride._id)}
                        title="Cancel this ride"
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Details row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-campus-600" />
                    <span>{departureDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-campus-600" />
                    <span>{ride.departureTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-campus-600" />
                    <span>{ride.availableSeats} of {ride.totalSeats} seats open</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Plate: </span>
                    <span>{ride.vehicle?.regNo}</span>
                  </div>
                </div>

                {/* Confirmed Passengers */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Confirmed Passengers ({ride.acceptedPassengers?.length || 0})
                  </h4>
                  {ride.acceptedPassengers && ride.acceptedPassengers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ride.acceptedPassengers.map((b) => (
                        <div
                          key={b._id}
                          className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={
                                b.passenger?.avatar ||
                                `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
                                  b.passenger?.name || 'Passenger'
                                )}`
                              }
                              alt={b.passenger?.name}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{b.passenger?.name}</p>
                              <p className="text-[11px] text-slate-400">
                                {b.passenger?.college}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] text-slate-600 flex items-center gap-1">
                              <Phone className="w-3 h-3 text-campus-600" />
                              {b.passenger?.phone}
                            </span>
                            <span className="text-[10px] text-emerald-600 font-bold">
                              {b.seatsBooked} seat(s)
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No passengers confirmed yet.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyRidesPage;
