import { useState } from "react";
import { ShieldCheck, Users, AlertCircle, TrendingUp, Search, MoreVertical, CheckCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";

export default function AdminDashboard() {
  return (
    <div className="pt-32 pb-24 px-4 bg-[#F2F2F2] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-baham-green-deep">System Admin</h1>
            <p className="text-xs text-baham-ink/40 uppercase tracking-widest font-bold mt-1">Bahäm Management Console</p>
          </div>
          <div className="flex gap-4">
            <span className="px-4 py-2 bg-baham-sage/10 text-baham-sage rounded-full text-xs font-bold border border-baham-sage/20 flex items-center gap-2">
               <div className="w-2 h-2 bg-baham-sage rounded-full animate-pulse" /> System Online
            </span>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-baham-ink border border-baham-green-soft/30"><AlertCircle size={20} /></button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: "Active Connections", val: "1,248", change: "+12%", icon: <Users /> },
            { label: "New Applications", val: "32", change: "4 Pending", icon: <ShieldCheck /> },
            { label: "Revenue (MTD)", val: "$42,400", change: "+8.4%", icon: <TrendingUp /> },
            { label: "Reports", val: "2", change: "No active", icon: <AlertCircle /> }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-black/5 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-baham-cream rounded-2xl flex items-center justify-center text-baham-green-deep">
                    {stat.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${i === 3 ? "bg-baham-green-soft text-baham-green-deep" : "bg-baham-sage/10 text-baham-sage"}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-baham-ink/40 font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-baham-ink">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Verification Queue */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 card-baham bg-white p-10 border-none shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold">Verification Queue</h2>
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-baham-ink/30" />
                <input placeholder="Search applicants..." className="pl-10 pr-4 py-2 bg-baham-sand rounded-xl text-xs border-none focus:ring-1 focus:ring-baham-blue-dark" />
              </div>
            </div>

            <div className="space-y-4">
              {[
                { name: "Lars Erikson", city: "Oslo", time: "2h ago", status: "ID Pending", img: "12" },
                { name: "Anna Schmidt", city: "Berlin", time: "5h ago", status: "Interview", img: "21" },
                { name: "Johan Foss", city: "Copenhagen", time: "1d ago", status: "Background", img: "43" }
              ].map((app, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-baham-beige/30 rounded-2xl hover:bg-baham-beige/50 transition-all group">
                   <div className="flex items-center gap-4">
                     <img src={`https://i.pravatar.cc/100?img=${app.img}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="U" />
                     <div>
                       <p className="font-bold text-sm">{app.name}</p>
                       <p className="text-[10px] opacity-40 uppercase tracking-widest">{app.city} • Applied {app.time}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-6">
                     <span className="text-[10px] font-bold px-3 py-1 bg-white rounded-lg border border-black/5">{app.status}</span>
                     <div className="flex gap-2">
                       <button className="p-2 text-baham-sage hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100"><CheckCircle size={18} /></button>
                       <button className="p-2 text-red-400 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100"><XCircle size={18} /></button>
                       <button className="p-2 text-baham-ink/30"><MoreVertical size={18} /></button>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-baham bg-baham-green-deep text-white p-10 border-none shadow-xl">
            <h2 className="text-2xl font-bold mb-8">System Health</h2>
            <div className="space-y-8">
               {[
                 { label: "Database", status: "Normal", p: 100 },
                 { label: "API Gateway", status: "Normal", p: 98 },
                 { label: "Messaging", status: "Normal", p: 100 }
               ].map((mod, i) => (
                 <div key={i}>
                   <div className="flex justify-between text-xs mb-2">
                     <span className="opacity-60">{mod.label}</span>
                     <span className="font-bold">{mod.status}</span>
                   </div>
                   <div className="w-full h-1 bg-white/10 rounded-full">
                     <div className="h-full bg-baham-clay rounded-full" style={{ width: `${mod.p}%` }} />
                   </div>
                 </div>
               ))}

               <div className="pt-8 border-t border-white/10">
                 <p className="text-[10px] uppercase opacity-40 mb-4 tracking-widest">Recent System Log</p>
                 <div className="space-y-3 font-mono text-[9px] opacity-60">
                   <p>[12:44] Heartbeat ping success</p>
                   <p>[12:40] New verification assigned: #A452</p>
                   <p>[12:38] Backup sync complete</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
