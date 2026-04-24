import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'motion/react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
// This is a common issue where the icon paths are not resolved correctly
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  id: string;
  name: string;
  coords: [number, number];
  description: string;
  companionsCount: number;
}

const FINNISH_CITIES: Location[] = [
  { id: 'helsinki', name: 'Helsinki', coords: [60.1699, 24.9384], description: 'Our largest community of companions.', companionsCount: 142 },
  { id: 'espoo', name: 'Espoo', coords: [60.2055, 24.6559], description: 'Highly active tech and nature-loving community.', companionsCount: 85 },
  { id: 'tampere', name: 'Tampere', coords: [61.4978, 23.7610], description: 'The hub of companionship in central Finland.', companionsCount: 64 },
  { id: 'vantaa', name: 'Vantaa', coords: [60.2934, 25.0378], description: 'A diverse group of dedicated companions.', companionsCount: 52 },
  { id: 'oulu', name: 'Oulu', coords: [65.0121, 25.4651], description: 'Northern hospitality at its best.', companionsCount: 38 },
  { id: 'turku', name: 'Turku', coords: [60.4518, 22.2666], description: 'The historic center of caring communities.', companionsCount: 47 },
  { id: 'jyvaskyla', name: 'Jyväskylä', coords: [62.2426, 25.7473], description: 'Serving the lake district with care.', companionsCount: 29 },
  { id: 'lahti', name: 'Lahti', coords: [60.9827, 25.6615], description: 'Gateway to the eastern lakes.', companionsCount: 22 },
  { id: 'kuopio', name: 'Kuopio', coords: [62.8924, 27.6770], description: 'Warm hearts in Savonia.', companionsCount: 18 },
  { id: 'rovaniemi', name: 'Rovaniemi', coords: [66.5039, 25.7282], description: 'Where companionship meets the Arctic.', companionsCount: 12 },
];

function SetViewOnClick({ animateRef }: { animateRef: React.RefObject<HTMLDivElement> }) {
  const map = useMap();
  useEffect(() => {
    // Initial animation or load logic if needed
  }, [map]);
  return null;
}

const FinlandMap: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full h-[600px] rounded-[40px] overflow-hidden border-8 border-white shadow-2xl relative"
    >
      <MapContainer 
        center={[64.0, 26.0]} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {FINNISH_CITIES.map((city) => (
          <Marker key={city.id} position={city.coords}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-baham-ink">{city.name}</h3>
                <p className="text-xs text-baham-slate my-1">{city.description}</p>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-baham-sand">
                  <span className="text-[10px] font-bold bg-baham-blue/20 text-baham-blue px-2 py-0.5 rounded-full">
                    {city.companionsCount} Companions Available
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        <SetViewOnClick animateRef={{ current: null } as any} />
      </MapContainer>
      
      {/* Map Legend Overlay */}
      <div className="absolute bottom-6 right-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-baham-sand max-w-[200px]">
        <h4 className="text-xs font-bold uppercase tracking-widest text-baham-ink opacity-60 mb-2">Service Coverage</h4>
        <p className="text-[10px] text-baham-slate leading-relaxed">
          We are actively expanding across Finland. Click on a marker to see local community details.
        </p>
      </div>
    </motion.div>
  );
};

export default FinlandMap;
