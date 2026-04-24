import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      q: "What exactly is a 'Companion'?",
      a: "A Bahäm companion is a verified individual who provides social interaction and light support. They are not medical professionals, nurses, or licensed therapists. They provide friendship, help with technology, light errands, and social escorts."
    },
    {
      q: "How do you verify your companions?",
      a: "We have a multi-layered verification process including ID checks, official background checks, social media review, and a mandatory personal video interview with our community team."
    },
    {
      q: "Is there a minimum booking time?",
      a: "Yes, the minimum booking duration is 1 hour. This ensures both members and companions have meaningful interactions."
    },
    {
      q: "Can I book the same companion every time?",
      a: "Absolutely! Many of our members prefer consistency. You can book recurring sessions with your favorite companions directly through the dashboard."
    },
    {
      q: "What if I need to cancel a booking?",
      a: "Cancellations made more than 24 hours in advance are free. Within 24 hours, a 50% cancellation fee applies to support the companion's scheduled time."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-baham-sand/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-baham-blue">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-baham-ink/60 italic underline underline-offset-8 decoration-baham-sand">Everything else you might be wondering about.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-baham-sand/50 rounded-3xl overflow-hidden bg-white">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-baham-sand/20 transition-colors"
                id={`faq-btn-${idx}`}
              >
                <span className="font-bold text-baham-ink">{faq.q}</span>
                {openIdx === idx ? <Minus size={20} /> : <Plus size={20} />}
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="p-6 pt-0 text-baham-slate leading-relaxed italic border-t border-baham-sand/20 bg-baham-sand/10">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 card-baham bg-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-baham-ink/60 text-sm italic">We're here to help you find the peace of mind you deserve.</p>
          </div>
          <button className="btn-primary">Contact Support</button>
        </div>
      </div>
    </div>
  );
}
