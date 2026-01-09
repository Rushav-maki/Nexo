
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
    <div className="max-w-6xl mx-auto space-y-20 pb-32">
      <section className="text-center space-y-6 pt-12">
        <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.4em]">Learning Made Simple</span>
        <h1 className="text-6xl md:text-9xl font-serif italic font-bold tracking-tight">Education<span className="text-orange-600">.</span></h1>
        <p className="text-xl text-stone-500 max-w-2xl mx-auto">
          Clear explanations for school subjects, designed for students in Nepal.
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
               className="w-full bg-stone-100 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-orange-600"
             >
               {subjects.map(s => <option key={s} value={s}>{s}</option>)}
             </select>
          </div>
          <div className="space-y-4">
             <label className="text-xs font-bold uppercase text-stone-400 ml-1">What do you want to learn?</label>
             <input 
               type="text" 
               value={topic}
               onChange={(e) => setTopic(e.target.value)}
               placeholder="e.g. Solar System"
               className="w-full bg-stone-100 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-orange-600"
             />
          </div>
        </div>
        <div className="flex justify-center">
          <button 
            onClick={handleAsk}
            disabled={loading}
            className="nexa-btn nexa-btn-primary min-w-[280px] justify-center text-sm"
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Help me study"}
          </button>
        </div>
      </section>

      {lesson && (
        <section id="lesson-result" className="animate-reveal grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border-l-[12px] border-orange-600">
             <div className="space-y-12">
               <div className="space-y-4">
                  <h3 className="text-5xl md:text-7xl font-serif italic font-bold leading-tight">{lesson.concept}</h3>
                  <div className="h-1 w-24 bg-orange-600/20"></div>
               </div>
               
               <div className="prose prose-stone max-w-none">
                  <p className="text-2xl text-stone-700 leading-relaxed font-serif italic">
                    {lesson.explanation}
                  </p>
               </div>

               <div className="bg-orange-50 p-10 rounded-[2.5rem] border border-orange-100 space-y-4">
                  <h4 className="text-xs font-black uppercase text-orange-700 tracking-widest">Example</h4>
                  <p className="text-xl text-orange-900 leading-relaxed italic font-medium">
                    {lesson.analogy}
                  </p>
               </div>
             </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-stone-900 text-white rounded-[3rem] p-10 space-y-8 sticky top-12 shadow-xl">
               <h4 className="text-2xl font-serif italic font-bold">Quick Quiz</h4>
               <div className="space-y-6">
                 {lesson.quickQuiz.map((q: string, i: number) => (
                   <div key={i} className="flex gap-4 group">
                      <span className="text-orange-500 font-bold text-lg">0{i+1}.</span>
                      <p className="text-stone-300 leading-relaxed">
                        {q}
                      </p>
                   </div>
                 ))}
               </div>
               <button className="w-full py-4 rounded-2xl bg-white text-stone-900 font-bold hover:bg-orange-500 hover:text-white transition-all uppercase text-xs tracking-widest">
                 Save Lesson
               </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EduSync;
