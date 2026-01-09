
import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';

interface PerenualPlant {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  cycle: string;
  watering: string;
  sunlight: string[];
  default_image: {
    thumbnail: string;
    original_url: string;
  } | null;
}

interface PlantDetails extends PerenualPlant {
  description: string;
  hardiness: { min: string; max: string };
  maintenance: string;
  growth_rate: string;
  propagation: string[];
  poisonous_to_humans: number;
}

interface Disease {
  id: number;
  common_name: string;
  scientific_name: string;
  family: string;
  description: { subtitle: string; description: string }[];
}

const AgriClimate: React.FC = () => {
  const [location, setLocation] = useState('');
  const [crop, setCrop] = useState('');
  const [report, setReport] = useState<any>(null);
  const [tab, setTab] = useState<'Analysis' | 'Seeds' | 'Diseases'>('Seeds');
  const [loading, setLoading] = useState(false);
  
  const [plants, setPlants] = useState<PerenualPlant[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<PlantDetails | null>(null);
  const [aiGuide, setAiGuide] = useState<string | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const API_KEY = 'sk-WiBX6960c83ca308114259';

  useEffect(() => {
    fetchPlants();
    fetchDiseases();
  }, []);

  const fetchPlants = async () => {
    try {
      const res = await fetch(`https://perenual.com/api/v2/species-list?key=${API_KEY}&page=1`);
      const data = await res.json();
      setPlants(data.data.slice(0, 48)); // Take 48 for a nice grid
    } catch (e) {
      console.error("Failed to fetch plants", e);
    }
  };

  const fetchDiseases = async () => {
    try {
      const res = await fetch(`https://perenual.com/api/pest-disease-list?key=${API_KEY}`);
      const data = await res.json();
      setDiseases(data.data || []);
    } catch (e) {
      console.error("Failed to fetch diseases", e);
    }
  };

  const handlePlantClick = async (id: number) => {
    setDetailLoading(true);
    setAiGuide(null);
    try {
      const res = await fetch(`https://perenual.com/api/v2/species/details/${id}?key=${API_KEY}`);
      const data = await res.json();
      setSelectedPlant(data);
      
      // Generate AI Guide for Nepal context
      const guide = await GeminiService.chat(`Provide a short 3-sentence guide for growing ${data.common_name} in the specific context of Nepal (consider Hills vs Terai).`);
      setAiGuide(guide);
    } catch (e) {
      console.error("Failed to fetch details", e);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!location || !crop) return;
    setLoading(true);
    try {
      const res = await GeminiService.analyzeAgriLocation(location, crop);
      setReport(res);
    } catch (e) { console.error(e); } 
    finally { setLoading(false); }
  };

  const getSymbol = (name: string) => {
    if (!name) return "Pl";
    const parts = name.split(' ');
    if (parts.length > 1) return parts[0][0] + parts[1][0];
    return name.substring(0, 2);
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-20 relative">
      <div className="flex bg-stone-100 p-1.5 rounded-[1.5rem] border border-black/5 w-fit shadow-inner overflow-x-auto no-scrollbar max-w-full">
        <button onClick={() => setTab('Seeds')} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${tab === 'Seeds' ? 'bg-[#2a1b18] text-[#f8f5f0] shadow-md' : 'text-[#4a4a4a] hover:text-[#2a1b18]'}`}>Seed Database</button>
        <button onClick={() => setTab('Analysis')} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${tab === 'Analysis' ? 'bg-[#2a1b18] text-[#f8f5f0] shadow-md' : 'text-[#4a4a4a] hover:text-[#2a1b18]'}`}>Farming Analysis</button>
        <button onClick={() => setTab('Diseases')} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${tab === 'Diseases' ? 'bg-[#2a1b18] text-[#f8f5f0] shadow-md' : 'text-[#4a4a4a] hover:text-[#2a1b18]'}`}>Disease Ledger</button>
      </div>

      <div className="flex justify-between items-center mb-6">
         <h2 className="text-3xl font-bold text-[#2a1b18] font-serif tracking-tighter uppercase italic">Nexo<span className="text-orange-600">.Agro</span></h2>
      </div>

      {tab === 'Seeds' && (
        <div className="space-y-12">
          <div className="flex justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-stone-400 py-4 border-y border-stone-100">
             <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-400"></span> Tropical</div>
             <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400"></span> Temperate</div>
             <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-400"></span> Hydro-Sync</div>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 animate-reveal">
            {plants.length === 0 ? (
              Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="aspect-square bg-stone-100 rounded-2xl animate-pulse"></div>
              ))
            ) : plants.map((plant, i) => (
              <button 
                key={plant.id} 
                onClick={() => handlePlantClick(plant.id)}
                className="aspect-square flex flex-col p-3 border-2 border-stone-100 rounded-2xl text-left bg-white transition-all hover:scale-110 hover:shadow-2xl hover:z-10 group relative overflow-hidden active:scale-95"
              >
                <div className="flex justify-between items-start mb-auto">
                   <span className="text-[9px] font-black opacity-40">{i + 1}</span>
                   <span className="text-[8px] font-bold opacity-60 uppercase tracking-tighter truncate">{plant.cycle}</span>
                </div>
                <div className="text-2xl font-serif font-black italic tracking-tighter mb-1 text-stone-900 group-hover:text-orange-600">
                  {getSymbol(plant.common_name)}
                </div>
                <div className="text-[9px] font-black uppercase tracking-widest truncate text-stone-600">{plant.common_name}</div>
                <div className="absolute -right-2 -bottom-2 text-4xl opacity-[0.03] font-serif italic">{getSymbol(plant.common_name)}</div>
              </button>
            ))}
          </div>

          <div className="bg-stone-50 rounded-[3rem] p-12 text-center border border-stone-200">
             <p className="text-stone-400 text-sm font-serif italic max-w-2xl mx-auto">The Periodic Table of Seeds represents Nepal's genetic wealth synchronized with global botanical standards. Explore the molecular requirements of each species.</p>
          </div>
        </div>
      )}

      {tab === 'Analysis' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           <div className="lg:col-span-2 space-y-8">
             <div className="bg-white border border-stone-200 p-12 rounded-[3.5rem] shadow-xl">
               <h3 className="text-xl font-bold text-stone-900 mb-10 flex items-center gap-4 uppercase tracking-tighter font-serif italic">
                 <i className="fa-solid fa-seedling text-orange-600"></i> AI Crop Analysis
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Location in Nepal</label>
                   <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Dhankuta" className="w-full bg-stone-50 border border-stone-100 text-stone-900 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-orange-600 font-bold" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Planned Crop</label>
                   <input type="text" value={crop} onChange={e => setCrop(e.target.value)} placeholder="e.g. Coffee" className="w-full bg-stone-50 border border-stone-100 text-stone-900 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-orange-600 font-bold" />
                 </div>
               </div>
               <button onClick={handleAnalyze} disabled={loading} className="mt-10 w-full h-[72px] bg-stone-900 hover:bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-4">
                 {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <span>GET INTELLIGENCE REPORT</span>}
               </button>
             </div>

             {report && (
               <div className="bg-white border-2 border-dashed border-orange-200 p-12 rounded-[3.5rem] shadow-2xl animate-slideUp">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div className="space-y-8">
                        <div>
                          <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1 font-serif">Suitability Score</p>
                          <p className="text-2xl font-bold text-stone-900 uppercase tracking-tighter italic font-serif">{report.suitability}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1 font-serif">Best Variety</p>
                          <p className="text-xl font-bold text-stone-900 italic">{report.bestVariety}</p>
                        </div>
                     </div>
                     <div className="space-y-8">
                        <div>
                          <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1 font-serif">Climate Risk Factors</p>
                          <p className="text-sm text-stone-600 font-medium leading-relaxed tracking-tight italic">{report.climateRisk}</p>
                        </div>
                        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                          <p className="text-xs font-bold text-stone-600 leading-snug italic opacity-80">{report.soilTips}</p>
                        </div>
                     </div>
                  </div>
               </div>
             )}
           </div>

           <div className="bg-stone-900 p-12 rounded-[3.5rem] shadow-2xl text-white h-fit relative overflow-hidden group">
              <h4 className="font-bold text-xl text-white mb-10 uppercase tracking-tighter font-serif italic border-b border-white/5 pb-6">Market Pulse</h4>
              <div className="space-y-5 relative z-10">
                {[
                  { n: 'Cardamom (Big)', p: 'Rs. 950/kg', t: 'up' },
                  { n: 'Ginger', p: 'Rs. 120/kg', t: 'down' },
                  { n: 'Green Chilli', p: 'Rs. 80/kg', t: 'up' },
                ].map((m, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    <span className="font-bold text-stone-300 text-sm italic">{m.n}</span>
                    <div className="flex items-center gap-4">
                       <span className="font-black text-white text-sm">{m.p}</span>
                       <i className={`fa-solid fa-arrow-${m.t} text-[10px] ${m.t === 'up' ? 'text-emerald-400' : 'text-red-400'}`}></i>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}

      {tab === 'Diseases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-reveal">
           {diseases.length === 0 ? (
             <div className="col-span-full py-20 text-center text-stone-400 font-serif italic">Loading Disease Database...</div>
           ) : diseases.map(disease => (
             <div key={disease.id} className="bg-white border border-stone-200 p-8 rounded-[3rem] shadow-lg space-y-6 hover:border-red-400 transition-all">
                <div className="h-14 w-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                   <i className="fa-solid fa-bug text-2xl"></i>
                </div>
                <div>
                   <h4 className="text-xl font-bold font-serif italic text-stone-900">{disease.common_name}</h4>
                   <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-1">{disease.scientific_name}</p>
                </div>
                <div className="bg-stone-50 p-4 rounded-2xl text-xs text-stone-600 italic leading-relaxed">
                   {disease.description?.[0]?.description?.substring(0, 150)}...
                </div>
                <button className="text-[10px] font-black uppercase text-red-600 tracking-widest hover:underline">View Treatment</button>
             </div>
           ))}
        </div>
      )}

      {/* Seed Nucleus Interaction Overlay */}
      {selectedPlant && (
        <div className="fixed inset-0 z-[100] bg-stone-900/98 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 animate-fadeIn overflow-y-auto">
          <button 
            onClick={() => setSelectedPlant(null)}
            className="fixed top-12 right-12 h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-orange-600 transition-all text-2xl z-[110]"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl items-center py-20">
            {/* Nucleus Diagram */}
            <div className="lg:col-span-6 flex justify-center relative">
               <div className="relative h-[25rem] w-[25rem] md:h-[35rem] md:w-[35rem]">
                  {/* Orbits */}
                  <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_15s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 bg-blue-500 rounded-full flex flex-col items-center justify-center text-white shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                       <i className="fa-solid fa-droplet text-xs"></i>
                       <span className="text-[7px] font-black uppercase mt-1">{selectedPlant.watering}</span>
                    </div>
                  </div>
                  <div className="absolute inset-12 border border-white/5 rounded-full animate-[spin_10s_linear_infinite_reverse]">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-14 w-14 bg-emerald-500 rounded-full flex flex-col items-center justify-center text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                       <i className="fa-solid fa-leaf text-xs"></i>
                       <span className="text-[7px] font-black uppercase mt-1">Growth</span>
                    </div>
                  </div>
                  <div className="absolute inset-28 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]">
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 bg-amber-500 rounded-full flex flex-col items-center justify-center text-white shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                       <i className="fa-solid fa-sun text-xs"></i>
                       <span className="text-[7px] font-black uppercase mt-1">{selectedPlant.sunlight?.[0]}</span>
                    </div>
                  </div>

                  {/* Nucleus Core */}
                  <div className="absolute inset-40 bg-white rounded-full shadow-[0_0_100px_rgba(255,255,255,0.2)] flex flex-col items-center justify-center overflow-hidden border-[8px] border-white/10 animate-reveal">
                    {selectedPlant.default_image ? (
                      <img src={selectedPlant.default_image.original_url} className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-1000" alt={selectedPlant.common_name} />
                    ) : (
                      <div className="text-stone-900 text-6xl font-serif font-black italic">{getSymbol(selectedPlant.common_name)}</div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
               </div>
            </div>

            {/* Atomic Details Panel */}
            <div className="lg:col-span-6 space-y-10 text-white">
               <div className="space-y-4">
                 <div className="flex items-center gap-3">
                   <span className="px-4 py-1.5 bg-orange-600 rounded-full text-[9px] font-black uppercase tracking-widest">Molecular Spec</span>
                   <span className="text-white/40 font-serif italic">ID: #{selectedPlant.id}</span>
                 </div>
                 <h3 className="text-6xl md:text-8xl font-serif italic font-bold tracking-tighter leading-none">{selectedPlant.common_name}</h3>
                 <p className="text-xl text-white/60 font-serif italic">({selectedPlant.scientific_name?.[0]})</p>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                     <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Cycle</p>
                     <p className="text-lg font-bold italic font-serif">{selectedPlant.cycle}</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                     <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Growth Rate</p>
                     <p className="text-lg font-bold italic font-serif">{selectedPlant.growth_rate || 'Standard'}</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                     <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Maintenance</p>
                     <p className="text-lg font-bold italic font-serif capitalize">{selectedPlant.maintenance}</p>
                  </div>
               </div>

               <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 space-y-6">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-robot text-orange-600"></i>
                    <h5 className="text-[10px] font-black uppercase tracking-widest">Nexo AI: Himalayan Sync</h5>
                  </div>
                  {aiGuide ? (
                    <p className="text-xl text-white/90 leading-relaxed italic font-serif">"{aiGuide}"</p>
                  ) : (
                    <div className="h-4 w-full bg-white/5 rounded animate-pulse"></div>
                  )}
               </div>

               <div className="space-y-4">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-white/40">Propagation & Care</h5>
                  <div className="flex flex-wrap gap-3">
                    {(selectedPlant.propagation || ['Seedlings', 'Cuttings']).map((p, i) => (
                      <span key={i} className="px-5 py-2 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest">{p}</span>
                    ))}
                  </div>
               </div>

               <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <p className="text-sm font-medium italic text-white/40 max-w-[280px]">Optimized botanical profile verified for high-altitude cultivation protocols.</p>
                  <button className="px-10 py-5 bg-white text-stone-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-xl">
                    ADD TO MY FIELD
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgriClimate;
