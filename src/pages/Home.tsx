import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ShieldCheck, Coffee, HeartHandshake, ArrowRight, Star, Clock, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative px-4 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-baham-sand text-baham-slate text-xs font-bold uppercase tracking-wider mb-6">
                Verified Companionship
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold text-baham-ink leading-tight mb-8">
                Tukea ja <br />
                <span className="text-baham-blue italic font-serif">aitoa kohtaamista.</span>
              </h1>
              <p className="text-xl text-baham-ink/70 mb-10 leading-relaxed max-w-lg">
                Bahäm yhdistää sinut vahvistettuihin seuralaisiin Helsingissä. Turvallista tukea, apua asiointiin ja aitoa seuraa arkeen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/match-results" className="btn-primary text-center">
                  Etsi seuralainen
                </Link>
                <Link to="/how-it-works" className="btn-secondary text-center">
                  Miten se toimii?
                </Link>
              </div>
              <div className="mt-12 flex items-center gap-4 text-sm text-baham-ink/60">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-baham-sand overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <span>Joined by 2,000+ happy members</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1544158941-2e69074c5a91?q=80&w=1200&auto=format&fit=crop" 
                  alt="Companion walking with elderly person" 
                  className="w-full h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-baham-blue rounded-full blur-3xl opacity-20 -z-10" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-baham-blue rounded-full blur-3xl opacity-10 -z-10" />
              
              <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-white p-6 rounded-3xl shadow-xl border border-baham-sand hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=5" alt="Companion" />
                  </div>
                  <div>
                    <p className="font-bold text-baham-ink">Elias Thorne</p>
                    <p className="text-xs text-baham-ink/50">Verified Companion</p>
                  </div>
                </div>
                <div className="flex gap-1 text-baham-blue mb-2">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <p className="text-xs text-baham-ink/70 leading-tight">
                  "I love spending time with people and <br /> helping out with their daily walk."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-12 border-y border-baham-sand/30">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
          <span className="text-xl font-bold tracking-widest uppercase">Nordic Living</span>
          <span className="text-xl font-bold tracking-widest uppercase">SafetyFirst</span>
          <span className="text-xl font-bold tracking-widest uppercase">KindCare</span>
          <span className="text-xl font-bold tracking-widest uppercase">LocalLink</span>
          <span className="text-xl font-bold tracking-widest uppercase">EcoSupport</span>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 bg-baham-blue/5">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-baham-ink mb-4">How can we help you?</h2>
          <p className="text-baham-slate max-w-2xl mx-auto">
            Our companions provide light support that makes daily life easier and more enjoyable.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Social Connection",
              desc: "Conversation, morning walks, coffee outings, or visiting local museums.",
              icon: <Coffee className="text-baham-blue" />,
            },
            {
              title: "Daily Assistance",
              desc: "Help with groceries, technology setup, or light organizational tasks.",
              icon: <Clock className="text-baham-blue" />,
            },
            {
              title: "Safe Escort",
              desc: "Reliable companionship for appointments, events, or travel support.",
              icon: <ShieldCheck className="text-baham-blue" />,
            }
          ].map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="card-baham flex flex-col items-center text-center py-12"
            >
              <div className="w-16 h-16 bg-baham-sand/30 rounded-2xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-baham-ink mb-4">{service.title}</h3>
              <p className="text-baham-slate leading-relaxed mb-8">{service.desc}</p>
              <Link to="/match-results" className="text-baham-blue font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn more <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust & Safety Preview */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-baham-ink rounded-[40px] p-12 lg:p-20 text-white flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-4xl font-bold mb-6">Your safety is our <br /> absolute priority.</h2>
              <div className="space-y-6 mb-10 text-left">
                {[
                  "Criminal Record Extract (Rikostaustaote) verification",
                  "Identity verification for all members",
                  "Strict non-medical & non-dating policy",
                  "Verified reviews from local neighbors"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 justify-center lg:justify-start">
                    <div className="w-6 h-6 bg-baham-blue rounded-full flex items-center justify-center text-white">
                      <ShieldCheck size={14} />
                    </div>
                    <span className="text-lg opacity-80">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/trust-safety" className="btn-primary bg-white text-baham-ink hover:bg-baham-sand">
                Our Trust Standards
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <HeartHandshake size={32} className="mb-4" />
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-xs opacity-60">Verified Members</p>
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?q=80&w=400" alt="Safety and trust" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400" alt="Community interaction" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="bg-baham-blue/20 rounded-2xl p-6 text-white border border-white/10">
                  <MapPin size={32} className="mb-4 text-baham-blue" />
                  <p className="text-2xl font-bold">Helsinki</p>
                  <p className="text-xs opacity-60">Serving local neighborhoods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-baham-blue/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-baham-ink">Ready to find companionship?</h2>
          <p className="text-lg text-baham-slate mb-10">
            Join the Bahäm community today and find a verified companion who matches your needs and personality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/match-results" className="btn-primary px-12">Get Started</Link>
            <Link to="/become-companion" className="btn-secondary px-12">Become a Companion</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
