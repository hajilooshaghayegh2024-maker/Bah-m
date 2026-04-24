import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../components/AuthProvider";

const navLinks = [
  { name: "Miten se toimii", href: "/how-it-works" },
  { name: "Turvallisuus", href: "/trust-safety" },
  { name: "Hinnasto", href: "/pricing" },
  { name: "Ryhdy seuralaiseksi", href: "/become-companion" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, profile, signOut, language: lang, setLanguage: setLang } = useAuth();

  const navLinks = [
    { name: lang === 'fi' ? "Miten se toimii" : "How it works", href: "/how-it-works" },
    { name: lang === 'fi' ? "Turvallisuus" : "Trust & Safety", href: "/trust-safety" },
    { name: lang === 'fi' ? "Hinnasto" : "Pricing", href: "/pricing" },
    { name: lang === 'fi' ? "Ryhdy seuralaiseksi" : "Become a companion", href: "/become-companion" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-baham-cream/80 backdrop-blur-md border-b border-baham-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-baham-blue rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <Heart size={24} fill="currentColor" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-baham-ink">Bahäm</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-baham-blue ${
                  pathname === link.href ? "text-baham-blue" : "text-baham-slate"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-6 w-px bg-baham-sand/50" />
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-baham-ink hover:text-baham-clay">
                  <User size={18} /> {profile?.displayName || 'Dashboard'}
                </Link>
                <button onClick={signOut} className="text-sm font-medium text-baham-ink hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm font-medium text-baham-ink hover:text-baham-clay">
                {lang === 'fi' ? 'Kirjaudu' : 'Sign In'}
              </Link>
            )}
            <div className="flex items-center gap-1 px-2 border-l border-baham-sand/30 ml-2">
              <button 
                onClick={() => setLang('en')}
                className={`text-lg transition-all cursor-pointer ${lang === 'en' ? 'scale-110 grayscale-0 ring-2 ring-baham-blue/30 rounded-full' : 'grayscale opacity-50 hover:opacity-100 hover:grayscale-0'}`} 
                title="English"
              >
                🇺🇸
              </button>
              <button 
                onClick={() => setLang('fi')}
                className={`text-lg transition-all cursor-pointer ${lang === 'fi' ? 'scale-110 grayscale-0 ring-2 ring-baham-blue/30 rounded-full' : 'grayscale opacity-50 hover:opacity-100 hover:grayscale-0'}`} 
                title="Suomi"
              >
                🇫🇮
              </button>
            </div>
            {!user && (
              <Link to="/login" state={{ from: pathname }} className="px-6 py-2 rounded-full border-2 border-baham-blue text-baham-blue font-bold hover:bg-baham-blue hover:text-white transition-all transform hover:scale-105">
                {lang === 'fi' ? 'Liity' : 'Join'}
              </Link>
            )}
            <Link to="/match-results" className="px-6 py-2 rounded-full bg-baham-blue text-white font-bold shadow-lg shadow-baham-blue/20 hover:brightness-110 transform hover:scale-105 transition-all">
              {lang === 'fi' ? 'Etsi seuralainen' : 'Find Support'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-baham-ink"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-baham-blue/10 overflow-hidden"
          >
            <div className="px-4 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-baham-ink"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-baham-blue/10" />
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-medium text-baham-ink">
                    Dashboard
                  </Link>
                  <button onClick={() => { signOut(); setIsOpen(false); }} className="text-lg font-medium text-left text-red-500">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-baham-ink">
                  {lang === 'fi' ? 'Kirjaudu' : 'Sign In'}
                </Link>
              )}
              <div className="flex items-center gap-6 py-2 border-y border-baham-sand/20 px-2">
                <button 
                  onClick={() => setLang('en')}
                  className={`text-2xl transition-all ${lang === 'en' ? 'scale-125 grayscale-0' : 'grayscale opacity-50'}`} 
                  title="English"
                >
                  🇺🇸
                </button>
                <button 
                  onClick={() => setLang('fi')}
                  className={`text-2xl transition-all ${lang === 'fi' ? 'scale-125 grayscale-0' : 'grayscale opacity-50'}`} 
                  title="Suomi"
                >
                  🇫🇮
                </button>
              </div>
              <Link to="/match-results" onClick={() => setIsOpen(false)} className="btn-primary text-center">
                {lang === 'fi' ? 'Etsi tukea' : 'Find Support'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
