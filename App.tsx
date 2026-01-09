
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<{ username: string; status: string }>({ 
    username: 'Guest', 
    status: 'Verified' 
  });

  const isWebsiteView = [AppView.LANDING, AppView.ABOUT, AppView.CONTACT].includes(currentView);

  useEffect(() => {
    if (isBooting) {
      const interval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [isBooting]);

  const handleAuthSuccess = (username: string) => {
    setUserProfile({ username: username || 'Explorer', status: 'Identity Verified' });
    setIsBooting(true);
    setBootProgress(0);
    setTimeout(() => {
      setIsAuthenticated(true);
      setCurrentView(AppView.DASHBOARD);
      setIsSidebarOpen(true);
      setIsBooting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  const renderView = () => {
    if (!isAuthenticated && !isWebsiteView) {
      return <LandingPage onAuthSuccess={handleAuthSuccess} />;
    }

    switch (currentView) {
      case AppView.LANDING:
        return <LandingPage onAuthSuccess={handleAuthSuccess} />;
      case AppView.ABOUT:
        return <AboutPage />;
      case AppView.CONTACT:
        return <ContactPage />;
      case AppView.DASHBOARD:
        return <Dashboard 
          onViewChange={setCurrentView} 
          activeBooking={activeBooking} 
          username={userProfile.username}
          status={userProfile.status}
        />;
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
        return <LandingPage onAuthSuccess={handleAuthSuccess} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fafaf9] text-[#1c1917] overflow-hidden selection:bg-orange-200">
      
      {/* Innovative Neural Sync Boot Sequence */}
      {isBooting && (
        <div className="fixed inset-0 z-[100] bg-[#fafaf9] flex flex-col items-center justify-center animate-fadeIn">
           <div className="relative h-64 w-64 mb-16">
              <div className="absolute inset-0 border-[1px] border-orange-600/20 rounded-full animate-[spin_8s_linear_infinite]"></div>
              <div className="absolute inset-4 border-[1px] border-stone-900/10 rounded-full animate-[spin_4s_linear_infinite_reverse]"></div>
              
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="128" cy="128" r="120" fill="none" stroke="#e7e5e4" strokeWidth="2" />
                <circle
                  cx="128" cy="128" r="120" fill="none" stroke="#c2410c" strokeWidth="2"
                  strokeDasharray="753" strokeDashoffset={753 - (753 * bootProgress) / 100}
                  className="transition-all duration-300 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-serif italic font-bold text-stone-900">{bootProgress}%</span>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-orange-600 mt-2">Syncing Identity</span>
              </div>
           </div>
           
           <div className="max-w-xs text-center space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-stone-900 animate-pulse">
                Authorizing {userProfile.username}
              </p>
              <div className="flex justify-center gap-2">
                {[1,2,3].map(i => (
                  <div key={i} className={`h-1 w-1 rounded-full bg-orange-600 transition-opacity duration-500`} style={{ opacity: bootProgress > (i*25) ? 1 : 0.2 }}></div>
                ))}
              </div>
           </div>
        </div>
      )}

      {isAuthenticated && (
        <Sidebar 
          currentView={currentView} 
          onViewChange={(view) => {
            setCurrentView(view);
            if (isWebsiteView) setIsSidebarOpen(false);
          }} 
          isOpen={isSidebarOpen} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      )}
      
      <main className={`flex-1 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${(isAuthenticated && isSidebarOpen) ? 'md:ml-64' : 'ml-0'}`}>
        {!isBooting && (
          <>
            {isAuthenticated ? (
              <header className="sticky top-0 z-30 flex h-24 items-center justify-between glass-nav px-8 md:px-12 border-b border-stone-200/50">
                <div className="flex items-center gap-6">
                  <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white border border-stone-200 shadow-sm text-stone-900 hover:bg-stone-900 hover:text-white transition-all">
                    <i className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
                  </button>
                  <div>
                    <h1 className="text-xl font-bold tracking-tight font-serif italic">
                      {currentView.split('_').join('.')}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-black uppercase tracking-tighter text-stone-900">{userProfile.username}</p>
                    <p className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">{userProfile.status}</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl border border-stone-200 overflow-hidden shadow-inner p-1 bg-white">
                    <img src={`https://api.dicebear.com/7.x/micah/svg?seed=${userProfile.username}`} alt="User" className="w-full h-full" />
                  </div>
                </div>
              </header>
            ) : isWebsiteView && (
              <nav className="fixed top-0 left-0 w-full z-40 flex h-24 items-center justify-between px-8 md:px-24 pointer-events-none">
                <div className="flex items-center gap-4 pointer-events-auto cursor-pointer" onClick={() => setCurrentView(AppView.LANDING)}>
                  <div className="h-10 w-10 rounded-xl bg-stone-900 flex items-center justify-center shadow-lg">
                    <div className="h-3 w-3 rounded-full bg-orange-600"></div>
                  </div>
                  <span className="text-2xl font-bold font-serif italic tracking-tight text-stone-900">NEXA<span className="text-orange-600">.</span></span>
                </div>
                
                <div className="hidden md:flex gap-12 pointer-events-auto items-center">
                  {['About', 'Contact'].map(label => (
                    <button key={label} onClick={() => setCurrentView(label.toUpperCase() as AppView)} className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-900 hover:text-orange-600 transition-colors">
                      {label}
                    </button>
                  ))}
                  <button onClick={() => window.dispatchEvent(new CustomEvent('toggle-auth'))} className="nexa-btn nexa-btn-primary py-3 px-8 text-[9px]">
                    Enter HUB
                  </button>
                </div>
              </nav>
            )}
          </>
        )}

        <div className={`transition-all duration-1000 ${isBooting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className={`${isWebsiteView ? 'max-w-full' : 'p-8 md:p-16 max-w-[1440px] mx-auto'} min-h-screen`}>
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
