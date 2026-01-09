
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="space-y-16 animate-fadeIn pb-20">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="flex-1 space-y-10">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-[#2a1b18] font-serif italic tracking-tighter leading-[1.1]">
              Initiate <br />
              Communication.
            </h2>
            <p className="text-lg text-[#4a4a4a] font-medium italic opacity-70">
              Our support team is standing by to help with any questions or partnership inquiries.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { l: 'Support Line', v: '+977-1-4XXXXXX', i: 'fa-phone' },
              { l: 'Email Us', v: 'hello@nexo.global', i: 'fa-envelope' },
              { l: 'Headquarters', v: 'Lalitpur, Nepal', i: 'fa-location-dot' },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className="h-12 w-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-[#c4b5fd] shadow-sm group-hover:bg-[#2a1b18] group-hover:text-white transition-all">
                  <i className={`fa-solid ${c.i}`}></i>
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#4a4a4a]/50 uppercase tracking-widest">{c.l}</p>
                  <p className="text-sm font-bold text-[#2a1b18]">{c.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white p-12 rounded-[4rem] border border-black/5 shadow-2xl">
           <form className="space-y-8" onSubmit={e => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest ml-1">Subject</label>
                <select className="w-full bg-[#f5f2eb] border-none text-[#2a1b18] rounded-2xl px-6 py-4 focus:ring-1 focus:ring-[#c4b5fd] font-bold">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-[#f5f2eb] border-none text-[#2a1b18] rounded-2xl px-6 py-4 focus:ring-1 focus:ring-[#c4b5fd] font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest ml-1">Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-[#f5f2eb] border-none text-[#2a1b18] rounded-2xl px-6 py-4 focus:ring-1 focus:ring-[#c4b5fd] font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest ml-1">Message</label>
                <textarea rows={4} placeholder="How can we help you?" className="w-full bg-[#f5f2eb] border-none text-[#2a1b18] rounded-[2rem] p-6 focus:ring-1 focus:ring-[#c4b5fd] font-bold resize-none"></textarea>
              </div>
              <button className="w-full nexo-btn nexo-btn-primary justify-center py-5">
                SEND MESSAGE
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
