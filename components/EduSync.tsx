
import React, { useState, useRef } from 'react';
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
      }, 100);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async (e?: React.FormEvent, preset?: string) => {
    if (e) e.preventDefault();
    const query = preset || followUp;
    if (!query.trim() || !lesson) return;

    setFollowUpLoading(true);
    const context = `Lesson on ${lesson.concept}. Explanation summary: ${lesson.explanation.substring(0, 500)}`;
    
    try {
      const answer = await GeminiService.eduFollowUp(context, query);
      setChatHistory(prev => [...prev, { q: query, a: answer }]);
      setFollowUp('');
    } catch (err) {
      console.error(err);
    } finally {
      setFollowUpLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-20 pb-32">
      <section className="text-center space-y-6 pt-12">
        <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.4em]">NEB Curriculum Master</span>
        <h1 className="text-6xl md:text-9xl font-serif italic font-bold tracking-tight">Education<span className="text-orange-600">.</span></h1>
        <p className="text-xl text-stone-500 max-w-2xl mx-auto">
          Deep, curriculum-aligned lessons for Nepal's Grade 8-10 students.
        </p>
      </section>

      <section className="bg-white rounded-[3rem] p-10 md:p-16 border border-stone-200 shadow-xl space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
             <label className="text-xs font-bold uppercase text-stone-400 ml-1">Grade</label>
             <div className="flex gap-2">
               {[8, 9, 10].map(g => (
                 <button 
                   key={g} 
                   onClick={() => setGrade(g)}
                   className={`flex-1 py-4 rounded-2xl text-sm font-bold transition-all ${grade === g ? 'bg-orange-600 text-white shadow-lg' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                 >
                   Grade {g}
                 </button>
               ))}
             </div>
          </div>
          <div className="space-y-4">
             <label className="text-xs font-bold uppercase text-stone-400 ml-1">Subject</label>
             <select 
               value={subject}
               onChange={(e) => setSubject(e.target.value)}
               className="w-full bg-stone-100 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-orange-600 appearance-none"
             >
               {subjects.map(s => <option key={s} value={s}>{s}</option>)}
             </select>
          </div>
          <div className="space-y-4">
             <label className="text-xs font-bold uppercase text-stone-400 ml-1">Lesson Topic</label>
             <input 
               type="text" 
               value={topic}
               onChange={(e) => setTopic(e.target.value)}
               placeholder="e.g. Newton's Laws of Motion"
               className="w-full bg-stone-100 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-orange-600"
             />
          </div>
        </div>
        <div className="flex justify-center">
          <button 
            onClick={handleAsk}
            disabled={loading}
            className="nexo-btn nexo-btn-primary min-w-[280px] justify-center text-sm"
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "GENERATE FULL LESSON"}
          </button>
        </div>
      </section>

      {lesson && (
        <div id="lesson-result" className="animate-reveal space-y-12">
          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-stone-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>
              
              <div className="relative z-10 space-y-16">
                <header className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-[9px] font-black uppercase tracking-widest">Syllabus Match</span>
                    <span className="text-stone-400 font-serif italic text-sm">~ 15 min read</span>
                  </div>
                  <h3 className="text-6xl md:text-8xl font-serif italic font-bold leading-tight text-stone-900">{lesson.concept}</h3>
                </header>

                <div className="space-y-10">
                   <div className="bg-stone-50 p-10 rounded-3xl space-y-4">
                     <h4 className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Learning Objectives</h4>
                     <ul className="space-y-3">
                        {lesson.objectives?.map((obj: string, i: number) => (
                          <li key={i} className="flex gap-4 text-stone-700 font-medium italic">
                            <i className="fa-solid fa-check-circle text-orange-500 mt-1"></i>
                            {obj}
                          </li>
                        ))}
                     </ul>
                   </div>

                   <div className="prose prose-stone prose-xl max-w-none">
                      <p className="text-2xl text-stone-800 leading-relaxed font-serif italic whitespace-pre-wrap">
                        {lesson.explanation}
                      </p>
                   </div>

                   <div className="bg-orange-50 p-12 rounded-[3rem] border border-orange-100 space-y-8 relative overflow-hidden">
                      <i className="fa-solid fa-earth-asia absolute -right-4 -bottom-4 text-[12rem] text-orange-200/40"></i>
                      <h4 className="text-xs font-black uppercase text-orange-700 tracking-widest relative z-10">Application in Nepal</h4>
                      <p className="text-2xl text-orange-900 leading-relaxed italic font-serif relative z-10">
                        {lesson.nepalContext}
                      </p>
                   </div>

                   <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase text-stone-400 tracking-widest">Key Takeaways</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lesson.keyPoints?.map((pt: string, i: number) => (
                          <div key={i} className="p-6 bg-white border border-stone-100 rounded-2xl shadow-sm text-stone-600 font-bold italic">
                            {pt}
                          </div>
                        ))}
                      </div>
                   </div>
                </div>

                {/* Follow-up Section */}
                <div className="pt-20 border-t border-stone-100 space-y-10">
                   <div className="flex items-center gap-4">
                      <div className="h-1 w-12 bg-orange-600"></div>
                      <h4 className="text-xl font-serif italic font-bold text-stone-900">Have Questions?</h4>
                   </div>

                   <div className="space-y-6">
                      {chatHistory.map((chat, i) => (
                        <div key={i} className="space-y-4 animate-slideUp">
                          <div className="flex justify-end">
                            <div className="bg-stone-900 text-white px-6 py-4 rounded-2xl rounded-tr-none text-sm font-bold italic shadow-lg">
                              {chat.q}
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-orange-50 text-orange-900 px-8 py-6 rounded-3xl rounded-tl-none border border-orange-100 text-lg font-serif italic shadow-sm max-w-[90%]">
                              {chat.a}
                            </div>
                          </div>
                        </div>
                      ))}
                   </div>

                   <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {lesson.followUpSuggestions?.map((sug: string, i: number) => (
                          <button 
                            key={i} 
                            onClick={() => handleFollowUp(undefined, sug)}
                            className="text-[10px] font-black uppercase tracking-widest bg-stone-100 text-stone-500 px-4 py-2.5 rounded-full hover:bg-orange-600 hover:text-white transition-all"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>

                      <form onSubmit={handleFollowUp} className="flex gap-4">
                        <input 
                          type="text" 
                          value={followUp}
                          onChange={e => setFollowUp(e.target.value)}
                          placeholder="Ask anything about this lesson..."
                          className="flex-1 bg-stone-50 border-none rounded-2xl px-6 py-4 font-medium focus:ring-2 focus:ring-orange-600 italic"
                        />
                        <button 
                          disabled={followUpLoading}
                          className="bg-stone-900 text-white rounded-2xl px-8 font-black hover:bg-orange-600 transition-all shadow-xl"
                        >
                          {followUpLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
                        </button>
                      </form>
                   </div>
                </div>
              </div>
            </div>

            {/* Sidebar Tools */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-stone-900 text-white rounded-[3rem] p-10 space-y-10 sticky top-12 shadow-2xl border border-white/5">
                 <div className="space-y-2">
                    <h4 className="text-3xl font-serif italic font-bold text-orange-400">Mastery Quiz</h4>
                    <p className="text-stone-400 text-xs italic">Test your knowledge for the exams.</p>
                 </div>
                 
                 <div className="space-y-8">
                   {lesson.quickQuiz.map((q: string, i: number) => (
                     <div key={i} className="flex gap-5 group">
                        <span className="text-orange-500 font-bold text-xl italic font-serif">0{i+1}.</span>
                        <p className="text-stone-200 leading-relaxed font-medium italic text-sm">
                          {q}
                        </p>
                     </div>
                   ))}
                 </div>

                 <div className="pt-8 border-t border-white/10 space-y-4">
                   <div className="bg-white/5 p-6 rounded-2xl space-y-2 border border-white/5">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-orange-400">Lesson Analogy</h5>
                      <p className="text-sm italic text-stone-300 leading-relaxed">{lesson.analogy}</p>
                   </div>
                   <button className="w-full py-5 rounded-2xl bg-white text-stone-900 font-black hover:bg-orange-600 hover:text-white transition-all uppercase text-[10px] tracking-widest shadow-xl">
                     <i className="fa-solid fa-bookmark mr-2"></i> Save to Notebook
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
