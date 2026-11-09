import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import api from '../services/api';

const ReviewModal = ({ booking, isOpen, onClose, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !booking) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please provide feedback comments.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await api.post('/reviews', {
        rideId: booking.ride._id,
        revieweeId: booking.driver._id || booking.ride.driver._id || booking.driver,
        rating,
        comment,
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
          Rate Your Campus Ride
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Share your experience riding with {booking.ride?.driver?.name || 'the driver'}.
        </p>

        {error && (
          <div className="mt-3 p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110 p-1"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-bold text-slate-700 text-sm">
                {hoverRating || rating} / 5
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Feedback & Comments
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Was the driver on time? Safe driving? Friendly atmosphere?"
              className="w-full text-sm rounded-xl border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-campus-500 focus:border-transparent outline-none resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-sm font-semibold text-white bg-campus-600 hover:bg-campus-700 disabled:opacity-50 rounded-xl shadow-md shadow-campus-500/25"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
