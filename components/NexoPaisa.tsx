
import React, { useState } from 'react';

interface NexoPaisaProps {
  balance: number;
  onAdd: (amount: number) => void;
}

const NexoPaisa: React.FC<NexoPaisaProps> = ({ balance, onAdd }) => {
  const [amount, setAmount] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const banks = [
    { name: 'NIC ASIA Bank', logo: 'N', color: 'bg-red-600' },
    { name: 'Nabil Bank', logo: 'NB', color: 'bg-emerald-600' },
    { name: 'Global IME Bank', logo: 'G', color: 'bg-blue-800' },
    { name: 'Rastriya Banijya Bank', logo: 'RB', color: 'bg-blue-600' },
    { name: 'Nepal Investment Bank', logo: 'NI', color: 'bg-stone-800' },
    { name: 'Prabhu Bank', logo: 'P', color: 'bg-rose-600' },
    { name: 'Machhapuchchhre Bank', logo: 'M', color: 'bg-blue-400' },
    { name: 'Siddhartha Bank', logo: 'S', color: 'bg-orange-600' },
  ];

  const handleLoad = () => {
    if (!amount || !selectedBank) return;
    setShowConfirm(true);
  };

  const confirmTransaction = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onAdd(Number(amount));
      setLoading(false);
      setShowConfirm(false);
      setSuccess(true);
      setAmount('');
      setSelectedBank(null);
      
      // Auto-dismiss success message
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-reveal pb-40">
      <header className="space-y-6">
        <div className="flex items-center gap-4">
           <span className="h-[2px] w-16 bg-stone-900"></span>
           <span className="text-[11px] font-black uppercase tracking-[0.6em] text-stone-900">Financial Terminal</span>
        </div>
        <h2 className="text-7xl md:text-[10rem] font-serif italic font-bold tracking-tighter text-stone-900 leading-[0.85]">Nexo<span className="text-orange-600">.Paisa</span></h2>
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-stone-200 pb-12">
          <p className="max-w-md text-xl text-stone-500 font-medium italic leading-tight">
            Seamlessly bridge your traditional bank assets with the Nexo ecosystem. 1 NPR = 1 Nexo Paisa.
          </p>
          <div className="bg-stone-900 p-8 rounded-[3rem] text-white shadow-2xl min-w-[300px] text-right">
             <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2">Current Wallet Assets</p>
             <p className="text-4xl font-serif font-black italic">Rs. {balance.toLocaleString()}</p>
          </div>
        </div>
      </header>

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 p-10 rounded-[3rem] flex items-center justify-between animate-slideUp">
           <div className="flex items-center gap-8">
              <div className="h-16 w-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl">
                 <i className="fa-solid fa-check"></i>
              </div>
              <div>
                 <h4 className="text-2xl font-serif italic font-bold text-emerald-900">Synchronization Successful</h4>
                 <p className="text-emerald-700 font-medium italic opacity-70">Funds have been added to your primary vault.</p>
              </div>
           </div>
           <button onClick={() => setSuccess(false)} className="h-10 w-10 text-emerald-400 hover:text-emerald-900 transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
           </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Step 1: Select Bank */}
        <section className="space-y-10">
          <div className="flex items-center gap-4">
            <span className="h-10 w-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-black">01</span>
            <h3 className="text-3xl font-serif italic font-bold">Select Origin Node</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {banks.map(bank => (
              <button 
                key={bank.name}
                onClick={() => setSelectedBank(bank.name)}
                className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 group ${selectedBank === bank.name ? 'border-orange-600 bg-orange-50 shadow-xl scale-105' : 'border-stone-100 bg-white hover:border-stone-300'}`}
              >
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg ${bank.color}`}>
                   {bank.logo}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-center text-stone-600 group-hover:text-stone-900">{bank.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Amount */}
        <section className="space-y-10">
          <div className="flex items-center gap-4">
            <span className="h-10 w-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-black">02</span>
            <h3 className="text-3xl font-serif italic font-bold">Amount to Transfer</h3>
          </div>
          <div className="bg-white p-12 rounded-[4rem] border border-stone-100 shadow-xl space-y-12">
             <div className="relative group">
                <span className="absolute left-8 top-1/2 -translate-y-1/2 text-4xl font-serif italic font-bold text-stone-300 group-focus-within:text-orange-600 transition-colors">Rs.</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-stone-50 border-none rounded-[2rem] py-8 pl-24 pr-8 text-5xl font-serif font-black italic focus:ring-2 focus:ring-orange-600 transition-all placeholder:text-stone-100"
                />
             </div>
             
             <div className="grid grid-cols-3 gap-4">
               {[1000, 5000, 10000].map(val => (
                 <button 
                   key={val} 
                   onClick={() => setAmount(val.toString())}
                   className="py-4 bg-stone-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all"
                 >
                   +{val}
                 </button>
               ))}
             </div>

             <button 
               onClick={handleLoad}
               disabled={!amount || !selectedBank}
               className="w-full py-10 bg-stone-900 text-white rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.4em] hover:bg-orange-600 transition-all shadow-2xl disabled:opacity-20 active:scale-95"
             >
               SYNCHRONIZE ASSETS
             </button>
          </div>
        </section>
      </div>

      {/* Modern Confirmation Overlay */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-3xl flex items-center justify-center p-6 animate-reveal">
           <div className="w-full max-w-xl bg-black rounded-[5rem] p-16 border border-white/10 text-white space-y-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl font-serif italic font-black">Nexo</div>
              
              <header className="space-y-4">
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-orange-600">Verification Required</span>
                <h4 className="text-5xl font-serif italic font-bold tracking-tighter">Confirm Deposit?</h4>
              </header>

              <div className="space-y-6">
                 <div className="flex justify-between items-center border-b border-white/10 pb-6">
                    <span className="text-[11px] font-black uppercase text-white/30 tracking-widest">Origin Node</span>
                    <span className="text-xl font-bold italic font-serif">{selectedBank}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/10 pb-6">
                    <span className="text-[11px] font-black uppercase text-white/30 tracking-widest">Target Vault</span>
                    <span className="text-xl font-bold italic font-serif">Nexo Primary Paisa Wallet</span>
                 </div>
                 <div className="flex justify-between items-center pt-6">
                    <span className="text-[11px] font-black uppercase text-orange-600 tracking-widest">Total Amount</span>
                    <span className="text-5xl font-serif font-black italic">Rs. {Number(amount).toLocaleString()}</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-10">
                 <button 
                   onClick={() => setShowConfirm(false)}
                   className="py-8 border-2 border-white/20 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                 >
                   CANCEL
                 </button>
                 <button 
                   onClick={confirmTransaction}
                   disabled={loading}
                   className="py-8 bg-orange-600 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-orange-600 transition-all shadow-2xl flex items-center justify-center gap-4"
                 >
                   {loading ? <i className="fa-solid fa-dna fa-spin"></i> : 'CONFIRM SYNC'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default NexoPaisa;
