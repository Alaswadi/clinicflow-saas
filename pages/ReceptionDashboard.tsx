import React, { useState } from 'react';
import { Appointment, AppointmentStatus } from '../types';
import { MOCK_APPOINTMENTS } from '../constants';
import { Search, UserPlus, Clock, Printer, CheckCircle, X, Save } from 'lucide-react';

const ReceptionDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isWalkInOpen, setIsWalkInOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: 'Male',
    doctor: 'Dr. Sarah Wilson', // Default
    symptoms: ''
  });

  const handleCheckIn = (id: string) => {
    setAppointments(prev => prev.map(appt => {
      if (appt.id === id) {
        // Generate Token
        const tokenNumber = `A${Math.floor(Math.random() * 100) + 10}`;
        return { ...appt, status: AppointmentStatus.WAITING, tokenNumber };
      }
      return appt;
    }));
  };

  const handlePayment = (id: string) => {
    setAppointments(prev => prev.map(appt => 
      appt.id === id ? { ...appt, paid: true, status: AppointmentStatus.SCHEDULED } : appt
    ));
  };

  const handleWalkInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAppointment: Appointment = {
      id: `walkin-${Date.now()}`,
      patientId: `p-${Date.now()}`,
      patientName: formData.name,
      doctorName: formData.doctor,
      timeSlot: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: AppointmentStatus.SCHEDULED,
      totalBill: 4000, // Standard Consult Fee in YER
      paid: false,
      symptoms: formData.symptoms
    };

    setAppointments([newAppointment, ...appointments]);
    setIsWalkInOpen(false);
    // Reset form
    setFormData({
        name: '',
        phone: '',
        age: '',
        gender: 'Male',
        doctor: 'Dr. Sarah Wilson',
        symptoms: ''
    });
  };

  const filteredAppointments = appointments.filter(a => 
    a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.tokenNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Front Desk & Reception</h2>
          <p className="text-slate-500">Manage bookings, payments, and tokens</p>
        </div>
        <button 
          onClick={() => setIsWalkInOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors"
        >
          <UserPlus size={18} />
          New Walk-in
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium">Waiting Room</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-1">12</h3>
            </div>
            <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
              <Clock size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium">Doctors Active</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-1">3</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <UserPlus size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium">Daily Collection</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-1">45,000 YER</h3>
            </div>
            <div className="bg-green-100 p-2 rounded-lg text-green-600">
              <CheckCircle size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by patient name or token..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Token</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{appt.timeSlot}</td>
                  <td className="px-6 py-4">
                    {appt.tokenNumber ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {appt.tokenNumber}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">{appt.patientName}</div>
                    <div className="text-xs text-slate-500">ID: {appt.patientId}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{appt.doctorName}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${appt.status === AppointmentStatus.WAITING ? 'bg-orange-100 text-orange-800' : 
                        appt.status === AppointmentStatus.IN_PROGRESS ? 'bg-blue-100 text-blue-800' :
                        appt.status === AppointmentStatus.COMPLETED ? 'bg-green-100 text-green-800' : 
                        'bg-slate-100 text-slate-800'}`}>
                      {appt.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {!appt.paid ? (
                       <button 
                       onClick={() => handlePayment(appt.id)}
                       className="text-sm text-red-600 hover:text-red-800 font-medium border border-red-200 bg-red-50 px-3 py-1 rounded-md whitespace-nowrap"
                     >
                       Collect {appt.totalBill.toLocaleString()} YER
                     </button>
                    ) : appt.status === AppointmentStatus.SCHEDULED ? (
                      <button 
                        onClick={() => handleCheckIn(appt.id)}
                        className="text-sm bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-md flex items-center gap-1"
                      >
                        <Printer size={14} />
                        Check-in
                      </button>
                    ) : (
                      <button className="text-slate-400 cursor-not-allowed" disabled>
                        <CheckCircle size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Walk-in Registration Modal */}
        {isWalkInOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <UserPlus size={20} className="text-teal-600" />
                New Walk-in Registration
              </h3>
              <button 
                onClick={() => setIsWalkInOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleWalkInSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Patient Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white"
                      placeholder="e.g. 555-0123"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Age</label>
                    <input 
                      type="number" 
                      className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white"
                      placeholder="e.g. 30"
                      value={formData.age}
                      onChange={e => setFormData({...formData, age: e.target.value})}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Gender</label>
                    <select 
                      className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white"
                      value={formData.gender}
                      onChange={e => setFormData({...formData, gender: e.target.value})}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
              </div>
              
              <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Assign Doctor</label>
                  <select 
                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white"
                    value={formData.doctor}
                    onChange={e => setFormData({...formData, doctor: e.target.value})}
                  >
                      <option value="Dr. Sarah Wilson">Dr. Sarah Wilson (General)</option>
                      <option value="Dr. James Carter">Dr. James Carter (Cardio)</option>
                      <option value="Dr. Emily Chen">Dr. Emily Chen (Pediatrics)</option>
                  </select>
              </div>

              <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Initial Symptoms</label>
                  <textarea 
                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none h-20 bg-white"
                    placeholder="Brief description of patient's complaint..."
                    value={formData.symptoms}
                    onChange={e => setFormData({...formData, symptoms: e.target.value})}
                  />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsWalkInOpen(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-teal-600 rounded-lg text-white font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Register & Book (4000 YER)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ReceptionDashboard;