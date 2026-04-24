import { motion } from "motion/react";
import { Search, UserCheck, CalendarDays, Coffee, Heart, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Find a Companion",
      desc: "Search based on location, interests, and the type of support you need.",
      icon: <Search className="text-baham-blue" />,
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400"
    },
    {
      title: "Verify & Review",
      desc: "Browse detailed profiles, verified credentials, and real member reviews.",
      icon: <UserCheck className="text-baham-blue" />,
      image: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?q=80&w=400"
    },
    {
      title: "Book & Connect",
      desc: "Schedule a time that works for you. Safe, simple, and transparent.",
      icon: <CalendarDays className="text-baham-blue" />,
      image: "https://images.unsplash.com/photo-1507537297325-5ae90e54859a?q=80&w=400"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-baham-ink mb-6">Simple, safe, and human.</h1>
          <p className="text-xl text-baham-ink/60 max-w-2xl mx-auto">
            Everything you need to know about how Bahäm connects communities through verified companionship.
          </p>
        </div>

        <div className="space-y-32">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-16 ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
               <div className="flex-1">
                <div className="w-16 h-16 bg-baham-blue/10 rounded-2xl flex items-center justify-center mb-8">
                  {step.icon}
                </div>
                <h2 className="text-3xl font-bold mb-6 italic text-baham-blue">{idx + 1}. {step.title}</h2>
                <p className="text-lg text-baham-slate leading-relaxed mb-8">
                  {step.desc} Our system uses advanced matching to ensure personality compatibility and logistical ease.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-baham-ink/60">
                    <CheckCircle2 size={16} className="text-baham-blue" /> Fast verification
                  </div>
                  <div className="flex items-center gap-2 text-sm text-baham-ink/60">
                    <CheckCircle2 size={16} className="text-baham-blue" /> 100% Secure
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full relative">
                <div className="aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-baham-blue/10 rounded-full -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Use Cases */}
        <section className="mt-32 pt-24 border-t border-baham-sand/30">
          <h2 className="text-4xl font-bold text-center mb-16">Designed for real life.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "A Walk in the Park",
                desc: "Safely enjoy the outdoors with a reliable companion by your side.",
                icon: <Coffee />
              },
              {
                title: "Grocery Support",
                desc: "Help with heavy bags and organizational errands.",
                icon: <Search />
              },
              {
                title: "Event Companionship",
                desc: "Never go to a wedding or concert alone—bring a verified companion.",
                icon: <Heart />
              },
              {
                title: "Tech Help",
                desc: "Setting up a new iPad or organizing digital photos at home.",
                icon: <CalendarDays />
              }
            ].map((useCase, idx) => (
              <div key={idx} className="card-baham p-6 text-center">
                <h3 className="font-bold text-lg mb-2">{useCase.title}</h3>
                <p className="text-sm text-baham-ink/60">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
