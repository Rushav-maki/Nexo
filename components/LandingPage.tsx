
import React from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="animate-fadeIn space-y-40 pb-40 neural-pulse">
      {/* Cinematic Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-[4rem] md:rounded-[6rem] bg-gradient-to-b from-[#f5f2eb] to-[#f8f5f0] shadow-sm">
        <div className="space-y-10 max-w-6xl mx-auto z-10">
          <div className="inline-flex items-center gap-4 px-8 py-2.5 bg-white border border-[#c4b5fd]/30 rounded-full shadow-xl hover:scale-105 transition-transform cursor-default">
            <span className="h-2 w-2 rounded-full bg-[#c4b5fd] animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.6em] font-serif text-[#2a1b18]">Universal Core Protocol</span>
          </div>
          
          <h1 className="text-8xl md:text-[13rem] font-bold text-[#2a1b18] font-serif leading-[0.75] tracking-tighter italic animate-slideUp">
            NEXA<span className="text-[#c4b5fd]">.</span>GLOBAL
            <span className="block text-4xl md:text-7xl mt-12 font-normal tracking-tight text-[#4a4a4a] not-italic opacity-60">The Integrated Himalayan Intelligence.</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-[#4a4a4a] max-w-4xl mx-auto font-medium leading-relaxed italic opacity-80 pt-10 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            A holistic, localized ecosystem harmonizing education, wellness, and logistics into a single neural architecture.
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center pt-16 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={onEnter}
              className="group bg-[#2a1b18] text-[#f8f5f0] px-20 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#4a4a4a] transition-all shadow-[0_40px_80px_-15px_rgba(42,27,24,0.4)] hover:-translate-y-2 active:translate-y-0"
            >
              Enter System Matrix <i className="fa-solid fa-arrow-right-long ml-4 group-hover:translate-x-4 transition-transform text-[#c4b5fd]"></i>
            </button>
            <button className="bg-white border-2 border-dashed border-[#c4b5fd] text-[#2a1b18] px-20 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#f5f2eb] transition-all">
              The Blueprint V.4
            </button>
          </div>
        </div>

        {/* Dynamic Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
          <i className="fa-solid fa-atom text-[65rem] animate-slow-spin"></i>
        </div>
        <div className="absolute bottom-12 left-0 w-full flex justify-center opacity-30 animate-pulse">
           <i className="fa-solid fa-chevron-down text-2xl"></i>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center px-4 md:px-12">
        <div className="space-y-12">
          <div className="space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c4b5fd] font-serif">Deep Logic</span>
             <h2 className="text-7xl md:text-9xl font-bold font-serif italic tracking-tighter leading-[0.85] text-[#2a1b18]">
               Localized <br />
               By Nature.
             </h2>
          </div>
          <p className="text-2xl text-[#4a4a4a] font-medium leading-relaxed italic opacity-80">
            Technology is only as good as its contextual relevance. NEXA.Global is optimized for the unique topography and cultural fabric of Nepal, ensuring high-performance data delivery from urban hubs to high-altitude settlements.
          </p>
          <div className="grid grid-cols-2 gap-16 pt-12 border-t border-black/5">
             <div className="space-y-2">
               <p className="text-6xl font-black text-[#2a1b18] tracking-tighter">100%</p>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c4b5fd]">Localized Content</p>
             </div>
             <div className="space-y-2">
               <p className="text-6xl font-black text-[#2a1b18] tracking-tighter">128ms</p>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c4b5fd]">Global Latency</p>
             </div>
          </div>
        </div>
        
        <div className="relative group">
           <div className="aspect-[4/5] bg-[#2a1b18] rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(42,27,24,0.3)] overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format" 
                className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-[4s]" 
                alt="Himalayas" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a1b18] via-transparent to-transparent"></div>
              <div className="absolute bottom-24 left-16 right-16 space-y-6">
                 <div className="h-[2px] w-20 bg-[#c4b5fd]"></div>
                 <h3 className="text-5xl font-bold font-serif italic text-white leading-tight">Elevating Human Potential through Integrated Technology.</h3>
              </div>
           </div>
           <div className="absolute -top-12 -right-12 w-56 h-56 border-2 border-dashed border-[#c4b5fd] rounded-full animate-slow-spin opacity-20"></div>
           <div className="absolute -bottom-8 -left-8 bg-[#f5f2eb] p-10 rounded-full shadow-2xl border border-black/5">
              <i className="fa-solid fa-quote-left text-3xl text-[#c4b5fd]"></i>
           </div>
        </div>
      </section>

      {/* Integrated Ecosystem Showcase */}
      <section className="space-y-24 px-4 md:px-12">
        <div className="text-center space-y-6">
           <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#c4b5fd] font-serif">The Architecture</span>
           <h2 className="text-6xl md:text-8xl font-bold font-serif italic tracking-tighter text-[#2a1b18]">Integrated Subsystems</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           {[
             { t: 'EduSync', d: 'K-10 Syllabus AI Matrix for NEB.', i: 'fa-graduation-cap', p: 'Academics' },
             { t: 'Voyage', d: 'High-altitude expedition logistics.', i: 'fa-mountain-sun', p: 'Travel' },
             { t: 'Health', d: 'Predictive localized diagnostics.', i: 'fa-heart-pulse', p: 'Wellness' },
             { t: 'Agro', d: 'Seed vault and soil intelligence.', i: 'fa-leaf', p: 'Agriculture' },
           ].map((sub, i) => (
             <div key={i} className="stagger-item group bg-white p-16 rounded-[4.5rem] border border-black/5 hover:border-[#c4b5fd] transition-all hover:shadow-[0_40px_80px_-20px_rgba(196,181,253,0.15)] space-y-12">
                <div className="h-24 w-24 rounded-[2.5rem] bg-[#f5f2eb] text-[#2a1b18] flex items-center justify-center text-4xl transition-all group-hover:bg-[#2a1b18] group-hover:text-[#c4b5fd] group-hover:rotate-6 shadow-sm">
                  <i className={`fa-solid ${sub.i}`}></i>
                </div>
                <div className="space-y-4">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#c4b5fd] font-serif block">{sub.p} Matrix</span>
                   <h4 className="text-3xl font-bold font-serif italic">{sub.t}</h4>
                   <p className="text-lg text-[#4a4a4a] font-medium leading-relaxed italic opacity-70">{sub.d}</p>
                </div>
                <button 
                  onClick={onEnter}
                  className="w-full py-5 border border-black/5 rounded-2xl text-[10px] font-black uppercase tracking-widest group-hover:bg-[#2a1b18] group-hover:text-white transition-all shadow-sm"
                >
                  Visit Portal
                </button>
             </div>
           ))}
        </div>
      </section>

      {/* Global Newsletter Interface */}
      <section className="bg-[#2a1b18] p-24 md:p-40 rounded-[6rem] text-center space-y-16 shadow-2xl relative overflow-hidden">
         <div className="relative z-10 space-y-10">
           <h2 className="text-7xl md:text-9xl font-bold font-serif italic tracking-tighter text-[#f8f5f0] leading-[0.85]">
             Join the <br />
             Unified Grid.
           </h2>
           <p className="text-2xl text-[#d6d3d1] font-medium italic opacity-60 max-w-2xl mx-auto">
             Subscribe to receive low-latency updates on the NEXA.Core evolution and subsystem expansions.
           </p>
           <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-6">
              <input 
                type="email" 
                placeholder="Neural ID (Email)" 
                className="flex-1 bg-white/5 border border-white/10 rounded-3xl px-10 py-7 text-lg text-white font-medium focus:ring-2 focus:ring-[#c4b5fd] outline-none shadow-inner backdrop-blur-md"
              />
              <button className="bg-[#f8f5f0] text-[#2a1b18] px-16 py-7 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#c4b5fd] transition-all shadow-2xl">
                Authorize
              </button>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c4b5fd] opacity-40">Privacy by Design. Zero Entropy.</p>
         </div>
         <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
            <i className="fa-solid fa-network-wired text-[60rem] rotate-45"></i>
         </div>
      </section>

      {/* Final Footer */}
      <footer className="pt-24 px-8 md:px-24 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-16 pb-20">
         <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-[0.75rem] bg-[#2a1b18]"></div>
            <span className="text-xl font-bold font-serif italic text-[#2a1b18] tracking-tighter">NEXA.GLOBAL</span>
         </div>
         <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.4em] font-serif">
            <a href="#" className="hover:text-[#c4b5fd] transition-colors">Security</a>
            <a href="#" className="hover:text-[#c4b5fd] transition-colors">Ethics</a>
            <a href="#" className="hover:text-[#c4b5fd] transition-colors">Nodes</a>
         </div>
         <div className="text-right">
            <p className="text-[10px] font-medium italic opacity-40">© 2024 Nexa Labs Collective. <br /> Developed in the Himalayas.</p>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
