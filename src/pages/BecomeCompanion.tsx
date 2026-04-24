import { motion } from "motion/react";
import { ShieldCheck, Handshake, CalendarHeart, Banknote, ArrowRight, Clock } from "lucide-react";

export default function BecomeCompanion() {
  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="px-4 mb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold text-baham-ink leading-tight mb-8">
              Turn your empathy <br />
              <span className="text-baham-blue italic">into income.</span>
            </h1>
            <p className="text-xl text-baham-ink/70 mb-10 leading-relaxed max-w-lg italic">
              Share your time, listen to stories, and help neighbors navigate daily life. A flexible way to make a difference and earn part-time income.
            </p>
            <button className="btn-primary px-12">Apply to Join</button>
          </div>
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
                alt="Happy Finnish Companion" 
                className="w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-baham-blue/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl border border-baham-sand max-w-xs">
              <p className="text-baham-blue font-bold text-xl mb-2">Earn 18-25€/hr</p>
              <p className="text-xs text-baham-ink/60 italic">Based on local demand and Finnish verification level.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="bg-baham-blue/10 py-24 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-16">Why become a Bahäm companion?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Ultimate Flexibility",
                desc: "Choose when you work, who you support, and what activities you enjoy.",
                icon: <Clock />
              },
              {
                title: "Reliable Community",
                desc: "We handle the insurance, payments, and background checks so you don't have to.",
                icon: <ShieldCheck />
              },
              {
                title: "Meaningful Impact",
                desc: "Every hour you spend helps someone feel more connected and less alone.",
                icon: <Handshake />
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[32px] text-left border border-baham-sand/40 shadow-sm">
                <div className="w-12 h-12 bg-baham-ink text-white rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-4 italic">{feature.title}</h3>
                <p className="text-baham-slate text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Your path to joining.</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Apply Online", desc: "Share your background and why you enjoy providing companionship." },
            { step: "02", title: "Safety Extract", desc: "Submit your Finnish Criminal Record Extract (Rikostaustaote)." },
            { step: "03", title: "Local Interview", desc: "Meet our Helsinki team for a personality and ethics review." },
            { step: "04", title: "Start Helping", desc: "Set your own schedule and find meaningful local bookings." }
          ].map((item, idx) => (
            <div key={idx} className="relative p-8 card-baham border-none bg-baham-blue/5">
              <span className="text-4xl font-bold text-baham-blue opacity-20 block mb-4">{item.step}</span>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-xs text-baham-slate">{item.desc}</p>
              {idx < 3 && <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 text-baham-blue opacity-30"><ArrowRight /></div>}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-12 px-4 max-w-4xl mx-auto text-center border-t border-baham-sand/30 mt-12">
        <h3 className="text-2xl font-bold mb-4 italic">Still wondering?</h3>
        <p className="mb-8 text-baham-slate italic underline decoration-baham-sand underline-offset-4">Read our companion guidelines or speak with a local community lead.</p>
        <button className="btn-secondary">View FAQ for Companions</button>
      </section>
    </div>
  );
}
