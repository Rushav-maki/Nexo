
import React, { useState, useEffect } from 'react';
import { AppView, TravelBooking } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EduSync from './components/EduSync';
import TravelOTA from './components/TravelOTA';
import AIChat from './components/AIChat';
import HealthHub from './components/HealthHub';
import AgriClimate from './components/AgriClimate';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [activeBooking, setActiveBooking] = useState<TravelBooking | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);

  const isWebsiteView = [AppView.LANDING, AppView.ABOUT, AppView.CONTACT].includes(currentView);

  useEffect(() => {
    if (isBooting) {
      const interval = setInterval(() => {
        setBootProgress(prev => (prev >= 100 ? 100 : prev + 10));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isBooting]);

  const transitionToApp = (view: AppView) => {
    setIsBooting(true);
    setBootProgress(0);
    setTimeout(() => {
      setCurrentView(view);
      setIsSidebarOpen(true);
      setIsBooting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <LandingPage onEnter={() => transitionToApp(AppView.DASHBOARD)} />;
      case AppView.ABOUT:
        return <AboutPage />;
      case AppView.CONTACT:
        return <ContactPage />;
      case AppView.DASHBOARD:
        return <Dashboard onViewChange={setCurrentView} activeBooking={activeBooking} />;
      case AppView.EDU_SYNC:
        return <EduSync />;
      case AppView.TRAVEL_OTA:
        return <TravelOTA onBook={setActiveBooking} />;
      case AppView.AI_CHAT:
        return <AIChat />;
      case AppView.HEALTH_HUB:
        return <HealthHub activeBooking={activeBooking} />;
      case AppView.AGRI_CLIMATE:
        return <AgriClimate />;
      default:
        return <LandingPage onEnter={() => transitionToApp(AppView.DASHBOARD)} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fbf9f6] text-[#1a1514] overflow-hidden selection:bg-[#c4b5fd]/30">
      
      {/* High-Fidelity Boot Sequence */}
      {isBooting && (
        <div className="fixed inset-0 z-[100] bg-[#fbf9f6] flex flex-col items-center justify-center">
           <div className="relative h-32 w-32 mb-12 animate-scaleIn">
              <div className="absolute inset-0 border-[3px] border-dashed border-[#c4b5fd] rounded-full opacity-20 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-6 rounded-full bg-[#1a1514] flex items-center justify-center shadow-2xl">
                <div className="h-4 w-4 rounded-full bg-[#c4b5fd] animate-pulse"></div>
              </div>
           </div>
           <div className="w-48 h-[2px] bg-black/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#c4b5fd] transition-all duration-300 ease-out" style={{ width: `${bootProgress}%` }}></div>
           </div>
           <p className="mt-6 text-[11px] font-black uppercase tracking-[0.6em] font-serif italic text-[#1a1514]">
             Syncing Intelligence {bootProgress}%
           </p>
        </div>
      )}

      <Sidebar 
        currentView={currentView} 
        onViewChange={(view) => {
          setCurrentView(view);
          if (isWebsiteView) setIsSidebarOpen(false);
        }} 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <main className={`flex-1 transition-all duration-1000 cubic-bezier(0.2, 0, 0.2, 1) ${(!isWebsiteView && isSidebarOpen) ? 'md:ml-64' : 'ml-0'}`}>
        
        {/* Editorial App Header */}
        {!isWebsiteView && (
          <header className="sticky top-0 z-30 flex h-24 items-center justify-between nexa-glass px-8 md:px-12">
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white border border-black/5 shadow-sm text-[#1a1514] hover:bg-[#1a1514] hover:text-[#c4b5fd] transition-all hover:scale-105 active:scale-95"
              >
                <i className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-lg`}></i>
              </button>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold tracking-tighter uppercase font-serif italic leading-none">
                  {currentView.split('_').join('.')}
                </h1>
                <div className="flex items-center gap-2 text-[10px] font-black text-[#1a1514] uppercase tracking-[0.2em] mt-2 opacity-40">
                  <span className="h-1 w-1 rounded-full bg-[#c4b5fd]"></span>
                  Active Node: Verified
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-[10px] font-black text-[#c4b5fd] uppercase tracking-[0.4em]">STABLE_CONNECTION</span>
                <span className="text-xs font-bold text-[#1a1514] opacity-80 uppercase tracking-tighter">Node_Alpha_01</span>
              </div>
              <div className="h-14 w-14 rounded-3xl bg-white border border-black/5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer overflow-hidden p-1">
                <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=NexaMaster&backgroundColor=fbf9f6" alt="Profile" className="w-full h-full rounded-2xl" />
              </div>
            </div>
          </header>
        )}

        {/* Global Website Nav */}
        {isWebsiteView && (
          <nav className="fixed top-0 left-0 w-full z-50 flex h-24 items-center justify-between px-8 md:px-24 pointer-events-none">
            <div className="flex items-center gap-5 pointer-events-auto cursor-pointer group" onClick={() => setCurrentView(AppView.LANDING)}>
              <div className="h-12 w-12 rounded-[1.5rem] bg-[#1a1514] flex items-center justify-center group-hover:rotate-12 transition-all duration-700 shadow-2xl">
                <div className="h-4 w-4 rounded-full bg-[#c4b5fd]"></div>
              </div>
              <span className="text-3xl font-bold font-serif italic tracking-tighter text-[#1a1514] high-contrast-text">NEXA<span className="text-[#c4b5fd]">.</span>GLOBAL</span>
            </div>
            
            <div className="hidden md:flex gap-16 pointer-events-auto items-center">
              {['About', 'Contact'].map(label => (
                <button 
                  key={label}
                  onClick={() => setCurrentView(label.toUpperCase() as AppView)}
                  className="text-[11px] font-black uppercase tracking-[0.5em] font-serif transition-all relative group text-[#1a1514] hover:text-[#c4b5fd]"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#c4b5fd] transition-all duration-700 group-hover:w-full"></span>
                </button>
              ))}
              <button 
                onClick={() => transitionToApp(AppView.DASHBOARD)}
                className="bg-[#1a1514] text-white px-12 py-5 rounded-[2.2rem] text-[11px] font-black uppercase tracking-[0.4em] font-serif shadow-2xl hover:bg-[#3a3a3a] hover:-translate-y-2 transition-all duration-500"
              >
                Launch HUB
              </button>
            </div>
            
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden pointer-events-auto h-14 w-14 rounded-3xl bg-[#1a1514] text-white shadow-2xl flex items-center justify-center">
              <i className="fa-solid fa-bars-staggered text-xl"></i>
            </button>
          </nav>
        )}

        <div className={`transition-all duration-1000 ${isBooting ? 'opacity-0 translate-y-12' : 'opacity-100 translate-y-0'}`}>
          <div className={`p-8 md:p-16 max-w-[1600px] mx-auto min-h-screen ${isWebsiteView ? 'pt-40' : ''}`}>
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
