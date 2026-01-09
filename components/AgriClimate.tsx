
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { Seed } from '../types';

const AgriClimate: React.FC = () => {
  const [location, setLocation] = useState('');
  const [crop, setCrop] = useState('');
  const [report, setReport] = useState<any>(null);
  const [tab, setTab] = useState<'Analysis' | 'SeedVault'>('Analysis');
  const [loading, setLoading] = useState(false);

  const seeds: Seed[] = [
    { name: 'Khumal-Rice 4', category: 'Rice', region: 'Hills/Mountain', yield: '5.5 t/ha' },
    { name: 'Janaki Wheat', category: 'Wheat', region: 'Terai', yield: '4.2 t/ha' },
    { name: 'Manakamana-3', category: 'Maize', region: 'Hills', yield: '6.0 t/ha' },
    { name: 'Rampura Hybrid', category: 'Maize', region: 'Terai', yield: '7.5 t/ha' },
  ];

  const handleAnalyze = async () => {
    if (!location || !crop) return;
    setLoading(true);
    try {
      const res = await GeminiService.analyzeAgriLocation(location, crop);
      setReport(res);
    } catch (e) { console.error(e); } 
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      <div className="flex bg-[#f5f2eb] p-1.5 rounded-[1.5rem] border border-black/5 w-fit shadow-inner">
        <button onClick={() => setTab('Analysis')} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${tab === 'Analysis' ? 'bg-[#2a1b18] text-[#f8f5f0] shadow-md' : 'text-[#4a4a4a] hover:text-[#2a1b18]'}`}>Intelligence</button>
        <button onClick={() => setTab('SeedVault')} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${tab === 'SeedVault' ? 'bg-[#2a1b18] text-[#f8f5f0] shadow-md' : 'text-[#4a4a4a] hover:text-[#2a1b18]'}`}>Seed Vault</button>
      </div>

      <div className="flex justify-between items-center mb-6">
         <h2 className="text-3xl font-bold text-[#2a1b18] font-serif tracking-tighter uppercase italic">Nexa<span className="text-[#c4b5fd]">.Agro</span></h2>
      </div>

      {tab === 'Analysis' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           <div className="lg:col-span-2 space-y-8">
             <div className="bg-white border border-black/5 p-12 rounded-[3.5rem] shadow-xl">
               <h3 className="text-xl font-bold text-[#2a1b18] mb-10 flex items-center gap-4 uppercase tracking-tighter font-serif italic">
                 <i className="fa-solid fa-leaf text-[#c4b5fd]"></i> Soil Suitability
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest ml-1">Location</label>
                   <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Kapilvastu" className="w-full bg-[#f5f2eb] border-none text-[#2a1b18] rounded-2xl px-6 py-4 focus:ring-1 focus:ring-[#c4b5fd] font-bold" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest ml-1">Crop Type</label>
                   <input type="text" value={crop} onChange={e => setCrop(e.target.value)} placeholder="e.g. Rice" className="w-full bg-[#f5f2eb] border-none text-[#2a1b18] rounded-2xl px-6 py-4 focus:ring-1 focus:ring-[#c4b5fd] font-bold" />
                 </div>
               </div>
               <button onClick={handleAnalyze} disabled={loading} className="mt-10 w-full h-[72px] bg-[#2a1b18] hover:bg-[#4a4a4a] text-[#f8f5f0] rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-4">
                 {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <><i className="fa-solid fa-satellite"></i> <span>PROCESS</span></>}
               </button>
             </div>

             {report && (
               <div className="bg-white border-2 border-dashed border-[#c4b5fd] p-12 rounded-[3.5rem] shadow-2xl animate-slideUp">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div className="space-y-8">
                        <div>
                          <p className="text-[10px] font-black text-[#c4b5fd] uppercase tracking-widest mb-1 font-serif">Status</p>
                          <p className="text-2xl font-bold text-[#2a1b18] uppercase tracking-tighter italic font-serif">{report.suitability}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-[#c4b5fd] uppercase tracking-widest mb-1 font-serif">Recommended Variety</p>
                          <p className="text-xl font-bold text-[#2a1b18] italic">{report.bestVariety}</p>
                        </div>
                     </div>
                     <div className="space-y-8">
                        <div>
                          <p className="text-[10px] font-black text-[#c4b5fd] uppercase tracking-widest mb-1 font-serif">Climate Risk</p>
                          <p className="text-sm text-[#4a4a4a] font-medium leading-relaxed tracking-tight italic">{report.climateRisk}</p>
                        </div>
                        <div className="bg-[#f5f2eb] p-6 rounded-2xl border border-[#c4b5fd]/20">
                          <p className="text-xs font-bold text-[#2a1b18] leading-snug italic opacity-80">{report.soilTips}</p>
                        </div>
                     </div>
                  </div>
               </div>
             )}
           </div>

           <div className="bg-[#2a1b18] p-12 rounded-[3.5rem] shadow-2xl text-[#f8f5f0] h-fit relative overflow-hidden group">
              <h4 className="font-bold text-xl text-white mb-10 uppercase tracking-tighter font-serif italic border-b border-white/5 pb-6">Market Hub</h4>
              <div className="space-y-5 relative z-10">
                {[
                  { n: 'Potato (Red)', p: 'Rs. 45', t: 'down' },
                  { n: 'Tomato (Local)', p: 'Rs. 85', t: 'up' },
                  { n: 'Onion', p: 'Rs. 110', t: 'stable' },
                ].map((m, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    <span className="font-bold text-[#d6d3d1] text-sm italic">{m.n}</span>
                    <div className="flex items-center gap-4">
                       <span className="font-black text-white text-sm">{m.p}</span>
                       <i className={`fa-solid fa-arrow-${m.t} text-[10px] ${m.t === 'up' ? 'text-red-400' : 'text-emerald-400'}`}></i>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:rotate-45 transition-transform duration-1000">
                <i className="fa-solid fa-chart-line text-[15rem]"></i>
              </div>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeIn">
          {seeds.map((s, i) => (
            <div key={i} className="bg-white border border-black/5 p-10 rounded-[3.5rem] hover:border-[#c4b5fd] transition-all group shadow-sm hover:shadow-xl">
              <div className="h-14 w-14 rounded-2xl bg-[#f5f2eb] text-[#2a1b18] flex items-center justify-center mb-10 group-hover:bg-[#2a1b18] group-hover:text-[#c4b5fd] transition-all">
                <i className="fa-solid fa-dna text-xl"></i>
              </div>
              <h4 className="text-xl font-bold text-[#2a1b18] font-serif italic mb-2 tracking-tighter">{s.name}</h4>
              <p className="text-[10px] font-black text-[#4a4a4a]/40 uppercase tracking-widest font-serif">{s.region}</p>
              <div className="mt-12 pt-8 border-t border-black/5 flex justify-between items-center">
                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{s.yield} Target</span>
                 <button className="text-[#2a1b18] text-[10px] font-black uppercase tracking-widest hover:text-[#c4b5fd] transition-colors">Data Sheet</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgriClimate;
