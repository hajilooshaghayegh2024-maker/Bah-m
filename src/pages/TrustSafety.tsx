import { motion } from "motion/react";
import { ShieldCheck, UserCheck, Scale, Lock, Eye, CheckCircle2 } from "lucide-react";

export default function TrustSafety() {
  return (
    <div className="pt-32 pb-24 px-4 bg-baham-sand/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-baham-ink text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl"
          >
            <ShieldCheck size={40} />
          </motion.div>
          <h1 className="text-5xl font-bold text-baham-ink mb-6">Our Trust Policy</h1>
          <p className="text-xl text-baham-ink/60">
            Companionship built on a foundation of rigorous safety and mutual respect.
          </p>
        </div>

        <div className="space-y-12">
          {/* Detailed Trust Sections */}
          <section className="bg-white rounded-[40px] p-10 shadow-sm border border-baham-sand/50">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-16 h-16 bg-baham-sand/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <UserCheck className="text-baham-blue" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Finnish Compliance & Verification</h2>
                <p className="text-baham-ink/70 leading-relaxed mb-6">
                  Every companion on Bahäm undergoes a mandatory verification process aligned with Finnish regulations for interacting with vulnerable groups.
                </p>
                <ul className="space-y-3">
                  {[
                    "Government-issued ID (Passi or Henkilökortti)",
                    "Criminal Record Extract (Rikostaustaote) for interaction with elderly",
                    "Mandatory safety & ethics training",
                    "Notification to Finnish social & health authorities where applicable"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-baham-ink/80">
                      <CheckCircle2 size={18} className="text-baham-blue" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[40px] p-10 shadow-sm border border-baham-sand/50">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-16 h-16 bg-baham-sand/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Lock className="text-baham-blue" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Secure & Private</h2>
                <p className="text-baham-ink/70 leading-relaxed">
                  Your data is encrypted and never shared without your consent. We use bank-level encryption for all payment transactions and personal communications.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[40px] p-10 shadow-sm border border-baham-sand/50">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-16 h-16 bg-baham-sand/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Scale className="text-baham-blue" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Strict Service Boundaries</h2>
                <p className="text-baham-ink/70 leading-relaxed mb-6">
                  Bahäm is exclusively for companionship. To maintain safety and compliance, we strictly prohibit clinical, childcare, or dating-related services.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-baham-sand/20 rounded-2xl text-xs">
                    <p className="font-bold mb-2">Approved Activities:</p>
                    <ul className="list-disc pl-4 opacity-70">
                      <li>Conversational visits</li>
                      <li>Grocery & errand support</li>
                      <li>Accompaniment to events</li>
                      <li>Light outdoor walks</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 rounded-2xl text-xs">
                    <p className="font-bold mb-2 text-red-800">Strictly Prohibited:</p>
                    <ul className="list-disc pl-4 opacity-70 text-red-900">
                      <li>Childcare or nannying</li>
                      <li>Medical or clinical care</li>
                      <li>Dating or romantic intent</li>
                      <li>Personal hygiene assistance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-20 p-12 bg-baham-ink rounded-[40px] text-white text-center">
          <h2 className="text-3xl font-bold mb-6 italic">Encountered an issue?</h2>
          <p className="mb-10 opacity-80">Our resolution team is available 24/7 to support you.</p>
          <button className="btn-primary bg-white text-baham-ink hover:bg-baham-sand">
            Report an Incident
          </button>
        </div>
      </div>
    </div>
  );
}
