import { Link } from "react-router-dom";
import { User, ShieldCheck, Bell, MapPin, Edit3, Trash2, LogOut, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function Profile() {
  return (
    <div className="pt-32 pb-24 bg-baham-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-baham-ink mb-2">Account Settings</h1>
          <p className="text-baham-ink/50 italic underline decoration-baham-sand underline-offset-4 decoration-2">Manage your private information and safety preferences.</p>
        </div>

        <div className="space-y-8">
          {/* Main sections */}
          <section className="card-baham p-10 bg-white">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-baham-sand">
                    <img src="https://i.pravatar.cc/150?img=47" alt="Profile" referrerPolicy="no-referrer" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-baham-blue text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                    <Edit3 size={14} />
                  </button>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Sarah Andersson</h3>
                  <p className="text-sm opacity-50 italic">sarah.a@example.com</p>
                </div>
              </div>
              <button className="btn-secondary text-sm py-2 px-6">Edit Profile</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-baham-sand/30">
               <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Location</label>
                  <p className="flex items-center gap-2 font-bold"><MapPin size={16} className="text-baham-blue" /> Helsinki, FI</p>
               </div>
               <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Primary Interest</label>
                  <p className="font-bold underline decoration-baham-sand underline-offset-2 italic">Culture & History</p>
               </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="card-baham p-8 bg-white flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-baham-sand/30 rounded-2xl flex items-center justify-center text-baham-blue mb-6">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Trust Level: Gold</h4>
                  <p className="text-xs opacity-60 leading-relaxed italic">You are fully verified and eligible for priority matches.</p>
                </div>
                <button className="text-sm font-bold text-baham-blue mt-8 flex items-center gap-2 hover:gap-3 transition-all">
                  Security Settings <ChevronRight size={16} />
                </button>
             </div>

             <div className="card-baham p-8 bg-white flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-baham-sand/30 rounded-2xl flex items-center justify-center text-baham-blue mb-6">
                    <Bell size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Notifications</h4>
                  <p className="text-xs opacity-60 leading-relaxed italic">Manage how you receive updates about your bookings.</p>
                </div>
                <button className="text-sm font-bold text-baham-blue mt-8 flex items-center gap-2 hover:gap-3 transition-all">
                  Alert Preferences <ChevronRight size={16} />
                </button>
             </div>
          </section>

          <div className="pt-12 flex justify-between items-center text-xs opacity-40">
             <button className="flex items-center gap-2 text-red-500 hover:opacity-100 transition-opacity font-bold uppercase tracking-widest">
               <Trash2 size={12} /> Delete Account
             </button>
             <button className="flex items-center gap-2 hover:opacity-100 transition-opacity font-bold uppercase tracking-widest">
               <LogOut size={12} /> Sign Out
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
