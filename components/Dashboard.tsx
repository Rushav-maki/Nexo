
import React, { useState } from 'react';
import { AppView, TravelBooking } from '../types';
import { GoogleGenAI } from "@google/genai";

interface DashboardProps {
  onViewChange: (view: AppView) => void;
  activeBooking: TravelBooking | null;
  username: string;
  status: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange, activeBooking, username, status }) => {
  const [generatingLogo, setGeneratingLogo] = useState(false);
  const [nodeLogo, setNodeLogo] = useState<string | null>(null);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const handleGenerateLogo = async () => {
    setGeneratingLogo(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `A friendly, minimalist circle logo for a user profile named '${username}'. Theme: Warm mountain sunrise, soft orange and charcoal colors, clean lines, professional feel.` }]
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setNodeLogo(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Profile image generation failed", error);
    } finally {
      setGeneratingLogo(false);
    }
  };

  const modules = [
    { id: AppView.EDU_SYNC, title: 'Education', icon: 'fa-book-open-reader', desc: 'Study & Learning' },
    { id: AppView.TRAVEL_OTA, title: 'Travel', icon: 'fa-compass', desc: 'Trips & Booking' },
    { id: AppView.HEALTH_HUB, title: 'Health', icon: 'fa-heart-pulse', desc: 'Wellness & Help' },
    { id: AppView.AGRI_CLIMATE, title: 'Agri', icon: 'fa-seedling', desc: 'Farming Tips' },
    { id: AppView.AI_CHAT, title: 'Assistant', icon: 'fa-face-smile-wink', desc: 'Ask anything' },
  ];

  return (
    <div className="space-y-24 animate-reveal pb-32">
      {/* Greeting Section */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-orange-700 font-bold uppercase tracking-[0.2em] text-[10px]">
            <span className="h-2 w-2 rounded-full bg-orange-600 animate-pulse"></span>
            {getTimeOfDay()}, <span className="text-stone-900 font-black">{username}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <h2 className="text-7xl md:text-[10rem] font-serif italic font-bold tracking-tighter leading-[0.8]">
              Namaste<span className="text-orange-600">.</span>
            </h2>
            <div className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] w-fit mb-4 shadow-2xl border border-white/10">
               {status} Account
            </div>
          </div>
          <p className="text-2xl md:text-3xl text-stone-600 font-medium max-w-2xl leading-tight font-serif italic opacity-80">
            Welcome back to your Nexo dashboard, <span className="text-stone-900 font-bold">{username}</span>. Everything you need is synced and ready.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
             <div className="h-40 w-40 rounded-full bg-white border border-stone-200 shadow-2xl flex items-center justify-center overflow-hidden p-2">
                {nodeLogo ? (
                  <img src={nodeLogo} alt="User Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="h-full w-full rounded-full bg-stone-50 flex items-center justify-center text-5xl text-stone-200">
                    <i className="fa-solid fa-user"></i>
                  </div>
                )}
                {generatingLogo && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-full">
                    <i className="fa-solid fa-spinner fa-spin text-orange-600 text-2xl"></i>
                  </div>
                )}
             </div>
             <button 
               onClick={handleGenerateLogo}
               disabled={generatingLogo}
               className="absolute bottom-2 right-2 h-12 w-12 bg-stone-900 text-white rounded-full flex items-center justify-center border-4 border-[#fafaf9] hover:bg-orange-600 transition-all shadow-xl hover:scale-110 active:scale-95"
               title="Create profile image with AI"
             >
               <i className="fa-solid fa-wand-magic-sparkles text-sm"></i>
             </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="nexo-card p-10 flex flex-col justify-center items-center text-center space-y-2 group">
             <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest group-hover:text-orange-600 transition-colors">Nexo Credits</span>
             <span className="text-3xl font-bold font-serif">Rs. 24,150</span>
          </div>
          <div className="nexo-card p-10 flex flex-col justify-center items-center text-center space-y-2 group">
             <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest group-hover:text-orange-600 transition-colors">Local Weather</span>
             <span className="text-3xl font-bold font-serif">14°C</span>
          </div>
          <div className="nexo-card p-10 flex flex-col justify-center items-center text-center space-y-2 group">
             <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest group-hover:text-orange-600 transition-colors">System Status</span>
             <span className="text-3xl font-bold font-serif text-emerald-600">Syncing</span>
          </div>
          <div className="nexo-card p-10 flex flex-col justify-center items-center text-center space-y-2 group">
             <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest group-hover:text-orange-600 transition-colors">Grid Latency</span>
             <span className="text-3xl font-bold font-serif text-orange-600">Fast</span>
          </div>
      </section>

      {/* Hero Content - Travel / Contextual */}
      {activeBooking ? (
        <section className="relative group bg-stone-900 rounded-[3.5rem] p-12 md:p-20 text-white overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="relative z-10 flex items-center gap-12">
            <div className="h-32 w-32 rounded-full bg-white/10 flex items-center justify-center text-5xl text-orange-400 animate-float">
              <i className="fa-solid fa-mountain-sun"></i>
            </div>
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-orange-400">Current Trip Plan</span>
              <h3 className="text-6xl md:text-8xl font-serif italic font-bold tracking-tighter leading-none">{activeBooking.destination}</h3>
              <p className="text-xl opacity-60 italic font-medium font-serif">{activeBooking.duration} Days of Exploration</p>
            </div>
          </div>
          <button 
            onClick={() => onViewChange(AppView.TRAVEL_OTA)}
            className="nexo-btn bg-white text-stone-900 hover:bg-orange-500 hover:text-white relative z-10 scale-110"
          >
            Open Trip <i className="fa-solid fa-arrow-right-long ml-2"></i>
          </button>
          <div className="absolute bottom-0 right-0 p-12 opacity-[0.03] text-[25rem] font-serif select-none pointer-events-none italic font-black translate-y-1/2">
            Go
          </div>
        </section>
      ) : (
        <section className="bg-stone-100 rounded-[3.5rem] p-20 text-center space-y-8 border border-stone-200/50">
           <h3 className="text-4xl md:text-6xl font-serif italic font-bold text-stone-900">Where to next, {username}?</h3>
           <p className="text-xl text-stone-500 max-w-2xl mx-auto font-medium leading-relaxed italic">Discover new horizons, plan your curriculum studies, or consult with medical experts instantly.</p>
           <button onClick={() => onViewChange(AppView.TRAVEL_OTA)} className="nexo-btn nexo-btn-primary scale-110">Plan your Journey</button>
        </section>
      )}

      {/* Feature Navigation Grid */}
      <section className="space-y-12">
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-400 border-b border-stone-200 pb-6">Explore Nexo Modules</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => onViewChange(mod.id)}
              className="nexo-card p-12 text-left group flex flex-col justify-between aspect-square hover:bg-stone-900 hover:text-white transition-all duration-700"
            >
              <div className="h-16 w-16 bg-stone-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 shadow-sm border border-stone-200 group-hover:border-transparent">
                <i className={`fa-solid ${mod.icon} text-2xl`}></i>
              </div>
              <div className="space-y-2">
                <h5 className="text-3xl font-serif font-bold italic group-hover:text-orange-400 transition-colors">{mod.title}</h5>
                <p className="text-sm opacity-60 leading-snug font-medium italic">{mod.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* AI Assistant Call to Action */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-orange-50 rounded-[5rem] p-16 md:p-24 overflow-hidden relative border border-orange-200/50">
        <div className="space-y-10 relative z-10">
          <h3 className="text-6xl md:text-8xl font-serif italic font-bold text-stone-900 leading-none tracking-tighter">
            Need local <br /> help, <span className="text-orange-600">{username}</span>?
          </h3>
          <p className="text-2xl text-stone-700 max-w-lg font-serif italic opacity-90 leading-tight">
            Our AI assistant is calibrated for Himalayan context—dialects, geography, and local regulations.
          </p>
          <button onClick={() => onViewChange(AppView.AI_CHAT)} className="nexo-btn nexo-btn-primary scale-110">
            Start a Conversation
          </button>
        </div>
        <div className="flex justify-center relative z-10">
           <div className="h-80 w-80 rounded-full bg-white shadow-[0_50px_100px_-20px_rgba(194,65,12,0.15)] flex items-center justify-center text-8xl text-orange-600 animate-float border border-orange-200">
             <i className="fa-solid fa-face-smile-wink"></i>
           </div>
        </div>
        <div className="absolute -top-10 -right-10 opacity-[0.05] text-[25rem] font-serif select-none pointer-events-none italic">?</div>
      </section>
    </div>
  );
};

export default Dashboard;
