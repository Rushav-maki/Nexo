
import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await GeminiService.chat(input);
      setMessages(prev => [...prev, { role: 'model', content: res }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto bg-white border border-black/5 rounded-[3rem] shadow-2xl overflow-hidden animate-fadeIn">
      <div className="bg-[#f5f2eb] p-8 border-b border-black/5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="h-12 w-12 rounded-full bg-[#2a1b18] border border-white/10 flex items-center justify-center shadow-md">
            <i className="fa-solid fa-robot text-[#c4b5fd] text-xl"></i>
          </div>
          <div>
            <h3 className="font-bold text-[#2a1b18] font-serif tracking-tight text-xl uppercase">Nexa<span className="text-[#c4b5fd]">.Chat</span></h3>
            <p className="text-[10px] text-[#4a4a4a] font-black uppercase tracking-[0.2em] italic">Cognitive Hub Active</p>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-50"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-[#f8f5f0]/50">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 opacity-40">
            <div className="h-20 w-20 rounded-full border-2 border-dashed border-[#c4b5fd] flex items-center justify-center">
                <i className="fa-solid fa-feather-pointed text-4xl text-[#2a1b18]"></i>
            </div>
            <p className="font-bold text-sm uppercase tracking-[0.4em] font-serif italic text-[#2a1b18]">Awaiting Matrix Command</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-6 py-5 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-[#2a1b18] text-[#f8f5f0] border border-black/5 font-medium italic' 
                : 'bg-[#f5f2eb] text-[#2a1b18] border border-black/5 font-serif leading-relaxed'
            }`}>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#f5f2eb] border border-black/5 rounded-2xl px-5 py-4 shadow-sm flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#c4b5fd] rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-[#c4b5fd] rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-[#c4b5fd] rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-8 bg-white border-t border-black/5">
        <div className="flex gap-4 max-w-2xl mx-auto">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query the system..."
            className="flex-1 rounded-xl bg-[#f5f2eb] border border-black/10 text-[#2a1b18] px-6 py-4 focus:ring-1 focus:ring-[#c4b5fd] transition-all font-medium italic placeholder:text-black/30"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-[#2a1b18] text-white rounded-xl px-7 py-4 font-black hover:bg-[#4a4a4a] disabled:opacity-30 transition-all shadow-lg"
          >
            <i className="fa-solid fa-location-arrow"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;