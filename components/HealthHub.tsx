
import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { TravelBooking, SymptomResult } from '../types';

interface HealthHubProps {
  activeBooking: TravelBooking | null;
}

const HealthHub: React.FC<HealthHubProps> = ({ activeBooking }) => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<SymptomResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncTips, setSyncTips] = useState<string[]>([]);

  useEffect(() => {
    if (activeBooking) {
      const tips = activeBooking.altitude === 'High' 
        ? ['Acclimatize: Diamox 250mg twice daily.', 'Hydration: 5L water intake target.', 'Oxygen saturation check every morning.']
        : ['SPF 50+ application is mandatory.', 'Potable water sterilization required.', 'Anti-histamine pack for lowlands.'];
      setSyncTips(tips);
    }
  }, [activeBooking]);

  const handleDiagnose = async () => {
    if (!symptoms) return;
    setLoading(true);
    try {
      const res = await GeminiService.analyzeSymptoms(symptoms);
      setResult(res);
    } catch (e) { console.error(e); } 
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-20">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-3xl font-bold text-[#2a1b18] font-serif tracking-tighter uppercase italic">Nexa<span className="text-[#c4b5fd]">.Health</span></h2>
      </div>

      {activeBooking && (
        <div className="bg-[#2a1b18] rounded-[3.5rem] p-12 text-[#f8f5f0] shadow-2xl relative overflow-hidden group">
           <div className="relative z-10">
              <span className="bg-[#f8f5f0]/10 border border-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#c4b5fd] font-serif">Protocol Sync Active</span>
              <h3 className="text-3xl font-bold mt-6 uppercase tracking-tighter font-serif italic">Expedition Core: {activeBooking.destination}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {syncTips.map((tip, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex items-center gap-5">
                     <i className="fa-solid fa-notes-medical text-[#c4b5fd] text-xl"></i>
                     <p className="text-sm font-medium leading-relaxed italic">{tip}</p>
                  </div>
                ))}
              </div>
           </div>
           <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:scale-105 transition-transform duration-700">
             <i className="fa-solid fa-briefcase-medical text-[18rem]"></i>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
           <div className="bg-white border border-black/5 p-12 rounded-[3.5rem] shadow-xl">
             <h3 className="text-xl font-bold text-[#2a1b18] mb-10 flex items-center gap-5 uppercase tracking-tighter font-serif italic">
               <i className="fa-solid fa-microscope text-[#c4b5fd]"></i> Diagnostic Matrix
             </h3>
             <textarea 
               value={symptoms}
               onChange={e => setSymptoms(e.target.value)}
               placeholder="Enumerate physiological deviations and symptoms..."
               className="w-full h-56 bg-[#f5f2eb] border border-black/5 text-[#2a1b18] rounded-[2.5rem] p-10 focus:ring-1 focus:ring-[#c4b5fd] font-medium text-lg resize-none placeholder:text-black/20"
             />
             <button onClick={handleDiagnose} disabled={loading} className="mt-10 w-full h-[72px] bg-[#2a1b18] hover:bg-[#4a4a4a] text-[#f8f5f0] rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-4">
               {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <><i className="fa-solid fa-wave-square"></i> <span>INITIALIZE ANALYSIS</span></>}
             </button>
           </div>

           {result && (
             <div className="bg-white border-2 border-dashed border-[#c4b5fd] p-12 rounded-[3.5rem] shadow-2xl animate-slideUp">
               <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                 <div>
                   <h4 className="text-3xl font-bold text-[#2a1b18] uppercase tracking-tighter font-serif italic">{result.diagnosis}</h4>
                   <p className="text-[#c4b5fd] font-black uppercase tracking-[0.25em] text-[10px] mt-2 italic">{result.urgency} Escalation Status</p>
                 </div>
                 <div className="bg-[#f5f2eb] px-8 py-4 rounded-2xl border border-black/5 shadow-sm">
                   <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mb-1">Assigned Specialist</p>
                   <p className="font-bold text-[#2a1b18] text-sm">{result.specialist}</p>
                 </div>
               </div>
               
               <div className="space-y-10">
                 <div>
                    <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mb-6 block font-serif">Verified Clinical Facilities (Nepal Network)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {result.hospitals?.map((h, i) => (
                        <div key={i} className="bg-[#f5f2eb] p-6 rounded-2xl border border-black/5 flex items-center gap-5 hover:border-[#c4b5fd] transition-all group">
                           <div className="h-10 w-10 rounded-xl bg-white text-[#2a1b18] flex items-center justify-center shadow-sm group-hover:bg-[#2a1b18] group-hover:text-white transition-colors">
                             <i className="fa-solid fa-building-circle-check text-base"></i>
                           </div>
                           <span className="font-bold text-[#2a1b18] text-sm italic">{h}</span>
                        </div>
                      ))}
                    </div>
                 </div>
               </div>
             </div>
           )}
        </div>

        <div className="bg-[#f5f2eb] border border-black/5 rounded-[3.5rem] p-12 h-fit space-y-10 shadow-sm">
           <h4 className="font-bold text-xl text-[#2a1b18] uppercase tracking-tighter font-serif italic border-b border-black/10 pb-6">Verified Cadre</h4>
           <div className="space-y-6">
             {[
               { n: 'Dr. Binod Poudel', s: 'Cardiology (High Altitude)', h: 'TUTH Central' },
               { n: 'Dr. Sita Gurung', s: 'Emergency Med', h: 'Himalayan Rescue' },
               { n: 'Dr. Amit Shah', s: 'Internal Diagnostics', h: 'Medicity' },
             ].map((doc, i) => (
               <div key={i} className="p-6 rounded-2xl bg-white border border-black/5 hover:border-[#c4b5fd] transition-all cursor-pointer shadow-sm group">
                 <p className="font-bold text-[#2a1b18] text-base group-hover:translate-x-1 transition-transform">{doc.n}</p>
                 <p className="text-[11px] font-bold text-[#4a4a4a] uppercase mt-2 tracking-tighter italic opacity-70">{doc.s} • {doc.h}</p>
               </div>
             ))}
           </div>
           <button className="w-full bg-[#2a1b18] text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#4a4a4a] transition-all shadow-xl font-serif">TELE-CONSULTATION</button>
        </div>
      </div>
    </div>
  );
};

export default HealthHub;