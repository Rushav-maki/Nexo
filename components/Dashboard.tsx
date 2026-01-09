
import React from 'react';
import { AppView, TravelBooking } from '../types';

interface DashboardProps {
  onViewChange: (view: AppView) => void;
  activeBooking: TravelBooking | null;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange, activeBooking }) => {
  const modules = [
    { id: AppView.EDU_SYNC, title: 'EduSync', icon: 'fa-graduation-cap', desc: 'NEB Syllabus AI', color: '#c4b5fd' },
    { id: AppView.TRAVEL_OTA, title: 'Voyage', icon: 'fa-mountain-sun', desc: 'Expedition Planning', color: '#2a1b18' },
    { id: AppView.HEALTH_HUB, title: 'Health', icon: 'fa-heart-pulse', desc: 'Diagnostic Node', color: '#4a4a4a' },
    { id: AppView.AGRI_CLIMATE, title: 'Agro', icon: 'fa-seedling', desc: 'Soil Intelligence', color: '#2a1b18' },
    { id: AppView.AI_CHAT, title: 'Chat', icon: 'fa-robot', desc: 'Cognitive Assistant', color: '#c4b5fd' },
  ];

  return (
    <div className="space-y-24 animate-fadeIn pb-32 neural-pulse">
      {/* Dynamic Command Header */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-black/5 rounded-full shadow-sm">
             <div className="h-1.5 w-1.5 rounded-full bg-[#c4b5fd] animate-pulse"></div>
             <span className="text-[9px] font-black text-[#2a1b18] uppercase tracking-[0.4em] font-serif">System Unified Hub</span>
          </div>
          <h2 className="text-7xl md:text-9xl font-bold text-[#2a1b18] tracking-tighter font-serif uppercase leading-[0.8] italic">
            NEXA<span className="text-[#c4b5fd]">.</span>HUB
          </h2>
          <p className="text-xl md:text-2xl text-[#4a4a4a] font-medium italic opacity-70 leading-relaxed max-w-2xl">
            Welcome back to the Command Plane. All integrated Himalayan subsystems are performing at optimal capacity.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
          <div className="bg-white border border-black/5 p-8 rounded-[2.5rem] shadow-xl flex flex-col items-center gap-2 group hover:border-[#c4b5fd] transition-all cursor-pointer">
             <p className="text-[9px] font-black text-[#4a4a4a] uppercase tracking-widest opacity-40">Wallet</p>
             <span className="text-3xl font-black tracking-tighter text-[#2a1b18]">Rs. 24k</span>
             <i className="fa-solid fa-plus text-[10px] text-[#c4b5fd] mt-2 group-hover:scale-150 transition-transform"></i>
          </div>
          <div className="bg-[#2a1b18] p-8 rounded-[2.5rem] shadow-xl flex flex-col items-center gap-2 text-[#f8f5f0]">
             <p className="text-[9px] font-black text-[#c4b5fd] uppercase tracking-widest opacity-40">Weather</p>
             <span className="text-3xl font-black tracking-tighter">14°C</span>
             <span className="text-[9px] font-bold uppercase opacity-60">Kathmandu</span>
          </div>
        </div>
      </section>

      {/* Active Mission Alert */}
      {activeBooking && (
        <section className="animate-scaleIn relative group overflow-hidden bg-[#2a1b18] p-16 rounded-[4rem] shadow-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-12 relative z-10">
            <div className="h-28 w-28 rounded-[2.5rem] bg-white/10 backdrop-blur-3xl text-[#c4b5fd] flex items-center justify-center text-5xl border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-1000">
              <i className="fa-solid fa-compass-drafting"></i>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <span className="h-2 w-2 rounded-full bg-[#c4b5fd] animate-pulse"></span>
                 <p className="text-[10px] font-black text-[#c4b5fd] uppercase tracking-[0.5em] font-serif italic">Active Expedition Matrix</p>
              </div>
              <h3 className="text-5xl md:text-7xl font-bold text-white font-serif tracking-tight italic leading-none">{activeBooking.destination}</h3>
              <p className="text-sm text-[#d6d3d1] font-medium italic opacity-60">Synchronizing high-altitude protocols...</p>
            </div>
          </div>
          <button 
            onClick={() => onViewChange(AppView.TRAVEL_OTA)} 
            className="relative z-10 bg-[#f8f5f0] text-[#2a1b18] px-16 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#c4b5fd] transition-all shadow-2xl hover:-translate-y-1"
          >
            Access Logistics
          </button>
          <div className="absolute -bottom-20 -right-20 p-12 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-1000">
            <i className="fa-solid fa-mountain-sun text-[30rem] -rotate-12"></i>
          </div>
        </section>
      )}

      {/* Operational Modules Grid */}
      <section className="space-y-12">
        <div className="flex items-center gap-8">
          <h3 className="text-sm font-black text-[#2a1b18] uppercase tracking-[0.5em] font-serif italic whitespace-nowrap">Integrated Subsystems</h3>
          <div className="h-[1px] flex-1 bg-black/5"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {modules.map((mod, idx) => (
            <button
              key={mod.id}
              onClick={() => onViewChange(mod.id)}
              className="stagger-item group relative bg-white border border-black/5 p-12 rounded-[4rem] hover:bg-[#2a1b18] hover:shadow-[0_40px_80px_-20px_rgba(42,27,24,0.3)] transition-all duration-700 text-left overflow-hidden hover:-translate-y-3"
            >
              <div className="h-16 w-16 rounded-[2rem] bg-[#f5f2eb] text-[#2a1b18] flex items-center justify-center mb-10 border border-black/5 group-hover:bg-white/10 group-hover:text-[#c4b5fd] transition-all">
                <i className={`fa-solid ${mod.icon} text-xl`}></i>
              </div>
              <h3 className="text-2xl font-bold text-[#2a1b18] group-hover:text-white font-serif mb-2 tracking-tighter italic transition-colors">{mod.title}</h3>
              <p className="text-xs text-[#4a4a4a] group-hover:text-[#d6d3d1] font-medium leading-relaxed italic opacity-70 transition-colors">{mod.desc}</p>
              
              <div className="mt-10 pt-8 border-t border-black/5 group-hover:border-white/10 flex justify-between items-center transition-colors">
                 <span className="text-[9px] font-black uppercase tracking-widest text-[#c4b5fd]">Interface Node</span>
                 <i className="fa-solid fa-arrow-right-long text-[10px] group-hover:translate-x-3 transition-transform text-[#c4b5fd]"></i>
              </div>

              <div className="absolute -bottom-4 -right-4 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                <i className={`fa-solid ${mod.icon} text-8xl`}></i>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Advanced Diagnostics Card */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 bg-[#f5f2eb] rounded-[5rem] p-16 md:p-20 relative overflow-hidden group shadow-xl border border-black/5">
          <div className="relative z-10 space-y-12">
             <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[#2a1b18] text-[#c4b5fd] flex items-center justify-center shadow-lg">
                   <i className="fa-solid fa-bolt-lightning"></i>
                </div>
                <h4 className="text-sm font-black uppercase tracking-[0.4em] font-serif text-[#2a1b18] italic">Neural Engine Sync</h4>
             </div>
             <h2 className="text-6xl md:text-8xl font-bold leading-[0.9] font-serif tracking-tighter italic text-[#2a1b18]">Localized <br /> Intelligence.</h2>
             <p className="text-xl text-[#4a4a4a] font-medium leading-relaxed italic opacity-80 max-w-lg">
               Our latest AI updates prioritize low-latency NLP specifically tuned for Himalayan linguistic nuances.
             </p>
             <button onClick={() => onViewChange(AppView.AI_CHAT)} className="bg-[#2a1b18] text-white px-16 py-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-[#4a4a4a] transition-all shadow-2xl">
               Engage Nexa.Chat
             </button>
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.03] group-hover:rotate-12 transition-transform duration-[3s] pointer-events-none">
            <i className="fa-solid fa-brain text-[40rem]"></i>
          </div>
        </div>

        <div className="bg-[#2a1b18] text-[#f8f5f0] rounded-[5rem] p-16 shadow-2xl relative overflow-hidden">
           <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-8">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-[#c4b5fd] border-b border-white/5 pb-6">Network Health</h3>
                 <div className="space-y-10">
                    {[
                      { l: 'Server Latency', v: '14ms', s: 'Optimal' },
                      { l: 'Data Nodes', v: '4.2k', s: 'Verified' },
                      { l: 'Neural Load', v: '12%', s: 'Idle' },
                    ].map((st, i) => (
                      <div key={i} className="flex justify-between items-end">
                        <div>
                           <p className="text-[9px] font-black uppercase tracking-widest text-[#d6d3d1] opacity-40 mb-1">{st.l}</p>
                           <p className="text-3xl font-bold font-serif italic">{st.v}</p>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#c4b5fd] mb-1">{st.s}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="mt-12 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex items-center justify-between">
                 <div className="flex flex-col">
                   <span className="text-[10px] font-black text-[#c4b5fd] uppercase tracking-widest mb-1">Status</span>
                   <span className="text-sm font-bold uppercase tracking-tighter">ALL SYSTEMS GO</span>
                 </div>
                 <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-pulse"></div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
