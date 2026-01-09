
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
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-orange-700 font-bold uppercase tracking-widest text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-600 animate-pulse"></span>
            {getTimeOfDay()}, {username}
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <h2 className="text-6xl md:text-8xl font-serif italic font-bold tracking-tight leading-none">
              Namaste<span className="text-orange-600">.</span>
            </h2>
            <div className="bg-stone-900 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.4em] w-fit mb-2 shadow-xl border border-white/10">
               {status}
            </div>
          </div>
          <p className="text-xl md:text-2xl text-stone-600 font-medium max-w-2xl leading-relaxed">
            Welcome back to Nexo. Everything you need is right here.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
             <div className="h-32 w-32 rounded-full bg-white border border-stone-200 shadow-xl flex items-center justify-center overflow-hidden">
                {nodeLogo ? (
                  <img src={nodeLogo} alt="User Profile" className="w-full h-full object-cover" />
                ) : (
                  <i className="fa-solid fa-user text-4xl text-stone-200"></i>
                )}
                {generatingLogo && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <i className="fa-solid fa-spinner fa-spin text-orange-600"></i>
                  </div>
                )}
             </div>
             <button 
               onClick={handleGenerateLogo}
               disabled={generatingLogo}
               className="absolute -bottom-2 -right-2 h-10 w-10 bg-stone-900 text-white rounded-full flex items-center justify-center border-4 border-[#fafaf9] hover:bg-orange-600 transition-colors shadow-lg"
               title="Create profile image with AI"
             >
               <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
             </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="nexo-card p-10 flex flex-col justify-center items-center text-center space-y-2">
             <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Nexo Credits</span>
             <span className="text-3xl font-bold font-serif">Rs. 24,150</span>
          </div>
          <div className="nexo-card p-10 flex flex-col justify-center items-center text-center space-y-2">
             <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Weather</span>
             <span className="text-3xl font-bold font-serif">14°C</span>
          </div>
          <div className="nexo-card p-10 flex flex-col justify-center items-center text-center space-y-2">
             <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">App Status</span>
             <span className="text-3xl font-bold font-serif">Online</span>
          </div>
          <div className="nexo-card p-10 flex flex-col justify-center items-center text-center space-y-2">
             <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Speed</span>
             <span className="text-3xl font-bold font-serif text-orange-600">Fast</span>
          </div>
      </section>

      {activeBooking ? (
        <section className="relative group bg-stone-900 rounded-[3rem] p-12 md:p-16 text-white overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="relative z-10 flex items-center gap-10">
            <div className="h-32 w-32 rounded-full bg-white/10 flex items-center justify-center text-5xl text-orange-400 animate-float">
              <i className="fa-solid fa-mountain-sun"></i>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400">Your Current Trip</span>
              <h3 className="text-5xl md:text-7xl font-serif italic font-bold">{activeBooking.destination}</h3>
            </div>
          </div>
          <button 
            onClick={() => onViewChange(AppView.TRAVEL_OTA)}
            className="nexo-btn bg-white text-stone-900 hover:bg-orange-500 hover:text-white relative z-10"
          >
            See Details <i className="fa-solid fa-arrow-right"></i>
          </button>
        </section>
      ) : (
        <section className="bg-stone-100 rounded-[3rem] p-12 text-center space-y-6">
           <h3 className="text-3xl font-serif italic">Where would you like to go, {username}?</h3>
           <p className="text-stone-500 max-w-xl mx-auto">Discover new places, plan your studies, or get health advice with one tap.</p>
           <button onClick={() => onViewChange(AppView.TRAVEL_OTA)} className="nexo-btn nexo-btn-primary">Plan a Trip</button>
        </section>
      )}

      <section className="space-y-12">
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-400 border-b border-stone-200 pb-4">Explore Nexo</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => onViewChange(mod.id)}
              className="nexo-card p-10 text-left group flex flex-col justify-between aspect-square"
            >
              <div className="h-16 w-16 bg-stone-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                <i className={`fa-solid ${mod.icon} text-2xl`}></i>
              </div>
              <div className="space-y-2">
                <h5 className="text-2xl font-serif font-bold italic">{mod.title}</h5>
                <p className="text-sm text-stone-500 leading-snug">{mod.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-orange-50 rounded-[4rem] p-12 md:p-20 overflow-hidden relative">
        <div className="space-y-8 relative z-10">
          <h3 className="text-5xl md:text-7xl font-serif italic font-bold text-stone-900 leading-tight">
            How can I <br /> help today?
          </h3>
          <p className="text-xl text-stone-600 max-w-lg">
            Our AI assistant is ready to answer any questions you have about life in Nepal.
          </p>
          <button onClick={() => onViewChange(AppView.AI_CHAT)} className="nexo-btn nexo-btn-primary">
            Start Chat
          </button>
        </div>
        <div className="flex justify-center relative z-10">
           <div className="h-64 w-64 rounded-full bg-white shadow-2xl flex items-center justify-center text-7xl text-orange-600 animate-float">
             <i className="fa-solid fa-face-smile-wink"></i>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
