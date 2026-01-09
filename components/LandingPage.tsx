
import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onAuthSuccess: (username: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuthSuccess }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState(1);

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
    if (authMode === 'forgot') {
      setIsSubmitting(true);
      setTimeout(() => {
        setRecoveryStep(2);
        setIsSubmitting(false);
      }, 2000);
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onAuthSuccess(username || email.split('@')[0]);
    }, 1500);
  };

  const renderAuthContent = () => {
    if (authMode === 'forgot') {
      return (
        <div className="space-y-12 animate-reveal">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600">Neural Recovery Sequence</span>
            <h2 className="text-5xl font-serif italic font-bold tracking-tight">Access Key Lost?</h2>
            <p className="text-stone-500 text-sm italic leading-relaxed">
              We can re-establish your neural connection to the Nexa Grid. Please verify your node identifier.
            </p>
          </div>

          {recoveryStep === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2 group">
                <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-1">Identity Node (Email)</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="identity@nexa.global" className="w-full bg-transparent border-b-2 border-stone-200 py-4 focus:border-orange-600 outline-none font-bold text-xl transition-all" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full nexa-btn nexa-btn-primary justify-center py-6 text-[10px]">
                {isSubmitting ? <i className="fa-solid fa-sync fa-spin"></i> : 'INITIATE SYNAPSE RECOVERY'}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-8 py-10">
               <div className="relative h-24 w-24 mx-auto mb-6">
                 <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-20"></div>
                 <div className="absolute inset-4 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-xl">
                   <i className="fa-solid fa-paper-plane text-2xl"></i>
                 </div>
               </div>
               <p className="text-xl font-serif italic text-stone-900 font-bold">Transmission Sent.</p>
               <p className="text-stone-500 text-sm italic">Please check your secondary comms channel to verify your new access key.</p>
               <button onClick={() => {setAuthMode('login'); setRecoveryStep(1);}} className="text-orange-600 font-black text-[10px] uppercase tracking-widest hover:underline">Back to Synchronization</button>
            </div>
          )}
          
          {recoveryStep === 1 && (
            <button onClick={() => setAuthMode('login')} className="w-full text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-stone-600 transition-colors">Return to Synchronization</button>
          )}
        </div>
      );
    }

    return (
      <div className="relative z-10 space-y-12 animate-reveal">
        <div className="space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600">{authMode === 'login' ? 'Synchronize' : 'Initialize'} Identity</span>
          <h2 className="text-5xl font-serif italic font-bold tracking-tight">
            {authMode === 'login' ? 'Welcome Back' : 'Create Your Node'}
          </h2>
          <p className="text-stone-500 text-sm italic">
            {authMode === 'login' 
              ? 'Reconnect with the Himalayan neural network.' 
              : 'Secure your place in the future of Nepal\'s data ecosystem.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {authMode === 'register' && (
            <div className="space-y-2 group">
              <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-1">Username</label>
              <input required type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. EverestExplorer" className="w-full bg-transparent border-b-2 border-stone-200 py-4 focus:border-orange-600 outline-none font-bold text-xl transition-all placeholder:text-stone-300 placeholder:font-normal" />
            </div>
          )}
          <div className="space-y-2 group">
            <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-1">Identity (Email)</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="identity@nexa.global" className="w-full bg-transparent border-b-2 border-stone-200 py-4 focus:border-orange-600 outline-none font-bold text-xl transition-all placeholder:text-stone-300 placeholder:font-normal" />
          </div>
          
          <div className="space-y-2 group">
            <div className="flex justify-between items-center pr-1">
               <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-1">Neural Key (Password)</label>
               {authMode === 'login' && (
                 <button type="button" onClick={() => setAuthMode('forgot')} className="text-[9px] font-black uppercase text-orange-600 hover:underline">Key Lost?</button>
               )}
            </div>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-transparent border-b-2 border-stone-200 py-4 focus:border-orange-600 outline-none font-bold text-xl transition-all placeholder:text-stone-300" />
          </div>

          <div className="pt-4 space-y-6">
            <button type="submit" disabled={isSubmitting} className="w-full nexa-btn nexa-btn-primary justify-center py-6 text-[10px]">
              {isSubmitting ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : <><i className="fa-solid fa-fingerprint mr-2 text-orange-400"></i> {authMode === 'login' ? 'Synchronize Node' : 'Initialize Node'}</>}
            </button>

            <p className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              {authMode === 'login' ? 'New to the ridge?' : 'Already have a node?'} 
              <button type="button" onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setUsername(''); }} className="ml-2 text-orange-600 hover:underline">
                {authMode === 'login' ? 'Create Identity' : 'Secure Login'}
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="relative">
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-24 overflow-hidden bg-white">
        <div className={`max-w-7xl mx-auto w-full transition-all duration-1000 ${showAuth ? 'opacity-0 -translate-y-20 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
          <div className="flex items-center gap-6 mb-12">
            <div className="h-[1px] w-20 bg-orange-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-600 font-serif italic">Operational Grid Alpha</span>
          </div>
          <h1 className="text-7xl md:text-[14rem] font-bold text-stone-900 font-serif leading-[0.75] tracking-tighter italic animate-reveal">
            NEXA<span className="text-orange-600">.</span>
            <span className="block mt-4 text-4xl md:text-9xl font-normal not-italic tracking-normal text-stone-900 opacity-90">Universal Identity.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end pt-16">
            <p className="text-2xl md:text-4xl text-stone-900 font-serif leading-tight opacity-90 italic">
              Empowering the Himalayas through <br /> 
              <span className="text-orange-600">decentralized digital sovereignty.</span>
            </p>
            <div className="flex gap-6">
              <button onClick={() => { setShowAuth(true); setAuthMode('login'); }} className="nexa-btn nexa-btn-primary group">
                Enter Hub <i className="fa-solid fa-arrow-right-long transition-transform group-hover:translate-x-2"></i>
              </button>
              <button onClick={() => { setShowAuth(true); setAuthMode('register'); }} className="nexa-btn nexa-btn-outline">
                Join Node
              </button>
            </div>
          </div>
        </div>

        {showAuth && (
          <div className="absolute inset-0 z-50 flex items-center justify-center px-6 animate-reveal">
            <div className="w-full max-w-xl bg-[#fafaf9] p-12 md:p-20 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(28,25,23,0.15)] border border-stone-200 relative overflow-hidden transition-all duration-500">
               <div className="absolute -top-10 -right-10 opacity-[0.03] text-[20rem] font-serif italic select-none pointer-events-none">
                 {authMode === 'login' ? 'In' : authMode === 'register' ? 'Node' : 'Key'}
               </div>
               <button onClick={() => {setShowAuth(false); setRecoveryStep(1);}} className="absolute top-10 right-10 h-10 w-10 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors">
                 <i className="fa-solid fa-xmark text-stone-400"></i>
               </button>
               {renderAuthContent()}
            </div>
          </div>
        )}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none select-none">
          <span className="text-[45rem] font-serif font-black italic">Node</span>
        </div>
      </section>

      <section className="px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-6xl md:text-9xl font-serif italic font-bold leading-none tracking-tighter">
              Bespoke <br /> Architecture.
            </h2>
            <p className="text-2xl text-stone-600 italic leading-relaxed">
              Designed to thrive in urban centers and remote outposts alike. Data integrity that never sleeps.
            </p>
            <div className="flex gap-12 pt-10 border-t border-stone-200">
               <div>
                  <p className="text-5xl font-bold font-serif text-orange-600">01</p>
                  <p className="text-[9px] font-black uppercase tracking-widest">Unified Grid</p>
               </div>
               <div>
                  <p className="text-5xl font-bold font-serif text-orange-600">99<span className="text-xl">%</span></p>
                  <p className="text-[9px] font-black uppercase tracking-widest">Local Uptime</p>
               </div>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-[4/5] bg-stone-100 rounded-[3rem] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000">
                <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format" alt="Mountain" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
