import React, { useState, useEffect } from 'react';
import { Appointment, AppointmentStatus, DiagnosisResponse } from '../types';
import { MOCK_APPOINTMENTS, MOCK_PATIENTS } from '../constants';
import { User, Clock, BrainCircuit, Activity, Pill, ChevronRight, Check } from 'lucide-react';
import { getAIClinicalSuggestion } from '../services/geminiService';

const DoctorDashboard: React.FC = () => {
  const [queue, setQueue] = useState<Appointment[]>(
    MOCK_APPOINTMENTS.filter(a => [AppointmentStatus.WAITING, AppointmentStatus.IN_PROGRESS].includes(a.status))
  );
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  // Clinical State
  const [symptoms, setSymptoms] = useState('');
  const [aiDiagnosis, setAiDiagnosis] = useState<DiagnosisResponse | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Select first patient in progress or waiting
    if (!selectedAppointment && queue.length > 0) {
      const inProgress = queue.find(a => a.status === AppointmentStatus.IN_PROGRESS);
      setSelectedAppointment(inProgress || queue[0]);
    }
  }, [queue, selectedAppointment]);

  useEffect(() => {
    if (selectedAppointment) {
      setSymptoms(selectedAppointment.symptoms || '');
      setAiDiagnosis(null);
      setNotes('');
    }
  }, [selectedAppointment]);

  const handleConsultAI = async () => {
    if (!selectedAppointment || !symptoms) return;
    
    setIsAiLoading(true);
    // Find patient details for age/gender
    const patient = MOCK_PATIENTS.find(p => p.id === selectedAppointment.patientId);
    
    try {
      const result = await getAIClinicalSuggestion(
        symptoms, 
        patient?.age || 30, 
        patient?.gender || 'Male'
      );
      setAiDiagnosis(result);
    } catch (err) {
      console.error(err);
      alert('Failed to get AI suggestions');
    } finally {
      setIsAiLoading(false);
    }
  };

  const completeConsultation = () => {
    if (!selectedAppointment) return;
    setQueue(prev => prev.filter(a => a.id !== selectedAppointment.id));
    setSelectedAppointment(null);
    alert("Consultation Completed. Prescriptions sent to Pharmacy.");
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Left Panel: Queue */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <User size={20} className="text-teal-600" />
            Patient Queue ({queue.length})
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {queue.map(appt => (
            <div 
              key={appt.id}
              onClick={() => setSelectedAppointment(appt)}
              className={`p-4 border-b border-slate-100 cursor-pointer transition-colors hover:bg-slate-50 ${
                selectedAppointment?.id === appt.id ? 'bg-teal-50 border-l-4 border-l-teal-500' : ''
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-700">{appt.tokenNumber}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock size={12} /> {appt.timeSlot}
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-900">{appt.patientName}</h3>
              <p className="text-xs text-slate-500 truncate">{appt.symptoms || "No symptoms listed"}</p>
            </div>
          ))}
          {queue.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm">
              No patients in queue.
            </div>
          )}
        </div>
      </div>

      {/* Main Panel: Clinical Interface */}
      {selectedAppointment ? (
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-slate-800">{selectedAppointment.patientName}</h1>
              <div className="flex gap-4 text-sm text-slate-500 mt-1">
                <span>Male, 34 yrs</span>
                <span>Token: {selectedAppointment.tokenNumber}</span>
                <span>ID: {selectedAppointment.patientId}</span>
              </div>
            </div>
            <button 
              onClick={completeConsultation}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2"
            >
              <Check size={18} />
              Finalize & Sign
            </button>
          </header>

          <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Clinical Notes Column */}
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Activity size={18} className="text-blue-500" />
                  Symptoms & History
                </h3>
                <textarea 
                  className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-slate-700 bg-white"
                  placeholder="Type patient symptoms here..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
                <div className="mt-3 flex justify-end">
                  <button 
                    onClick={handleConsultAI}
                    disabled={isAiLoading || !symptoms}
                    className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all shadow-md"
                  >
                    {isAiLoading ? (
                      <span className="animate-pulse">Analyzing...</span>
                    ) : (
                      <>
                        <BrainCircuit size={16} />
                        AI Clinical Assistant
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-700 mb-3">Diagnosis & Prescription</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Final Diagnosis</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-slate-300 rounded-md text-sm bg-white"
                      placeholder="e.g. Acute Bronchitis"
                      value={aiDiagnosis?.possibleDiagnosis || notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Prescriptions</label>
                    <div className="border border-slate-200 rounded-lg p-2 min-h-[100px] bg-slate-50">
                      {aiDiagnosis?.recommendedMedicines.map((med, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-2 mb-1 rounded border border-slate-100 text-sm">
                          <span className="flex items-center gap-2"><Pill size={14} className="text-teal-500"/> {med}</span>
                          <span className="text-xs text-slate-400">1-0-1</span>
                        </div>
                      ))}
                      {!aiDiagnosis && <span className="text-slate-400 text-sm p-2">No medicines added yet.</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights Column */}
            <div className="space-y-6">
              {aiDiagnosis ? (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    <BrainCircuit size={20} className="text-indigo-600" />
                    <h3 className="font-bold text-indigo-900">AI Analysis Result</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Suggested Diagnosis</p>
                      <p className="text-lg font-bold text-indigo-900">{aiDiagnosis.possibleDiagnosis}</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Reasoning</p>
                      <p className="text-sm text-indigo-800 leading-relaxed">{aiDiagnosis.reasoning}</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-indigo-400 uppercase tracking-wide mb-2">Recommended Tests</p>
                      <div className="flex flex-wrap gap-2">
                        {aiDiagnosis.recommendedTests.map((test, i) => (
                          <span key={i} className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-md font-medium border border-indigo-200">
                            {test}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                  <BrainCircuit size={48} className="mb-4 opacity-20" />
                  <p className="font-medium">AI Assistant Standing By</p>
                  <p className="text-sm mt-2">Enter patient symptoms and click "AI Clinical Assistant" to get real-time diagnostic support powered by Gemini.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-slate-50 text-slate-400">
          <div className="text-center">
            <User size={48} className="mx-auto mb-4 opacity-20" />
            <p>Select a patient from the queue to start consultation.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;