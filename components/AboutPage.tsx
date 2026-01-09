
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 animate-fadeIn pb-20">
      <div className="max-w-3xl">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#c4b5fd] font-serif mb-4 block">Our Origin</span>
        <h2 className="text-5xl font-bold text-[#2a1b18] font-serif italic tracking-tighter mb-8 leading-[1.1]">
          Harmonizing Himalayan <br />
          Modernity.
        </h2>
        <p className="text-xl text-[#4a4a4a] leading-relaxed italic font-medium">
          Nexo was founded on the belief that geography should never limit opportunity. We build the digital infrastructure that connects Nepal's unique terrain with global-standard intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { h: 'Mission', p: 'To provide a unified ecosystem for education, health, and logistics in hard-to-reach zones.', i: 'fa-bullseye' },
          { h: 'Vision', p: 'A Nepal where every student, traveler, farmer, and patient is synced to a verified matrix of care.', i: 'fa-eye' },
          { h: 'Values', p: 'Local first, Privacy always, and relentless pursuit of high-altitude excellence.', i: 'fa-heart' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm">
             <i className={`fa-solid ${item.i} text-[#c4b5fd] text-2xl mb-8`}></i>
             <h4 className="text-xl font-bold font-serif italic mb-4">{item.h}</h4>
             <p className="text-sm text-[#4a4a4a] font-medium leading-relaxed">{item.p}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#f5f2eb] rounded-[4rem] p-16 border-2 border-dashed border-[#c4b5fd]">
        <h3 className="text-3xl font-bold font-serif italic mb-8">Our Promise</h3>
        <p className="text-lg text-[#2a1b18] leading-relaxed italic font-medium opacity-80 max-w-4xl">
          "Nexo is not just an app; it is a commitment to the citizens of Nepal. We measure our success by the stability of the platform and the clarity of the help delivered to your palm."
        </p>
        <div className="mt-10 flex items-center gap-4">
           <div className="h-1 w-12 bg-[#2a1b18]"></div>
           <span className="text-xs font-black uppercase tracking-widest font-serif italic">The Nexo Collective</span>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
