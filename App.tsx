
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

  const isWebsiteView = [AppView.LANDING, AppView.ABOUT, AppView.CONTACT].includes(currentView);

  const handleSetBooking = (booking: TravelBooking) => {
    setActiveBooking(booking);
  };

  const transitionToApp = (view: AppView) => {
    setIsBooting(true);
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
        return <TravelOTA onBook={handleSetBooking} />;
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
    <div className="flex min-h-screen bg-[#f8f5f0] text-[#2a1b18] overflow-hidden selection:bg-[#c4b5fd]/30 font-sans">
      
      {/* System Boot Overlay */}
      {isBooting && (
        <div className="fixed inset-0 z-[100] bg-[#f8f5f0] flex flex-col items-center justify-center space-y-6">
           <div className="h-16 w-16 rounded-full bg-[#2a1b18] flex items-center justify-center animate-scaleIn">
              <div className="h-4 w-4 rounded-full bg-[#c4b5fd] animate-pulse"></div>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] font-serif italic animate-pulse">Initializing NEXA Matrix...</p>
        </div>
      )}

      <Sidebar 
        currentView={currentView} 
        onViewChange={(view) => {
          if ([AppView.LANDING, AppView.ABOUT, AppView.CONTACT].includes(view)) {
             setIsSidebarOpen(false);
             setCurrentView(view);
          } else {
             setCurrentView(view);
          }
        }} 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <main className={`flex-1 transition-all duration-1000 cubic-bezier(0.2, 0, 0.2, 1) ${(!isWebsiteView && isSidebarOpen) ? 'md:ml-64' : 'ml-0'}`}>
        
        {/* App Command Header */}
        {!isWebsiteView && (
          <header className="sticky top-0 z-30 flex h-24 items-center justify-between border-b border-black/5 nexa-glass px-8 md:px-12">
            <div className="flex items-center gap-6">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-black/5 shadow-sm text-[#2a1b18] hover:bg-[#2a1b18] hover:text-white transition-all">
                <i className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
              </button>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-[#2a1b18] tracking-tighter uppercase font-serif italic">
                  {currentView.split('_').join('.')}
                </h1>
                <div className="flex items-center gap-2 text-[9px] font-black text-[#4a4a4a] uppercase tracking-widest mt-1 opacity-50">
                  <span className="h-1 w-1 rounded-full bg-[#c4b5fd]"></span>
                  Neural Path Verified
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-[9px] font-black text-[#c4b5fd] uppercase tracking-[0.3em]">NODE_ALPHA_01</span>
                <span className="text-xs font-bold text-[#2a1b18]">CONNECTED</span>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-[#2a1b18] p-[1px] shadow-xl hover:scale-105 transition-transform cursor-pointer">
                <div className="h-full w-full rounded-2xl bg-[#f8f5f0] flex items-center justify-center overflow-hidden border border-black/5">
                  <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=NexaMaster&backgroundColor=f8f5f0" alt="Profile" />
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Website Public Navigation */}
        {isWebsiteView && (
          <nav className="fixed top-0 left-0 w-full z-50 flex h-24 items-center justify-between px-8 md:px-24 pointer-events-none">
            <div className="flex items-center gap-4 pointer-events-auto cursor-pointer group" onClick={() => setCurrentView(AppView.LANDING)}>
              <div className="h-10 w-10 rounded-[1.25rem] bg-[#2a1b18] flex items-center justify-center group-hover:rotate-12 transition-transform shadow-xl">
                <div className="h-3 w-3 rounded-full bg-[#c4b5fd]"></div>
              </div>
              <span className="text-2xl font-bold font-serif italic tracking-tighter text-[#2a1b18]">NEXA<span className="text-[#c4b5fd]">.</span>GLOBAL</span>
            </div>
            
            <div className="hidden md:flex gap-16 pointer-events-auto items-center">
              {[
                { label: 'About', view: AppView.ABOUT },
                { label: 'Connect', view: AppView.CONTACT }
              ].map(link => (
                <button 
                  key={link.label}
                  onClick={() => setCurrentView(link.view)}
                  className={`text-[10px] font-black uppercase tracking-[0.4em] font-serif transition-all relative group ${currentView === link.view ? 'text-[#c4b5fd]' : 'text-[#2a1b18] hover:text-[#c4b5fd]'}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#c4b5fd] transition-all duration-500 ${currentView === link.view ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
              ))}
              <button 
                onClick={() => transitionToApp(AppView.DASHBOARD)}
                className="bg-[#2a1b18] text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] font-serif shadow-2xl hover:bg-[#4a4a4a] hover:-translate-y-1 transition-all"
              >
                Launch Hub
              </button>
            </div>
            
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden pointer-events-auto h-12 w-12 rounded-2xl bg-[#2a1b18] text-white flex items-center justify-center shadow-xl">
              <i className="fa-solid fa-bars-staggered"></i>
            </button>
          </nav>
        )}

        <div className={`transition-opacity duration-1000 ${isBooting ? 'opacity-0' : 'opacity-100'}`}>
          <div className={`p-6 md:p-12 max-w-[1400px] mx-auto min-h-screen ${isWebsiteView ? 'pt-40' : ''}`}>
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
