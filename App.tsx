import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ReceptionDashboard from './pages/ReceptionDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PatientRegistry from './pages/PatientRegistry';
import FinancialReports from './pages/FinancialReports';
import PatientHistory from './pages/PatientHistory';
import LabDashboard from './pages/LabDashboard';
import PharmacyDashboard from './pages/PharmacyDashboard';
import { UserRole } from './types';

const App: React.FC = () => {
  // Global State for "Simulated" SaaS Environment
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.CLINIC_ADMIN);
  const [activeView, setActiveView] = useState('admin-dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'reception-dashboard':
        return <ReceptionDashboard />;
      case 'patients':
        return <PatientRegistry />;
      case 'doctor-dashboard':
        return <DoctorDashboard />;
      case 'history':
        return <PatientHistory />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'reports':
        return <FinancialReports />;
      case 'pharmacy-dashboard':
        return <PharmacyDashboard activeTab="dispense" />;
      case 'inventory':
        return <PharmacyDashboard activeTab="inventory" />;
      case 'lab-dashboard':
        return <LabDashboard />;
      default:
        return <div className="p-8 text-center text-slate-500">Select a menu item</div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        currentRole={currentRole} 
        setRole={setCurrentRole} 
        activeView={activeView}
        setActiveView={setActiveView}
      />
      
      <div className="flex-1 ml-64 overflow-auto relative">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;