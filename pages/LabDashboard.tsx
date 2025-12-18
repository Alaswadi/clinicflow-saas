import React, { useState } from 'react';
import { FlaskConical, CheckCircle, Clock, AlertCircle, Upload, Search, FileText } from 'lucide-react';

interface LabOrder {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  testName: string;
  doctorName: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED';
  priority: 'ROUTINE' | 'URGENT';
  time: string;
}

const MOCK_LAB_ORDERS: LabOrder[] = [
  { 
    id: 'L001', 
    patientName: 'Alice Smith', 
    age: 45,
    gender: 'Female',
    testName: 'Complete Blood Count (CBC)', 
    doctorName: 'Dr. Sarah Wilson', 
    status: 'PENDING', 
    priority: 'ROUTINE',
    time: '09:30 AM'
  },
  { 
    id: 'L002', 
    patientName: 'Robert Brown', 
    age: 62,
    gender: 'Male',
    testName: 'Lipid Profile & Glucose', 
    doctorName: 'Dr. James Carter', 
    status: 'PROCESSING', 
    priority: 'URGENT',
    time: '10:15 AM'
  },
  { 
    id: 'L003', 
    patientName: 'John Doe', 
    age: 34,
    gender: 'Male',
    testName: 'Thyroid Function Test', 
    doctorName: 'Dr. Emily Chen', 
    status: 'COMPLETED', 
    priority: 'ROUTINE',
    time: '08:45 AM'
  },
  { 
    id: 'L004', 
    patientName: 'Emma Davis', 
    age: 28,
    gender: 'Female',
    testName: 'Urinalysis', 
    doctorName: 'Dr. Sarah Wilson', 
    status: 'PENDING', 
    priority: 'ROUTINE',
    time: '11:00 AM'
  },
  { 
    id: 'L005', 
    patientName: 'Michael Wilson', 
    age: 55,
    gender: 'Male',
    testName: 'Liver Function Test', 
    doctorName: 'Dr. James Carter', 
    status: 'PENDING', 
    priority: 'URGENT',
    time: '11:30 AM'
  }
];

const LabDashboard: React.FC = () => {
  const [orders, setOrders] = useState<LabOrder[]>(MOCK_LAB_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (id: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== id) return order;
      
      if (order.status === 'PENDING') return { ...order, status: 'PROCESSING' };
      if (order.status === 'PROCESSING') return { ...order, status: 'COMPLETED' };
      return order;
    }));
  };

  const filteredOrders = orders.filter(o => 
    o.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = orders.filter(o => o.status === 'PENDING').length;
  const processingCount = orders.filter(o => o.status === 'PROCESSING').length;
  const completedCount = orders.filter(o => o.status === 'COMPLETED').length;

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FlaskConical className="text-blue-600" />
            Laboratory & Diagnostics
          </h2>
          <p className="text-slate-500">Manage test requests and result uploads</p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                <FileText size={18} />
                Worklist PDF
            </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Requests</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{pendingCount}</h3>
          </div>
          <div className="bg-orange-100 p-3 rounded-full text-orange-600">
            <Clock size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Processing</p>
            <h3 className="text-3xl font-bold text-blue-600 mt-1">{processingCount}</h3>
          </div>
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <FlaskConical size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Completed Today</p>
            <h3 className="text-3xl font-bold text-emerald-600 mt-1">{completedCount}</h3>
          </div>
          <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
            <CheckCircle size={24} />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
          <h3 className="font-bold text-slate-800 text-lg">Test Queue</h3>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search patient or test..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Details</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Test Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">{order.time}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-900">{order.patientName}</div>
                    <div className="text-xs text-slate-500">{order.gender}, {order.age} yrs</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-medium">{order.testName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{order.doctorName}</td>
                  <td className="px-6 py-4">
                    {order.priority === 'URGENT' ? (
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                         <AlertCircle size={12} className="mr-1" /> Urgent
                       </span>
                    ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                            Routine
                        </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${order.status === 'PENDING' ? 'bg-orange-50 text-orange-700 border-orange-100' : 
                        order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {order.status === 'PENDING' && (
                        <button 
                            onClick={() => handleStatusChange(order.id)}
                            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1"
                        >
                            <FlaskConical size={14} /> Start
                        </button>
                    )}
                    {order.status === 'PROCESSING' && (
                        <button 
                            onClick={() => handleStatusChange(order.id)}
                            className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1"
                        >
                            <Upload size={14} /> Upload Result
                        </button>
                    )}
                    {order.status === 'COMPLETED' && (
                        <button disabled className="text-xs text-slate-400 font-medium flex items-center gap-1 cursor-not-allowed">
                            <CheckCircle size={14} /> Sent
                        </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="p-12 text-center text-slate-400">
                <FlaskConical size={48} className="mx-auto mb-3 opacity-20" />
                <p>No lab orders found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;