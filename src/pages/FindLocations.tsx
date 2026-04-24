import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Search, Navigation, Filter, Users, Heart } from 'lucide-react';
import FinlandMap from '../components/FinlandMap';

export default function FindLocations() {
  return (
    <div className="pt-32 pb-24">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4 bg-baham-blue/10 w-fit px-4 py-2 rounded-full border border-baham-blue/20"
          >
            <MapPin size={16} className="text-baham-blue" />
            <span className="text-xs font-bold text-baham-blue uppercase tracking-widest font-mono">Exploring Communities</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 italic leading-tight"
          >
            Find a companion <span className="text-baham-blue">near you</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-baham-slate leading-relaxed max-w-2xl"
          >
            Bahäm is growing every day. Explore our detailed map of Finland to see coverage in your neighborhood and connect with local support.
          </motion.p>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card-baham p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Search size={18} className="text-baham-blue" />
                Quick Search
              </h3>
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="City or Postcode..." 
                  className="w-full bg-baham-cream border border-baham-sand rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-baham-blue outline-none transition-all"
                />
              </div>
              <button className="btn-primary w-full text-sm">Find Coverage</button>
            </div>

            <div className="card-baham p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Filter size={18} className="text-baham-blue" />
                Filters
              </h3>
              <div className="space-y-3">
                {['Go to parties', 'Fishing', 'Café', 'Restaurant', 'Outdoor conversation', 'Errands', 'Storytelling', 'Walks'].map((filter) => (
                  <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-baham-sand group-hover:border-baham-blue transition-colors flex items-center justify-center">
                      <div className="w-3 h-3 bg-baham-blue rounded-sm scale-0 group-has-[:checked]:scale-100 transition-transform"></div>
                    </div>
                    <input type="checkbox" className="hidden" />
                    <span className="text-sm text-baham-slate">{filter}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-baham-ink text-white p-4 rounded-3xl text-center">
                <p className="text-2xl font-bold text-baham-blue">500+</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60">Verified</p>
              </div>
              <div className="bg-white p-4 rounded-3xl text-center border border-baham-sand">
                <p className="text-2xl font-bold text-baham-clay">12</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60">Cities</p>
              </div>
            </div>
          </div>

          {/* Main Map Area */}
          <div className="lg:col-span-3">
            <FinlandMap />
          </div>
        </div>
      </section>

      {/* Featured Regions Section */}
      <section className="bg-baham-ink py-24 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-white mb-6 italic">Expanding Local <span className="text-baham-blue">Care</span></h2>
              <p className="text-white/60 leading-relaxed">
                We are currently focusing our efforts on the major metropolitan areas shown above, but our companions are available for virtual support nationwide.
              </p>
            </div>
            <button className="bg-white text-baham-ink px-10 py-4 rounded-full font-bold hover:brightness-90 transition-all flex items-center gap-2">
              Request Your City <Navigation size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { city: 'Helsinki Region', icon: Heart, color: 'text-baham-blue', desc: 'Our most dense network of companions covering Helsinki, Espoo, and Vantaa.' },
              { city: 'Pirkanmaa', icon: Users, color: 'text-baham-clay', desc: 'Rapidly growing community centered in Tampere and nearby municipalities.' },
              { city: 'Northern Finland', icon: Navigation, color: 'text-white', desc: 'Specialized support for remote locations and the Rovaniemi urban hub.' }
            ].map((region, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-sm"
              >
                <region.icon className={`mb-6 ${region.color}`} size={32} />
                <h3 className="text-2xl font-bold text-white mb-4 italic">{region.city}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{region.desc}</p>
                <button className="text-baham-blue text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Browse Companions <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const ArrowRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
