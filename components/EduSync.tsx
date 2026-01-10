
import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';

type EduMode = 'Hub' | 'Library' | 'AILab';

const EduSync: React.FC = () => {
  const [mode, setMode] = useState<EduMode>('Hub');
  const [grade, setGrade] = useState<number>(10);
  const [subject, setSubject] = useState<string>('Science');
  const [topic, setTopic] = useState<string>('');
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const [followUp, setFollowUp] = useState('');
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{q: string, a: string}[]>([]);

  const subjects = [
    { name: 'Science', icon: 'fa-microscope', color: 'bg-emerald-600', count: '42 Lessons' },
    { name: 'Mathematics', icon: 'fa-calculate', color: 'bg-blue-600', count: '38 Lessons' },
    { name: 'English', icon: 'fa-language', color: 'bg-rose-600', count: '25 Lessons' },
    { name: 'Social Studies', icon: 'fa-users-rectangle', color: 'bg-amber-600', count: '31 Lessons' },
    { name: 'Nepali', icon: 'fa-pen-nib', color: 'bg-orange-600', count: '19 Lessons' },
  ];

  const handleAsk = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setChatHistory([]);
    try {
      const res = await GeminiService.generateEduResponse(grade, subject, topic);
      setLesson(res);
      setMode('AILab');
    } catch (error) {
      console.error("EDU Generation Failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async (e?: React.FormEvent, preset?: string) => {
    if (e) e.preventDefault();
    const query = preset || followUp;
    if (!query.trim() || !lesson) return;

    setFollowUpLoading(true);
    const context = `Lesson on ${lesson.concept}. Explanation: ${lesson.explanation.substring(0, 400)}`;
    
    try {
      const answer = await GeminiService.eduFollowUp(context, query);
      setChatHistory(prev => [...prev, { q: query, a: answer }]);
      setFollowUp('');
    } catch (err) {
      console.error("Follow-up error", err);
    } finally {
      setFollowUpLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-40 text-stone-900 w-full animate-reveal">
      {/* Dynamic Header */}
      <section className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-stone-200 pb-12">
        <div className="space-y-4">
           <div className="flex items-center gap-4">
              <span className="h-[2px] w-12 bg-orange-600"></span>
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.6em]">Academic Intelligence System</span>
           </div>
           <h2 className="text-7xl md:text-9xl font-serif italic font-bold tracking-tighter text-stone-900 leading-[0.85]">Edu<span className="text-orange-600">.Sync</span></h2>
        </div>
        <nav className="flex bg-stone-100 p-1.5 rounded-full border border-stone-200 shadow-inner">
           {(['Hub', 'Library', 'AILab'] as EduMode[]).map(m => (
             <button 
               key={m} 
               onClick={() => setMode(m)}
               className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-stone-900 text-white shadow-xl' : 'text-stone-400 hover:text-stone-900'}`}
             >
               {m === 'AILab' && lesson ? 'Current Lesson' : m}
             </button>
           ))}
        </nav>
      </section>

      {/* Mode Switcher */}
      {mode === 'Hub' && (
        <div className="space-y-16 animate-reveal">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Progress Summary */}
              <div className="md:col-span-2 bg-stone-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl font-serif italic font-black -rotate-12">Level-10</div>
                 <div className="relative z-10 space-y-10">
                    <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">Student Overview</span>
                    <h3 className="text-5xl font-serif italic font-bold tracking-tighter">Your Learning Path is <br />65% Synchronized.</h3>
                    <div className="flex gap-12 pt-6">
                       <div>
                          <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2">Lessons Finished</p>
                          <p className="text-4xl font-serif font-black italic">128</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Quiz Mastery</p>
                          <p className="text-4xl font-serif font-black italic">92%</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Quick Start Generator */}
              <div className="bg-white border-2 border-stone-100 rounded-[3.5rem] p-10 flex flex-col justify-between shadow-xl group hover:border-orange-600 transition-all">
                 <div className="space-y-4">
                    <i className="fa-solid fa-bolt-lightning text-3xl text-orange-600 group-hover:scale-110 transition-transform"></i>
                    <h4 className="text-2xl font-serif italic font-bold">Quick Lesson</h4>
                    <p className="text-sm text-stone-500 font-medium italic">Generate a custom lesson on any topic instantly with AI.</p>
                 </div>
                 <button 
                  onClick={() => setMode('AILab')}
                  className="w-full py-5 bg-stone-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all"
                 >
                   Launch Lab
                 </button>
              </div>
           </div>

           {/* Active Subjects Section */}
           <section className="space-y-10">
              <header className="flex justify-between items-center">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-stone-400">Core Subject Grid</h4>
                 <button onClick={() => setMode('Library')} className="text-[11px] font-black uppercase text-orange-600 hover:underline">View All Modules</button>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                 {subjects.map(s => (
                   <div key={s.name} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-lg group hover:-translate-y-2 transition-all cursor-pointer">
                      <div className={`h-14 w-14 rounded-2xl ${s.color} flex items-center justify-center text-white text-xl mb-6 shadow-xl`}>
                         <i className={`fa-solid ${s.icon}`}></i>
                      </div>
                      <h5 className="text-2xl font-serif font-bold italic text-stone-900 group-hover:text-orange-600 transition-colors">{s.name}</h5>
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mt-2">{s.count}</p>
                   </div>
                 ))}
              </div>
           </section>
        </div>
      )}

      {mode === 'Library' && (
        <div className="space-y-16 animate-reveal">
           <header className="max-w-2xl space-y-4">
              <h3 className="text-5xl font-serif italic font-bold text-stone-900">Resource Registry.</h3>
              <p className="text-xl text-stone-500 font-medium italic">Hand-curated learning materials and notes according to the NEB Nepal curriculum.</p>
           </header>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {['Kinematics', 'Plant Anatomy', 'Himalayan Geography', 'English Grammar', 'Monetary Policy', 'Nepali Literature', 'Quantum Basics', 'Cell Biology'].map((lib, i) => (
                <div key={i} className="bg-stone-50 p-10 rounded-[3rem] border border-stone-100 flex flex-col justify-between aspect-square group hover:bg-white hover:border-orange-600 transition-all shadow-sm hover:shadow-2xl">
                   <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black text-stone-300 uppercase tracking-[0.4em]">Unit 0{i+1}</span>
                      <i className="fa-solid fa-file-pdf text-orange-200 group-hover:text-orange-600 transition-colors"></i>
                   </div>
                   <h5 className="text-2xl font-serif font-bold italic text-stone-900">{lib}</h5>
                   <button className="text-[10px] font-black uppercase text-stone-400 group-hover:text-stone-900 transition-colors flex items-center gap-2">
                     Download Spec <i className="fa-solid fa-arrow-down-long"></i>
                   </button>
                </div>
              ))}
           </div>
        </div>
      )}

      {mode === 'AILab' && (
        <div className="space-y-16 animate-reveal">
           {!lesson ? (
             <section className="bg-stone-900 rounded-[4rem] p-12 md:p-24 shadow-2xl border border-white/5 space-y-16">
               <div className="max-w-2xl">
                  <h3 className="text-5xl font-serif italic font-bold text-white mb-6">Learning Laboratory.</h3>
                  <p className="text-stone-400 text-lg font-medium italic opacity-70">Define your objective and let the Nexo intelligence core synthesize a comprehensive lesson plan.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-stone-500 tracking-[0.3em] ml-2">Grade Node</label>
                    <div className="flex gap-2 p-1.5 bg-white/5 rounded-[2rem] border border-white/5">
                      {[8, 9, 10].map(g => (
                        <button key={g} onClick={() => setGrade(g)} className={`flex-1 py-4 rounded-[1.6rem] text-sm font-black transition-all ${grade === g ? 'bg-orange-600 text-white shadow-xl' : 'text-stone-400 hover:text-white'}`}>
                          G-{g}
                        </button>
                      ))}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-stone-500 tracking-[0.3em] ml-2">Subject Channel</label>
                    <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-white/5 border border-white/5 text-white rounded-[2rem] p-5 font-bold focus:ring-2 focus:ring-orange-600 appearance-none italic outline-none">
                      {subjects.map(s => <option key={s.name} value={s.name} className="bg-stone-900">{s.name}</option>)}
                    </select>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-stone-500 tracking-[0.3em] ml-2">Topic Inquiry</label>
                    <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter concept to learn..." className="w-full bg-white/5 border border-white/5 text-white rounded-[2rem] p-5 font-bold focus:ring-2 focus:ring-orange-600 italic outline-none placeholder:text-stone-800" />
                 </div>
               </div>
               <div className="flex justify-center">
                 <button onClick={handleAsk} disabled={loading} className="px-20 py-8 bg-white text-stone-900 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-2xl scale-110 active:scale-95">
                   {loading ? <i className="fa-solid fa-sync fa-spin"></i> : 'INITIALIZE SYNTHESIS'}
                 </button>
               </div>
             </section>
           ) : (
             <div className="animate-reveal space-y-16">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                 {/* Learning Theater - High Contrast */}
                 <div className="lg:col-span-8 bg-black rounded-[5rem] p-12 md:p-28 shadow-2xl border border-white/10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-orange-600/10 rounded-full blur-[150px] -mr-40 -mt-40"></div>
                    
                    <div className="relative z-10 space-y-20 text-white text-left">
                       <header className="space-y-8">
                          <button onClick={() => setLesson(null)} className="text-orange-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
                            <i className="fa-solid fa-arrow-left mr-2"></i> New Inquiry
                          </button>
                          <h3 className="text-6xl md:text-[9rem] font-serif italic font-bold leading-[0.85] tracking-tighter text-white">
                             {lesson.concept}
                          </h3>
                          <div className="flex items-center gap-6">
                             <span className="px-6 py-2 bg-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest">NEB Standard</span>
                             <span className="text-stone-500 font-serif italic border-l border-white/10 pl-6 text-sm uppercase tracking-widest">Grade {grade} • {subject}</span>
                          </div>
                       </header>

                       <div className="space-y-20">
                          {/* Explanation */}
                          <div className="prose prose-invert max-w-none">
                             <p className="text-3xl text-white/90 leading-relaxed font-serif italic whitespace-pre-wrap">
                                {lesson.explanation}
                             </p>
                          </div>

                          {/* Analogy & Context */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                             <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 space-y-6">
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-orange-600">Cognitive Analogy</h5>
                                <p className="text-2xl font-serif italic leading-relaxed text-white/80">{lesson.analogy}</p>
                             </div>
                             <div className="bg-orange-600 p-12 rounded-[3.5rem] space-y-6 shadow-2xl">
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-white/70">Nepal Perspective</h5>
                                <p className="text-2xl font-serif italic leading-relaxed text-white font-bold">{lesson.nepalContext}</p>
                             </div>
                          </div>

                          {/* Knowledge Query */}
                          <div className="pt-24 border-t border-white/10 space-y-12">
                             <h4 className="text-4xl font-serif italic font-bold text-white">Query Intelligence.</h4>
                             
                             <div className="space-y-8 max-h-[500px] overflow-y-auto pr-6 no-scrollbar">
                                {chatHistory.map((chat, i) => (
                                  <div key={i} className="space-y-6 animate-slideUp">
                                    <div className="flex justify-end">
                                      <div className="bg-white text-black px-8 py-4 rounded-[2rem] rounded-tr-none font-black italic text-lg shadow-xl">
                                        {chat.q}
                                      </div>
                                    </div>
                                    <div className="flex justify-start">
                                      <div className="bg-white/5 text-white px-10 py-8 rounded-[3rem] rounded-tl-none border border-white/10 text-2xl font-serif italic leading-relaxed shadow-inner">
                                        {chat.a}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                             </div>

                             <form onSubmit={handleFollowUp} className="flex gap-6">
                                <input 
                                  type="text" 
                                  value={followUp}
                                  onChange={e => setFollowUp(e.target.value)}
                                  placeholder="Deepen your inquiry..."
                                  className="flex-1 bg-white/5 border-2 border-white/10 text-white rounded-[2.5rem] px-10 py-8 font-medium focus:border-orange-600 outline-none text-2xl font-serif italic"
                                />
                                <button disabled={followUpLoading} className="bg-white text-black rounded-full w-24 h-24 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-2xl">
                                   {followUpLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-bolt-auto text-2xl"></i>}
                                </button>
                             </form>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Test Sidebar */}
                 <div className="lg:col-span-4 space-y-12">
                    <div className="bg-white border-2 border-stone-100 rounded-[4rem] p-12 space-y-12 shadow-xl sticky top-28">
                       <header className="space-y-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">Module Mastery</span>
                          <h4 className="text-4xl font-serif italic font-bold text-stone-900">Quiz Spec.</h4>
                       </header>

                       <div className="space-y-10">
                          {lesson.quickQuiz.map((q: string, i: number) => (
                            <div key={i} className="flex gap-6 group">
                               <span className="text-stone-200 font-serif font-black text-4xl italic group-hover:text-orange-600 transition-colors">0{i+1}</span>
                               <p className="text-stone-800 leading-tight font-bold italic text-lg">{q}</p>
                            </div>
                          ))}
                       </div>

                       <div className="space-y-4 pt-8">
                          <button className="w-full py-8 bg-stone-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-2xl">
                            Validate Completion
                          </button>
                          <button className="w-full py-8 border border-stone-100 text-stone-400 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-stone-50 transition-all">
                            Export PDF Notes
                          </button>
                       </div>
                    </div>
                 </div>
               </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
};

export default EduSync;
