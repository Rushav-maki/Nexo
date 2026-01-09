
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';

const EduSync: React.FC = () => {
  const [grade, setGrade] = useState<number>(10);
  const [subject, setSubject] = useState<string>('Science');
  const [topic, setTopic] = useState<string>('');
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const [followUp, setFollowUp] = useState('');
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{q: string, a: string}[]>([]);

  const subjects = ['Science', 'Mathematics', 'English', 'Social Studies', 'Nepali'];

  const handleAsk = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setChatHistory([]);
    try {
      const res = await GeminiService.generateEduResponse(grade, subject, topic);
      setLesson(res);
      setTimeout(() => {
        document.getElementById('lesson-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
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
    <div className="max-w-7xl mx-auto space-y-24 pb-40 text-stone-900">
      <section className="text-center space-y-8 pt-16">
        <div className="flex items-center justify-center gap-4">
           <span className="h-[1px] w-16 bg-orange-600/30"></span>
           <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.6em]">Matrix Education Protocol</span>
           <span className="h-[1px] w-16 bg-orange-600/30"></span>
        </div>
        <h1 className="text-7xl md:text-[12rem] font-serif italic font-bold tracking-tighter leading-[0.8]">
          EduSync<span className="text-orange-600">.</span>
        </h1>
        <p className="text-2xl text-stone-500 max-w-2xl mx-auto font-medium italic opacity-80 leading-tight">
          High-fidelity, curriculum-aligned intelligence for Nepal's Grade 8-10 students. 
        </p>
      </section>

      <section className="bg-stone-900 rounded-[4rem] p-12 md:p-24 shadow-[0_50px_100px_-20px_rgba(28,25,23,0.3)] border border-white/5 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase text-stone-400 tracking-[0.3em] ml-2">Grade Level</label>
             <div className="flex gap-2 p-1.5 bg-white/5 rounded-[2rem] border border-white/5">
               {[8, 9, 10].map(g => (
                 <button 
                   key={g} 
                   onClick={() => setGrade(g)}
                   className={`flex-1 py-4 rounded-[1.6rem] text-sm font-black transition-all ${grade === g ? 'bg-orange-600 text-white shadow-xl' : 'text-stone-400 hover:text-white'}`}
                 >
                   G-{g}
                 </button>
               ))}
             </div>
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase text-stone-400 tracking-[0.3em] ml-2">Core Subject</label>
             <select 
               value={subject}
               onChange={(e) => setSubject(e.target.value)}
               className="w-full bg-white/5 border border-white/5 text-white rounded-[2rem] p-5 font-bold focus:ring-2 focus:ring-orange-600 appearance-none italic"
             >
               {subjects.map(s => <option key={s} value={s} className="bg-stone-900">{s}</option>)}
             </select>
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase text-stone-400 tracking-[0.3em] ml-2">Knowledge Topic</label>
             <input 
               type="text" 
               value={topic}
               onChange={(e) => setTopic(e.target.value)}
               placeholder="e.g. Plate Tectonics"
               className="w-full bg-white/5 border border-white/5 text-white rounded-[2rem] p-5 font-bold focus:ring-2 focus:ring-orange-600 italic placeholder:text-stone-700"
             />
          </div>
        </div>
        <div className="flex justify-center">
          <button 
            onClick={handleAsk}
            disabled={loading}
            className="px-20 py-8 bg-white text-stone-900 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-2xl scale-110 active:scale-95 flex items-center gap-6"
          >
            {loading ? <i className="fa-solid fa-sync fa-spin"></i> : <><i className="fa-solid fa-sparkles"></i> INITIALIZE LESSON</>}
          </button>
        </div>
      </section>

      {lesson && (
        <div id="lesson-result" className="animate-reveal space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* The main card - Reskinned with white fonts as requested */}
            <div className="lg:col-span-8 bg-stone-900 rounded-[5rem] p-12 md:p-28 shadow-2xl border border-white/5 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-orange-600/5 rounded-full blur-[120px] -mr-40 -mt-40 group-hover:bg-orange-600/10 transition-colors duration-1000"></div>
              
              <div className="relative z-10 space-y-20">
                <header className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="px-6 py-2 bg-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">Genetic Intelligence Active</span>
                    <span className="text-stone-500 font-serif italic text-sm">~ Module Verified</span>
                  </div>
                  <h3 className="text-6xl md:text-9xl font-serif italic font-bold leading-[0.9] text-white tracking-tighter">
                    {lesson.concept}
                  </h3>
                </header>

                <div className="space-y-16">
                   <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/5 space-y-6">
                     <h4 className="text-[10px] font-black uppercase text-stone-400 tracking-[0.5em]">Cognitive Objectives</h4>
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {lesson.objectives?.map((obj: string, i: number) => (
                          <li key={i} className="flex gap-5 text-stone-200 font-medium italic text-lg leading-snug">
                            <i className="fa-solid fa-circle-check text-orange-500 mt-1"></i>
                            {obj}
                          </li>
                        ))}
                     </ul>
                   </div>

                   <div className="prose prose-invert prose-2xl max-w-none">
                      <p className="text-3xl text-stone-100 leading-relaxed font-serif italic whitespace-pre-wrap opacity-90">
                        {lesson.explanation}
                      </p>
                   </div>

                   <div className="bg-orange-600 p-16 rounded-[4rem] space-y-10 relative overflow-hidden group">
                      <i className="fa-solid fa-mountain-city absolute -right-12 -bottom-12 text-[25rem] text-white/10 group-hover:scale-110 transition-transform duration-[5s]"></i>
                      <h4 className="text-[11px] font-black uppercase text-white tracking-[0.6em] relative z-10 opacity-70">Localized Perspective: Nepal</h4>
                      <p className="text-3xl text-white font-serif italic font-bold leading-tight relative z-10">
                        {lesson.nepalContext}
                      </p>
                   </div>
                </div>

                {/* Interaction - Fixed contrast */}
                <div className="pt-24 border-t border-white/10 space-y-12">
                   <h4 className="text-3xl font-serif italic font-bold text-white flex items-center gap-6">
                     <span className="h-[2px] w-12 bg-orange-600"></span> Query the Intelligence
                   </h4>

                   <div className="space-y-8">
                      {chatHistory.map((chat, i) => (
                        <div key={i} className="space-y-6 animate-slideUp">
                          <div className="flex justify-end">
                            <div className="bg-white text-stone-900 px-8 py-5 rounded-3xl rounded-tr-none text-lg font-black italic shadow-2xl">
                              {chat.q}
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-white/5 text-stone-100 px-10 py-8 rounded-[3rem] rounded-tl-none border border-white/10 text-2xl font-serif italic leading-relaxed max-w-[90%] shadow-inner">
                              {chat.a}
                            </div>
                          </div>
                        </div>
                      ))}
                   </div>

                   <div className="space-y-10">
                      <div className="flex flex-wrap gap-4">
                        {lesson.followUpSuggestions?.map((sug: string, i: number) => (
                          <button 
                            key={i} 
                            onClick={() => handleFollowUp(undefined, sug)}
                            className="text-[10px] font-black uppercase tracking-widest bg-white/5 text-stone-400 px-6 py-3 rounded-full hover:bg-orange-600 hover:text-white transition-all border border-white/5"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>

                      <form onSubmit={handleFollowUp} className="flex gap-6">
                        <input 
                          type="text" 
                          value={followUp}
                          onChange={e => setFollowUp(e.target.value)}
                          placeholder="Deepen your understanding..."
                          className="flex-1 bg-white/5 border-2 border-white/5 text-white rounded-[2rem] px-8 py-6 font-medium focus:border-orange-600 outline-none text-xl font-serif italic"
                        />
                        <button 
                          disabled={followUpLoading}
                          className="bg-white text-stone-900 rounded-[2rem] px-12 font-black hover:bg-orange-600 hover:text-white transition-all shadow-2xl scale-105 active:scale-95"
                        >
                          {followUpLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-arrow-up"></i>}
                        </button>
                      </form>
                   </div>
                </div>
              </div>
            </div>

            {/* Sidebar Assets */}
            <div className="lg:col-span-4 space-y-10">
              <div className="bg-stone-50 rounded-[4rem] p-12 space-y-12 sticky top-12 border border-stone-200 shadow-xl">
                 <div className="space-y-3">
                    <h4 className="text-4xl font-serif italic font-bold text-stone-900">Cognitive Test</h4>
                    <p className="text-stone-500 text-xs italic font-medium">Verified assessment for NEB standards.</p>
                 </div>
                 
                 <div className="space-y-10">
                   {lesson.quickQuiz.map((q: string, i: number) => (
                     <div key={i} className="flex gap-6 group">
                        <span className="text-orange-600 font-serif font-black text-3xl italic opacity-30 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                        <p className="text-stone-800 leading-tight font-bold italic text-base">
                          {q}
                        </p>
                     </div>
                   ))}
                 </div>

                 <div className="pt-10 border-t border-stone-200 space-y-6">
                   <div className="bg-stone-900 text-white p-8 rounded-[2.5rem] space-y-4 border border-white/5 shadow-2xl relative overflow-hidden group">
                      <i className="fa-solid fa-lightbulb absolute -right-4 -bottom-4 text-7xl text-white/5 group-hover:scale-125 transition-transform"></i>
                      <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Conceptual Analogy</h5>
                      <p className="text-base italic text-stone-300 leading-relaxed relative z-10">{lesson.analogy}</p>
                   </div>
                   <button className="w-full py-7 rounded-[2rem] bg-stone-900 text-white font-black hover:bg-orange-600 transition-all uppercase text-[11px] tracking-widest shadow-2xl">
                     <i className="fa-solid fa-download mr-3"></i> DOWNLOAD STUDY SPEC
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EduSync;
