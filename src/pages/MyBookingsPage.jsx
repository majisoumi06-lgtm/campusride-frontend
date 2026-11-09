import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Compass, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import BookingCard from '../components/BookingCard';
import ReviewModal from '../components/ReviewModal';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [actionMessage, setActionMessage] = useState('');

  // Review modal state
  const [selectedBookingForReview, setSelectedBookingForReview] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/bookings/my-bookings');
      if (res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await api.put(`/bookings/${bookingId}/cancel`);
      setActionMessage('Booking cancelled. Reserved seats have been restored.');
      fetchBookings();
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const handleOpenReview = (booking) => {
    setSelectedBookingForReview(booking);
    setReviewModalOpen(true);
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-campus-600">
            Passenger Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans'] mt-0.5">
            My Booked Rides
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Track your upcoming journeys, check departure details, and manage bookings.
          </p>
        </div>

        <Link
          to="/find-rides"
          className="px-4 py-2.5 bg-campus-600 hover:bg-campus-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Compass className="w-4 h-4" />
          Find More Rides
        </Link>
      </div>

      {actionMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold text-slate-500">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl transition-colors ${
            filter === 'all'
              ? 'bg-campus-600 text-white shadow-sm'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          All ({bookings.length})
        </button>
        <button
          onClick={() => setFilter('accepted')}
          className={`px-3 py-1.5 rounded-xl transition-colors ${
            filter === 'accepted'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Confirmed ({bookings.filter((b) => b.status === 'accepted').length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1.5 rounded-xl transition-colors ${
            filter === 'pending'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Pending ({bookings.filter((b) => b.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('cancelled')}
          className={`px-3 py-1.5 rounded-xl transition-colors ${
            filter === 'cancelled'
              ? 'bg-slate-700 text-white shadow-sm'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Cancelled ({bookings.filter((b) => b.status === 'cancelled').length})
        </button>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <div className="w-8 h-8 border-4 border-campus-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm">Retrieving your bookings...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 space-y-4">
          <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No bookings in this category</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Need a ride across campus or to the city? Search active routes and reserve your seat.
          </p>
          <Link
            to="/find-rides"
            className="inline-block px-5 py-2.5 bg-campus-600 hover:bg-campus-700 text-white text-xs font-bold rounded-xl shadow-md"
          >
            Search Rides
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onCancel={handleCancelBooking}
              onReview={handleOpenReview}
            />
          ))}
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        booking={selectedBookingForReview}
        onClose={() => setReviewModalOpen(false)}
        onSuccess={() => {
          setActionMessage('Thank you for rating your ride!');
          setTimeout(() => setActionMessage(''), 3000);
        }}
      />
    </div>
  );
};

export default MyBookingsPage;
