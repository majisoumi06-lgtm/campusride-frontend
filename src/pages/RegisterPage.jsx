import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, Mail, Lock, User, Phone, School, Contact, AlertCircle, Check } from 'lucide-react';
const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    college: '',
    studentId: '',
    avatar: '',
    hasVehicle: false,
    vehicleType: 'Car',
    vehicleModel: '',
    vehicleRegNo: '',
    vehicleCapacity: 3,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        college: formData.college,
        studentId: formData.studentId,
        avatar:
          formData.avatar ||
          `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(formData.name)}`,
        vehicle: {
          hasVehicle: formData.hasVehicle,
          type: formData.hasVehicle ? formData.vehicleType : '',
          model: formData.hasVehicle ? formData.vehicleModel : '',
          regNo: formData.hasVehicle ? formData.vehicleRegNo : '',
          capacity: formData.hasVehicle ? Number(formData.vehicleCapacity) : 1,
        },
      };

      await register(payload);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please review your details.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-campus-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-md shadow-campus-600/30">
            <Car className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">
            Join the Campus Network
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Register your student profile to start booking or offering rides
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 text-xs text-red-700 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Alex Rivera"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Email (.edu)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="alex@campus.edu"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password (min 6 chars)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                College / University
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <School className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="college"
                  required
                  placeholder="State Tech University"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student ID Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Contact className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="studentId"
                  required
                  placeholder="STU-2025-8841"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-campus-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Checkbox Toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer p-3 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                name="hasVehicle"
                checked={formData.hasVehicle}
                onChange={handleChange}
                className="w-4 h-4 text-campus-600 rounded focus:ring-campus-500"
              />
              <span className="text-xs font-semibold text-slate-800">
                I have a vehicle and would like to offer rides to other students
              </span>
            </label>
          </div>

          {/* Conditional Vehicle Fields */}
          {formData.hasVehicle && (
            <div className="p-4 bg-campus-50/50 border border-campus-200 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-campus-800 uppercase tracking-wider">
                Vehicle Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-campus-500"
                  >
                    <option value="Car">Car</option>
                    <option value="SUV">SUV</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Scooter">Scooter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Model (e.g. Civic)
                  </label>
                  <input
                    type="text"
                    name="vehicleModel"
                    placeholder="Honda Civic 2022"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-campus-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Reg Plate Number
                  </label>
                  <input
                    type="text"
                    name="vehicleRegNo"
                    placeholder="ABC-1234"
                    value={formData.vehicleRegNo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-campus-500"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-campus-600 hover:bg-campus-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-campus-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-campus-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
