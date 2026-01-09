
import React, { useState, useEffect } from 'react';
import { NexoLogo } from '../App';

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
      }, 1500);
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Pass the username to the success callback
      onAuthSuccess(username || "Explorer");
    }, 1200);
  };

  const renderAuthContent = () => {
    if (authMode === 'forgot') {
      return (
        <div className="space-y-12 animate-reveal">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600">Password Recovery</span>
            <h2 className="text-5xl font-serif italic font-bold tracking-tight">Forgot Password?</h2>
            <p className="text-stone-500 text-sm italic leading-relaxed">
              Don't worry, we'll help you get back into your account. Enter your registered username below.
            </p>
          </div>

          {recoveryStep === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2 group">
                <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-1">Username</label>
                <input required type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. EverestExplorer" className="w-full bg-transparent border-b-2 border-stone-200 py-4 focus:border-orange-600 outline-none font-bold text-xl transition-all" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full nexo-btn nexo-btn-primary justify-center py-6 text-[10px]">
                {isSubmitting ? <i className="fa-solid fa-sync fa-spin"></i> : 'SEND RESET LINK'}
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
               <p className="text-xl font-serif italic text-stone-900 font-bold">Instruction Sent.</p>
               <p className="text-stone-500 text-sm italic">Check your linked comms for instructions to reset your password.</p>
               <button onClick={() => {setAuthMode('login'); setRecoveryStep(1);}} className="text-orange-600 font-black text-[10px] uppercase tracking-widest hover:underline">Back to Login</button>
            </div>
          )}
          
          {recoveryStep === 1 && (
            <button onClick={() => setAuthMode('login')} className="w-full text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-stone-600 transition-colors">Back to Login</button>
          )}
        </div>
      );
    }

    return (
      <div className="relative z-10 space-y-12 animate-reveal">
        <div className="space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600">{authMode === 'login' ? 'Sign In' : 'Sign Up'}</span>
          <h2 className="text-5xl font-serif italic font-bold tracking-tight">
            {authMode === 'login' ? 'Welcome Back' : 'Join Nexo'}
          </h2>
          <p className="text-stone-500 text-sm italic">
            {authMode === 'login' 
              ? 'Sign in to access your dashboard.' 
              : 'Create an account to start your journey.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2 group">
            <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-1">Username</label>
            <input required type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. EverestExplorer" className="w-full bg-transparent border-b-2 border-stone-200 py-4 focus:border-orange-600 outline-none font-bold text-xl transition-all placeholder:text-stone-300 placeholder:font-normal" />
          </div>

          {authMode === 'register' && (
            <div className="space-y-2 group animate-reveal">
              <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-1">Email Address (Optional)</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" className="w-full bg-transparent border-b-2 border-stone-200 py-4 focus:border-orange-600 outline-none font-bold text-xl transition-all placeholder:text-stone-300 placeholder:font-normal" />
            </div>
          )}
          
          <div className="space-y-2 group">
            <div className="flex justify-between items-center pr-1">
               <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-1">Password</label>
               {authMode === 'login' && (
                 <button type="button" onClick={() => setAuthMode('forgot')} className="text-[9px] font-black uppercase text-orange-600 hover:underline">Forgot?</button>
               )}
            </div>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-transparent border-b-2 border-stone-200 py-4 focus:border-orange-600 outline-none font-bold text-xl transition-all placeholder:text-stone-300" />
          </div>

          <div className="pt-4 space-y-6">
            <button type="submit" disabled={isSubmitting} className="w-full nexo-btn nexo-btn-primary justify-center py-6 text-[10px]">
              {isSubmitting ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : <>{authMode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}</>}
            </button>

            <p className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'} 
              <button type="button" onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); }} className="ml-2 text-orange-600 hover:underline">
                {authMode === 'login' ? 'Register Now' : 'Login Here'}
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
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-600 font-serif italic">Nepal's Super App</span>
          </div>
          <h1 className="text-7xl md:text-[14rem] font-bold text-stone-900 font-serif leading-[0.75] tracking-tighter italic animate-reveal">
            NEXO<span className="text-orange-600">.</span>
            <span className="block mt-4 text-4xl md:text-9xl font-normal not-italic tracking-normal text-stone-900 opacity-90">All in one.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end pt-16">
            <p className="text-2xl md:text-4xl text-stone-900 font-serif leading-tight opacity-90 italic">
              Simplifying daily life <br /> 
              <span className="text-orange-600">for everyone in the Himalayas.</span>
            </p>
            <div className="flex gap-6">
              <button onClick={() => { setShowAuth(true); setAuthMode('login'); }} className="nexo-btn nexo-btn-primary group">
                Enter App <i className="fa-solid fa-arrow-right-long transition-transform group-hover:translate-x-2"></i>
              </button>
              <button onClick={() => { setShowAuth(true); setAuthMode('register'); }} className="nexo-btn nexo-btn-outline">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {showAuth && (
          <div className="absolute inset-0 z-50 flex items-center justify-center px-6 animate-reveal">
            <div className="w-full max-w-xl bg-[#fafaf9] p-12 md:p-20 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(28,25,23,0.15)] border border-stone-200 relative overflow-hidden transition-all duration-500">
               <button onClick={() => {setShowAuth(false); setRecoveryStep(1);}} className="absolute top-10 right-10 h-10 w-10 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors">
                 <i className="fa-solid fa-xmark text-stone-400"></i>
               </button>
               {renderAuthContent()}
            </div>
          </div>
        )}
      </section>

      <section className="px-6 md:px-24 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-6xl md:text-9xl font-serif italic font-bold leading-none tracking-tighter">
              Built <br /> For You.
            </h2>
            <p className="text-2xl text-stone-600 italic leading-relaxed">
              Designed to work perfectly in the city or the mountains. Everything you need, right here.
            </p>
          </div>
          <div className="relative">
             <div className="aspect-[4/5] bg-stone-100 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000">
                <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format" alt="Mountain" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
