import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Coins, Heart, Clock, Sparkles, CheckCircle2 } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "On-Demand",
      price: "25€",
      period: "per hour",
      desc: "Perfect for occasional companion support.",
      features: ["Verified companion", "No monthly fee", "24/7 booking access", "Standard support"],
      btn: "Get Started",
      highlight: false
    },
    {
      name: "Community",
      price: "20€",
      period: "per hour + 45€/mo",
      desc: "For those seeking regular companionship.",
      features: ["Preferred pricing", "Recurring scheduling", "Monthly health check-in", "Priority matching"],
      btn: "Join Monthly",
      highlight: true
    },
    {
      name: "Companion Care",
      price: "18€",
      period: "per hour + 110€/mo",
      desc: "Our most supportive package for families.",
      features: ["Dedicated companion pool", "Family dashboard access", "Direct coordinator line", "Weekly reports"],
      btn: "Connect Family",
      highlight: false
    }
  ];

  return (
    <div className="pt-32 pb-24 px-4 bg-baham-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 text-baham-ink">
          <h1 className="text-5xl font-bold mb-6">Transparent Pricing</h1>
          <p className="text-xl opacity-60">Simple plans designed to make support accessible for everyone.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-[40px] p-10 flex flex-col ${
                plan.highlight 
                  ? "bg-baham-ink text-white border-none shadow-2xl scale-105 z-10" 
                  : "bg-white text-baham-ink border border-baham-sand"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-baham-blue text-white text-[10px] uppercase font-bold px-4 py-1 rounded-bl-xl">
                  Popular
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className={`text-sm mb-8 ${plan.highlight ? "opacity-70" : "text-baham-ink/60"}`}>{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={`text-sm ${plan.highlight ? "opacity-70" : "text-baham-ink/50"}`}>{plan.period}</span>
              </div>
              <hr className={`mb-8 ${plan.highlight ? "border-white/20" : "border-baham-sand/30"}`} />
              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 size={18} className={plan.highlight ? "text-baham-blue" : "text-baham-slate"} />
                    <span className={plan.highlight ? "opacity-90" : "opacity-80"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-full font-bold transition-all ${
                plan.highlight 
                  ? "bg-white text-baham-ink hover:bg-baham-sand" 
                  : "bg-baham-ink text-white hover:bg-baham-slate"
              }`}>
                {plan.btn}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-baham-sand/20 rounded-[40px] text-center border border-baham-sand/30">
          <div className="flex justify-center gap-12 flex-wrap items-center">
            <div className="flex items-center gap-3">
              <Coins className="text-baham-blue" />
              <span className="font-bold">No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="text-baham-blue" />
              <span className="font-bold">Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="text-baham-blue" />
              <span className="font-bold">Flexible Cancellation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
