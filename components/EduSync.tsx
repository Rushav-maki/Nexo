
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
      // Scroll to result
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
    <div className="animate-fadeIn pb-24 space-y-24">
      {/* Module Hero Section */}
      <section className="relative rounded-[4rem] overflow-hidden bg-[#2a1b18] text-[#f8f5f0] p-12 md:p-24 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="px-4 py-1.5 bg-[#c4b5fd]/20 border border-[#c4b5fd]/30 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-[#c4b5fd]">Academic Intelligence</span>
          <h1 className="text-5xl md:text-7xl font-bold font-serif italic leading-[1.1] tracking-tighter">
            EduSync<span className="text-[#c4b5fd]">.</span>AI
          </h1>
          <p className="text-lg md:text-xl text-[#d6d3d1] font-medium leading-relaxed italic opacity-80">
            Your personalized gateway to the NEB curriculum. Simplified concepts, localized analogies, and instant clarity for grades 8-10.
          </p>
          <div className="pt-4">
            <a href="#matrix-interface" className="bg-[#f8f5f0] text-[#2a1b18] px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#c4b5fd] transition-all inline-block shadow-xl">
              Start Learning
            </a>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-24 opacity-[0.05] pointer-events-none">
          <i className="fa-solid fa-graduation-cap text-[30rem] -rotate-12"></i>
        </div>
      </section>

      {/* Interface Section */}
      <section id="matrix-interface" className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-[#2a1b18] font-serif tracking-tighter uppercase italic">The Learning Matrix</h2>
            <p className="text-[#4a4a4a] font-medium mt-1">Configure your session parameters below.</p>
          </div>
          <div className="flex gap-2 bg-[#f5f2eb] p-1.5 rounded-2xl border border-black/5 shadow-inner">
            {[8, 9, 10].map(g => (
              <button 
                key={g} 
                onClick={() => setGrade(g)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${grade === g ? 'bg-[#2a1b18] text-[#f8f5f0] shadow-md' : 'text-[#4a4a4a] hover:bg-black/5'}`}
              >
                Grade {g}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-black/5 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest ml-1 mb-2 block">Subject</label>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-2xl bg-[#f5f2eb] border border-black/5 text-[#2a1b18] px-6 py-4 focus:ring-2 focus:ring-[#c4b5fd] font-bold appearance-none cursor-pointer"
              >
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex-1 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest ml-1 mb-2 block">Topic Query</label>
                <input 
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ask about Newton's Laws, Cells, Geometry..."
                  className="w-full rounded-2xl bg-[#f5f2eb] border border-black/5 text-[#2a1b18] px-6 py-4 focus:ring-2 focus:ring-[#c4b5fd] font-medium"
                />
              </div>
              <div className="md:pt-6 flex items-end">
                <button 
                  onClick={handleAsk}
                  disabled={loading}
                  className="w-full md:w-auto bg-[#2a1b18] hover:bg-[#4a4a4a] disabled:bg-slate-400 text-[#f8f5f0] rounded-2xl px-12 py-4 font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-3"
                >
                  {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <><i className="fa-solid fa-brain"></i> <span>Initialize</span></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Result Section */}
      {lesson && (
        <section id="lesson-result" className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-slideUp">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-black/5 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold text-[#2a1b18] font-serif mb-10 italic tracking-tighter">{lesson.concept}</h3>
                <div className="prose prose-slate max-w-none">
                   <p className="text-[#4a4a4a] leading-relaxed text-xl mb-12 font-medium italic opacity-90">{lesson.explanation}</p>
                </div>
                
                <div className="bg-[#f5f2eb] p-10 rounded-[3rem] border-2 border-dashed border-[#c4b5fd] flex flex-col md:flex-row gap-8 items-center">
                  <div className="h-16 w-16 shrink-0 rounded-2xl bg-[#2a1b18] text-[#c4b5fd] flex items-center justify-center shadow-xl text-2xl">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                  <div>
                     <p className="text-[#2a1b18] font-black uppercase tracking-[0.2em] text-[10px] mb-2 font-serif">Contextual Analogy (Nepal)</p>
                     <p className="text-[#4a4a4a] font-medium italic leading-relaxed text-lg">{lesson.analogy}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                <i className="fa-solid fa-book-open text-[20rem]"></i>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#2a1b18] text-[#f8f5f0] p-12 rounded-[4rem] shadow-2xl border border-white/5 sticky top-28">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black flex items-center gap-4 uppercase tracking-tighter font-serif italic">
                  <i className="fa-solid fa-circle-question text-[#c4b5fd]"></i>
                  Checkpoint
                </h3>
                <span className="text-[10px] font-black text-[#c4b5fd]/50 uppercase tracking-widest">Active</span>
              </div>
              <div className="space-y-6">
                {lesson.quickQuiz.map((q: string, i: number) => (
                  <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                    <p className="text-sm font-medium text-[#d6d3d1] group-hover:text-white leading-snug italic">{q}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-12 bg-[#f8f5f0] text-[#2a1b18] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#c4b5fd] transition-all shadow-xl">
                Generate Certificate
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Feature Grid Section (Only if no lesson is active) */}
      {!lesson && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { t: 'NEB Verified', d: 'Content strictly adheres to Nepal Education Board standards.', i: 'fa-certificate' },
             { t: 'Neural Analogies', d: 'Our AI converts complex physics into relatable Nepali experiences.', i: 'fa-microchip' },
             { t: 'Offline Ready', d: 'Save lessons to your local matrix for remote study sessions.', i: 'fa-cloud-arrow-down' },
           ].map((item, i) => (
             <div key={i} className="bg-[#f5f2eb] p-12 rounded-[3.5rem] border border-black/5 shadow-sm text-center space-y-6 group hover:bg-white hover:shadow-xl transition-all">
               <div className="h-16 w-16 mx-auto rounded-full bg-white text-[#2a1b18] flex items-center justify-center text-xl shadow-sm group-hover:bg-[#2a1b18] group-hover:text-[#c4b5fd] transition-colors">
                 <i className={`fa-solid ${item.i}`}></i>
               </div>
               <h4 className="text-xl font-bold font-serif italic">{item.t}</h4>
               <p className="text-sm text-[#4a4a4a] font-medium leading-relaxed italic">{item.d}</p>
             </div>
           ))}
        </section>
      )}
    </div>
  );
};

export default EduSync;
