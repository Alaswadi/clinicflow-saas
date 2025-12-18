export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  CLINIC_ADMIN = 'CLINIC_ADMIN',
  RECEPTIONIST = 'RECEPTIONIST',
  DOCTOR = 'DOCTOR',
  LAB_TECH = 'LAB_TECH',
  PHARMACIST = 'PHARMACIST'
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  WAITING = 'WAITING', // Checked in
  IN_PROGRESS = 'IN_PROGRESS', // With Doctor
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  lastVisit?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string; // Denormalized for display
  doctorName: string;
  timeSlot: string;
  status: AppointmentStatus;
  tokenNumber?: string; // e.g., A017
  symptoms?: string;
  diagnosis?: string;
  prescriptions?: PrescriptionItem[];
  labTests?: string[];
  totalBill: number;
  paid: boolean;
}

export interface PrescriptionItem {
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface DiagnosisResponse {
  possibleDiagnosis: string;
  reasoning: string;
  recommendedTests: string[];
  recommendedMedicines: string[];
}
