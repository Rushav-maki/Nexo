
import React, { useState, useEffect, useMemo } from 'react';
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

interface DiseaseInfo {
  id: number;
  common_name: string;
  scientific_name: string;
  family: string;
  description: Array<{ subtitle: string; description: string }>;
  images: Array<{ thumbnail: string; original_url: string }>;
}

const AgriClimate: React.FC = () => {
  const [tab, setTab] = useState<'Seeds' | 'Analysis' | 'Diseases'>('Seeds');
  const [plants, setPlants] = useState<PerenualPlant[]>([]);
  const [diseases, setDiseases] = useState<DiseaseInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // States for Details
  const [selectedPlant, setSelectedPlant] = useState<PlantDetails | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<DiseaseInfo | null>(null);
  const [nepaliInfo, setNepaliInfo] = useState<{ nepaliName: string; guide: string; altitude: string } | null>(null);
  
  // Loading States
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  // Analysis States
  const [analysisLocation, setAnalysisLocation] = useState('');
  const [analysisCrop, setAnalysisCrop] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const API_KEY = 'sk-WiBX6960c83ca308114259';

  useEffect(() => {
    fetchAllPlants();
    fetchDiseases();
  }, []);

  const fetchAllPlants = async () => {
    setLoading(true);
    try {
      const pages = [1, 2, 3];
      const results = await Promise.all(
        pages.map(p => 
          fetch(`https://perenual.com/api/v2/species-list?key=${API_KEY}&page=${p}`)
            .then(r => r.json())
            .catch(() => ({ data: [] }))
        )
      );
      const combined = results.flatMap(r => r.data || []);
      setPlants(combined.filter(p => p.common_name).slice(0, 118));
    } catch (e) {
      console.error("Botanical fetch failed", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchDiseases = async () => {
    try {
      // Using the user-verified endpoint for pest-disease-list
      const res = await fetch(`https://perenual.com/api/pest-disease-list?key=${API_KEY}`);
      const data = await res.json();
      setDiseases(data.data || []);
    } catch (e) {
      console.error("Pathogen DB fetch failed", e);
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
      
      // Secondary enrichment with Gemini AI for Nepali context
      const nInfo = await GeminiService.translatePlantData(commonName);
      setNepaliInfo(nInfo);
    } catch (e) {
      console.error("Plant detail error", e);
    } finally {
      setDetailLoading(false);
    }
  };

  const runAnalysis = async () => {
    if (!analysisLocation || !analysisCrop) return;
    setAnalyzing(true);
    try {
      const res = await GeminiService.analyzeAgriLocation(analysisLocation, analysisCrop);
      setAnalysisResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  const getSymbol = (name: string) => {
    if (!name) return "Pl";
    const clean = name.replace(/[^a-zA-Z\s]/g, '').trim();
    const parts = clean.split(' ');
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const filteredPlants = useMemo(() => {
    return plants.filter(p => 
      p.common_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [plants, searchQuery]);

  // Ensure grid always shows 118 slots (empty or filled)
  const gridElements = Array.from({ length: 118 }).map((_, i) => filteredPlants[i] || null);

  return (
    <div className="space-y-16 animate-reveal pb-32 text-stone-900 w-full relative">
      <nav className="flex bg-white/80 backdrop-blur-2xl p-2 rounded-[2.5rem] border border-stone-200 w-fit shadow-2xl mx-auto sticky top-6 z-40">
        {(['Seeds', 'Analysis', 'Diseases'] as const).map(t => (
          <button 
            key={t}
            onClick={() => setTab(t)} 
            className={`px-8 md:px-12 py-3.5 rounded-[2rem] text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all ${tab === t ? 'bg-stone-900 text-white shadow-xl' : 'text-stone-500 hover:text-stone-900'}`}
          >
            {t === 'Seeds' ? 'Botanical Matrix' : t === 'Analysis' ? 'Field Scanner' : 'Pathogen DB'}
          </button>
        ))}
      </nav>

      <header className="border-b border-stone-200 pb-12 flex flex-col md:flex-row justify-between items-end gap-10">
         <div className="space-y-4">
            <div className="flex items-center gap-4">
               <span className="h-[2px] w-16 bg-orange-600"></span>
               <span className="text-[11px] font-black uppercase tracking-[0.6em] text-orange-600">Himalayan Genetic Ledger</span>
            </div>
            <h2 className="text-7xl md:text-9xl font-serif italic font-bold tracking-tighter text-stone-900 leading-[0.85]">Nexo<span className="text-orange-600">.Agro</span></h2>
         </div>
         <div className="flex flex-col items-end gap-4">
            <p className="max-w-md text-base text-stone-500 font-medium italic leading-relaxed text-right opacity-80">
              Verifying molecular botanical elements for Himalayan growth. Sourced via Perenual & Gemini Intelligence.
            </p>
            {tab === 'Seeds' && (
              <div className="relative w-full max-w-sm">
                <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-stone-300"></i>
                <input 
                  type="text" 
                  placeholder="Search Registry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-[12px] font-bold uppercase tracking-widest focus:border-orange-600 outline-none transition-all placeholder:text-stone-300"
                />
              </div>
            )}
         </div>
      </header>

      {tab === 'Seeds' && (
        <div className="space-y-16">
          {loading && plants.length === 0 ? (
            <div className="py-48 text-center space-y-8">
               <div className="h-24 w-24 border-[4px] border-orange-600 border-t-transparent rounded-full animate-spin mx-auto shadow-2xl"></div>
               <p className="text-[12px] font-black uppercase tracking-[0.8em] text-stone-400 italic">Accessing Genetic Archive...</p>
            </div>
          ) : (
            <div className="periodic-grid animate-reveal px-2">
              {gridElements.map((plant, i) => (
                plant ? (
                  <button 
                    key={`${plant.id}-${i}`} 
                    onClick={() => handlePlantClick(plant.id, plant.common_name)}
                    className="periodic-cell flex flex-col p-3.5 border border-stone-200 rounded-2xl text-left bg-white group hover:border-orange-600 shadow-sm transition-all"
                  >
                    <div className="flex justify-between items-start mb-auto">
                       <span className="text-[8px] font-black text-stone-300">#{i + 1}</span>
                       <div className={`h-2 w-2 rounded-full ${plant.cycle?.includes('Perennial') ? 'bg-emerald-400' : 'bg-orange-400'}`}></div>
                    </div>
                    <div className="text-2xl md:text-3xl font-serif font-black italic tracking-tighter text-stone-900 group-hover:text-orange-600 transition-colors">
                      {getSymbol(plant.common_name)}
                    </div>
                    <div className="text-[8px] font-black uppercase tracking-tighter truncate text-stone-500 group-hover:text-stone-900">{plant.common_name}</div>
                  </button>
                ) : (
                  <div key={`empty-${i}`} className="periodic-cell border border-stone-100 bg-stone-50/10 rounded-2xl flex items-center justify-center grayscale opacity-10">
                    <span className="text-[9px] font-black text-stone-200">#{i + 1}</span>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'Analysis' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-reveal">
           <div className="bg-white border border-stone-200 p-12 md:p-20 rounded-[4rem] shadow-xl space-y-12">
              <header className="space-y-4">
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-600">Cognitive Scanning</span>
                 <h3 className="text-4xl md:text-6xl font-serif italic font-bold tracking-tighter text-stone-900 leading-tight">Field <br />Intelligence.</h3>
                 <p className="text-base text-stone-500 font-medium italic">Simulate crop performance based on soil and climate data from Gemini's database.</p>
              </header>

              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Location Node</label>
                    <input 
                      type="text" 
                      value={analysisLocation}
                      onChange={e => setAnalysisLocation(e.target.value)}
                      placeholder="e.g. Dhulikhel"
                      className="w-full bg-stone-50 border border-stone-100 p-6 rounded-[2rem] font-bold text-xl italic outline-none focus:border-orange-600 transition-all"
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Crop Asset</label>
                    <input 
                      type="text" 
                      value={analysisCrop}
                      onChange={e => setAnalysisCrop(e.target.value)}
                      placeholder="e.g. Wheat"
                      className="w-full bg-stone-50 border border-stone-100 p-6 rounded-[2rem] font-bold text-xl italic outline-none focus:border-orange-600 transition-all"
                    />
                 </div>
                 <button 
                  onClick={runAnalysis}
                  disabled={analyzing}
                  className="w-full py-8 bg-stone-900 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-orange-600 transition-all shadow-2xl flex items-center justify-center gap-6"
                 >
                   {analyzing ? <i className="fa-solid fa-dna fa-spin"></i> : <><i className="fa-solid fa-radar"></i> RUN SCAN</>}
                 </button>
              </div>
           </div>

           <div className="relative">
              {analysisResult ? (
                <div className="bg-stone-900 text-white p-12 md:p-20 rounded-[4rem] shadow-2xl space-y-12 animate-slideUp">
                   <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-600">Scan results</span>
                        <h4 className="text-4xl font-serif italic font-bold text-white uppercase tracking-tighter">{analysisCrop} @ {analysisLocation}</h4>
                      </div>
                      <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center text-orange-600 text-2xl shadow-xl">
                        <i className="fa-solid fa-bolt"></i>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                         <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-3">Suitability</p>
                         <p className="text-xl font-serif italic font-bold">{analysisResult.suitability}</p>
                      </div>
                      <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                         <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-3">Best Variant</p>
                         <p className="text-xl font-serif italic font-bold">{analysisResult.bestVariety}</p>
                      </div>
                   </div>

                   <div className="space-y-8">
                      <div className="space-y-3">
                         <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Soil Protocol</p>
                         <p className="text-xl italic font-serif leading-relaxed opacity-90">{analysisResult.soilTips}</p>
                      </div>
                      <div className="space-y-3">
                         <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Climatic Mitigation</p>
                         <p className="text-xl italic font-serif leading-relaxed opacity-90">{analysisResult.climateRisk}</p>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="h-full min-h-[500px] border-2 border-dashed border-stone-200 rounded-[4rem] flex flex-col items-center justify-center text-center p-12 space-y-6 opacity-30 grayscale">
                   <i className="fa-solid fa-microchip text-7xl text-stone-200"></i>
                   <p className="text-xs font-black uppercase tracking-[0.3em] font-serif italic">Waiting for field parameters...</p>
                </div>
              )}
           </div>
        </div>
      )}

      {tab === 'Diseases' && (
        <div className="space-y-16 animate-reveal">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {diseases.length === 0 ? (
                <div className="col-span-full py-32 text-center opacity-40">
                   <i className="fa-solid fa-shield-virus text-6xl mb-6"></i>
                   <p className="text-xs font-black uppercase tracking-widest">Accessing Pathogen Database...</p>
                </div>
              ) : diseases.map(disease => (
                <button 
                  key={disease.id}
                  onClick={() => setSelectedDisease(disease)}
                  className="bg-white border border-stone-200 p-8 rounded-[3rem] text-left hover:border-rose-500 transition-all group flex flex-col justify-between aspect-square shadow-sm"
                >
                  <div className="space-y-3">
                     <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest">ID: {disease.id}</span>
                     <h4 className="text-3xl font-serif italic font-bold text-stone-900 leading-tight group-hover:text-rose-600 transition-colors">{disease.common_name}</h4>
                  </div>
                  <div className="pt-8 flex justify-between items-center border-t border-stone-50 mt-8">
                     <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Scientific Spec: {disease.scientific_name?.substring(0, 15)}...</span>
                     <i className="fa-solid fa-arrow-right text-stone-200 group-hover:text-rose-600 group-hover:translate-x-1 transition-all"></i>
                  </div>
                </button>
              ))}
           </div>
        </div>
      )}

      {/* Detail Overlay - High Contrast: White on Pure Black */}
      {(selectedPlant || detailLoading) && (
        <div className="fixed inset-0 z-[100] bg-black backdrop-blur-3xl flex items-center justify-center p-6 animate-reveal overflow-y-auto no-scrollbar">
          <button 
            onClick={() => setSelectedPlant(null)}
            className="fixed top-10 right-10 h-16 w-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-orange-600 transition-all z-[110] shadow-2xl"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>

          {detailLoading ? (
            <div className="text-center space-y-10">
               <div className="h-28 w-28 border-[5px] border-orange-600 border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_50px_rgba(194,65,12,0.3)]"></div>
               <p className="text-[14px] font-black uppercase tracking-[1em] text-orange-600 italic">Initializing Molecular Spec...</p>
            </div>
          ) : selectedPlant && (
            <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 py-16 items-center">
              {/* Nucleus Visual */}
              <div className="lg:col-span-5 flex justify-center">
                 <div className="relative h-72 w-72 md:h-[32rem] md:w-[32rem]">
                    <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_25s_linear_infinite]">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-3xl">
                          <i className="fa-solid fa-seedling text-xl"></i>
                       </div>
                    </div>
                    <div className="absolute inset-28 bg-white rounded-full overflow-hidden border-[15px] border-white/5 shadow-[0_0_120px_rgba(255,255,255,0.15)] group">
                       {selectedPlant.default_image ? (
                         <img src={selectedPlant.default_image.original_url} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[6s] cubic-bezier(0.16, 1, 0.3, 1)" alt={selectedPlant.common_name} />
                       ) : (
                         <div className="h-full w-full flex items-center justify-center text-stone-900 text-8xl font-serif font-black italic">{getSymbol(selectedPlant.common_name)}</div>
                       )}
                    </div>
                 </div>
              </div>

              {/* Data Panel - High Contrast: Pure White text on Pure Black background */}
              <div className="lg:col-span-7 space-y-12 text-white text-left">
                 <header className="space-y-6">
                    <div className="flex items-center gap-6">
                       <span className="px-6 py-2 bg-orange-600 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl">Molecular ID: #{selectedPlant.id}</span>
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
                    <p className="text-2xl md:text-3xl text-white/40 font-serif italic font-medium">{selectedPlant.scientific_name?.[0]}</p>
                 </header>

                 <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {[
                      { l: 'Watering Protocol', v: selectedPlant.watering, i: 'fa-droplet' },
                      { l: 'Luminance Needs', v: selectedPlant.sunlight?.[0] || 'Standard', i: 'fa-sun' },
                      { l: 'Maintenance Level', v: selectedPlant.maintenance || 'Standard', i: 'fa-wrench' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/15 transition-all">
                        <i className={`fa-solid ${item.i} text-orange-600 mb-4 block text-lg`}></i>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">{item.l}</p>
                        <p className="text-2xl font-bold italic font-serif capitalize text-white">{item.v}</p>
                      </div>
                    ))}
                 </div>

                 <div className="bg-white/5 p-14 rounded-[4rem] border border-white/10 space-y-10 relative overflow-hidden group">
                    <div className="flex items-center gap-6 relative z-10">
                       <div className="h-10 w-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg">
                          <i className="fa-solid fa-map-location-dot text-white"></i>
                       </div>
                       <h5 className="text-[12px] font-black uppercase tracking-[0.5em] text-white/60">Himalayan Adaptability</h5>
                    </div>
                    {nepaliInfo ? (
                      <div className="space-y-10 relative z-10">
                         <p className="text-2xl md:text-4xl text-white font-serif italic leading-relaxed border-l-4 border-orange-600 pl-10">
                           "{nepaliInfo.guide}"
                         </p>
                         <div className="flex flex-wrap gap-12 pt-8 border-t border-white/10">
                            <div>
                               <p className="text-[11px] font-black text-orange-600 uppercase tracking-widest mb-2">Target Altitude</p>
                               <p className="text-5xl font-serif font-black italic text-white">{nepaliInfo.altitude}</p>
                            </div>
                         </div>
                      </div>
                    ) : (
                      <div className="space-y-6 animate-pulse">
                         <div className="h-6 w-full bg-white/5 rounded-full"></div>
                         <div className="h-6 w-3/4 bg-white/5 rounded-full"></div>
                      </div>
                    )}
                 </div>

                 <div className="flex flex-col sm:flex-row gap-8 pt-6">
                    <button className="flex-1 py-8 bg-white text-stone-900 rounded-[2.5rem] text-[12px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all active:scale-95 shadow-2xl">
                       Synchronize Field Asset
                    </button>
                    <button className="flex-1 py-8 border-2 border-white/20 text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                       Export Registry Spec
                    </button>
                 </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Disease Detail Overlay - High Contrast */}
      {selectedDisease && (
        <div className="fixed inset-0 z-[100] bg-black backdrop-blur-3xl flex items-center justify-center p-6 animate-reveal overflow-y-auto no-scrollbar">
           <button 
            onClick={() => setSelectedDisease(null)}
            className="fixed top-10 right-10 h-16 w-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-rose-600 transition-all z-[110] shadow-2xl"
           >
            <i className="fa-solid fa-xmark text-2xl"></i>
           </button>

           <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 py-16 items-start text-white text-left">
              <div className="space-y-10">
                 <div className="relative aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl group">
                    {diseaseImages(selectedDisease) ? (
                      <img src={diseaseImages(selectedDisease)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]" alt={selectedDisease.common_name} />
                    ) : (
                      <div className="h-full w-full bg-rose-950/20 flex items-center justify-center">
                         <i className="fa-solid fa-skull-crossbones text-9xl text-rose-500/10"></i>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute bottom-12 left-12 space-y-2">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-500">Hazard Trace</span>
                       <h3 className="text-5xl font-serif italic font-bold tracking-tighter">{selectedDisease.common_name}</h3>
                    </div>
                 </div>

                 <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-white/40">Biological Ledger</h5>
                    <div className="space-y-4">
                       <div className="flex justify-between border-b border-white/5 pb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-stone-600">Genetic Spec</span>
                          <span className="font-serif italic text-lg">{selectedDisease.scientific_name}</span>
                       </div>
                       <div className="flex justify-between border-b border-white/5 pb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-stone-600">Family Node</span>
                          <span className="font-serif italic text-lg">{selectedDisease.family || 'Undefined'}</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-12">
                 <header className="space-y-6">
                    <span className="px-6 py-2 bg-rose-600 rounded-full text-[11px] font-black uppercase tracking-widest">Target Pathology</span>
                    <h3 className="text-6xl font-serif italic font-bold tracking-tighter leading-tight">Neutralization <br /><span className="text-rose-600">& Countermeasures.</span></h3>
                 </header>

                 <div className="space-y-10">
                    {selectedDisease.description?.map((desc, i) => (
                       <div key={i} className="space-y-4 border-l-2 border-rose-500 pl-10 group">
                          <h6 className="text-[11px] font-black uppercase tracking-[0.3em] text-rose-500 group-hover:text-white transition-colors">{desc.subtitle}</h6>
                          <p className="text-xl font-serif italic text-white/80 leading-relaxed">{desc.description}</p>
                       </div>
                    ))}
                    {!selectedDisease.description && (
                       <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 italic text-white/40 font-serif">
                          Searching global pathogen registry for specific countermeasures...
                       </div>
                    )}
                 </div>

                 <div className="pt-10">
                    <button className="w-full py-7 bg-rose-600 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-rose-600 transition-all shadow-2xl">
                       REQUEST FIELD INTERVENTION
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// Helper to safely get image from different API structures
const diseaseImages = (d: any) => {
  if (d.images && d.images.length > 0) return d.images[0].original_url;
  return null;
}

export default AgriClimate;
