import React, { useState } from 'react';
import { Pill, Search, CheckCircle, AlertTriangle, Package, DollarSign, Clock, ChevronRight, Filter } from 'lucide-react';

// --- Types ---
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  price: number;
  expiry: string;
  batchNo: string;
}

interface PrescriptionItem {
  medicineId: string;
  name: string;
  qty: number;
  dosage: string;
  pricePerUnit: number;
}

interface PrescriptionOrder {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  doctorName: string;
  time: string;
  status: 'PENDING' | 'DISPENSED';
  items: PrescriptionItem[];
}

// --- Mock Data ---
const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'm1', name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 45, unit: 'Capsules', price: 50, expiry: '2024-12-01', batchNo: 'B101' },
  { id: 'm2', name: 'Paracetamol 500mg', category: 'Analgesic', stock: 500, unit: 'Tablets', price: 10, expiry: '2025-06-15', batchNo: 'B102' },
  { id: 'm3', name: 'Ibuprofen 400mg', category: 'Pain Relief', stock: 120, unit: 'Tablets', price: 25, expiry: '2024-08-20', batchNo: 'B103' },
  { id: 'm4', name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 85, unit: 'Tablets', price: 15, expiry: '2025-01-10', batchNo: 'B104' },
  { id: 'm5', name: 'Omeprazole 20mg', category: 'Antacid', stock: 10, unit: 'Capsules', price: 40, expiry: '2024-05-05', batchNo: 'B105' },
  { id: 'm6', name: 'Metformin 500mg', category: 'Antidiabetic', stock: 200, unit: 'Tablets', price: 12, expiry: '2025-11-30', batchNo: 'B106' },
  { id: 'm7', name: 'Azithromycin 250mg', category: 'Antibiotic', stock: 5, unit: 'Tablets', price: 150, expiry: '2024-03-01', batchNo: 'B107' },
];

const MOCK_ORDERS: PrescriptionOrder[] = [
  {
    id: 'rx-001',
    patientName: 'John Doe',
    age: 34,
    gender: 'Male',
    doctorName: 'Dr. Sarah Wilson',
    time: '10:15 AM',
    status: 'PENDING',
    items: [
      { medicineId: 'm1', name: 'Amoxicillin 500mg', qty: 15, dosage: '1-1-1', pricePerUnit: 50 },
      { medicineId: 'm2', name: 'Paracetamol 500mg', qty: 10, dosage: 'SOS', pricePerUnit: 10 }
    ]
  },
  {
    id: 'rx-002',
    patientName: 'Jane Smith',
    age: 28,
    gender: 'Female',
    doctorName: 'Dr. Sarah Wilson',
    time: '10:30 AM',
    status: 'PENDING',
    items: [
      { medicineId: 'm3', name: 'Ibuprofen 400mg', qty: 6, dosage: '1-0-1', pricePerUnit: 25 }
    ]
  },
  {
    id: 'rx-003',
    patientName: 'Robert Brown',
    age: 55,
    gender: 'Male',
    doctorName: 'Dr. James Carter',
    time: '09:45 AM',
    status: 'DISPENSED',
    items: [
      { medicineId: 'm6', name: 'Metformin 500mg', qty: 30, dosage: '1-0-1', pricePerUnit: 12 },
      { medicineId: 'm5', name: 'Omeprazole 20mg', qty: 14, dosage: '1-0-0', pricePerUnit: 40 }
    ]
  }
];

interface PharmacyDashboardProps {
  activeTab: 'dispense' | 'inventory';
}

const PharmacyDashboard: React.FC<PharmacyDashboardProps> = ({ activeTab }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [orders, setOrders] = useState<PrescriptionOrder[]>(MOCK_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<PrescriptionOrder | null>(null);

  // --- Handlers ---
  const handleDispense = (orderId: string) => {
    // 1. Mark order as dispensed
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'DISPENSED' } : o));
    
    // 2. Reduce stock (Mock Logic)
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const newInventory = [...inventory];
      order.items.forEach(item => {
        const invItem = newInventory.find(i => i.id === item.medicineId);
        if (invItem) {
          invItem.stock = Math.max(0, invItem.stock - item.qty);
        }
      });
      setInventory(newInventory);
    }
    
    // 3. Close Detail View
    setSelectedOrder(null);
  };

  const calculateTotal = (items: PrescriptionItem[]) => {
    return items.reduce((acc, item) => acc + (item.qty * item.pricePerUnit), 0);
  };

  // --- Render Functions ---

  const renderDispenseView = () => {
    const pendingOrders = orders.filter(o => o.status === 'PENDING');
    const dispensedOrders = orders.filter(o => o.status === 'DISPENSED');
    
    // If an order is selected, show detail view
    if (selectedOrder) {
      const totalBill = calculateTotal(selectedOrder.items);
      return (
        <div className="flex flex-col h-full">
           <div className="mb-6 flex items-center gap-4">
             <button onClick={() => setSelectedOrder(null)} className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1">
               <ChevronRight className="rotate-180" size={20} /> Back to Queue
             </button>
             <h2 className="text-xl font-bold text-slate-800">Prescription Details</h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Prescription Paper */}
             <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
               <div className="flex justify-between items-start border-b border-slate-100 pb-6 mb-6">
                 <div>
                   <h3 className="text-2xl font-bold text-slate-800">{selectedOrder.patientName}</h3>
                   <p className="text-slate-500 mt-1">{selectedOrder.gender}, {selectedOrder.age} years</p>
                 </div>
                 <div className="text-right">
                   <p className="font-bold text-teal-600">{selectedOrder.doctorName}</p>
                   <p className="text-xs text-slate-400">{selectedOrder.time}</p>
                 </div>
               </div>

               <table className="w-full mb-8">
                 <thead className="text-xs font-bold text-slate-400 uppercase tracking-wide border-b border-slate-100">
                    <tr>
                      <th className="text-left py-3">Medicine</th>
                      <th className="text-center py-3">Dosage</th>
                      <th className="text-center py-3">Qty</th>
                      <th className="text-right py-3">Price</th>
                      <th className="text-right py-3">Total</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-4">
                          <p className="font-bold text-slate-700">{item.name}</p>
                          <span className="text-xs text-slate-400">Stock Available</span>
                        </td>
                        <td className="py-4 text-center text-sm font-medium bg-slate-50 rounded-lg">{item.dosage}</td>
                        <td className="py-4 text-center font-bold text-slate-700">{item.qty}</td>
                        <td className="py-4 text-right text-slate-500">{item.pricePerUnit}</td>
                        <td className="py-4 text-right font-bold text-slate-800">{(item.qty * item.pricePerUnit).toLocaleString()}</td>
                      </tr>
                    ))}
                 </tbody>
               </table>

               <div className="flex justify-end border-t border-slate-100 pt-6">
                 <div className="w-64">
                   <div className="flex justify-between mb-2 text-slate-500">
                     <span>Subtotal</span>
                     <span>{totalBill.toLocaleString()} YER</span>
                   </div>
                   <div className="flex justify-between mb-4 text-slate-500">
                     <span>Tax (0%)</span>
                     <span>0 YER</span>
                   </div>
                   <div className="flex justify-between text-xl font-bold text-slate-900 pt-4 border-t border-slate-200">
                     <span>Total Bill</span>
                     <span>{totalBill.toLocaleString()} YER</span>
                   </div>
                 </div>
               </div>
             </div>

             {/* Action Panel */}
             <div className="space-y-4">
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                 <h3 className="font-bold text-slate-800 mb-4">Actions</h3>
                 {selectedOrder.status === 'PENDING' ? (
                   <button 
                    onClick={() => handleDispense(selectedOrder.id)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-bold shadow-md transition-colors flex items-center justify-center gap-2"
                   >
                     <CheckCircle size={20} />
                     Dispense & Print Bill
                   </button>
                 ) : (
                    <button disabled className="w-full bg-slate-100 text-slate-400 py-3 rounded-lg font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                      <CheckCircle size={20} />
                      Already Dispensed
                    </button>
                 )}
                 <button className="w-full mt-3 border border-slate-200 hover:bg-slate-50 text-slate-600 py-3 rounded-lg font-medium transition-colors">
                   Print Prescription Only
                 </button>
               </div>

               <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                 <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                   <AlertTriangle size={18} /> Safety Check
                 </h4>
                 <p className="text-sm text-blue-700">
                   No known drug interactions found for this patient.
                 </p>
               </div>
             </div>
           </div>
        </div>
      );
    }

    // Default: List of Orders
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Pharmacy Dispensing</h2>
            <p className="text-slate-500">Manage prescription queue</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
             <Search size={18} className="text-slate-400" />
             <input 
               type="text" 
               placeholder="Search patient..." 
               className="bg-transparent border-none outline-none text-sm w-48"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pending Column */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-orange-50 px-6 py-3 border-b border-orange-100 flex justify-between items-center">
               <h3 className="font-bold text-orange-800 flex items-center gap-2">
                 <Clock size={18} /> Pending ({pendingOrders.length})
               </h3>
             </div>
             <div className="divide-y divide-slate-100">
               {pendingOrders.length === 0 && <div className="p-8 text-center text-slate-400">No pending prescriptions</div>}
               {pendingOrders.map(order => (
                 <div 
                   key={order.id} 
                   onClick={() => setSelectedOrder(order)}
                   className="p-4 hover:bg-slate-50 cursor-pointer transition-colors group"
                 >
                   <div className="flex justify-between items-start mb-2">
                     <span className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors">{order.patientName}</span>
                     <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">{order.time}</span>
                   </div>
                   <p className="text-sm text-slate-500 mb-2">{order.doctorName}</p>
                   <div className="flex flex-wrap gap-1">
                     {order.items.slice(0, 2).map((item, i) => (
                       <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                         {item.name}
                       </span>
                     ))}
                     {order.items.length > 2 && <span className="text-xs text-slate-400">+{order.items.length - 2} more</span>}
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Completed Column */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-100 flex justify-between items-center">
               <h3 className="font-bold text-emerald-800 flex items-center gap-2">
                 <CheckCircle size={18} /> Dispensed Today ({dispensedOrders.length})
               </h3>
             </div>
             <div className="divide-y divide-slate-100">
               {dispensedOrders.length === 0 && <div className="p-8 text-center text-slate-400">No dispensed prescriptions</div>}
               {dispensedOrders.map(order => (
                 <div 
                   key={order.id} 
                   onClick={() => setSelectedOrder(order)}
                   className="p-4 hover:bg-slate-50 cursor-pointer transition-colors opacity-75 hover:opacity-100"
                 >
                   <div className="flex justify-between items-start mb-2">
                     <span className="font-bold text-slate-800 strike-through">{order.patientName}</span>
                     <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">DONE</span>
                   </div>
                   <p className="text-sm text-slate-500">{order.doctorName}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInventoryView = () => {
    const filteredInventory = inventory.filter(i => 
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      i.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Inventory Management</h2>
            <p className="text-slate-500">Track stock levels and expiry</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 shadow-sm transition-colors">
               <Package size={18} />
               Add New Medicine
             </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <p className="text-xs font-bold text-slate-400 uppercase">Total Items</p>
             <p className="text-2xl font-bold text-slate-800">{inventory.length}</p>
           </div>
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <p className="text-xs font-bold text-slate-400 uppercase">Low Stock</p>
             <p className="text-2xl font-bold text-orange-500">{inventory.filter(i => i.stock < 20).length}</p>
           </div>
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <p className="text-xs font-bold text-slate-400 uppercase">Out of Stock</p>
             <p className="text-2xl font-bold text-red-500">{inventory.filter(i => i.stock === 0).length}</p>
           </div>
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <p className="text-xs font-bold text-slate-400 uppercase">Total Value</p>
             <p className="text-2xl font-bold text-teal-600">
               {inventory.reduce((acc, i) => acc + (i.stock * i.price), 0).toLocaleString()} YER
             </p>
           </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center gap-4">
             <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search medicines..." 
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
               <Filter size={18} />
             </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="text-left px-6 py-3">Medicine Name</th>
                  <th className="text-left px-6 py-3">Category</th>
                  <th className="text-left px-6 py-3">Batch No</th>
                  <th className="text-right px-6 py-3">Price (YER)</th>
                  <th className="text-center px-6 py-3">Stock</th>
                  <th className="text-left px-6 py-3">Expiry Date</th>
                  <th className="text-center px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredInventory.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                    <td className="px-6 py-4 text-slate-500">{item.category}</td>
                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">{item.batchNo}</td>
                    <td className="px-6 py-4 text-right font-medium text-slate-700">{item.price}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold ${item.stock < 20 ? 'text-orange-500' : 'text-slate-700'}`}>
                        {item.stock}
                      </span> 
                      <span className="text-xs text-slate-400 ml-1">{item.unit}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.expiry}</td>
                    <td className="px-6 py-4 text-center">
                       {item.stock === 0 ? (
                         <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-red-100 text-red-700">Out of Stock</span>
                       ) : item.stock < 20 ? (
                         <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-orange-100 text-orange-700">Low Stock</span>
                       ) : (
                         <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-700">In Stock</span>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredInventory.length === 0 && <div className="p-8 text-center text-slate-400">No medicines found.</div>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {activeTab === 'dispense' ? renderDispenseView() : renderInventoryView()}
    </div>
  );
};

export default PharmacyDashboard;