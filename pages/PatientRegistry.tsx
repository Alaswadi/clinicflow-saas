import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter } from 'lucide-react';

// Color definitions for doctors
const DOCTORS = [
  { id: 'dr-1', name: 'Dr. Sarah Wilson', color: 'bg-teal-100 border-teal-200 text-teal-800', dot: 'bg-teal-500' },
  { id: 'dr-2', name: 'Dr. James Carter', color: 'bg-indigo-100 border-indigo-200 text-indigo-800', dot: 'bg-indigo-500' },
  { id: 'dr-3', name: 'Dr. Emily Chen', color: 'bg-rose-100 border-rose-200 text-rose-800', dot: 'bg-rose-500' }
];

const DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];

// Generate 10-minute time slots from 8:00 AM to 9:00 PM
const generateTimeSlots = () => {
  const slots = [];
  const startHour = 8;
  const endHour = 21; // 9 PM

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 10) {
      if (hour === endHour && minute > 0) break; // Stop after 9:00 PM
      
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : (hour === 0 || hour === 12 ? 12 : hour);
      const displayMinute = minute.toString().padStart(2, '0');
      
      slots.push(`${displayHour.toString().padStart(2, '0')}:${displayMinute} ${ampm}`);
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

// Generate some appointments for the current week with higher granularity
const generateWeeklyAppointments = () => {
  return [
    { id: 1, day: 'Sat', time: '09:00 AM', patient: 'John Doe', doctorId: 'dr-1', type: 'Check-up' },
    { id: 2, day: 'Sat', time: '09:10 AM', patient: 'Mary Jane', doctorId: 'dr-1', type: 'Follow-up' }, // Same hour, different slot
    { id: 3, day: 'Sat', time: '09:20 AM', patient: 'Peter Parker', doctorId: 'dr-1', type: 'Consult' }, // Same hour, different slot
    { id: 4, day: 'Sun', time: '11:00 AM', patient: 'Alice Smith', doctorId: 'dr-2', type: 'Cardio' },
    { id: 5, day: 'Mon', time: '10:10 AM', patient: 'Bob Brown', doctorId: 'dr-1', type: 'Follow-up' },
    { id: 6, day: 'Tue', time: '02:30 PM', patient: 'Clara Jones', doctorId: 'dr-3', type: 'Pediatrics' },
    { id: 7, day: 'Wed', time: '09:00 AM', patient: 'David Lee', doctorId: 'dr-2', type: 'ECG' },
    { id: 8, day: 'Wed', time: '09:20 AM', patient: 'Sarah Connor', doctorId: 'dr-2', type: 'Review' },
    { id: 9, day: 'Thu', time: '04:40 PM', patient: 'Eva Green', doctorId: 'dr-1', type: 'General' },
    { id: 10, day: 'Sat', time: '08:00 PM', patient: 'Frank White', doctorId: 'dr-3', type: 'Vaccine' },
    { id: 11, day: 'Sun', time: '08:10 AM', patient: 'Grace Hall', doctorId: 'dr-1', type: 'Urgent' },
  ];
};

const PatientRegistry: React.FC = () => {
  const [visibleDoctors, setVisibleDoctors] = useState<string[]>(DOCTORS.map(d => d.id));
  const appointments = generateWeeklyAppointments();

  const toggleDoctor = (id: string) => {
    setVisibleDoctors(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const getFormattedDateRange = () => {
    return "Oct 21 - Oct 26, 2023";
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Header Toolbar */}
      <div className="px-8 py-6 bg-white border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <CalendarIcon className="text-teal-600" />
            Patient Registry
          </h2>
          <p className="text-slate-500">Weekly schedule (10-min intervals)</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button className="p-2 hover:bg-white rounded-md transition-shadow shadow-sm text-slate-600">
              <ChevronLeft size={20} />
            </button>
            <span className="px-4 font-semibold text-slate-700">{getFormattedDateRange()}</span>
            <button className="p-2 hover:bg-white rounded-md transition-shadow shadow-sm text-slate-600">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm">
            Today
          </button>
        </div>
      </div>

      {/* Calendar Grid Scroll Area */}
      <div className="flex-1 overflow-auto p-8 pb-24"> 
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-w-[800px]">
          {/* Header Row (Days) */}
          <div className="grid grid-cols-7 border-b border-slate-200 sticky top-0 bg-white z-20 shadow-sm">
            <div className="p-4 border-r border-slate-100 font-semibold text-slate-400 text-center text-xs uppercase tracking-wider bg-slate-50 rounded-tl-xl">
              Time
            </div>
            {DAYS.map(day => (
              <div key={day} className="p-4 border-r border-slate-100 text-center last:border-r-0">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{day}</span>
                <span className="block text-xl font-bold text-slate-800">{Math.floor(Math.random() * 30) + 1}</span>
              </div>
            ))}
          </div>

          {/* Time Slots Rows */}
          <div className="divide-y divide-slate-100">
            {TIME_SLOTS.map((time) => {
               // Check if it's the start of an hour (e.g., ends in ":00 AM" or ":00 PM")
               const isHourStart = time.includes(':00');
               
               return (
                <div key={time} className={`grid grid-cols-7 group ${isHourStart ? 'border-t-2 border-slate-200' : ''}`}>
                  {/* Time Label */}
                  <div className={`
                    p-2 border-r border-slate-100 text-[10px] font-semibold text-slate-500 bg-slate-50 flex items-center justify-center 
                    group-hover:bg-slate-100 transition-colors
                    ${isHourStart ? 'text-slate-800 font-bold text-xs' : 'text-slate-400'}
                  `}>
                    {time}
                  </div>

                  {/* Day Cells */}
                  {DAYS.map((day) => {
                    const appt = appointments.find(a => 
                      a.day === day && 
                      a.time === time && 
                      visibleDoctors.includes(a.doctorId)
                    );
                    const doctor = appt ? DOCTORS.find(d => d.id === appt.doctorId) : null;

                    return (
                      <div key={`${day}-${time}`} className="border-r border-slate-100 relative min-h-[50px] p-1 hover:bg-slate-50 transition-colors last:border-r-0">
                        {appt && doctor && (
                          <div className={`w-full h-full rounded-md border p-1 shadow-sm cursor-pointer hover:shadow-md transition-all flex items-center gap-2 ${doctor.color}`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${doctor.dot} flex-shrink-0`} />
                             <div className="overflow-hidden">
                               <p className="font-bold text-xs truncate">{appt.patient}</p>
                             </div>
                          </div>
                        )}
                        {!appt && (
                           <div className="w-full h-full opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer">
                              <span className="text-slate-300 text-[10px]">+</span>
                           </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Doctor Legend Footer */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <div className="flex items-center gap-6 px-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold mr-4">
                <Filter size={16} />
                Filter Doctors:
            </div>
            {DOCTORS.map(doc => (
                <button 
                    key={doc.id}
                    onClick={() => toggleDoctor(doc.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                        visibleDoctors.includes(doc.id) 
                        ? 'bg-slate-50 border-slate-300 shadow-sm opacity-100' 
                        : 'bg-slate-50 border-slate-200 opacity-50 grayscale'
                    }`}
                >
                    <div className={`w-3 h-3 rounded-full ${doc.dot}`} />
                    {doc.name}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PatientRegistry;