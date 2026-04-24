import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, CreditCard, ShieldCheck, ChevronRight, CheckCircle2, Heart, Star } from "lucide-react";
import { motion } from "motion/react";

export default function Booking() {
  const [step, setStep] = useState(1);

  return (
    <div className="pt-32 pb-24 px-4 bg-baham-sand/20 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                step >= s ? "bg-baham-ink text-white scale-110 shadow-lg" : "bg-white text-baham-sand border border-baham-sand"
              }`}>
                {step > s ? <CheckCircle2 size={20} /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 rounded-full ${step > s ? "bg-baham-ink" : "bg-baham-sand"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <div className={`card-baham p-10 bg-white shadow-xl ${step === 1 ? "block" : "hidden"}`}>
              <h2 className="text-3xl font-bold mb-8">Choose a Time</h2>
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-baham-ink/40 mb-4">Select Date</label>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((d) => (
                      <button key={d} className={`p-4 rounded-2xl border text-center transition-all ${
                        d === 3 ? "bg-baham-ink text-white border-none shadow-md" : "border-baham-sand hover:bg-baham-sand/10"
                      }`}>
                        <p className="text-[10px] uppercase opacity-60">Oct</p>
                        <p className="text-xl font-bold">{12 + d}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-baham-ink/40 mb-4">Select Duration</label>
                  <div className="grid grid-cols-3 gap-4">
                    {["1 Hour", "2 Hours", "3 Hours"].map((t, i) => (
                      <button key={i} className={`py-4 rounded-full border font-bold text-sm transition-all ${
                        i === 1 ? "bg-baham-ink text-white border-none" : "border-baham-sand hover:bg-baham-sand/10"
                      }`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => setStep(2)} className="w-full btn-primary py-4 mt-8 flex items-center justify-center gap-2 group">
                  Continue to Details <ChevronRight size={18} className="group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>

            <div className={`card-baham p-10 bg-white shadow-xl ${step === 2 ? "block" : "hidden"}`}>
              <h2 className="text-3xl font-bold mb-8">What are the plans?</h2>
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-baham-ink/40 mb-4">Notes for the companion</label>
                  <textarea 
                    placeholder="E.g. Let's meet at the Ateneum Art Museum entrance. I prefer a slow pace..."
                    className="w-full p-6 bg-baham-sand/10 rounded-3xl border-none text-sm italic h-40 focus:ring-2 focus:ring-baham-blue transition-all"
                  />
                </div>
                <div className="flex gap-4">
                   <button onClick={() => setStep(1)} className="btn-secondary flex-1">Back</button>
                   <button onClick={() => setStep(3)} className="btn-primary flex-1">Final Step</button>
                </div>
              </div>
            </div>

            <div className={`card-baham p-10 bg-white shadow-xl ${step === 3 ? "block" : "hidden"}`}>
              <h2 className="text-3xl font-bold mb-8">Confirm & Pay</h2>
              <div className="space-y-8">
                <div className="p-6 bg-baham-cream rounded-3xl border border-baham-sand">
                   <div className="flex items-center justify-between mb-4">
                     <span className="text-sm font-bold">Session (2 Hours)</span>
                     <span className="font-bold">44,00€</span>
                   </div>
                   <div className="flex items-center justify-between mb-4">
                     <span className="text-sm opacity-60">Service Fee</span>
                     <span className="opacity-60">4,00€</span>
                   </div>
                   <hr className="border-baham-sand/30 my-4" />
                   <div className="flex items-center justify-between">
                     <span className="text-lg font-bold">Total</span>
                     <span className="text-2xl font-bold">48,00€</span>
                   </div>
                </div>
                <div className="space-y-4">
                   <button className="w-full btn-primary py-4 flex items-center justify-center gap-4">
                     <CreditCard size={20} /> Pay Securely
                   </button>
                   <p className="text-[10px] text-center text-baham-ink/40 uppercase tracking-widest uppercase italic">
                     By paying, you agree to our community standards & safety policy.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4">
            <div className="card-baham bg-baham-ink text-white border-none p-8 sticky top-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                  <img src="https://i.pravatar.cc/100?img=32" alt="Oliver" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Oliver Bennett</h3>
                  <div className="flex items-center gap-1 text-baham-cream text-xs font-bold">
                    <Star size={12} fill="currentColor" /> 4.9 (124 reviews)
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Calendar className="text-baham-blue mt-1" size={18} />
                  <div>
                    <p className="text-[10px] uppercase opacity-40">Scheduled Date</p>
                    <p className="text-sm font-bold">Oct 15, 2024</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-baham-blue mt-1" size={18} />
                  <div>
                    <p className="text-[10px] uppercase opacity-40">Meeting Location</p>
                    <p className="text-sm font-bold">Helsinki Central Railway Station, East Hall</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="text-baham-blue mt-1" size={18} />
                  <div>
                    <p className="text-[10px] uppercase text-baham-blue font-bold">Guaranteed Safety</p>
                    <p className="text-[10px] opacity-60 leading-tight">Oliver is fully verified and background checked.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-center gap-2 opacity-60 transition-opacity hover:opacity-100 italic">
                <Heart size={16} className="text-red-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Kindness First</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
