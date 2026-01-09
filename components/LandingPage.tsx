
import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onAuthSuccess: (username: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuthSuccess }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleToggleAuth = () => {
      setShowAuth(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('toggle-auth', handleToggleAuth);
    return () => window.removeEventListener('toggle-auth', handleToggleAuth);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onAuthSuccess(username || "Explorer");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafaf9] selection:bg-orange-600 selection:text-white flex flex-col items-center justify-center px-6 md:px-12">
      {/* Ghost Background Logo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] overflow-hidden select-none">
        <h2 className="text-[50vw] font-serif font-black italic -rotate-12 leading-none">Nexo</h2>
      </div>

      <section className={`relative z-10 w-full max-w-7xl transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${showAuth ? 'opacity-0 scale-90 blur-2xl pointer-events-none' : 'opacity-100 scale-100 blur-0'}`}>
        <div className="space-y-12 md:space-y-24">
          <div className="flex items-center gap-8 animate-reveal">
            <span className="h-[2px] w-24 bg-stone-900"></span>
            <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.8em] text-stone-900">Nepal's Cognitive Backbone</span>
          </div>
          
          <div className="space-y-12">
            <h1 className="text-[18vw] md:text-[14rem] font-bold text-stone-900 font-serif leading-[0.75] tracking-tighter italic animate-reveal">
              Nexo<span className="text-orange-600">.</span>
            </h1>
            <p className="text-2xl md:text-6xl text-stone-900 font-serif leading-[1.05] max-w-5xl opacity-90 animate-reveal" style={{ animationDelay: '0.2s' }}>
              Bridging geography with <span className="text-orange-600 italic">verifiable modern intelligence.</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 pt-8 animate-reveal" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={() => { setShowAuth(true); setAuthMode('login'); }} 
              className="w-full md:w-auto px-16 py-8 bg-stone-900 text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.3em] hover:bg-orange-600 transition-all shadow-2xl scale-105 active:scale-95 flex items-center justify-center gap-6 group"
            >
              Access Portal <i className="fa-solid fa-bolt-lightning text-orange-500 transition-transform group-hover:scale-125"></i>
            </button>
            <button 
              onClick={() => { setShowAuth(true); setAuthMode('register'); }} 
              className="w-full md:w-auto px-16 py-8 border-2 border-stone-200 text-stone-900 rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.3em] hover:border-orange-600 transition-all"
            >
              Initialize Node
            </button>
          </div>

          <div className="pt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 animate-reveal" style={{ animationDelay: '0.6s' }}>
            {['EduSync', 'Voyage', 'Agro', 'Health Hub'].map(item => (
              <div key={item} className="space-y-3 group cursor-pointer">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-stone-400 group-hover:text-orange-600 transition-colors">{item}</span>
                <div className="h-[1px] w-full bg-stone-200 group-hover:bg-orange-600 transition-all origin-left group-hover:scale-x-110"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Portal Interface */}
      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-reveal">
           <div className="w-full max-w-2xl bg-white p-12 md:p-24 rounded-[5rem] shadow-[0_120px_200px_-50px_rgba(0,0,0,0.2)] border border-stone-100 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 w-full h-[6px] bg-orange-600"></div>
              
              <button 
                onClick={() => setShowAuth(false)} 
                className="absolute top-12 right-12 h-14 w-14 flex items-center justify-center rounded-full hover:bg-stone-50 transition-all border border-stone-50 text-stone-300 hover:text-stone-900"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>

              <div className="space-y-16">
                <header className="space-y-4">
                   <div className="flex items-center gap-4">
                      <span className="h-2 w-2 rounded-full bg-orange-600 animate-pulse"></span>
                      <span className="text-[12px] font-black uppercase tracking-[0.6em] text-orange-600">Sync Portal</span>
                   </div>
                   <h2 className="text-6xl md:text-9xl font-serif italic font-bold tracking-tighter leading-none">
                     {authMode === 'login' ? 'Namaste' : 'Genesis'}<span className="text-orange-600">.</span>
                   </h2>
                   <p className="text-lg text-stone-500 font-medium italic opacity-70 leading-relaxed max-w-md">
                     Enter your credentials to synchronize with the Himalayan data grid.
                   </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="space-y-4 group">
                    <label className="text-[11px] font-black uppercase tracking-[0.5em] text-stone-400 ml-2">Node Identifier</label>
                    <input 
                      required 
                      type="text" 
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="e.g. Kathmandu_01" 
                      className="w-full bg-stone-50/50 border-b-2 border-stone-100 py-6 focus:border-orange-600 outline-none font-bold text-3xl md:text-5xl tracking-tighter transition-all placeholder:text-stone-100 font-serif italic text-stone-900" 
                    />
                  </div>
                  
                  <div className="space-y-4 group">
                    <label className="text-[11px] font-black uppercase tracking-[0.5em] text-stone-400 ml-2">Security Hash</label>
                    <input 
                      required 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full bg-stone-50/50 border-b-2 border-stone-100 py-6 focus:border-orange-600 outline-none font-bold text-3xl md:text-5xl tracking-tighter transition-all placeholder:text-stone-100 text-stone-900" 
                    />
                  </div>

                  <div className="pt-8 space-y-8">
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="w-full py-8 bg-stone-900 text-white rounded-[2.5rem] text-[14px] font-black uppercase tracking-[0.3em] hover:bg-orange-600 transition-all shadow-2xl flex items-center justify-center gap-6"
                    >
                      {isSubmitting ? <i className="fa-solid fa-circle-notch fa-spin text-2xl"></i> : <>{authMode === 'login' ? 'INITIALIZE SYNC' : 'REGISTER PROFILE'}</>}
                    </button>
                    <p className="text-center text-[11px] font-black text-stone-400 uppercase tracking-widest flex items-center justify-center gap-4">
                      <span className="h-[1px] w-8 bg-stone-100"></span>
                      {authMode === 'login' ? "Unauthorized?" : 'Already registered?'} 
                      <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-orange-600 hover:text-stone-900 underline transition-colors">
                        {authMode === 'login' ? 'Sign Up' : 'Log In'}
                      </button>
                      <span className="h-[1px] w-8 bg-stone-100"></span>
                    </p>
                  </div>
                </form>
              </div>
           </div>
        </div>
      )}

      {/* Floating Meta Details */}
      <footer className="fixed bottom-12 left-0 w-full px-8 md:px-24 hidden md:flex justify-between items-center opacity-30 pointer-events-none font-serif italic text-sm">
        <span className="text-[10px] font-black uppercase tracking-[1em]">Project Nexo / Nepal Hub</span>
        <div className="flex gap-12">
           <span className="text-[10px] font-black uppercase tracking-widest">Global Status: ACTIVE</span>
           <span className="text-[10px] font-black uppercase tracking-widest">v5.0.0-PRO</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
