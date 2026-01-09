
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';

const EduSync: React.FC = () => {
  const [grade, setGrade] = useState<number>(10);
  const [subject, setSubject] = useState<string>('Science');
  const [topic, setTopic] = useState<string>('');
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const subjects = ['Science', 'Mathematics', 'English', 'Social Studies', 'Nepali'];

  const handleAsk = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await GeminiService.generateEduResponse(grade, subject, topic);
      setLesson(res);
      setTimeout(() => {
        document.getElementById('lesson-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn pb-40 space-y-32">
      {/* High-Res Module Hero */}
      <section className="relative rounded-[5rem] overflow-hidden bg-[#2a1b18] text-[#f8f5f0] p-16 md:p-32 shadow-[0_80px_160px_-40px_rgba(42,27,24,0.4)]">
        <div className="relative z-10 max-w-3xl space-y-10">
          <div className="inline-flex px-6 py-2 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#c4b5fd] font-serif">Academic Intelligence v.12</span>
          </div>
          <h1 className="text-7xl md:text-[10rem] font-bold font-serif italic leading-[0.8] tracking-tighter">
            EduSync<span className="text-[#c4b5fd]">.</span>AI
          </h1>
          <p className="text-2xl md:text-3xl text-[#d6d3d1] font-medium leading-relaxed italic opacity-80 max-w-2xl">
            Bridging theoretical physics with Himalayan reality. Personalized NEB-curriculum processing for grades 8-10.
          </p>
          <div className="pt-8">
            <a href="#matrix-interface" className="bg-[#f8f5f0] text-[#2a1b18] px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-[#c4b5fd] transition-all shadow-2xl hover:-translate-y-1 inline-block">
              Initialize Matrix
            </a>
          </div>
        </div>
        <div className="absolute -top-32 -right-32 opacity-[0.04] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
          <i className="fa-solid fa-graduation-cap text-[50rem] -rotate-12"></i>
        </div>
        <div className="scanline"></div>
      </section>

      {/* Interface Section - Refined Resolution */}
      <section id="matrix-interface" className="space-y-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-[#2a1b18] font-serif tracking-tighter uppercase italic">The Learning Matrix</h2>
            <p className="text-xl text-[#4a4a4a] font-medium italic opacity-60">Define your cognitive parameters below.</p>
          </div>
          <div className="flex gap-4 bg-[#f5f2eb] p-2 rounded-3xl border border-black/5 shadow-inner">
            {[8, 9, 10].map(g => (
              <button 
                key={g} 
                onClick={() => setGrade(g)}
                className={`px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${grade === g ? 'bg-[#2a1b18] text-[#f8f5f0] shadow-xl scale-105' : 'text-[#4a4a4a] hover:bg-black/5'}`}
              >
                Grade {g}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-12 md:p-16 rounded-[4.5rem] border border-black/5 shadow-2xl group">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/4">
              <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest ml-2 mb-4 block opacity-40">Operational Subject</label>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-3xl bg-[#f5f2eb] border border-black/5 text-[#2a1b18] px-8 py-6 focus:ring-2 focus:ring-[#c4b5fd] font-black tracking-tight appearance-none cursor-pointer hover:bg-white transition-all text-lg"
              >
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex-1 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest ml-2 mb-4 block opacity-40">Topic Inquiry</label>
                <input 
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Query Newton's Laws, Cell Biology, Trig..."
                  className="w-full rounded-3xl bg-[#f5f2eb] border border-black/5 text-[#2a1b18] px-8 py-6 focus:ring-2 focus:ring-[#c4b5fd] font-medium text-lg placeholder:text-black/10"
                />
              </div>
              <div className="md:pt-14 flex items-end">
                <button 
                  onClick={handleAsk}
                  disabled={loading}
                  className="w-full md:w-auto bg-[#2a1b18] hover:bg-[#4a4a4a] disabled:bg-slate-400 text-[#f8f5f0] rounded-3xl px-16 py-6 font-black uppercase tracking-[0.2em] text-xs transition-all shadow-2xl flex items-center justify-center gap-4 hover:-translate-y-1"
                >
                  {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <><i className="fa-solid fa-bolt-lightning text-[#c4b5fd]"></i> <span>Launch Sync</span></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Fidelity Result Section */}
      {lesson && (
        <section id="lesson-result" className="grid grid-cols-1 lg:grid-cols-3 gap-16 animate-slideUp">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-16 md:p-24 rounded-[5rem] border border-black/5 shadow-[0_100px_200px_-50px_rgba(42,27,24,0.1)] relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                   <span className="h-[2px] w-12 bg-[#c4b5fd]"></span>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2a1b18] font-serif italic">Verified Intelligence Output</span>
                </div>
                <h3 className="text-6xl md:text-8xl font-bold text-[#2a1b18] font-serif mb-16 italic tracking-tighter leading-none">{lesson.concept}</h3>
                <div className="prose prose-slate max-w-none">
                   <p className="text-[#4a4a4a] leading-relaxed text-2xl mb-20 font-medium italic opacity-80">{lesson.explanation}</p>
                </div>
                
                <div className="bg-[#f5f2eb] p-12 rounded-[4rem] border-2 border-dashed border-[#c4b5fd] flex flex-col md:flex-row gap-12 items-center hover:scale-[1.02] transition-transform duration-700">
                  <div className="h-24 w-24 shrink-0 rounded-[2.5rem] bg-[#2a1b18] text-[#c4b5fd] flex items-center justify-center shadow-2xl text-4xl group-hover:rotate-12 transition-transform">
                    <i className="fa-solid fa-mountain"></i>
                  </div>
                  <div className="space-y-3">
                     <p className="text-[#2a1b18] font-black uppercase tracking-[0.3em] text-[11px] font-serif italic">Himalayan Analogy Matrix</p>
                     <p className="text-[#4a4a4a] font-medium italic leading-relaxed text-xl">{lesson.analogy}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-16 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-[4s]">
                <i className="fa-solid fa-atom text-[30rem]"></i>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-[#2a1b18] text-[#f8f5f0] p-16 rounded-[5rem] shadow-2xl border border-white/5 sticky top-32 group">
              <div className="flex items-center justify-between mb-16">
                <h3 className="text-2xl font-black flex items-center gap-6 uppercase tracking-tighter font-serif italic">
                  <i className="fa-solid fa-brain text-[#c4b5fd] animate-pulse"></i>
                  Checkpoint
                </h3>
              </div>
              <div className="space-y-8">
                {lesson.quickQuiz.map((q: string, i: number) => (
                  <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/q">
                    <div className="flex gap-4">
                       <span className="text-[10px] font-black text-[#c4b5fd] opacity-40">0{i+1}</span>
                       <p className="text-lg font-medium text-[#d6d3d1] group-hover/q:text-white leading-snug italic">{q}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-16 bg-[#f8f5f0] text-[#2a1b18] py-8 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#c4b5fd] transition-all shadow-2xl hover:-translate-y-2">
                Download Study Matrix
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Feature Grid - HD Resolution */}
      {!lesson && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { t: 'NEB Verified', d: 'Intelligence strictly synchronized with Nepal Education Board directives.', i: 'fa-shield-check' },
             { t: 'Neural Analogies', d: 'Complex physics mapped to relatable Himalayan socio-economics.', i: 'fa-dna' },
             { t: 'Offline Ready', d: 'Cache learning nodes to local storage for high-altitude connectivity.', i: 'fa-box-archive' },
           ].map((item, i) => (
             <div key={i} className="stagger-item bg-white p-16 rounded-[4rem] border border-black/5 shadow-sm text-center space-y-10 group hover:bg-[#2a1b18] hover:shadow-2xl transition-all duration-700">
               <div className="h-24 w-24 mx-auto rounded-[2.5rem] bg-[#f5f2eb] text-[#2a1b18] flex items-center justify-center text-3xl shadow-sm group-hover:bg-white/10 group-hover:text-[#c4b5fd] transition-all">
                 <i className={`fa-solid ${item.i}`}></i>
               </div>
               <div className="space-y-4">
                 <h4 className="text-3xl font-bold font-serif italic group-hover:text-white transition-colors">{item.t}</h4>
                 <p className="text-lg text-[#4a4a4a] group-hover:text-[#d6d3d1] font-medium leading-relaxed italic transition-colors opacity-70">{item.d}</p>
               </div>
             </div>
           ))}
        </section>
      )}
    </div>
  );
};

export default EduSync;
