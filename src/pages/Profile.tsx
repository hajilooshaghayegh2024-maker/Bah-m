import React, { useState, useEffect } from "react";
import { User, ShieldCheck, Bell, MapPin, Edit3, Trash2, LogOut, ChevronRight, Save, X, Heart, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { profile, updateProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    role: "seeker" as "seeker" | "companion",
    location: {
      address: "",
      lat: 60.1699,
      lng: 24.9384,
      radius: 10
    },
    interests: [] as string[],
    interestInput: ""
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || "",
        role: profile.role === 'admin' ? 'seeker' : profile.role,
        location: {
          address: profile.location?.address || "",
          lat: profile.location?.lat || 60.1699,
          lng: profile.location?.lng || 24.9384,
          radius: profile.location?.radius || 10
        },
        interests: profile.companionData?.interests || profile.companionData?.categories || [],
        interestInput: ""
      });
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        displayName: formData.displayName,
        role: formData.role,
        location: formData.location,
        companionData: {
          ...(profile?.companionData || {
            categories: [],
            languages: ["Finnish", "English"],
            hourlyRate: 25,
            rating: 5,
            reviewCount: 0,
            availability: []
          }),
          interests: formData.interests
        },
        profileSetup: true
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const addInterest = () => {
    if (formData.interestInput.trim() && !formData.interests.includes(formData.interestInput.trim())) {
      setFormData({
        ...formData,
        interests: [...formData.interests, formData.interestInput.trim()],
        interestInput: ""
      });
    }
  };

  const removeInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(i => i !== interest)
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!profile) return null;

  return (
    <div className="pt-32 pb-24 bg-baham-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-baham-ink mb-2">Account Settings</h1>
            <p className="text-baham-ink/50 italic underline decoration-baham-sand underline-offset-4 decoration-2">Manage your private information and safety preferences.</p>
          </div>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="btn-secondary text-sm py-2 px-6 flex items-center gap-2"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          )}
        </div>

        <div className="space-y-8">
          <section className="card-baham p-10 bg-white relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.form 
                  key="edit-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSave} 
                  className="space-y-8"
                >
                  <div className="flex items-start gap-8">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-baham-sand">
                        <img src={`https://ui-avatars.com/api/?name=${formData.displayName}&background=68A6B1&color=fff`} alt="Profile" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Display Name</label>
                          <input 
                            type="text"
                            value={formData.displayName}
                            onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                            className="w-full bg-baham-cream border border-baham-sand rounded-xl px-4 py-2 focus:ring-2 focus:ring-baham-blue outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Your Role</label>
                          <select 
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                            className="w-full bg-baham-cream border border-baham-sand rounded-xl px-4 py-2 focus:ring-2 focus:ring-baham-blue outline-none"
                          >
                            <option value="seeker">I am seeking a companion</option>
                            <option value="companion">I want to be a companion</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Location</label>
                        <div className="relative">
                          <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-baham-blue" />
                          <input 
                            type="text"
                            value={formData.location.address}
                            onChange={(e) => setFormData({...formData, location: {...formData.location, address: e.target.value}})}
                            placeholder="e.g. Helsinki, Finland"
                            className="w-full bg-baham-cream border border-baham-sand rounded-xl pl-12 pr-4 py-2 focus:ring-2 focus:ring-baham-blue outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Interests & Hobbies</label>
                        <div className="flex gap-2 mb-4">
                          <input 
                            type="text"
                            value={formData.interestInput}
                            onChange={(e) => setFormData({...formData, interestInput: e.target.value})}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                            placeholder="Add an interest..."
                            className="flex-1 bg-baham-cream border border-baham-sand rounded-xl px-4 py-2 focus:ring-2 focus:ring-baham-blue outline-none"
                          />
                          <button 
                            type="button"
                            onClick={addInterest}
                            className="bg-baham-blue text-white px-4 py-2 rounded-xl"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.interests.map(interest => (
                            <span key={interest} className="bg-baham-blue/10 text-baham-blue px-3 py-1 rounded-full text-sm flex items-center gap-2 group">
                              {interest}
                              <button type="button" onClick={() => removeInterest(interest)} className="hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <X size={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-8 border-t border-baham-sand/30">
                    <button 
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary text-sm px-6"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={saving}
                      className="btn-primary text-sm px-8 flex items-center gap-2"
                    >
                      {saving ? "Saving..." : <><Save size={16} /> Save Changes</>}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="display-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-baham-sand">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${profile.displayName}&background=68A6B1&color=fff`} 
                          alt="Profile" 
                          referrerPolicy="no-referrer" 
                        />
                      </div>
                      {profile.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-baham-blue text-white p-1.5 rounded-full border-2 border-white">
                          <ShieldCheck size={14} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-3xl font-bold italic">{profile.displayName}</h3>
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-baham-sand/50 px-2 py-0.5 rounded text-baham-clay">
                          {profile.role}
                        </span>
                      </div>
                      <p className="text-sm opacity-50 italic">{profile.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-baham-sand/30">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Location</label>
                        <p className="flex items-center gap-2 font-bold italic">
                          <MapPin size={18} className="text-baham-blue" />
                          {profile.location?.address || "Not set"}
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Trust Level</label>
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded-full ${profile.isVerified ? 'bg-baham-blue text-white' : 'bg-baham-sand text-baham-clay/50'}`}>
                            <ShieldCheck size={16} />
                          </div>
                          <p className={`font-bold italic ${profile.isVerified ? 'text-baham-ink' : 'text-baham-ink/40'}`}>
                            {profile.isVerified ? 'Verified Member' : 'Basic Member'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">Interests</label>
                      <div className="flex flex-wrap gap-2">
                        {profile.companionData?.interests?.length || profile.companionData?.categories?.length ? (
                          (profile.companionData?.interests || profile.companionData?.categories || []).map(interest => (
                            <span key={interest} className="inline-flex items-center gap-1.5 bg-baham-cream border border-baham-sand text-xs font-bold px-3 py-1 rounded-full italic text-baham-ink">
                              <Heart size={10} className="text-baham-blue" />
                              {interest}
                            </span>
                          ))
                        ) : (
                          <p className="text-xs italic text-baham-ink/40">No interests added yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="card-baham p-8 bg-white flex flex-col justify-between group hover:border-baham-blue transition-colors">
                <div>
                  <div className="w-12 h-12 bg-baham-sand/30 rounded-2xl flex items-center justify-center text-baham-blue mb-6 group-hover:scale-110 transition-transform">
                    <Star size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Experience & Rating</h4>
                  <p className="text-xs opacity-60 leading-relaxed italic">
                    {profile.role === 'companion' 
                      ? "Keep your profile up to date to increase your match frequency."
                      : "View your past experiences and given ratings to companions."}
                  </p>
                </div>
                <button className="text-sm font-bold text-baham-blue mt-8 flex items-center gap-2 hover:gap-3 transition-all">
                  View History <ChevronRight size={16} />
                </button>
             </div>

             <div className="card-baham p-8 bg-white flex flex-col justify-between group hover:border-baham-blue transition-colors">
                <div>
                  <div className="w-12 h-12 bg-baham-sand/30 rounded-2xl flex items-center justify-center text-baham-blue mb-6 group-hover:scale-110 transition-transform">
                    <Bell size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Notifications</h4>
                  <p className="text-xs opacity-60 leading-relaxed italic">Manage how you receive updates about your bookings and new messages.</p>
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
             <button 
               onClick={handleSignOut}
               className="flex items-center gap-2 hover:opacity-100 transition-opacity font-bold uppercase tracking-widest"
             >
               <LogOut size={12} /> Sign Out
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

