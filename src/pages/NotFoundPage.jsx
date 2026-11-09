import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Compass, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-campus-50 text-campus-600 flex items-center justify-center border border-campus-200">
        <Car className="w-8 h-8" />
      </div>
      <span className="text-4xl sm:text-6xl font-black text-slate-900 font-['Plus_Jakarta_Sans']">
        404
      </span>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
        Road Not Found
      </h2>
      <p className="text-slate-500 text-xs sm:text-sm max-w-sm">
        The destination you are navigating to doesn't exist or may have been moved to another campus route.
      </p>
      <div className="pt-4 flex items-center gap-3">
        <Link
          to="/"
          className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Go Home
        </Link>
        <Link
          to="/find-rides"
          className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-campus-600 hover:bg-campus-700 rounded-xl shadow-md flex items-center gap-2"
        >
          <Compass className="w-4 h-4" /> Find Rides
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
