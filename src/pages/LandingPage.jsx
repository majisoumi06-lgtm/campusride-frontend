import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Car,
  Search,
  ShieldCheck,
  Zap,
  Users,
  Compass,
  DollarSign,
  ArrowRight,
  Star,
  CheckCircle2,
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (origin) params.append('origin', origin);
    if (destination) params.append('destination', destination);
    if (date) params.append('date', date);
    navigate(`/find-rides?${params.toString()}`);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-navy-900 to-slate-950 text-white pt-20 pb-32">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sky-300 text-xs font-semibold tracking-wide uppercase">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            The Official Student Ride Sharing Platform
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight font-['Plus_Jakarta_Sans']">
            Smart, Affordable & Safe <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-campus-300 to-emerald-400">
              Campus Ride Sharing
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Connect directly with verified students heading your way. Split fuel costs, reduce campus parking congestion, and make campus commuting effortless.
          </p>

          {/* Quick Search Floating Bar */}
          <div className="max-w-4xl mx-auto mt-10">
            <form
              onSubmit={handleQuickSearch}
              className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl shadow-2xl shadow-black/40 border border-white/20 text-slate-900 grid grid-cols-1 sm:grid-cols-4 gap-3 text-left"
            >
              <div className="p-2 sm:border-r border-slate-200">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Pickup Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. North Campus Library"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                />
              </div>

              <div className="p-2 sm:border-r border-slate-200">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="e.g. Downtown Metro"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                />
              </div>

              <div className="p-2 sm:border-r border-slate-200">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Travel Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                />
              </div>

              <div className="flex items-center">
                <button
                  type="submit"
                  className="w-full h-full min-h-[46px] bg-campus-600 hover:bg-campus-700 text-white font-bold rounded-2xl shadow-lg shadow-campus-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Search className="w-4 h-4" />
                  Find Rides
                </button>
              </div>
            </form>
          </div>

          {/* Quick metrics banner */}
          <div className="pt-8 flex flex-wrap justify-center gap-8 sm:gap-16 text-slate-300 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>100% Student Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <span>Up to 70% Cheaper than Cabs</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-400" />
              <span>Active Peer-to-Peer Carpools</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-campus-600 font-bold text-xs uppercase tracking-widest">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">
            How CampusRide Works
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            Whether you need a daily ride to lectures or you are driving home for the weekend, getting started takes less than two minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all relative group">
            <div className="w-14 h-14 rounded-2xl bg-campus-100 text-campus-600 flex items-center justify-center mb-6 font-black text-xl group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Search or Offer</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Find students driving to your destination or list the empty seats in your car with your departure time and fuel contribution price.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all relative group">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6 font-black text-xl group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Connect & Book</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Reserve seats with one click. Drivers review booking requests and communicate easily through the platform with live notifications.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all relative group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 font-black text-xl group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Hop On & Travel</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Meet at the designated campus pickup spot, enjoy the ride with fellow students, and leave a review once the ride is completed.
            </p>
          </div>
        </div>
      </section>

      {/* Safety & Trust Features */}
      <section className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-campus-600 font-bold text-xs uppercase tracking-widest">
                Student Safety First
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans'] leading-tight">
                Designed From the Ground Up with Campus Safety in Mind
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We believe campus mobility should never compromise personal security. That’s why every member is part of a verified collegiate community.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Verified Student Profiles</h4>
                    <p className="text-xs text-slate-500">
                      Sign-ups require valid college name and student identification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Driver & Vehicle Transparency</h4>
                    <p className="text-xs text-slate-500">
                      Vehicle model, make, registration number, and ratings are visible before booking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Peer Rating & Accountability</h4>
                    <p className="text-xs text-slate-500">
                      Riders and drivers rate each other after every trip to maintain high community trust.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-campus-600 hover:bg-campus-700 text-white font-bold rounded-2xl shadow-md transition-all"
                >
                  Join Campus Community <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Card Preview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-campus-100 flex items-center justify-center text-campus-600 font-bold">
                    CR
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Verified Ride Matching</h4>
                    <p className="text-xs text-slate-500">Live Campus Route Sample</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active Ride
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>From: Campus Main Library</span>
                  <span>To: Downtown Tech Station</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                  <span>Toyota Camry (Silver) • CAM-8821</span>
                  <span className="text-campus-600 text-base">$4.50 / seat</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-slate-700">4.9 / 5.0</span>
                  <span>(18 student reviews)</span>
                </div>
                <span className="font-semibold text-emerald-600">2 seats left</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-campus-600 font-bold text-xs uppercase tracking-widest">
            Student Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">
            Loved by Campus Commuters
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              "CampusRide cut my monthly commute expenses in half. I used to spend $15 a day on cabs from off-campus apartments. Now I ride with engineering classmates for $4!"
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-xs">
                SJ
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Sarah Johnson</p>
                <p className="text-[11px] text-slate-400">Sophomore • Arts & Humanities</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              "As a student driver, fuel costs were burning a hole in my pocket. Offering my 3 empty seats covers all my gas and campus parking passes easily."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-xs">
                AR
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Alex Rivera</p>
                <p className="text-[11px] text-slate-400">Senior • Computer Science</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              "The booking request workflow is so smooth. The driver accepts, you see the car plate right away, and meeting at the campus library is safe and convenient."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-xs">
                DK
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">David Kim</p>
                <p className="text-[11px] text-slate-400">Junior • School of Medicine</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-campus-700 via-campus-600 to-sky-600 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl shadow-campus-600/30">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans']">
            Ready to upgrade your campus commute?
          </h2>
          <p className="text-sky-100 max-w-xl mx-auto text-sm sm:text-base">
            Join hundreds of students already saving money and travelling greener across your university campus.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-white text-campus-700 hover:bg-slate-100 font-bold rounded-2xl shadow-lg transition-all hover:scale-105"
            >
              Sign Up for Free
            </Link>
            <Link
              to="/find-rides"
              className="px-8 py-3.5 bg-campus-800/60 hover:bg-campus-800 text-white font-bold rounded-2xl border border-white/20 transition-all"
            >
              Explore Rides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
