import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Handshake, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Circle, 
  FileSearch, 
  ExternalLink,
  Info
} from "lucide-react";

export default function BecomeCompanion() {
  const steps = [
    { title: "Apply Online", status: "complete" },
    { title: "ID Verification", status: "current" },
    { title: "Safety Extract", status: "upcoming" },
    { title: "Interview", status: "upcoming" },
  ];

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
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary px-12">Apply to Join</button>
              <a href="#verification-guide" className="btn-secondary px-8 flex items-center justify-center gap-2">
                View Requirements <ArrowRight size={18} />
              </a>
            </div>
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

      {/* Verification Progress Indicator Example */}
      <section className="bg-baham-ink text-white py-12 px-4 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <ShieldCheck className="text-baham-blue" size={32} />
            <h2 className="text-2xl font-bold italic">Verification Progress Tracker</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border ${
                step.status === 'complete' ? 'bg-baham-blue/10 border-baham-blue' : 
                step.status === 'current' ? 'bg-white/10 border-white/40 shadow-lg' : 
                'bg-transparent border-white/10'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest opacity-60">Step {idx + 1}</span>
                  {step.status === 'complete' ? (
                    <CheckCircle2 className="text-baham-blue" size={20} />
                  ) : step.status === 'current' ? (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Circle className="text-white" size={20} />
                    </motion.div>
                  ) : (
                    <Circle className="text-white/20" size={20} />
                  )}
                </div>
                <h3 className={`font-bold ${step.status === 'upcoming' ? 'opacity-40' : 'opacity-100'}`}>
                  {step.title}
                </h3>
                {step.status === 'current' && (
                  <p className="text-xs mt-2 text-baham-blue italic">Next required action: Submit ID</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-12 px-4 overflow-hidden relative mb-24">
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

      {/* Criminal Record Detail Section */}
      <section id="verification-guide" className="bg-baham-sand/20 py-24 px-4 mb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6 bg-baham-blue/10 w-fit px-4 py-2 rounded-full border border-baham-blue/20">
                <FileSearch className="text-baham-blue" size={20} />
                <span className="text-xs font-bold text-baham-blue uppercase tracking-widest">Required Step</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 italic">Finnish Criminal Record Extract (Rikostaustaote)</h2>
              <p className="text-baham-ink/70 mb-8 leading-relaxed">
                To ensure the safety of our elderly community, all companions must provide a criminal record extract intended for working with elderly people and those in need.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "Request Online",
                    desc: "Apply via the Legal Register Centre (Oikeusregisterikeskus) e-service. Authenticate using your Finnish bank credentials or Mobile ID.",
                    action: "Go to e-service",
                    url: "https://www.oikeusrekisterikeskus.fi/en/index/services/criminalrecordextract.html"
                  },
                  {
                    title: "Specify Purpose",
                    desc: "Select the extract option for 'Voluntary work involving the elderly or vulnerable persons'.",
                    action: null
                  },
                  {
                    title: "Receive & Upload",
                    desc: "Usually takes 1-4 business days. Once received (digitally or by post), upload a clear PDF or photo to your Bahäm dashboard.",
                    action: "Upload Document"
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-baham-blue text-white flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 italic">{step.title}</h4>
                      <p className="text-sm text-baham-slate leading-relaxed mb-3">{step.desc}</p>
                      {step.url && (
                        <a 
                          href={step.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-baham-blue flex items-center gap-1 hover:underline"
                        >
                          {step.action} <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-baham-sand shadow-sm sticky top-32">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-baham-sand/30 rounded-2xl text-baham-ink">
                  <Info size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Important Note</h4>
                  <p className="text-sm text-baham-slate italic leading-relaxed">
                    The extract must be less than 6 months old. We verify the authenticity with the Legal Register Centre. Your data is encrypted and handled according to GDPR guidelines.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-baham-ink text-white rounded-3xl">
                <p className="text-xs opacity-50 mb-2 uppercase tracking-widest font-mono">Expert Tip</p>
                <p className="text-sm italic leading-relaxed">
                  "Most companions in Finland find the digital extract easiest to manage. It's often issued the same day if you apply early!"
                </p>
                <p className="text-xs mt-4 font-bold">— Maria, Community Lead Helsinki</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path */}
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
              <p className="text-xs text-baham-slate leading-relaxed">{item.desc}</p>
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

