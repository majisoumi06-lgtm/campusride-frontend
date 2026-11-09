import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShieldCheck, Heart, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-campus-500 flex items-center justify-center text-white shadow-md shadow-campus-500/30">
                <Car className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans']">
                Campus<span className="text-campus-400">Ride</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Safe, affordable, and eco-friendly ride sharing designed exclusively for university students, faculty, and campus communities.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              Verified Student Network Only
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore Rides
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/find-rides" className="hover:text-white transition-colors">
                  Search Available Rides
                </Link>
              </li>
              <li>
                <Link to="/offer-ride" className="hover:text-white transition-colors">
                  Offer a Ride
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-white transition-colors">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Trust & Safety
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <span>.edu Verification</span>
              </li>
              <li className="flex items-center gap-2">
                <span>Driver License & Reg Checks</span>
              </li>
              <li className="flex items-center gap-2">
                <span>Community Review System</span>
              </li>
              <li className="flex items-center gap-2">
                <span>Campus Emergency Assistance</span>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Campus Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-campus-400" />
                <span>support@campusride.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-campus-400" />
                <span>+1 (800) CAMPUS-RIDE</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-campus-400" />
                <span>Student Union Center, Suite 204</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CampusRide Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" /> for campus students worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
