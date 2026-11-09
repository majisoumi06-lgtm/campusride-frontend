import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2, XCircle, Star } from 'lucide-react';

const BookingCard = ({ booking, onCancel, onReview }) => {
  const ride = booking.ride;
  if (!ride) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
            <AlertCircle className="w-3.5 h-3.5" /> Awaiting Driver
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
            <XCircle className="w-3.5 h-3.5" /> Declined
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            Cancelled
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  const formattedDate = new Date(ride.departureDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Booking ID: #{booking._id.slice(-6)}</span>
            {getStatusBadge(booking.status)}
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            {ride.origin} &rarr; {ride.destination}
          </h3>
        </div>

        <div className="text-right">
          <p className="text-xl font-black text-slate-900">${booking.totalPrice}</p>
          <p className="text-xs text-slate-400">{booking.seatsBooked} seat(s) booked</p>
        </div>
      </div>

      <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-campus-600" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-campus-600" />
          <span>{ride.departureTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Driver:</span>
          <span className="font-semibold text-slate-800">{ride.driver?.name}</span>
        </div>
      </div>

      {booking.pickupLocation && (
        <div className="mb-4 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-campus-600 shrink-0" />
          <span>Pickup at: <strong className="text-slate-800">{booking.pickupLocation}</strong></span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
        <Link
          to={`/rides/${ride._id}`}
          className="text-xs font-semibold text-campus-600 hover:text-campus-800"
        >
          View Full Ride Info &rarr;
        </Link>

        <div className="flex items-center gap-2">
          {booking.status === 'accepted' && (
            <button
              onClick={() => onReview && onReview(booking)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 flex items-center gap-1.5 transition-colors"
            >
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Rate Driver
            </button>
          )}

          {(booking.status === 'pending' || booking.status === 'accepted') && (
            <button
              onClick={() => onCancel && onCancel(booking._id)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
