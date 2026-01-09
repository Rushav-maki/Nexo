
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
  const [tab, setTab] = useState<'Expedition' | 'Stay' | 'Fleet'>('Expedition');
  const [loading, setLoading] = useState(false);
  
  // Review specific state
  const [localReviews, setLocalReviews] = useState<Record<string, HotelReview[]>>({});
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', userName: 'Guest User' });

  useEffect(() => {
    const saved = localStorage.getItem('nexa_hotel_reviews');
    if (saved) {
      setLocalReviews(JSON.parse(saved));
    }
  }, []);

  const saveReviews = (updated: Record<string, HotelReview[]>) => {
    setLocalReviews(updated);
    localStorage.setItem('nexa_hotel_reviews', JSON.stringify(updated));
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
      // Map generated hotels to have stable IDs if they don't have one
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
    setNewReview({ rating: 5, comment: '', userName: 'Guest User' });
  };

  const fleet: Vehicle[] = [
    { id: '1', name: 'Nexa Scorpio 4x4', type: 'SUV', price: 9500, specs: '7 Seater, Diesel, Adventure Tuned', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400' },
    { id: '2', name: 'Himalayan 411 V3', type: 'Bike', price: 3500, specs: 'Off-road, Fuel Injection', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=400' },
    { id: '3', name: 'Toyota Hilux GR', type: 'SUV', price: 12000, specs: 'Turbo Diesel, Dual Cab, Heavy Duty', image: 'https://images.unsplash.com/photo-1594411133519-7988364f3316?q=80&w=400' },
    { id: '4', name: 'Land Rover Defender', type: 'SUV', price: 25000, specs: 'Luxury Adventure, V8, Air Suspension', image: 'https://images.unsplash.com/photo-1621213348658-2023d240d165?q=80&w=400' },
    { id: '7', name: 'Tesla Model Y', type: 'EV', price: 15000, specs: 'Long Range, Autopilot, Premium', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=400' },
    { id: '13', name: 'Hyundai IONIQ 5', type: 'EV', price: 18000, specs: 'Futuristic EV, AWD', image: 'https://images.unsplash.com/photo-1632243224795-2070f699863a?q=80&w=400' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      <div className="flex bg-[#f5f2eb] p-1.5 rounded-[1.5rem] border border-black/5 w-fit shadow-inner overflow-x-auto no-scrollbar max-w-full">
        {(['Expedition', 'Stay', 'Fleet'] as const).map(t => (
          <button 
            key={t}
            onClick={() => { setTab(t); setSelectedHotelId(null); }} 
            className={`px-6 md:px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${tab === t ? 'bg-[#2a1b18] text-[#f8f5f0] shadow-md' : 'text-[#4a4a4a] hover:text-[#2a1b18]'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <h2 className="text-3xl font-bold text-[#2a1b18] font-serif tracking-tighter uppercase italic">Nexa<span className="text-[#c4b5fd]">.Voyage</span></h2>
         {dest && tab === 'Stay' && (
           <button onClick={handleHotelSearch} className="px-6 py-2 bg-[#2a1b18] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#4a4a4a] transition-all shadow-md">
             Scan Accommodations
           </button>
         )}
      </div>

      {tab === 'Expedition' ? (
        <>
          <div className="bg-white border border-black/5 p-8 md:p-12 rounded-[3rem] shadow-xl">
            <h3 className="text-xl font-bold text-[#2a1b18] mb-10 flex items-center gap-4 uppercase tracking-tighter font-serif italic">
              <i className="fa-solid fa-compass text-[#c4b5fd]"></i> Matrix Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest ml-1">Destination</label>
                <input type="text" value={dest} onChange={e => setDest(e.target.value)} placeholder="e.g. Namche Bazaar" className="w-full bg-[#f5f2eb] border border-black/5 text-[#2a1b18] rounded-2xl px-6 py-4 focus:ring-1 focus:ring-[#c4b5fd] font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest ml-1">Days</label>
                <input type="number" value={days} onChange={e => setDays(e.target.value)} className="w-full bg-[#f5f2eb] border border-black/5 text-[#2a1b18] rounded-2xl px-6 py-4 focus:ring-1 focus:ring-[#c4b5fd] font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest ml-1">Budget</label>
                <select value={budget} onChange={e => setBudget(e.target.value)} className="w-full bg-[#f5f2eb] border border-black/5 text-[#2a1b18] rounded-2xl px-6 py-4 focus:ring-1 focus:ring-[#c4b5fd] font-bold">
                  <option>Backpacker</option>
                  <option>Comfort</option>
                  <option>Luxury Matrix</option>
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={handlePlan} disabled={loading} className="w-full h-[64px] bg-[#2a1b18] hover:bg-[#4a4a4a] text-[#f8f5f0] rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3">
                  {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'INITIATE PLAN'}
                </button>
              </div>
            </div>
          </div>

          {itinerary && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slideUp">
               {itinerary.plan?.map((day: any) => (
                 <div key={day.day} className="bg-[#f5f2eb] border border-black/5 p-10 rounded-[2.5rem] hover:border-[#c4b5fd] transition-all shadow-sm">
                   <div className="flex justify-between items-start mb-6">
                     <span className="text-[11px] font-black text-[#2a1b18] uppercase tracking-[0.2em] font-serif">Day {day.day}</span>
                     <div className="h-2 w-2 rounded-full bg-[#c4b5fd]"></div>
                   </div>
                   <p className="text-lg font-bold text-[#2a1b18] leading-snug mb-6 italic">{day.desc}</p>
                   <div className="mt-8 flex justify-between items-center text-[10px] font-black text-[#4a4a4a] uppercase tracking-[0.1em] border-t border-black/10 pt-6">
                      <span>{day.budgetLine}</span>
                      <i className="fa-solid fa-check-double text-[#c4b5fd]"></i>
                   </div>
                 </div>
               ))}
            </div>
          )}
        </>
      ) : tab === 'Stay' ? (
        <div className="space-y-12">
          {!dest ? (
            <div className="bg-[#f5f2eb] p-16 rounded-[3rem] border border-dashed border-[#c4b5fd] text-center">
               <i className="fa-solid fa-hotel text-5xl text-[#d6d3d1] mb-6"></i>
               <p className="text-[#4a4a4a] font-bold uppercase tracking-widest text-xs font-serif italic">Enter a destination to view luxury stay options.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fadeIn">
              {loading && !hotels.length ? (
                <div className="col-span-full py-20 text-center">
                   <div className="h-12 w-12 border-4 border-[#c4b5fd] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                   <p className="text-xs font-black uppercase tracking-[0.2em] italic">Accessing Local Hospitality Matrix...</p>
                </div>
              ) : hotels.map((hotel) => (
                <div key={hotel.id} className="bg-white border border-black/5 rounded-[3.5rem] overflow-hidden shadow-xl flex flex-col transition-all hover:shadow-2xl">
                  <div className="h-64 relative overflow-hidden group">
                    <img src={`https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={hotel.name} />
                    <div className="absolute top-6 left-6 bg-[#2a1b18] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">★ {hotel.rating}</div>
                  </div>
                  <div className="p-10 flex-1 space-y-6">
                    <div>
                      <h4 className="text-3xl font-bold font-serif italic text-[#2a1b18]">{hotel.name}</h4>
                      <p className="text-[11px] font-bold text-[#4a4a4a] uppercase tracking-widest mt-2 flex items-center gap-2">
                        <i className="fa-solid fa-location-dot text-[#c4b5fd]"></i> {hotel.location}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((a, j) => (
                        <span key={j} className="text-[9px] font-black uppercase tracking-widest bg-[#f5f2eb] px-3 py-1.5 rounded-full text-[#2a1b18]">{a}</span>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-black/5">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-2xl font-black text-[#2a1b18]">Rs. {hotel.pricePerNight} <span className="text-xs font-medium text-[#4a4a4a] uppercase opacity-60">/ night</span></span>
                        <button className="bg-[#2a1b18] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#4a4a4a] transition-all shadow-md">Book Now</button>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#2a1b18] font-serif">Reviews ({localReviews[hotel.id]?.length || 0})</h5>
                          <button 
                            onClick={() => setSelectedHotelId(selectedHotelId === hotel.id ? null : hotel.id)}
                            className="text-[10px] font-bold text-[#c4b5fd] uppercase hover:underline"
                          >
                            {selectedHotelId === hotel.id ? 'Hide Reviews' : 'Matrix Reviews'}
                          </button>
                        </div>

                        {selectedHotelId === hotel.id && (
                          <div className="space-y-6 animate-slideUp">
                            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
                              {(localReviews[hotel.id] || []).length === 0 ? (
                                <p className="text-xs italic text-[#4a4a4a] opacity-60">No reviews verified for this node yet.</p>
                              ) : (
                                localReviews[hotel.id].map(rev => (
                                  <div key={rev.id} className="bg-[#f5f2eb]/50 p-4 rounded-2xl border border-black/5">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-[10px] font-black text-[#2a1b18] uppercase">{rev.userName}</span>
                                      <div className="text-[9px] text-[#c4b5fd]">
                                        {Array.from({length: 5}).map((_, i) => (
                                          <i key={i} className={`fa-solid fa-star ${i < rev.rating ? '' : 'opacity-20'}`}></i>
                                        ))}
                                      </div>
                                    </div>
                                    <p className="text-xs text-[#4a4a4a] leading-relaxed italic">{rev.comment}</p>
                                  </div>
                                ))
                              )}
                            </div>

                            <div className="bg-[#f5f2eb] p-6 rounded-[2rem] space-y-4 border border-black/5 shadow-inner">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-[#2a1b18] uppercase">Submit Feedback</span>
                                <div className="flex gap-1">
                                  {[1,2,3,4,5].map(s => (
                                    <button 
                                      key={s} 
                                      onClick={() => setNewReview({...newReview, rating: s})}
                                      className={`h-6 w-6 rounded-lg text-xs flex items-center justify-center transition-all ${newReview.rating >= s ? 'bg-[#2a1b18] text-[#c4b5fd]' : 'bg-white text-slate-300'}`}
                                    >
                                      {s}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <textarea 
                                value={newReview.comment}
                                onChange={e => setNewReview({...newReview, comment: e.target.value})}
                                placeholder="Transmit your experience..."
                                className="w-full bg-white border border-black/5 rounded-xl p-4 text-xs font-medium focus:ring-1 focus:ring-[#c4b5fd] resize-none"
                                rows={2}
                              />
                              <button 
                                onClick={() => submitReview(hotel.id)}
                                className="w-full bg-[#c4b5fd] text-[#2a1b18] py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#2a1b18] hover:text-white transition-all shadow-sm"
                              >
                                Commit Review
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
            <div key={v.id} className="group bg-white border border-black/5 rounded-[3.5rem] overflow-hidden hover:border-[#c4b5fd] transition-all shadow-lg hover:shadow-2xl">
              <div className="h-60 overflow-hidden relative">
                <img src={v.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={v.name} />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black text-[#2a1b18] uppercase tracking-widest shadow-sm">{v.type}</div>
              </div>
              <div className="p-10">
                <h4 className="text-2xl font-bold text-[#2a1b18] font-serif italic">{v.name}</h4>
                <p className="text-xs text-[#4a4a4a] font-bold uppercase mt-2 tracking-tighter opacity-70">{v.specs}</p>
                <div className="mt-10 flex items-center justify-between border-t border-black/5 pt-8">
                  <div>
                    <span className="text-2xl font-black text-[#2a1b18] tracking-tighter">Rs. {v.price}</span>
                    <span className="text-[10px] text-[#4a4a4a] font-bold ml-1 uppercase">/ day</span>
                  </div>
                  <button className="bg-[#2a1b18] text-white px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#4a4a4a] transition-all shadow-md">Reserve</button>
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
