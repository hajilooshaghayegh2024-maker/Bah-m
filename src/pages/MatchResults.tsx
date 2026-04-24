import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, Star, MapPin, ShieldCheck, Heart, Coffee, BookOpen, Music, Dog, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../components/AuthProvider";
import { getRecommendations } from "../services/aiService";

const companions = [
  {
    id: 1,
    name: "Oliver Bennett",
    age: 28,
    rating: 4.9,
    reviews: 124,
    bio: "Passionate about art, history, and light morning walks. I enjoy sharing a good coffee and conversation.",
    interests: ["Art", "History", "Coffee"],
    location: "Kallio, Helsinki",
    price: 22,
    img: "32",
    verified: true
  },
  {
    id: 2,
    name: "Elena Rossi",
    age: 34,
    rating: 4.8,
    reviews: 89,
    bio: "Ex-librarian who loves classic literature and gardening. I can help with tech setup or just a quiet afternoon in the park.",
    interests: ["Books", "Gardening", "Tech"],
    location: "Töölö, Helsinki",
    price: 25,
    img: "45",
    verified: true
  },
  {
    id: 3,
    name: "Marcus Lindberg",
    age: 41,
    rating: 5.0,
    reviews: 45,
    bio: "Musician and animal lover. Happy to accompany you to concerts, events, or walk the dog with you.",
    interests: ["Music", "Dogs", "Events"],
    location: "Eira, Helsinki",
    price: 24,
    img: "12",
    verified: true
  },
  {
    id: 4,
    name: "Sofia Wallin",
    age: 24,
    rating: 4.7,
    reviews: 32,
    bio: "University student studying psychology. I'm a patient listener and love visiting local museums and galleries.",
    interests: ["Psychology", "Museums", "Art"],
    location: "Lauttasaari, Helsinki",
    price: 20,
    img: "26",
    verified: true
  }
];

export default function MatchResults() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [recommendedIds, setRecommendedIds] = useState<any[]>([]);
  const { profile, language: lang } = useAuth();
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    async function fetchAiMatches() {
      if (profile) {
        setIsAiLoading(true);
        const matches = await getRecommendations(profile, companions);
        setRecommendedIds(matches);
        setIsAiLoading(false);
      }
    }
    fetchAiMatches();
  }, [profile]);

  const getAiReason = (id: number) => {
    return recommendedIds.find(r => r.id === id.toString() || r.id === id)?.matchReason;
  };

  return (
    <div className="pt-32 pb-24 bg-baham-cream min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-baham-ink mb-2">Find your perfect companion.</h1>
            <p className="text-baham-ink/50 italic underline decoration-baham-blue/30 underline-offset-4">
              {isAiLoading ? 'AI is generating smart matches...' : `${companions.length} verified companions available near Helsinki.`}
            </p>
          </div>
          <div className="flex gap-2 p-1 bg-baham-blue/5 rounded-full border border-baham-blue/10">
            {["All", "Local", "Specialist", "Top Rated"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                  activeFilter === f ? "bg-baham-blue text-white shadow-md" : "text-baham-slate hover:text-baham-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[...companions].sort((a, b) => {
            const indexA = recommendedIds.findIndex(r => r.id === a.id.toString() || r.id === a.id);
            const indexB = recommendedIds.findIndex(r => r.id === b.id.toString() || r.id === b.id);
            if (indexA === -1 && indexB === -1) return 0;
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
          }).map((comp, idx) => {
            const aiReason = getAiReason(comp.id);
            return (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-baham group relative border-none hover:shadow-xl"
              >
                {aiReason && (
                  <div className="absolute -top-4 right-8 z-20 bg-baham-blue text-white px-4 py-2 rounded-2xl text-[10px] font-bold flex items-center gap-2 shadow-lg">
                    <Sparkles size={12} /> AI MATCH: {aiReason}
                  </div>
                )}
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="relative w-full md:w-48 h-64 rounded-3xl overflow-hidden shadow-lg grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img src={`https://i.pravatar.cc/300?img=${comp.img}`} alt={comp.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-md rounded-xl text-baham-blue shadow-sm">
                      <ShieldCheck size={20} />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col pt-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-2xl font-bold text-baham-ink">{comp.name}, {comp.age}</h3>
                        <div className="flex items-center gap-2 text-xs text-baham-ink/50 mt-1">
                          <MapPin size={12} /> {comp.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-baham-blue font-bold">
                          <Star size={16} fill="currentColor" /> {comp.rating}
                        </div>
                        <p className="text-[10px] text-baham-ink/40 uppercase mt-1">{comp.reviews} reviews</p>
                      </div>
                    </div>

                    <p className="text-sm text-baham-slate leading-relaxed italic mb-6">
                      "{comp.bio}"
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {comp.interests.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-baham-blue/10 rounded-lg text-[10px] font-bold text-baham-blue uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-baham-blue/10">
                      <div>
                        <span className="text-2xl font-bold">{comp.price}€</span>
                        <span className="text-xs text-baham-ink/40">/hr</span>
                      </div>
                      <Link to={`/booking`} className="btn-primary py-2 px-8 text-sm">
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-baham-ink/40 mb-8 italic">{lang === 'fi' ? 'Etkö löytänyt etsimääsi? Lisäämme uusia seuralaisia viikoittain.' : "Didn't find what you were looking for? We're adding new companions weekly."}</p>
          <button 
            onClick={() => alert(lang === 'fi' ? 'Lisää seuralaisia tulossa pian!' : 'More companions coming soon!')}
            className="btn-secondary rounded-3xl"
          >
            {lang === 'fi' ? 'Lataa lisää' : 'Load More'}
          </button>
        </div>
      </div>
    </div>
  );
}
