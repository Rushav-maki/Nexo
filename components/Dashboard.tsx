
import React from 'react';
import { AppView, TravelBooking } from '../types';

interface DashboardProps {
  onViewChange: (view: AppView) => void;
  activeBooking: TravelBooking | null;
  username: string;
  status: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange, activeBooking, username, status }) => {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const modules = [
    { id: AppView.EDU_SYNC, title: 'EduSync', icon: 'fa-book-open-reader', desc: 'Curriculum & Learning' },
    { id: AppView.TRAVEL_OTA, title: 'Voyage', icon: 'fa-compass', desc: 'Travel & Expeditions' },
    { id: AppView.HEALTH_HUB, title: 'Health', icon: 'fa-heart-pulse', desc: 'Wellness & Care' },
    { id: AppView.AGRI_CLIMATE, title: 'Agro', icon: 'fa-seedling', desc: 'Soil & Farming' },
    { id: AppView.AI_CHAT, title: 'Chat', icon: 'fa-face-smile-wink', desc: 'Helpful Assistant' },
  ];

  return (
    <div className="space-y-24 animate-reveal pb-32">
      {/* Human Greeting Header */}
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
               Node: {status}
            </div>
          </div>
          <p className="text-xl md:text-2xl text-stone-600 font-medium max-w-2xl leading-relaxed">
            Welcome to your integrated Himalayan dashboard. Your identity node is fully synchronized.
          </p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="bg-white flex-1 md:flex-none p-8 rounded-[2.5rem] border border-stone-200 shadow-sm flex flex-col items-center min-w-[140px]">
             <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Credits</span>
             <span className="text-3xl font-bold font-serif">Rs. 24,150</span>
          </div>
          <div className="bg-orange-50 flex-1 md:flex-none p-8 rounded-[2.5rem] border border-orange-100 shadow-sm flex flex-col items-center text-orange-900 min-w-[140px]">
             <span className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Climate</span>
             <span className="text-3xl font-bold font-serif">14°C</span>
          </div>
        </div>
      </section>

      {/* Hero Section - Journey Card */}
      {activeBooking ? (
        <section className="relative group bg-stone-900 rounded-[3rem] p-12 md:p-16 text-white overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="relative z-10 flex items-center gap-10">
            <div className="h-32 w-32 rounded-full bg-white/10 flex items-center justify-center text-5xl text-orange-400 animate-float">
              <i className="fa-solid fa-mountain-sun"></i>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400">Current Mission</span>
              <h3 className="text-5xl md:text-7xl font-serif italic font-bold">{activeBooking.destination}</h3>
              <p className="text-lg opacity-60 italic">Your itinerary is synced to node ID: {username}</p>
            </div>
          </div>
          <button 
            onClick={() => onViewChange(AppView.TRAVEL_OTA)}
            className="nexa-btn bg-white text-stone-900 hover:bg-orange-500 hover:text-white relative z-10"
          >
            Open Expedition <i className="fa-solid fa-arrow-right"></i>
          </button>
          <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-[30rem] font-serif select-none pointer-events-none italic">
            Go
          </div>
        </section>
      ) : (
        <section className="bg-stone-100 rounded-[3rem] p-12 text-center space-y-6">
           <h3 className="text-3xl font-serif italic">Where to next, {username}?</h3>
           <p className="text-stone-500 max-w-xl mx-auto">Discover destinations, plan your education, or consult with health specialists across the grid.</p>
           <button onClick={() => onViewChange(AppView.TRAVEL_OTA)} className="nexa-btn nexa-btn-primary">Start a Journey</button>
        </section>
      )}

      {/* Grid Menu */}
      <section className="space-y-12">
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-400 border-b border-stone-200 pb-4">Services Control</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => onViewChange(mod.id)}
              className="nexa-card p-10 text-left group flex flex-col justify-between aspect-square"
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

      {/* Assistance Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-orange-50 rounded-[4rem] p-12 md:p-20 overflow-hidden relative">
        <div className="space-y-8 relative z-10">
          <h3 className="text-5xl md:text-7xl font-serif italic font-bold text-stone-900 leading-tight">
            How can I help <br /> you today?
          </h3>
          <p className="text-xl text-stone-600 max-w-lg">
            Our AI is trained on local context, dialects, and terrain to give you the most human answers possible. Personalized for <span className="text-orange-700 font-bold">{username}</span>.
          </p>
          <button onClick={() => onViewChange(AppView.AI_CHAT)} className="nexa-btn nexa-btn-primary">
            Start a Conversation
          </button>
        </div>
        <div className="flex justify-center relative z-10">
           <div className="h-64 w-64 rounded-full bg-white shadow-2xl flex items-center justify-center text-7xl text-orange-600 animate-float">
             <i className="fa-solid fa-face-smile-wink"></i>
           </div>
        </div>
        <div className="absolute -top-10 -right-10 opacity-10 text-[20rem] font-serif">?</div>
      </section>
    </div>
  );
};

export default Dashboard;
