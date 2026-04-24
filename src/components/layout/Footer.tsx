import { Link } from "react-router-dom";
import { Heart, Instagram, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-baham-ink text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-baham-blue">
                <Heart size={18} fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight">Bahäm</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Modern companionship and light support for a more connected world. Human, reliable, and safe.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-baham-blue transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-baham-blue transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-baham-blue transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/trust-safety" className="hover:text-white transition-colors">Trust & Safety</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Community</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><Link to="/become-companion" className="hover:text-white transition-colors">Become a Companion</Link></li>
              <li><Link to="/trust-safety" className="hover:text-white transition-colors">Verification Process</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Guidelines</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><Link to="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© 2024 Bahäm. All rights reserved. Scandinavian Design Inspiration.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
