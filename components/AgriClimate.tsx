
import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';

interface PerenualPlant {
  id: number;
  common_name: string;
  scientific_name: string[];
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
  maintenance: string;
  growth_rate: string;
  propagation: string[];
}

const AgriClimate: React.FC = () => {
  const [tab, setTab] = useState<'Seeds' | 'Analysis' | 'Diseases'>('Seeds');
  const [plants, setPlants] = useState<PerenualPlant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<PlantDetails | null>(null);
  const [nepaliInfo, setNepaliInfo] = useState<{ nepaliName: string; guide: string; altitude: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  const API_KEY = 'sk-WiBX6960c83ca308114259';

  useEffect(() => {
    fetchAllPlants();
  }, []);

  const fetchAllPlants = async () => {
    setLoading(true);
    try {
      const pages = [1, 2, 3, 4, 5, 6];
      const results = await Promise.all(
        pages.map(p => 
          fetch(`https://perenual.com/api/v2/species-list?key=${API_KEY}&page=${p}`)
            .then(r => r.json())
            .catch(() => ({ data: [] }))
        )
      );
      const combined = results.flatMap(r => r.data || []);
      // Limit to exactly 118 for the periodic table
      setPlants(combined.filter(p => p.common_name).slice(0, 118));
    } catch (e) {
      console.error("Botanical fetch failed", e);
    } finally {
      setLoading(false);
    }
  };

  const handlePlantClick = async (id: number, commonName: string) => {
    setDetailLoading(true);
    setSelectedPlant(null);
    setNepaliInfo(null);
    try {
      const res = await fetch(`https://perenual.com/api/v2/species/details/${id}?key=${API_KEY}`);
      const details = await res.json();
      setSelectedPlant(details);
      const nInfo = await GeminiService.translatePlantData(commonName);
      setNepaliInfo(nInfo);
    } catch (e) {
      console.error("Plant detail error", e);
    } finally {
      setDetailLoading(false);
    }
  };

  const getSymbol = (name: string) => {
    if (!name) return "Pl";
    const clean = name.replace(/[^a-zA-Z\s]/g, '').trim();
    const parts = clean.split(' ');
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const gridElements = Array.from({ length: 118 }).map((_, i) => plants[i] || null);

  return (
    <div className="space-y-16 animate-reveal pb-32 text-stone-900 max-w-[1700px] mx-auto">
      <nav className="flex bg-white/70 backdrop-blur-xl p-2 rounded-[2.5rem] border border-stone-200 w-fit shadow-2xl mx-auto sticky top-6 z-40">
        {(['Seeds', 'Analysis', 'Diseases'] as const).map(t => (
          <button 
            key={t}
            onClick={() => setTab(t)} 
            className={`px-10 py-4 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all ${tab === t ? 'bg-stone-900 text-white shadow-xl' : 'text-stone-500 hover:text-stone-900'}`}
          >
            {t === 'Seeds' ? '118 Element Grid' : t === 'Analysis' ? 'Field Scanner' : 'Pathogen DB'}
          </button>
        ))}
      </nav>

      <header className="border-b border-stone-200 pb-12 flex flex-col md:flex-row justify-between items-end gap-10">
         <div className="space-y-4">
            <div className="flex items-center gap-4">
               <span className="h-[2px] w-16 bg-orange-600"></span>
               <span className="text-[11px] font-black uppercase tracking-[0.6em] text-orange-600">Genetic Asset Register</span>
            </div>
            <h2 className="text-7xl md:text-9xl font-serif italic font-bold tracking-tighter text-stone-900 leading-[0.85]">Nexo<span className="text-orange-600">.Agro</span></h2>
         </div>
         <p className="max-w-md text-base text-stone-500 font-medium italic leading-relaxed md:text-right opacity-80">
           Verifying 118 core molecular botanical elements for high-altitude Himalayan growth. Sourced via Perenual and Gemini AI.
         </p>
      </header>

      {tab === 'Seeds' && (
        <div className="space-y-16">
          {loading && plants.length === 0 ? (
            <div className="py-48 text-center space-y-8">
               <div className="h-24 w-24 border-[4px] border-orange-600 border-t-transparent rounded-full animate-spin mx-auto shadow-2xl"></div>
               <p className="text-[12px] font-black uppercase tracking-[0.8em] text-stone-400">Loading Botanical Matrix...</p>
            </div>
          ) : (
            <div className="periodic-grid animate-reveal px-2">
              {gridElements.map((plant, i) => (
                plant ? (
                  <button 
                    key={`${plant.id}-${i}`} 
                    onClick={() => handlePlantClick(plant.id, plant.common_name)}
                    className="periodic-cell flex flex-col p-3.5 border border-stone-200 rounded-2xl text-left bg-white group hover:border-orange-600 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-auto">
                       <span className="text-[8px] font-black text-stone-300">#{i + 1}</span>
                       <div className={`h-2 w-2 rounded-full ${plant.cycle?.includes('Perennial') ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.5)]'}`}></div>
                    </div>
                    <div className="text-2xl md:text-3xl font-serif font-black italic tracking-tighter text-stone-900 group-hover:text-orange-600 transition-colors">
                      {getSymbol(plant.common_name)}
                    </div>
                    <div className="text-[8px] font-black uppercase tracking-tighter truncate text-stone-500 group-hover:text-stone-900">{plant.common_name}</div>
                  </button>
                ) : (
                  <div key={`empty-${i}`} className="periodic-cell border border-stone-100 bg-stone-50/10 rounded-2xl flex items-center justify-center grayscale opacity-20">
                    <span className="text-[9px] font-black text-stone-300">#{i + 1}</span>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      )}

      {/* High-Fidelity Interaction Modal */}
      {(selectedPlant || detailLoading) && (
        <div className="fixed inset-0 z-[100] bg-stone-950/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 animate-reveal overflow-y-auto no-scrollbar">
          <button 
            onClick={() => setSelectedPlant(null)}
            className="fixed top-10 right-10 h-16 w-16 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-orange-600 transition-all z-[110] shadow-2xl"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>

          {detailLoading ? (
            <div className="text-center space-y-10">
               <div className="h-28 w-28 border-[5px] border-orange-600 border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_50px_rgba(194,65,12,0.3)]"></div>
               <p className="text-[14px] font-black uppercase tracking-[1em] text-orange-600">Initializing Core...</p>
            </div>
          ) : selectedPlant && (
            <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 py-16 items-center">
              {/* Nucleus UI */}
              <div className="lg:col-span-5 flex justify-center">
                 <div className="relative h-72 w-72 md:h-[32rem] md:w-[32rem]">
                    {/* Orbitals */}
                    <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_25s_linear_infinite]">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-3xl">
                          <i className="fa-solid fa-dna text-xl"></i>
                       </div>
                    </div>
                    <div className="absolute inset-16 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]">
                       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-14 w-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-3xl">
                          <i className="fa-solid fa-leaf text-xl"></i>
                       </div>
                    </div>
                    
                    {/* Inner Core */}
                    <div className="absolute inset-28 bg-white rounded-full overflow-hidden border-[15px] border-white/5 shadow-[0_0_120px_rgba(255,255,255,0.15)] group cursor-zoom-in">
                       {selectedPlant.default_image ? (
                         <img src={selectedPlant.default_image.original_url} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[6s] cubic-bezier(0.16, 1, 0.3, 1)" alt={selectedPlant.common_name} />
                       ) : (
                         <div className="h-full w-full flex items-center justify-center text-stone-900 text-8xl font-serif font-black italic">{getSymbol(selectedPlant.common_name)}</div>
                       )}
                    </div>
                 </div>
              </div>

              {/* Data Panel */}
              <div className="lg:col-span-7 space-y-12 text-white text-left">
                 <header className="space-y-6">
                    <div className="flex items-center gap-6">
                       <span className="px-6 py-2 bg-orange-600 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl">Element ID: #{selectedPlant.id}</span>
                       <span className="text-white/40 text-sm font-serif italic border-l border-white/20 pl-6 uppercase tracking-widest">{selectedPlant.cycle} Protocol</span>
                    </div>
                    <div className="space-y-6">
                       <h3 className="text-6xl md:text-[8rem] font-serif italic font-bold tracking-tighter leading-[0.85] text-white">
                         {selectedPlant.common_name}
                       </h3>
                       {nepaliInfo && (
                         <p className="text-5xl md:text-7xl text-orange-500 font-bold font-serif opacity-90">{nepaliInfo.nepaliName}</p>
                       )}
                    </div>
                    <p className="text-2xl md:text-3xl text-white/30 font-serif italic font-medium">{selectedPlant.scientific_name?.[0]}</p>
                 </header>

                 <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {[
                      { l: 'Watering', v: selectedPlant.watering, i: 'fa-droplet' },
                      { l: 'Exposure', v: selectedPlant.sunlight?.[0] || 'High', i: 'fa-sun' },
                      { l: 'Maintenance', v: selectedPlant.maintenance || 'Standard', i: 'fa-gear' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all group">
                        <i className={`fa-solid ${item.i} text-orange-600 mb-4 block text-lg opacity-40 group-hover:opacity-100 transition-opacity`}></i>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">{item.l}</p>
                        <p className="text-2xl font-bold italic font-serif capitalize text-white/90">{item.v}</p>
                      </div>
                    ))}
                 </div>

                 <div className="bg-white/5 p-14 rounded-[4rem] border border-white/10 space-y-10 relative overflow-hidden group">
                    <div className="flex items-center gap-6 relative z-10">
                       <div className="h-10 w-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-2xl">
                          <i className="fa-solid fa-mountain-sun text-white"></i>
                       </div>
                       <h5 className="text-[12px] font-black uppercase tracking-[0.5em] text-white/60">Himalayan Genetic Sync</h5>
                    </div>
                    {nepaliInfo ? (
                      <div className="space-y-10 relative z-10">
                         <p className="text-2xl md:text-4xl text-white/90 leading-relaxed italic font-serif border-l-4 border-orange-600 pl-10">
                           "{nepaliInfo.guide}"
                         </p>
                         <div className="flex flex-wrap gap-12 pt-8 border-t border-white/10">
                            <div>
                               <p className="text-[11px] font-black text-orange-600 uppercase tracking-widest mb-2">Ideal Altitude</p>
                               <p className="text-5xl font-serif font-black italic">{nepaliInfo.altitude}</p>
                            </div>
                            <div>
                               <p className="text-[11px] font-black text-emerald-500 uppercase tracking-widest mb-2">Suitability Status</p>
                               <p className="text-5xl font-serif font-black italic">OPTIMAL</p>
                            </div>
                         </div>
                      </div>
                    ) : (
                      <div className="space-y-6 animate-pulse">
                         <div className="h-6 w-full bg-white/5 rounded-full"></div>
                         <div className="h-6 w-3/4 bg-white/5 rounded-full"></div>
                         <div className="h-20 w-1/2 bg-white/5 rounded-3xl mt-12"></div>
                      </div>
                    )}
                    <i className="fa-solid fa-snowflake absolute -right-16 -bottom-16 text-[22rem] opacity-[0.02] pointer-events-none group-hover:opacity-[0.04] transition-all duration-[2s]"></i>
                 </div>

                 <div className="flex flex-col sm:flex-row gap-8 pt-6">
                    <button className="flex-1 py-8 bg-white text-stone-900 rounded-[2.5rem] text-[12px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-[0_40px_80px_-20px_rgba(255,255,255,0.15)] active:scale-95">
                       Sync to Field Maps
                    </button>
                    <button className="flex-1 py-8 border-2 border-white/20 text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                       Download Genetic Spec
                    </button>
                 </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgriClimate;
