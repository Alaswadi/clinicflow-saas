import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';

const data = [
  { name: 'Mon', revenue: 40000, patients: 24 },
  { name: 'Tue', revenue: 30000, patients: 18 },
  { name: 'Wed', revenue: 55000, patients: 32 },
  { name: 'Thu', revenue: 45000, patients: 28 },
  { name: 'Fri', revenue: 60000, patients: 35 },
  { name: 'Sat', revenue: 35000, patients: 20 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Clinic Overview</h2>
        <p className="text-slate-500">Welcome back, Dr. Owner</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">1,245,000 YER</h3>
            </div>
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 h-fit">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-xs text-emerald-600 flex items-center gap-1 mt-4 font-medium">
            <TrendingUp size={12} /> +12.5% from last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Patients</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">1,204</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600 h-fit">
              <Users size={20} />
            </div>
          </div>
          <p className="text-xs text-blue-600 flex items-center gap-1 mt-4 font-medium">
            <TrendingUp size={12} /> +8.2% new visits
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Appointments</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">85</h3>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg text-purple-600 h-fit">
              <Calendar size={20} />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4">For current month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
          <h3 className="font-semibold text-slate-700 mb-6">Revenue Analytics (YER)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="revenue" fill="#0d9488" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
          <h3 className="font-semibold text-slate-700 mb-6">Patient Flow</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="patients" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;