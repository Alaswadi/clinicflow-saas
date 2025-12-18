import React, { useState } from 'react';
import { Search, Calendar, FileText, Activity, Pill, FlaskConical, ChevronRight, User } from 'lucide-react';

// Mock Data for History
const MOCK_HISTORY_DB = [
  {
    patientId: 'p1',
    name: 'John Doe',
    age: 34,
    gender: 'Male',
    phone: '555-0101',
    visits: [
      {
        id: 'v1',
        date: '2023-10-15',
        doctor: 'Dr. Sarah Wilson',
        diagnosis: 'Acute Bronchitis',
        symptoms: 'Persistent cough, mild fever, chest congestion',
        prescriptions: ['Amoxicillin 500mg (1-0-1) x 5 days', 'Paracetamol 500mg (SOS)'],
        labs: ['CBC', 'Chest X-Ray'],
        notes: 'Patient advised to rest and increase fluid intake.'
      },
      {
        id: 'v2',
        date: '2023-08-20',
        doctor: 'Dr. James Carter',
        diagnosis: 'Seasonal Allergy',
        symptoms: 'Runny nose, itchy eyes',
        prescriptions: ['Cetirizine 10mg (0-0-1) x 3 days'],
        labs: [],
        notes: 'Follow up if symptoms persist.'
      }
    ]
  },
  {
    patientId: 'p2',
    name: 'Jane Smith',
    age: 28,
    gender: 'Female',
    phone: '555-0102',
    visits: [
      {
        id: 'v3',
        date: '2023-09-10',
        doctor: 'Dr. Emily Chen',
        diagnosis: 'Migraine',
        symptoms: 'Severe unilateral headache, photophobia',
        prescriptions: ['Sumatriptan 50mg', 'Naproxen 500mg'],
        labs: [],
        notes: 'Trigger identification diary recommended.'
      }
    ]
  },
  {
    patientId: 'p3',
    name: 'Robert Brown',
    age: 45,
    gender: 'Male',
    phone: '555-0103',
    visits: [] // New patient example
  }
];

const PatientHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<typeof MOCK_HISTORY_DB[0] | null>(null);

  const filteredPatients = searchTerm 
    ? MOCK_HISTORY_DB.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.phone.includes(searchTerm)
      )
    : MOCK_HISTORY_DB;

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar: Patient Search List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col z-10">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Patient Records</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search name or phone..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredPatients.map(patient => (
            <div 
              key={patient.patientId}
              onClick={() => setSelectedPatient(patient)}
              className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-all ${
                selectedPatient?.patientId === patient.patientId ? 'bg-teal-50 border-l-4 border-l-teal-500' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-slate-800">{patient.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{patient.gender}, {patient.age} yrs</p>
                  <p className="text-xs text-slate-400 mt-1">Ph: {patient.phone}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            </div>
          ))}
          {filteredPatients.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm">
              No patients found.
            </div>
          )}
        </div>
      </div>

      {/* Main Content: Medical Timeline */}
      <div className="flex-1 overflow-y-auto relative">
        {selectedPatient ? (
          <div className="max-w-4xl mx-auto p-8">
            {/* Patient Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8 flex items-center gap-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 text-2xl font-bold">
                {selectedPatient.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{selectedPatient.name}</h1>
                <div className="flex gap-4 text-sm text-slate-500 mt-2">
                  <span className="flex items-center gap-1"><User size={14}/> ID: {selectedPatient.patientId}</span>
                  <span>|</span>
                  <span>{selectedPatient.gender}, {selectedPatient.age} years old</span>
                  <span>|</span>
                  <span>{selectedPatient.phone}</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
              <Activity size={20} className="text-teal-600" />
              Medical Timeline
            </h3>

            {selectedPatient.visits.length > 0 ? (
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {selectedPatient.visits.map((visit) => (
                  <div key={visit.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    
                    {/* Icon on the line */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-hover:bg-teal-500 group-hover:text-white text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors">
                      <Calendar size={18} />
                    </div>
                    
                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                      <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-3">
                        <div>
                            <time className="font-bold text-slate-800 text-lg">{new Date(visit.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                            <p className="text-sm text-teal-600 font-medium">{visit.doctor}</p>
                        </div>
                        <div className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full uppercase tracking-wide">
                            Completed
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Diagnosis</p>
                            <p className="text-slate-800 font-medium">{visit.diagnosis}</p>
                            <p className="text-slate-600 text-sm mt-1">"{visit.symptoms}"</p>
                        </div>

                        {visit.prescriptions.length > 0 && (
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                                    <Pill size={12} /> Prescriptions
                                </p>
                                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                    {visit.prescriptions.map((rx, idx) => (
                                        <li key={idx}>{rx}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {visit.labs.length > 0 && (
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <FlaskConical size={12} /> Lab Requests
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {visit.labs.map((lab, idx) => (
                                        <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-100">
                                            {lab}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {visit.notes && (
                            <div className="text-xs text-slate-500 italic mt-2 border-t border-slate-100 pt-2">
                                Note: {visit.notes}
                            </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-slate-300 text-slate-400">
                    <FileText size={48} className="mb-4 opacity-50" />
                    <p>No past medical history found for this patient.</p>
                </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <User size={64} className="mb-6 opacity-20" />
            <h2 className="text-xl font-bold text-slate-600">Select a Patient</h2>
            <p>View complete medical history, past diagnoses, and treatments.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientHistory;