import React, { useState } from 'react';
import { Download, FileText, CreditCard, Banknote } from 'lucide-react';

const TRANSACTIONS = [
  { id: 'TXN001', time: '09:15 AM', patient: 'John Doe', doctor: 'Dr. Sarah Wilson', amount: 4000, method: 'Cash', status: 'Completed' },
  { id: 'TXN002', time: '09:45 AM', patient: 'Mary Jane', doctor: 'Dr. Sarah Wilson', amount: 4000, method: 'Card', status: 'Completed' },
  { id: 'TXN003', time: '10:30 AM', patient: 'Robert Brown', doctor: 'Dr. James Carter', amount: 5500, method: 'Cash', status: 'Completed' },
  { id: 'TXN004', time: '11:15 AM', patient: 'Alice Smith', doctor: 'Dr. Emily Chen', amount: 3500, method: 'Insurance', status: 'Pending' },
  { id: 'TXN005', time: '12:00 PM', patient: 'David Lee', doctor: 'Dr. James Carter', amount: 4000, method: 'Cash', status: 'Completed' },
];

const FinancialReports: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Financial Reports</h2>
          <p className="text-slate-500">Daily collection and revenue breakdown</p>
        </div>
        <div className="flex gap-3">
            <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            />
            <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
                <FileText size={18} />
                Day Close Report
            </button>
            <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                <Download size={18} />
                Export
            </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Total Collection</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">21,000 YER</h3>
            </div>
            <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                <Banknote size={24} />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Cash in Hand</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">13,500 YER</h3>
            </div>
            <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                <Banknote size={24} />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Card / Insurance</p>
                <h3 className="text-2xl font-bold text-blue-600 mt-1">7,500 YER</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <CreditCard size={24} />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transaction List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800">Today's Transactions</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-3 text-left">Time</th>
                            <th className="px-6 py-3 text-left">Patient</th>
                            <th className="px-6 py-3 text-left">Doctor</th>
                            <th className="px-6 py-3 text-left">Method</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {TRANSACTIONS.map(txn => (
                            <tr key={txn.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-slate-500">{txn.time}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">{txn.patient}</td>
                                <td className="px-6 py-4 text-slate-600">{txn.doctor}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                        ${txn.method === 'Cash' ? 'bg-emerald-100 text-emerald-800' : 
                                          txn.method === 'Card' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                                        {txn.method}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-slate-700">{txn.amount.toLocaleString()} YER</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Doctor Wise Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 h-fit">
             <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800">Revenue by Doctor</h3>
            </div>
            <div className="p-6 space-y-6">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-700">Dr. Sarah Wilson</span>
                        <span className="font-bold text-slate-900">8,000 YER</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-700">Dr. James Carter</span>
                        <span className="font-bold text-slate-900">9,500 YER</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-700">Dr. Emily Chen</span>
                        <span className="font-bold text-slate-900">3,500 YER</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-rose-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;