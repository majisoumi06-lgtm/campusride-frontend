import React, { useState, useEffect } from 'react';
import {
  Users,
  Car,
  CalendarCheck,
  ShieldAlert,
  Search,
  CheckCircle,
  Ban,
  Clock,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import api from '../services/api';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [activeTab, setActiveTab] = useState('users');
  const [userSearch, setUserSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionNotice, setActionNotice] = useState('');

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [dashRes, usersRes, ridesRes, bookingsRes] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/admin/users'),
        api.get('/admin/rides'),
        api.get('/admin/bookings'),
      ]);

      if (dashRes.data.success) setStats(dashRes.data.stats);
      if (usersRes.data.success) setUsers(usersRes.data.users);
      if (ridesRes.data.success) setRides(ridesRes.data.rides);
      if (bookingsRes.data.success) setBookings(bookingsRes.data.bookings);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    try {
      const res = await api.put(`/admin/users/${userId}/status`, { status: newStatus });
      if (res.data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, status: newStatus } : u))
        );
        setActionNotice(`User status updated to ${newStatus}`);
        setTimeout(() => setActionNotice(''), 3000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user status');
    }
  };

  const filteredUsers = users.filter((u) => {
    if (!userSearch) return true;
    const query = userSearch.toLowerCase();
    return (
      u.name?.toLowerCase().includes(query) ||
      u.email?.toLowerCase().includes(query) ||
      u.college?.toLowerCase().includes(query) ||
      u.studentId?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            Administrative Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">
            Campus Platform Oversight
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Monitor verified students, enforce safety policies, and audit transportation logs.
          </p>
        </div>

        <button
          onClick={fetchAdminData}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 self-start sm:self-auto transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Stats
        </button>
      </div>

      {actionNotice && (
        <div className="p-3.5 bg-blue-50 border border-blue-200 text-campus-800 text-xs font-semibold rounded-2xl">
          {actionNotice}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Total Students
            </p>
            <p className="text-2xl font-black text-slate-900">
              {stats?.users?.total ?? users.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-campus-100 text-campus-600 flex items-center justify-center shrink-0">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Active Rides
            </p>
            <p className="text-2xl font-black text-slate-900">
              {stats?.rides?.active ?? rides.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Total Bookings
            </p>
            <p className="text-2xl font-black text-slate-900">
              {stats?.bookings?.total ?? bookings.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Ban className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Suspended Accounts
            </p>
            <p className="text-2xl font-black text-slate-900">
              {stats?.users?.suspended ?? 0}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold text-slate-500">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'users'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Manage Students ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('rides')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'rides'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Platform Rides ({rides.length})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'bookings'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Platform Bookings ({bookings.length})
        </button>
      </div>

      {/* Tab 1: Users */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-slate-900">Registered Students Directory</h3>
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by name, ID or college..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-400 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">College</th>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={
                            u.avatar ||
                            `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
                              u.name
                            )}`
                          }
                          alt={u.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{u.name}</p>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-[160px] truncate">{u.college}</td>
                    <td className="py-3 px-4 font-mono font-medium">{u.studentId}</td>
                    <td className="py-3 px-4">
                      <span className="capitalize px-2 py-0.5 rounded bg-slate-100 font-medium">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                          u.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleToggleUserStatus(u._id, u.status)}
                          className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                            u.status === 'active'
                              ? 'text-rose-600 hover:bg-rose-50 border border-rose-200'
                              : 'text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
                          }`}
                        >
                          {u.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Rides */}
      {activeTab === 'rides' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-400 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Route</th>
                <th className="py-3 px-4">Driver</th>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Vehicle</th>
                <th className="py-3 px-4">Seats Open</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rides.map((r) => (
                <tr key={r._id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {r.origin} &rarr; {r.destination}
                  </td>
                  <td className="py-3 px-4">{r.driver?.name}</td>
                  <td className="py-3 px-4">
                    {new Date(r.departureDate).toLocaleDateString()} at {r.departureTime}
                  </td>
                  <td className="py-3 px-4">
                    {r.vehicle?.model} ({r.vehicle?.regNo})
                  </td>
                  <td className="py-3 px-4">
                    {r.availableSeats} / {r.totalSeats}
                  </td>
                  <td className="py-3 px-4 font-bold">${r.pricePerSeat}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                        r.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Bookings */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-400 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Passenger</th>
                <th className="py-3 px-4">Driver</th>
                <th className="py-3 px-4">Route</th>
                <th className="py-3 px-4">Seats</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">
                    #{b._id.slice(-6)}
                  </td>
                  <td className="py-3 px-4">{b.passenger?.name}</td>
                  <td className="py-3 px-4">{b.driver?.name}</td>
                  <td className="py-3 px-4">
                    {b.ride?.origin} &rarr; {b.ride?.destination}
                  </td>
                  <td className="py-3 px-4">{b.seatsBooked}</td>
                  <td className="py-3 px-4 font-bold">${b.totalPrice}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                        b.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
