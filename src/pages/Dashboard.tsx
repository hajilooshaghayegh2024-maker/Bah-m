import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Calendar, User, Settings, Bell, Clock, MapPin, Star, MoreHorizontal, ChevronRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../components/AuthProvider";

export default function Dashboard() {
  const { user, profile } = useAuth();
  const displayName = profile?.displayName || user?.displayName || "Guest";
  const location = profile?.location?.address || "Location not set";

  return (
    <div className="pt-32 pb-24 bg-baham-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-baham-ink mb-2">Welcome back, {displayName.split(' ')[0]}.</h1>
            <p className="text-baham-ink/50 italic">Here is what's happening with your companionship schedule.</p>
          </div>
          <Link to="/match-results" className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Book a New Session
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar / Profile Area */}
          <div className="lg:col-span-3 space-y-6">
            <div className="card-baham p-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-baham-sand mb-4">
                <img src={user?.photoURL || `https://i.pravatar.cc/150?u=${user?.uid}`} alt="Profile" referrerPolicy="no-referrer" />
              </div>
              <h3 className="font-bold text-xl">{displayName}</h3>
              <p className="text-xs text-baham-ink/50 italic mb-6">{location}</p>
              <div className="flex justify-center gap-4 border-t border-baham-sand/30 pt-6">
                <div>
                  <p className="font-bold">0</p>
                  <p className="text-[10px] uppercase opacity-40">Bookings</p>
                </div>
                <div className="w-px h-8 bg-baham-sand/30" />
                <div>
                  <p className="font-bold">5.0</p>
                  <p className="text-[10px] uppercase opacity-40">Rating</p>
                </div>
              </div>
            </div>

            <nav className="card-baham p-2 space-y-1">
              {[
                { name: "My Bookings", icon: <Calendar size={18} />, active: true, path: "/dashboard" },
                { name: "Profile Settings", icon: <User size={18} />, active: false, path: "/profile" },
                { name: "Notifications", icon: <Bell size={18} />, active: false, path: "#" },
                { name: "Admin (Demo)", icon: <Settings size={18} />, active: false, path: "/admin" }
              ].map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    item.active ? "bg-baham-sand text-baham-blue" : "text-baham-slate hover:bg-baham-sand/30"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
            {/* Upcoming Booking */}
            <div className="bg-baham-ink rounded-[40px] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-1 bg-baham-blue rounded-full text-[10px] font-bold uppercase">Upcoming Today</span>
                  <span className="text-sm opacity-60 flex items-center gap-2"><Clock size={14} /> 14:00 - 16:00</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-white/20">
                      <img src="https://i.pravatar.cc/100?img=32" alt="Companion" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Tea & Conversation</h2>
                      <p className="opacity-70 text-sm">with <span className="underline italic decoration-white/30 underline-offset-4">Oliver Bennett</span></p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold transition-all backdrop-blur-md border border-white/10">Message</button>
                    <button className="px-6 py-2 bg-baham-cream text-baham-ink hover:bg-white rounded-full text-xs font-bold transition-all">Details</button>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-8 text-white/5 opacity-10">
                <Calendar size={120} />
              </div>
            </div>

            {/* Recent Activity / History */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Past Companions</h3>
                <button className="text-sm text-baham-blue font-bold hover:underline">View All History</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "Marie Lind", date: "Oct 12", type: "Grocery Help", img: "11" },
                  { name: "Sven J.", date: "Oct 09", type: "Museum Visit", img: "52" }
                ].map((mate, i) => (
                  <div key={i} className="card-baham p-6 flex items-center justify-between group cursor-pointer hover:border-baham-blue">
                    <div className="flex items-center gap-4">
                      <img src={`https://i.pravatar.cc/100?img=${mate.img}`} className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all" alt="User" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="font-bold text-sm">{mate.name}</h4>
                        <p className="text-[10px] text-baham-slate uppercase tracking-wider">{mate.type} • {mate.date}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-baham-blue opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Banner */}
            <div className="p-8 bg-baham-sand/20 rounded-[40px] flex items-center justify-between border border-baham-sand/30">
               <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-baham-blue shadow-sm">
                   <ShieldCheck size={28} />
                 </div>
                 <div>
                   <p className="font-bold italic">Did you know? All companions are re-verified every 6 months.</p>
                   <p className="text-xs text-baham-slate leading-relaxed italic underline decoration-baham-sand decoration-2 underline-offset-4">Learn about our safety commitment.</p>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Simple internal Plus icon component for brevity
function Plus({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
}
