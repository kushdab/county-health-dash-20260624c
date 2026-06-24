import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, ShieldCheck, Baby, MapPin } from 'lucide-react';

const COUNTY_DATA = [
  { name: 'Nairobi', vaccination: 88, mortality: 320, malaria: 45 },
  { name: 'Mombasa', vaccination: 82, mortality: 380, malaria: 120 },
  { name: 'Kisumu', vaccination: 75, mortality: 450, malaria: 310 },
  { name: 'Nakuru', vaccination: 84, mortality: 340, malaria: 65 },
  { name: 'Uasin Gishu', vaccination: 81, mortality: 310, malaria: 30 },
  { name: 'Kiambu', vaccination: 90, mortality: 290, malaria: 25 },
  { name: 'Kilifi', vaccination: 70, mortality: 410, malaria: 280 },
];

const StatCard = ({ title, value, unit, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold">{value}<span className="text-sm font-normal ml-1 text-gray-400">{unit}</span></p>
    </div>
  </div>
);

export default function App() {
  const [selected, setSelected] = useState(COUNTY_DATA[0]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Activity className="text-blue-600" /> Kenya Health Dashboard 2026
        </h1>
        <p className="text-gray-600 mt-2">Public health indicators by county updated June 2026</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select County</label>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {COUNTY_DATA.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelected(c)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                    selected.name === c.name ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2"><MapPin size={16} /> {c.name}</span>
                  {selected.name === c.name && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Vaccination" value={selected.vaccination} unit="%" icon={ShieldCheck} color="bg-emerald-500" />
            <StatCard title="Maternal Mortality" value={selected.mortality} unit="/100k" icon={Baby} color="bg-rose-500" />
            <StatCard title="Malaria Incidence" value={selected.malaria} unit="/1k" icon={Activity} color="bg-amber-500" />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[400px]">
            <h3 className="text-lg font-bold mb-6 text-gray-800">Vaccination Comparison (%)</h3>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={COUNTY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="vaccination" radius={[4, 4, 0, 0]}>
                  {COUNTY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === selected.name ? '#2563eb' : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}