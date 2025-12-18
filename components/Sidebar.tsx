import React from 'react';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  Calendar, 
  Stethoscope, 
  FlaskConical, 
  Pill, 
  LogOut,
  Building2
} from 'lucide-react';

interface SidebarProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRole, setRole, activeView, setActiveView }) => {
  
  const getMenuItems = () => {
    switch(currentRole) {
      case UserRole.RECEPTIONIST:
        return [
          { id: 'reception-dashboard', label: 'Front Desk', icon: <Calendar size={20} /> },
          { id: 'patients', label: 'Patient Registry', icon: <LayoutDashboard size={20} /> }
        ];
      case UserRole.DOCTOR:
        return [
          { id: 'doctor-dashboard', label: 'My Queue', icon: <Stethoscope size={20} /> },
          { id: 'history', label: 'Patient History', icon: <LayoutDashboard size={20} /> }
        ];
      case UserRole.PHARMACIST:
        return [
          { id: 'pharmacy-dashboard', label: 'Dispense', icon: <Pill size={20} /> },
          { id: 'inventory', label: 'Inventory', icon: <LayoutDashboard size={20} /> }
        ];
      case UserRole.CLINIC_ADMIN:
        return [
          { id: 'admin-dashboard', label: 'Clinic Overview', icon: <LayoutDashboard size={20} /> },
          { id: 'reports', label: 'Financial Reports', icon: <Building2 size={20} /> }
        ];
      case UserRole.LAB_TECH:
        return [
          { id: 'lab-dashboard', label: 'Pending Tests', icon: <FlaskConical size={20} /> }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 shadow-xl z-50">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="bg-teal-500 p-2 rounded-lg">
            <Building2 size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">ClinicFlow</h1>
            <p className="text-xs text-slate-400">SaaS Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase mb-2 px-2">Menu</p>
        {getMenuItems().map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              activeView === item.id 
                ? 'bg-teal-600 text-white shadow-md' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700 bg-slate-800">
        <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Simulate Role</p>
        <select 
          value={currentRole} 
          onChange={(e) => {
            setRole(e.target.value as UserRole);
            // Reset view to default for that role
            const newRole = e.target.value as UserRole;
            if (newRole === UserRole.RECEPTIONIST) setActiveView('reception-dashboard');
            if (newRole === UserRole.DOCTOR) setActiveView('doctor-dashboard');
            if (newRole === UserRole.PHARMACIST) setActiveView('pharmacy-dashboard');
            if (newRole === UserRole.CLINIC_ADMIN) setActiveView('admin-dashboard');
            if (newRole === UserRole.LAB_TECH) setActiveView('lab-dashboard');
          }}
          className="w-full bg-slate-900 text-sm text-slate-300 rounded p-2 border border-slate-600 focus:outline-none focus:border-teal-500"
        >
          {Object.values(UserRole).filter(r => r !== UserRole.SUPER_ADMIN).map(role => (
            <option key={role} value={role}>{role.replace('_', ' ')}</option>
          ))}
        </select>
        
        <button className="flex items-center gap-2 text-slate-400 hover:text-white mt-4 text-sm px-2">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
