
import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { TravelBooking, Vehicle, Hotel, HotelReview } from '../types';

interface TravelOTAProps {
  onBook: (booking: TravelBooking) => void;
}

const TravelOTA: React.FC<TravelOTAProps> = ({ onBook }) => {
  const [dest, setDest] = useState('');
  const [days, setDays] = useState('3');
  const [budget, setBudget] = useState('Standard');
  const [itinerary, setItinerary] = useState<any>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  // Fix: Changed ']' to '>' in useState type parameter to avoid syntax errors causing the compiler to misinterpret it as an arithmetic expression
  const [tab, setTab] = useState<'Plan' | 'Hotels' | 'Cars'>('Plan');
  const [loading, setLoading] = useState(false);
  
  const [localReviews, setLocalReviews] = useState<Record<string, HotelReview[]>>({});
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', userName: 'Guest' });

  useEffect(() => {
    const saved = localStorage.getItem('nexo_hotel_reviews');
    if (saved) {
      setLocalReviews(JSON.parse(saved));
    }
  }, []);

  const saveReviews = (updated: Record<string, HotelReview[]>) => {
    setLocalReviews(updated);
    localStorage.setItem('nexo_hotel_reviews', JSON.stringify(updated));
  };

  const handlePlan = async () => {
    if (!dest) return;
    setLoading(true);
    try {
      const res = await GeminiService.generateItinerary(dest, budget, days);
      setItinerary(res);
      onBook({ destination: dest, duration: days, altitude: res.isHighAltitude ? 'High' : 'Mid' });
    } catch (e) { console.error(e); } 
    finally { setLoading(false); }
  };

  const handleHotelSearch = async () => {
    if (!dest) return;
    setLoading(true);
    try {
      const res = await GeminiService.searchHotels(dest);
      const hotelsWithIds = res.map((h: any, i: number) => ({
        ...h,
        id: `hotel-${dest.toLowerCase()}-${i}`
      }));
      setHotels(hotelsWithIds);
    } catch (e) { console.error(e); } 
    finally { setLoading(false); }
  };

  const submitReview = (hotelId: string) => {
    if (!newReview.comment.trim()) return;
    const review: HotelReview = {
      id: Math.random().toString(36).substr(2, 9),
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      timestamp: Date.now()
    };
    const updated = {
      ...localReviews,
      [hotelId]: [...(localReviews[hotelId] || []), review]
    };
    saveReviews(updated);
    setNewReview({ rating: 5, comment: '', userName: 'Guest' });
  };

  const fleet: Vehicle[] = [
    { id: '1', name: 'Scorpio 4x4', type: 'SUV', price: 9500, specs: '7 Seater, Diesel', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400' },
    { id: '2', name: 'Himalayan Bike', type: 'Bike', price: 3500, specs: 'Off-road Adventure', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=400' },
    { id: '3', name: 'Toyota Hilux', type: 'SUV', price: 12000, specs: 'Heavy Duty Truck', image: 'https://images.unsplash.com/photo-1594411133519-7988364f3316?q=80&w=400' },
    { id: '7', name: 'Electric Car', type: 'EV', price: 15000, specs: 'Long Range EV', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=400' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      <div className="flex bg-stone-100 p-1.5 rounded-[1.5rem] border border-black/5 w-fit shadow-inner overflow-x-auto no-scrollbar max-w-full">
        {(['Plan', 'Hotels', 'Cars'] as const).map(t => (
          <button 
            key={t}
            onClick={() => { setTab(t); setSelectedHotelId(null); }} 
            className={`px-6 md:px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${tab === t ? 'bg-[#1c1917] text-[#fafaf9] shadow-md' : 'text-stone-500 hover:text-stone-900'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <h2 className="text-3xl font-bold text-stone-900 font-serif tracking-tighter uppercase italic">Nexo<span className="text-orange-600">.Travel</span></h2>
         {dest && tab === 'Hotels' && (
           <button onClick={handleHotelSearch} className="px-6 py-2 bg-[#1c1917] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-md">
             Refresh Search
           </button>
         )}
      </div>

      {tab === 'Plan' ? (
        <>
          <div className="bg-white border border-black/5 p-8 md:p-12 rounded-[3rem] shadow-xl">
            <h3 className="text-xl font-bold text-stone-900 mb-10 flex items-center gap-4 uppercase tracking-tighter font-serif italic">
              <i className="fa-solid fa-compass text-orange-600"></i> Plan your Trip
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Where to?</label>
                <input type="text" value={dest} onChange={e => setDest(e.target.value)} placeholder="e.g. Pokhara" className="w-full bg-stone-50 border border-stone-100 text-stone-900 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-orange-600 font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">How many days?</label>
                <input type="number" value={days} onChange={e => setDays(e.target.value)} className="w-full bg-stone-50 border border-stone-100 text-stone-900 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-orange-600 font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Budget</label>
                <select value={budget} onChange={e => setBudget(e.target.value)} className="w-full bg-stone-50 border border-stone-100 text-stone-900 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-orange-600 font-bold">
                  <option>Affordable</option>
                  <option>Standard</option>
                  <option>Premium</option>
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={handlePlan} disabled={loading} className="w-full h-[64px] bg-[#1c1917] hover:bg-orange-600 text-[#fafaf9] rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3">
                  {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'CREATE PLAN'}
                </button>
              </div>
            </div>
          </div>

          {itinerary && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slideUp">
               {itinerary.plan?.map((day: any) => (
                 <div key={day.day} className="bg-stone-50 border border-black/5 p-10 rounded-[2.5rem] hover:border-orange-600 transition-all shadow-sm">
                   <div className="flex justify-between items-start mb-6">
                     <span className="text-[11px] font-black text-stone-900 uppercase tracking-[0.2em] font-serif">Day {day.day}</span>
                     <div className="h-2 w-2 rounded-full bg-orange-600"></div>
                   </div>
                   <p className="text-lg font-bold text-stone-900 leading-snug mb-6 italic">{day.desc}</p>
                   <div className="mt-8 flex justify-between items-center text-[10px] font-black text-stone-400 uppercase tracking-[0.1em] border-t border-black/10 pt-6">
                      <span>{day.budgetLine}</span>
                   </div>
                 </div>
               ))}
            </div>
          )}
        </>
      ) : tab === 'Hotels' ? (
        <div className="space-y-12">
          {!dest ? (
            <div className="bg-stone-50 p-16 rounded-[3rem] border border-dashed border-orange-200 text-center">
               <i className="fa-solid fa-hotel text-5xl text-stone-200 mb-6"></i>
               <p className="text-stone-400 font-bold uppercase tracking-widest text-xs font-serif italic">Enter a destination to see live hotel options.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fadeIn">
              {loading && !hotels.length ? (
                <div className="col-span-full py-20 text-center">
                   <div className="h-12 w-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                   <p className="text-xs font-black uppercase tracking-[0.2em] italic">Accessing Makcorps Global Hub...</p>
                </div>
              ) : hotels.map((hotel) => (
                <div key={hotel.id} className="bg-white border border-black/5 rounded-[3.5rem] overflow-hidden shadow-xl flex flex-col transition-all hover:shadow-2xl">
                  <div className="h-64 relative overflow-hidden group">
                    <img src={hotel.image || `https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={hotel.name} />
                    <div className="absolute top-6 left-6 bg-[#1c1917]/90 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">★ {hotel.rating}</div>
                  </div>
                  <div className="p-10 flex-1 space-y-6">
                    <div>
                      <h4 className="text-3xl font-bold font-serif italic text-stone-900">{hotel.name}</h4>
                      <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                        <i className="fa-solid fa-location-dot text-orange-600"></i> {hotel.location}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((a, j) => (
                        <span key={j} className="text-[9px] font-black uppercase tracking-widest bg-stone-50 px-3 py-1.5 rounded-full text-stone-900">{a}</span>
                      ))}
                    </div>

                    <p className="text-sm font-medium italic text-stone-500 leading-relaxed border-l-2 border-orange-600/20 pl-4">{hotel.description}</p>

                    <div className="pt-6 border-t border-black/5">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-2xl font-black text-stone-900">Rs. {hotel.pricePerNight} <span className="text-xs font-medium text-stone-400 uppercase opacity-60">/ night</span></span>
                        <button className="bg-[#1c1917] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-md">Book Session</button>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-900 font-serif">Verified Reviews ({localReviews[hotel.id]?.length || 0})</h5>
                          <button 
                            onClick={() => setSelectedHotelId(selectedHotelId === hotel.id ? null : hotel.id)}
                            className="text-[10px] font-bold text-orange-600 uppercase hover:underline"
                          >
                            {selectedHotelId === hotel.id ? 'Hide' : 'Show All'}
                          </button>
                        </div>

                        {selectedHotelId === hotel.id && (
                          <div className="space-y-6 animate-slideUp">
                            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
                              {(localReviews[hotel.id] || []).length === 0 ? (
                                <p className="text-xs italic text-stone-400 opacity-60">No community feedback yet.</p>
                              ) : (
                                localReviews[hotel.id].map(rev => (
                                  <div key={rev.id} className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-[10px] font-black text-stone-900 uppercase">{rev.userName}</span>
                                      <div className="text-[9px] text-orange-600">
                                        {Array.from({length: 5}).map((_, i) => (
                                          <i key={i} className={`fa-solid fa-star ${i < rev.rating ? '' : 'opacity-20'}`}></i>
                                        ))}
                                      </div>
                                    </div>
                                    <p className="text-xs text-stone-500 leading-relaxed italic">{rev.comment}</p>
                                  </div>
                                ))
                              )}
                            </div>

                            <div className="bg-stone-50 p-6 rounded-[2rem] space-y-4 border border-stone-100 shadow-inner">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-stone-900 uppercase">Share Experience</span>
                                <div className="flex gap-1">
                                  {[1,2,3,4,5].map(s => (
                                    <button 
                                      key={s} 
                                      onClick={() => setNewReview({...newReview, rating: s})}
                                      className={`h-6 w-6 rounded-lg text-xs flex items-center justify-center transition-all ${newReview.rating >= s ? 'bg-[#1c1917] text-orange-600' : 'bg-white text-stone-200'}`}
                                    >
                                      {s}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <textarea 
                                value={newReview.comment}
                                onChange={e => setNewReview({...newReview, comment: e.target.value})}
                                placeholder="Details of your stay..."
                                className="w-full bg-white border border-stone-100 rounded-xl p-4 text-xs font-medium focus:ring-1 focus:ring-orange-600 resize-none"
                                rows={2}
                              />
                              <button 
                                onClick={() => submitReview(hotel.id)}
                                className="w-full bg-orange-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-stone-900 transition-all shadow-sm"
                              >
                                Post Feedback
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fadeIn">
          {fleet.map(v => (
            <div key={v.id} className="group bg-white border border-black/5 rounded-[3.5rem] overflow-hidden hover:border-orange-600 transition-all shadow-lg hover:shadow-2xl">
              <div className="h-60 overflow-hidden relative">
                <img src={v.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={v.name} />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black text-stone-900 uppercase tracking-widest shadow-sm">{v.type}</div>
              </div>
              <div className="p-10">
                <h4 className="text-2xl font-bold text-stone-900 font-serif italic">{v.name}</h4>
                <p className="text-xs text-stone-400 font-bold uppercase mt-2 tracking-tighter opacity-70">{v.specs}</p>
                <div className="mt-10 flex items-center justify-between border-t border-black/5 pt-8">
                  <div>
                    <span className="text-2xl font-black text-stone-900 tracking-tighter">Rs. {v.price}</span>
                    <span className="text-[10px] text-stone-400 font-bold ml-1 uppercase">/ day</span>
                  </div>
                  <button className="bg-[#1c1917] text-white px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-md">Rent</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelOTA;
