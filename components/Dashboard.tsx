
import React from 'react';
import { AppView, TravelBooking } from '../types';

interface DashboardProps {
  onViewChange: (view: AppView) => void;
  activeBooking: TravelBooking | null;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange, activeBooking }) => {
  const modules = [
    { id: AppView.EDU_SYNC, title: 'EduSync', icon: 'fa-graduation-cap', desc: 'NEB Curriculum AI Matrix', color: '#c4b5fd' },
    { id: AppView.TRAVEL_OTA, title: 'Voyage', icon: 'fa-mountain-sun', desc: 'Expedition Data Plane', color: '#2a1b18' },
    { id: AppView.HEALTH_HUB, title: 'Health', icon: 'fa-heart-pulse', desc: 'Diagnostic Wellness Node', color: '#4a4a4a' },
    { id: AppView.AGRI_CLIMATE, title: 'Agro', icon: 'fa-seedling', desc: 'Soil Intelligence Layer', color: '#2a1b18' },
    { id: AppView.AI_CHAT, title: 'Chat', icon: 'fa-robot', desc: 'Cognitive Assistant', color: '#c4b5fd' },
  ];

  return (
    <div className="space-y-40 animate-fadeIn pb-40 neural-pulse">
      {/* Editorial Dashboard Hero */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-20">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-4 px-6 py-2 bg-white border border-black/5 rounded-full shadow-sm">
             <div className="h-2 w-2 rounded-full bg-[#c4b5fd] animate-pulse"></div>
             <span className="text-[11px] font-black text-[#1a1514] uppercase tracking-[0.5em] font-serif">Command Matrix Alpha</span>
          </div>
          <h2 className="text-8xl md:text-[13rem] font-bold text-[#1a1514] tracking-tighter font-serif uppercase leading-[0.75] italic">
            NEXA<span className="text-[#c4b5fd]">.</span>HUB
          </h2>
          <p className="text-3xl md:text-4xl text-[#3a3a3a] font-medium italic opacity-60 leading-relaxed max-w-3xl">
            Welcome back to the Command Plane. All integrated subsystems are performing at optimal capacity.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 w-full lg:w-auto">
          <div className="bg-white border border-black/5 p-12 rounded-[4rem] shadow-2xl flex flex-col items-center gap-4 group hover:border-[#c4b5fd] transition-all duration-700 cursor-pointer hover:-translate-y-2">
             <p className="text-[11px] font-black text-[#1a1514]/40 uppercase tracking-[0.3em]">Credits</p>
             <span className="text-5xl font-black tracking-tighter text-[#1a1514]">24,150<span className="text-xl text-[#c4b5fd]">.00</span></span>
             <i className="fa-solid fa-plus-circle text-xl text-[#c4b5fd] mt-2 group-hover:scale-125 transition-transform"></i>
          </div>
          <div className="bg-[#1a1514] p-12 rounded-[4rem] shadow-2xl flex flex-col items-center gap-4 text-white">
             <p className="text-[11px] font-black text-[#c4b5fd]/50 uppercase tracking-[0.3em]">Weather</p>
             <span className="text-5xl font-black tracking-tighter">14°C</span>
             <span className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">KTM, Nepal</span>
          </div>
        </div>
      </section>

      {/* Active Mission - Cinematic Scale */}
      {activeBooking && (
        <section className="animate-scaleIn relative group overflow-hidden bg-[#1a1514] p-24 rounded-[6rem] shadow-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex items-center gap-20 relative z-10">
            <div className="h-40 w-40 rounded-[3.5rem] bg-white/5 backdrop-blur-3xl text-[#c4b5fd] flex items-center justify-center text-7xl border border-white/10 shadow-inner group-hover:scale-110 transition-all duration-1000 rotate-6 group-hover:rotate-0">
              <i className="fa-solid fa-compass-drafting"></i>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 <p className="text-[11px] font-black text-[#c4b5fd] uppercase tracking-[0.6em] font-serif italic">Active Expedition Matrix</p>
              </div>
              <h3 className="text-7xl md:text-9xl font-bold text-white font-serif tracking-tight italic leading-none">{activeBooking.destination}</h3>
              <p className="text-2xl text-[#d6d3d1] font-medium italic opacity-50">Synchronizing health telemetry and logistics...</p>
            </div>
          </div>
          <button 
            onClick={() => onViewChange(AppView.TRAVEL_OTA)} 
            className="relative z-10 bg-[#fbf9f6] text-[#1a1514] px-20 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-[#c4b5fd] transition-all shadow-2xl hover:-translate-y-2 active:translate-y-0"
          >
            Access Data Plane
          </button>
          <div className="absolute -bottom-40 -right-40 p-12 opacity-[0.03] pointer-events-none group-hover:opacity-[0.1] transition-all duration-[4s] group-hover:scale-110">
            <i className="fa-solid fa-mountain-sun text-[50rem] -rotate-12"></i>
          </div>
        </section>
      )}

      {/* Subsystems - High Fidelity Cards */}
      <section className="space-y-16">
        <div className="flex items-center gap-12">
          <h3 className="text-[11px] font-black text-[#1a1514] uppercase tracking-[0.8em] font-serif italic whitespace-nowrap opacity-40">Core Subsystems</h3>
          <div className="h-[1px] flex-1 bg-black/5"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {modules.map((mod, idx) => (
            <button
              key={mod.id}
              onClick={() => onViewChange(mod.id)}
              className="stagger-item nexa-card p-14 text-left overflow-hidden group"
            >
              <div className="h-24 w-24 rounded-[3rem] bg-[#fbf9f6] text-[#1a1514] flex items-center justify-center mb-14 border border-black/5 group-hover:bg-[#1a1514] group-hover:text-[#c4b5fd] transition-all duration-700 shadow-sm">
                <i className={`fa-solid ${mod.icon} text-3xl`}></i>
              </div>
              <h3 className="text-4xl font-bold text-[#1a1514] font-serif mb-4 tracking-tighter italic leading-none">{mod.title}</h3>
              <p className="text-lg text-[#3a3a3a] font-medium leading-relaxed italic opacity-60">{mod.desc}</p>
              
              <div className="mt-16 pt-10 border-t border-black/5 group-hover:border-[#c4b5fd]/20 flex justify-between items-center transition-colors">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#c4b5fd] opacity-0 group-hover:opacity-100 transition-all duration-700">Explore Node</span>
                 <i className="fa-solid fa-arrow-right-long text-lg group-hover:translate-x-4 transition-transform text-[#c4b5fd]"></i>
              </div>

              <div className="absolute -bottom-10 -right-10 p-10 opacity-[0.02] group-hover:opacity-[0.1] transition-all duration-1000 pointer-events-none group-hover:scale-125">
                <i className={`fa-solid ${mod.icon} text-[12rem]`}></i>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Deep Learning Interface */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 bg-[#1a1514] rounded-[6rem] p-24 md:p-32 relative overflow-hidden group shadow-2xl">
          <div className="relative z-10 space-y-16">
             <div className="flex items-center gap-8">
                <div className="h-20 w-20 rounded-[2.5rem] bg-white/5 border border-white/10 text-[#c4b5fd] flex items-center justify-center shadow-2xl animate-pulse">
                   <i className="fa-solid fa-brain text-3xl"></i>
                </div>
                <h4 className="text-[12px] font-black uppercase tracking-[0.6em] font-serif text-[#c4b5fd] italic">Neural Engine Sync Active</h4>
             </div>
             <h2 className="text-8xl md:text-[11rem] font-bold leading-[0.8] font-serif tracking-tighter italic text-white">Dynamic <br /> Intelligence.</h2>
             <p className="text-3xl text-[#d6d3d1] font-medium leading-relaxed italic opacity-60 max-w-2xl">
               Our latest cognitive update optimizes NLP processing for the unique regional dialects of the Himalayas.
             </p>
             <button onClick={() => onViewChange(AppView.AI_CHAT)} className="bg-[#fbf9f6] text-[#1a1514] px-24 py-9 rounded-[3rem] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-[#c4b5fd] transition-all shadow-2xl hover:-translate-y-2 active:translate-y-0">
               Initiate Dialogue Matrix
             </button>
          </div>
          <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] group-hover:scale-110 transition-all duration-[5s] pointer-events-none">
            <i className="fa-solid fa-microchip text-[70rem] rotate-12"></i>
          </div>
        </div>

        <div className="bg-white border border-black/5 rounded-[6rem] p-24 shadow-2xl flex flex-col justify-between overflow-hidden relative group">
           <div className="space-y-16 relative z-10">
              <h3 className="text-[12px] font-black uppercase tracking-[0.6em] text-[#1a1514] border-b border-black/10 pb-10 italic">System Health</h3>
              <div className="space-y-16">
                 {[
                   { l: 'Network Latency', v: '14.2ms', s: 'Verified', p: 85 },
                   { l: 'Neural Load', v: '12.4%', s: 'Idle', p: 25 },
                 ].map((st, i) => (
                   <div key={i} className="space-y-6">
                      <div className="flex justify-between items-end">
                        <div>
                           <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1a1514]/40 mb-3">{st.l}</p>
                           <p className="text-5xl font-bold font-serif italic text-[#1a1514]">{st.v}</p>
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#c4b5fd] mb-3">{st.s}</span>
                      </div>
                      <div className="h-[2px] w-full bg-black/5 rounded-full overflow-hidden">
                         <div className="h-full bg-[#c4b5fd] transition-all duration-1000" style={{ width: `${st.p}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="mt-20 bg-[#fbf9f6] p-12 rounded-[4rem] flex items-center justify-between border border-black/5 shadow-inner group-hover:scale-105 transition-transform duration-700">
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-[#1a1514]/40 uppercase tracking-[0.4em] mb-2">Grid Status</span>
                <span className="text-xl font-bold uppercase tracking-tighter text-[#1a1514] italic font-serif">Optimal Sync</span>
              </div>
              <div className="h-6 w-6 rounded-full bg-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.8)] animate-pulse"></div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
