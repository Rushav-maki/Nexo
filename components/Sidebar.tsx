
import React from 'react';
import { AppView } from '../types';
import { NexoLogo } from '../App';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, toggleSidebar }) => {
  const publicItems = [
    { id: AppView.LANDING, label: 'Portal Home', icon: 'fa-house' },
    { id: AppView.ABOUT, label: 'Our Story', icon: 'fa-info-circle' },
    { id: AppView.CONTACT, label: 'Connect', icon: 'fa-envelope' },
  ];

  const coreItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: 'fa-grip-vertical' },
    { id: AppView.EDU_SYNC, label: 'EduSync', icon: 'fa-book-open-reader' },
    { id: AppView.TRAVEL_OTA, label: 'Voyage', icon: 'fa-compass' },
    { id: AppView.AI_CHAT, label: 'Assistant', icon: 'fa-face-smile' },
    { id: AppView.HEALTH_HUB, label: 'Health', icon: 'fa-heart-pulse' },
    { id: AppView.AGRI_CLIMATE, label: 'Agro', icon: 'fa-seedling' },
  ];

  const renderNavGroup = (title: string, items: typeof publicItems) => (
    <div className="mb-10">
      <p className="px-5 mb-4 text-[10px] font-black text-stone-400 uppercase tracking-[0.3em]">{title}</p>
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onViewChange(item.id);
              if (window.innerWidth < 768) toggleSidebar();
            }}
            className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold transition-all group ${
              currentView === item.id 
                ? `bg-orange-600 text-white shadow-lg translate-x-1` 
                : 'text-stone-600 hover:text-orange-700 hover:bg-orange-50'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5 text-base transition-transform group-hover:scale-110`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/10 backdrop-blur-sm z-[45]"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside className={`fixed left-0 top-0 z-50 h-full w-64 bg-stone-50 border-r border-stone-200 transition-all duration-500 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-24 items-center px-6 border-b border-stone-200">
          <NexoLogo size={35} />
          <button onClick={toggleSidebar} className="md:hidden ml-auto p-2 text-stone-400">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="mt-10 px-4 overflow-y-auto h-[calc(100vh-200px)] no-scrollbar">
          {renderNavGroup('Network', publicItems)}
          {renderNavGroup('Modules', coreItems)}
        </nav>

        <div className="absolute bottom-10 left-0 w-full px-6">
           <button 
             onClick={() => {
               onViewChange(AppView.LANDING);
               toggleSidebar();
             }}
             className="w-full bg-stone-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl italic"
           >
             Exit Hub
           </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
