
import React from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="animate-fadeIn space-y-48 pb-48 neural-pulse">
      {/* High-Fidelity Cinematic Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-[5rem] md:rounded-[7rem] bg-[#ffffff] shadow-sm border border-black/5">
        <div className="space-y-12 max-w-7xl mx-auto z-10 p-8">
          <div className="inline-flex items-center gap-5 px-10 py-3 bg-white border border-[#c4b5fd]/30 rounded-full shadow-2xl hover:scale-105 transition-transform cursor-default">
            <span className="h-2 w-2 rounded-full bg-[#c4b5fd] animate-pulse"></span>
            <span className="text-[11px] font-black uppercase tracking-[0.6em] font-serif text-[#1a1514]">Global Core v.04</span>
          </div>
          
          <h1 className="text-8xl md:text-[14rem] font-bold text-[#1a1514] font-serif leading-[0.75] tracking-tighter italic animate-slideUp">
            NEXA<span className="text-[#c4b5fd]">.</span>GLOBAL
            <span className="block text-4xl md:text-8xl mt-12 font-normal tracking-tight text-[#3a3a3a] not-italic opacity-50 italic">The Himalayan lifestyle OS.</span>
          </h1>
          
          <p className="text-2xl md:text-4xl text-[#1a1514] max-w-5xl mx-auto font-medium leading-relaxed italic opacity-80 pt-10 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            A unified neural ecosystem harmonizing Education, Health, and Logistics across the ridge.
          </p>
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center pt-16 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={onEnter}
              className="group bg-[#1a1514] text-[#fbf9f6] px-24 py-8 rounded-[3rem] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-[#3a3a3a] transition-all shadow-[0_50px_100px_-20px_rgba(26,21,20,0.3)] hover:-translate-y-2 active:translate-y-0"
            >
              Enter Core HUB <i className="fa-solid fa-arrow-right-long ml-6 group-hover:translate-x-4 transition-transform text-[#c4b5fd]"></i>
            </button>
            <button className="bg-white border-2 border-dashed border-[#c4b5fd] text-[#1a1514] px-24 py-8 rounded-[3rem] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-[#fbf9f6] transition-all">
              The Blueprint
            </button>
          </div>
        </div>

        {/* Dynamic Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
          <i className="fa-solid fa-earth-asia text-[65rem] animate-[spin_120s_linear_infinite]"></i>
        </div>
      </section>

      {/* Editorial Grid Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center px-6 md:px-12">
        <div className="space-y-16">
          <div className="space-y-6">
             <span className="text-[12px] font-black uppercase tracking-[0.5em] text-[#c4b5fd] font-serif">Philosophy</span>
             <h2 className="text-7xl md:text-[9rem] font-bold font-serif italic tracking-tighter leading-[0.85] text-[#1a1514]">
               Localized <br />
               By Intent.
             </h2>
          </div>
          <p className="text-2xl md:text-3xl text-[#3a3a3a] font-medium leading-relaxed italic opacity-80">
            NEXA.Global is optimized for the unique topography and cultural fabric of the Himalayas, ensuring 100% data integrity from urban hubs to remote settlements.
          </p>
          <div className="grid grid-cols-2 gap-20 pt-12 border-t border-black/5">
             <div className="space-y-4">
               <p className="text-7xl font-black text-[#1a1514] tracking-tighter">128<span className="text-2xl text-[#c4b5fd]">ms</span></p>
               <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#c4b5fd] opacity-60">System Latency</p>
             </div>
             <div className="space-y-4">
               <p className="text-7xl font-black text-[#1a1514] tracking-tighter">100<span className="text-2xl text-[#c4b5fd]">%</span></p>
               <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#c4b5fd] opacity-60">Neural Localized</p>
             </div>
          </div>
        </div>
        
        <div className="relative group">
           <div className="aspect-[4/5] bg-[#1a1514] rounded-[6rem] shadow-2xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[4s]" 
                alt="Himalayan Landscapes" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1514] via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-24 left-16 right-16 space-y-8">
                 <div className="h-[2px] w-24 bg-[#c4b5fd]"></div>
                 <h3 className="text-5xl md:text-6xl font-bold font-serif italic text-white leading-tight">Elevating Human Potential through Integrated Data.</h3>
              </div>
           </div>
           <div className="absolute -top-16 -right-16 w-64 h-64 border-[3px] border-dashed border-[#c4b5fd]/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
           <div className="absolute -bottom-10 -left-10 bg-white p-12 rounded-full shadow-2xl border border-black/5">
              <i className="fa-solid fa-bolt-lightning text-4xl text-[#c4b5fd]"></i>
           </div>
        </div>
      </section>

      {/* Subsystem Showcase */}
      <section className="space-y-24 px-6 md:px-12">
        <div className="text-center space-y-6">
           <span className="text-[12px] font-black uppercase tracking-[0.8em] text-[#c4b5fd] font-serif">The Architecture</span>
           <h2 className="text-6xl md:text-8xl font-bold font-serif italic tracking-tighter text-[#1a1514]">Core Subsystems</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           {[
             { t: 'EduSync', d: 'K-10 Curriculum Intelligence Matrix.', i: 'fa-graduation-cap', p: 'Academics' },
             { t: 'Voyage', d: 'High-altitude expedition logistics.', i: 'fa-mountain-sun', p: 'Travel' },
             { t: 'Health', d: 'Predictive localized wellness nodes.', i: 'fa-heart-pulse', p: 'Medical' },
             { t: 'Agro', d: 'Seed vault and soil telemetry.', i: 'fa-leaf', p: 'Agro-Tech' },
           ].map((sub, i) => (
             <div key={i} className="stagger-item nexa-card p-16 space-y-12">
                <div className="h-24 w-24 rounded-[2.5rem] bg-[#fbf9f6] text-[#1a1514] flex items-center justify-center text-4xl transition-all group-hover:bg-[#1a1514] group-hover:text-[#c4b5fd] shadow-sm">
                  <i className={`fa-solid ${sub.i}`}></i>
                </div>
                <div className="space-y-6">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#c4b5fd] font-serif block">{sub.p} Portal</span>
                   <h4 className="text-3xl font-bold font-serif italic leading-none">{sub.t}</h4>
                   <p className="text-lg text-[#3a3a3a] font-medium leading-relaxed italic opacity-70">{sub.d}</p>
                </div>
                <button 
                  onClick={onEnter}
                  className="w-full py-6 border border-black/5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-[#1a1514] hover:text-white transition-all shadow-sm font-serif italic"
                >
                  Visit Matrix
                </button>
             </div>
           ))}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="pt-32 px-12 md:px-24 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-16 pb-24">
         <div className="flex items-center gap-6">
            <div className="h-10 w-10 rounded-[1.2rem] bg-[#1a1514] flex items-center justify-center shadow-xl">
               <div className="h-3 w-3 rounded-full bg-[#c4b5fd]"></div>
            </div>
            <span className="text-2xl font-bold font-serif italic text-[#1a1514] tracking-tighter uppercase">NEXA.GLOBAL</span>
         </div>
         <div className="flex gap-16 text-[11px] font-black uppercase tracking-[0.5em] font-serif text-[#1a1514]/40">
            <a href="#" className="hover:text-[#c4b5fd] transition-colors">Infrastructure</a>
            <a href="#" className="hover:text-[#c4b5fd] transition-colors">Security</a>
            <a href="#" className="hover:text-[#c4b5fd] transition-colors">Privacy</a>
         </div>
         <div className="text-right">
            <p className="text-[11px] font-medium italic opacity-30 leading-relaxed">Developed by NEXA Labs. <br /> Dedicated to Himalayan Sovereignty.</p>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
