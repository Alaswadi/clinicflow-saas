import { Appointment, AppointmentStatus, Patient } from "./types";

export const MOCK_PATIENTS: Patient[] = [
  { id: 'p1', name: 'John Doe', phone: '555-0101', age: 34, gender: 'Male', lastVisit: '2023-10-12' },
  { id: 'p2', name: 'Jane Smith', phone: '555-0102', age: 28, gender: 'Female' },
  { id: 'p3', name: 'Robert Brown', phone: '555-0103', age: 45, gender: 'Male' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt1',
    patientId: 'p1',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Wilson',
    timeSlot: '10:00 AM',
    status: AppointmentStatus.WAITING,
    tokenNumber: 'A001',
    symptoms: 'Persistent cough, mild fever',
    totalBill: 4000,
    paid: true
  },
  {
    id: 'appt2',
    patientId: 'p2',
    patientName: 'Jane Smith',
    doctorName: 'Dr. Sarah Wilson',
    timeSlot: '10:15 AM',
    status: AppointmentStatus.SCHEDULED,
    totalBill: 0,
    paid: false
  },
  {
    id: 'appt3',
    patientId: 'p3',
    patientName: 'Robert Brown',
    doctorName: 'Dr. Sarah Wilson',
    timeSlot: '10:30 AM',
    status: AppointmentStatus.IN_PROGRESS,
    tokenNumber: 'A002',
    symptoms: 'Severe migraine, sensitivity to light',
    totalBill: 4000,
    paid: true
  }
];

export const MEDICINES_STOCK = [
  { id: 1, name: 'Paracetamol 500mg', stock: 500, price: 500 },
  { id: 2, name: 'Amoxicillin 250mg', stock: 200, price: 1200 },
  { id: 3, name: 'Ibuprofen 400mg', stock: 350, price: 800 },
  { id: 4, name: 'Cetirizine 10mg', stock: 1000, price: 300 },
];