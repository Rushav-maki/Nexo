
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, toggleSidebar }) => {
  const publicItems = [
    { id: AppView.LANDING, label: 'Portal Home', icon: 'fa-house' },
    { id: AppView.ABOUT, label: 'Our Story', icon: 'fa-circle-info' },
    { id: AppView.CONTACT, label: 'Connect', icon: 'fa-paper-plane' },
  ];

  const coreItems = [
    { id: AppView.DASHBOARD, label: 'Core Command', icon: 'fa-gauge-high' },
    { id: AppView.EDU_SYNC, label: 'EduSync AI', icon: 'fa-graduation-cap' },
    { id: AppView.TRAVEL_OTA, label: 'Nexa Voyage', icon: 'fa-mountain' },
    { id: AppView.AI_CHAT, label: 'Nexa Chat', icon: 'fa-robot' },
    { id: AppView.HEALTH_HUB, label: 'Nexa Health', icon: 'fa-heart-pulse' },
    { id: AppView.AGRI_CLIMATE, label: 'Nexa Agro', icon: 'fa-leaf' },
  ];

  const isWebsiteView = [AppView.LANDING, AppView.ABOUT, AppView.CONTACT].includes(currentView);

  const renderNavGroup = (title: string, items: typeof publicItems) => (
    <div className="mb-8">
      <p className="px-5 mb-3 text-[10px] font-black text-[#4a4a4a]/40 uppercase tracking-[0.3em] font-serif">{title}</p>
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onViewChange(item.id);
              if (window.innerWidth < 768) toggleSidebar();
            }}
            className={`flex w-full items-center gap-4 rounded-xl px-5 py-3 text-sm font-medium transition-all group ${
              currentView === item.id 
                ? `bg-[#2a1b18] text-[#f8f5f0] shadow-md` 
                : 'text-[#4a4a4a] hover:text-[#2a1b18] hover:bg-black/5'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5 text-base transition-transform group-hover:scale-110 ${currentView === item.id ? 'text-[#c4b5fd]' : 'text-[#4a4a4a]'}`}></i>
            <span className={currentView === item.id ? 'font-bold' : ''}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[45]"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside className={`fixed left-0 top-0 z-50 h-full w-64 bg-[#f5f2eb] text-[#2a1b18] transition-all duration-500 ease-out border-r border-black/5 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-20 items-center px-8 border-b border-black/5">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#2a1b18] flex items-center justify-center border border-white/10 shadow-sm">
              <div className="h-3 w-3 rounded-full bg-[#c4b5fd]"></div>
            </div>
            <span className="text-xl font-bold tracking-tighter font-serif text-[#2a1b18] italic">
              NEXA<span className="text-[#c4b5fd]">.</span>Core
            </span>
          </div>
          <button onClick={toggleSidebar} className="md:hidden ml-auto p-2 opacity-40">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="mt-8 px-4 overflow-y-auto h-[calc(100vh-160px)] no-scrollbar">
          {renderNavGroup('Network Explorer', publicItems)}
          {renderNavGroup('Operational Matrix', coreItems)}
        </nav>

        <div className="absolute bottom-6 left-0 w-full px-6">
           <button 
             onClick={() => {
               onViewChange(AppView.LANDING);
               toggleSidebar();
             }}
             className="w-full bg-white border border-black/10 text-[#2a1b18] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2a1b18] hover:text-white transition-all shadow-sm font-serif italic"
           >
             Exit To Global Portal
           </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
