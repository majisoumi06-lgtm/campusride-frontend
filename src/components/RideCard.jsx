import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, Star, Car } from 'lucide-react';

const RideCard = ({ ride }) => {
  const isSoldOut = ride.availableSeats <= 0;
  const departureDate = new Date(ride.departureDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-campus-400 hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between group">
      <div>
        {/* Top bar: Driver info & Price */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src={
                ride.driver?.avatar ||
                `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
                  ride.driver?.name || 'Driver'
                )}`
              }
              alt={ride.driver?.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 bg-slate-50"
            />
            <div>
              <h4 className="font-semibold text-slate-900 group-hover:text-campus-700 transition-colors">
                {ride.driver?.name}
              </h4>
              <p className="text-xs text-slate-500 truncate max-w-[180px]">
                {ride.driver?.college || 'Student Driver'}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold text-slate-700">
                  {ride.driver?.rating?.average || 5.0}
                </span>
                <span className="text-[11px] text-slate-400">
                  ({ride.driver?.rating?.count || 0})
                </span>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-2xl font-black text-slate-900 font-['Plus_Jakarta_Sans']">
              ${ride.pricePerSeat}
            </span>
            <span className="text-[11px] block text-slate-400">per seat</span>
          </div>
        </div>

        {/* Route Details */}
        <div className="py-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center mt-1">
              <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
              <div className="w-0.5 h-7 bg-slate-200 my-0.5" />
              <div className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-50" />
            </div>

            <div className="flex-1 space-y-2 text-sm">
              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                  Pickup
                </p>
                <p className="font-semibold text-slate-800 line-clamp-1">{ride.origin}</p>
                {ride.pickupPoint && ride.pickupPoint !== ride.origin && (
                  <p className="text-xs text-slate-500 truncate">{ride.pickupPoint}</p>
                )}
              </div>

              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                  Drop-off
                </p>
                <p className="font-semibold text-slate-800 line-clamp-1">{ride.destination}</p>
                {ride.dropoffPoint && ride.dropoffPoint !== ride.destination && (
                  <p className="text-xs text-slate-500 truncate">{ride.dropoffPoint}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Schedule & Vehicle Tags */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-campus-600 shrink-0" />
            <span className="truncate">{departureDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-campus-600 shrink-0" />
            <span>{ride.departureTime}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <Car className="w-3.5 h-3.5 text-campus-600 shrink-0" />
            <span className="truncate">
              {ride.vehicle?.type} • {ride.vehicle?.model}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Seat Status & Action */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-3">
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-slate-400" />
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              isSoldOut
                ? 'bg-red-100 text-red-700'
                : ride.availableSeats <= 1
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {isSoldOut ? 'Full' : `${ride.availableSeats} seat${ride.availableSeats > 1 ? 's' : ''} left`}
          </span>
        </div>

        <Link
          to={`/rides/${ride._id}`}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-sm ${
            isSoldOut
              ? 'bg-slate-200 text-slate-500 hover:bg-slate-300'
              : 'bg-campus-600 hover:bg-campus-700 text-white shadow-campus-500/20'
          }`}
        >
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
};

export default RideCard;
