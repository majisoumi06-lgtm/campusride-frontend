import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import api from '../services/api';

const OfferRidePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Prefill vehicle info from student profile if available
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    pickupPoint: '',
    dropoffPoint: '',
    departureDate: '',
    departureTime: '',
    vehicleType: user?.vehicle?.type || 'Car',
    vehicleModel: user?.vehicle?.model || '',
    vehicleRegNo: user?.vehicle?.regNo || '',
    totalSeats: user?.vehicle?.capacity || 3,
    pricePerSeat: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !formData.origin ||
      !formData.destination ||
      !formData.departureDate ||
      !formData.departureTime ||
      !formData.vehicleModel ||
      !formData.vehicleRegNo ||
      !formData.pricePerSeat
    ) {
      setError('Please fill out all required fields marked with *');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        origin: formData.origin,
        destination: formData.destination,
        pickupPoint: formData.pickupPoint || formData.origin,
        dropoffPoint: formData.dropoffPoint || formData.destination,
        departureDate: formData.departureDate,
        departureTime: formData.departureTime,
        vehicle: {
          type: formData.vehicleType,
          model: formData.vehicleModel,
          regNo: formData.vehicleRegNo,
        },
        totalSeats: Number(formData.totalSeats),
        pricePerSeat: Number(formData.pricePerSeat),
        notes: formData.notes,
      };

      const res = await api.post('/rides', payload);
      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/my-rides');
        }, 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to publish ride. Please check all values.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/50 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-campus-600">
            Driver Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans'] mt-1">
            Publish a Campus Ride Offer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Share empty seats in your vehicle with fellow students. Split gas costs and reduce campus traffic.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 text-xs text-red-700 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-sm text-emerald-800 font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Ride published successfully! Redirecting to My Rides...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Route */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-campus-600" /> Route & Pickups
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Starting Origin *
                </label>
                <input
                  type="text"
                  name="origin"
                  required
                  placeholder="e.g. North Campus Library"
                  value={formData.origin}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination *
                </label>
                <input
                  type="text"
                  name="destination"
                  required
                  placeholder="e.g. Downtown Metro Station"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Pickup Landmark (Optional)
                </label>
                <input
                  type="text"
                  name="pickupPoint"
                  placeholder="e.g. North Gate Bus Shelter"
                  value={formData.pickupPoint}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Drop-off Landmark (Optional)
                </label>
                <input
                  type="text"
                  name="dropoffPoint"
                  placeholder="e.g. Station Exit 2"
                  value={formData.dropoffPoint}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Timing & Pricing */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-campus-600" /> Schedule & Contribution
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Departure Date *
                </label>
                <input
                  type="date"
                  name="departureDate"
                  required
                  value={formData.departureDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Departure Time *
                </label>
                <input
                  type="text"
                  name="departureTime"
                  required
                  placeholder="e.g. 08:30 AM"
                  value={formData.departureTime}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Price Per Seat ($) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    name="pricePerSeat"
                    required
                    placeholder="4.50"
                    value={formData.pricePerSeat}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Vehicle & Seats */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Car className="w-4 h-4 text-campus-600" /> Vehicle Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vehicle Type *
                </label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-campus-500"
                >
                  <option value="Car">Car</option>
                  <option value="SUV">SUV</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Scooter">Scooter</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Make & Model *
                </label>
                <input
                  type="text"
                  name="vehicleModel"
                  required
                  placeholder="Toyota Camry"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registration Plate *
                </label>
                <input
                  type="text"
                  name="vehicleRegNo"
                  required
                  placeholder="CAM-8821"
                  value={formData.vehicleRegNo}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Seats to Offer *
                </label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  name="totalSeats"
                  required
                  value={formData.totalSeats}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Instructions or Notes for Passengers (Optional)
            </label>
            <textarea
              name="notes"
              rows={2}
              placeholder="e.g. Leaving on time. Trunk space available for 2 backpacks. AC on."
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-campus-600 hover:bg-campus-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-xl shadow-campus-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              {loading ? 'Publishing Ride...' : 'Publish Ride to Campus'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferRidePage;
