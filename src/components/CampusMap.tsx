import { useState, useRef, useEffect } from "react";
import { Maximize2, X } from "lucide-react";
import campusMapImg from "@/assets/campus-map.png";

const defaultLabels = [
  { id: 'pharmacy', name: "Pharmacy Block", top: "30%", left: "20%", zoomLevel: 1.3, color: "from-green-400 to-green-600" },
  { id: 'admin', name: "Admin Block", top: "35%", left: "45%", zoomLevel: 1.4, color: "from-orange-400 to-orange-600" },
  { id: 'it', name: "IT & Management", top: "30%", left: "70%", zoomLevel: 1.3, color: "from-blue-400 to-blue-600" },
  // Positioned directly over the orange-roof canteen building
  { id: 'canteen', name: "Canteen", top: "42%", left: "18%", zoomLevel: 1.2, color: "from-yellow-400 to-yellow-600" },
  // Positioned over basketball court area
  { id: 'basket', name: "Basketball Court", top: "58%", left: "48%", zoomLevel: 1.2, color: "from-purple-400 to-purple-600" },
  { id: 'park', name: "Laureate Park", top: "75%", left: "25%", zoomLevel: 1.2, color: "from-emerald-400 to-emerald-600" },
  { id: 'gate', name: "Main Gate", top: "85%", left: "50%", zoomLevel: 1.3, color: "from-red-400 to-red-600" },
];

interface CampusMapProps {
  onBuildingClick?: (name: string) => void;
}

const CampusMap = ({ onBuildingClick }: CampusMapProps) => {
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const [mapScale, setMapScale] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const draggingRef = useRef<{
    id: string | null;
    container: HTMLElement | null;
  }>({ id: null, container: null });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement | null>(null);

  const [labels, setLabels] = useState(() => {
    try {
      const raw = localStorage.getItem('campusMapLabelPositions');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // filter out any removed labels (like 'boundary') so old persisted data doesn't reintroduce them
          const filtered = parsed.filter((l: any) => l && l.id !== 'boundary');
          // force updated default positions for canteen and basketball so they sit correctly
          return filtered.map((l: any) => {
            const def = defaultLabels.find(d => d.id === l.id);
            if (!def) return l;
            if (l.id === 'canteen' || l.id === 'basket') {
              return { ...l, top: def.top, left: def.left, zoomLevel: def.zoomLevel };
            }
            return l;
          });
        }
      }
    } catch (e) {}
    return defaultLabels;
  });

  useEffect(() => {
    try {
      localStorage.setItem('campusMapLabelPositions', JSON.stringify(labels));
    } catch (e) {}
  }, [labels]);

  const savePositions = () => {
    try {
      localStorage.setItem('campusMapLabelPositions', JSON.stringify(labels));
    } catch (e) {}
  };

  const resetPositions = () => {
    setLabels(defaultLabels);
    try { localStorage.removeItem('campusMapLabelPositions'); } catch (e) {}
  };

  const startDrag = (id: string, e: any, isFull = false) => {
    if (!isEditing) return;
    const container = isFull ? fullscreenContainerRef.current : containerRef.current;
    if (!container) return;
    draggingRef.current = { id, container };
    (e.target as Element).setPointerCapture(e.pointerId);
    const onMove = (ev: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (ev.clientY - rect.top) / rect.height));
      setLabels(prev => prev.map(l => l.id === id ? { ...l, left: `${(x*100).toFixed(1)}%`, top: `${(y*100).toFixed(1)}%` } : l));
    };
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      draggingRef.current = { id: null, container: null };
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const handleBuildingHover = (buildingName: string, zoomLevel: number) => {
    setHoveredBuilding(buildingName);
    setMapScale(zoomLevel);
  };

  const handleBuildingLeave = () => {
    setHoveredBuilding(null);
    setMapScale(1);
  };

  const hoveredLabel = hoveredBuilding
    ? labels.find((l) => l.name === hoveredBuilding)
    : null;

  return (
    <>
      <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-6 shadow-2xl border border-white/30">
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 tracking-wide" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Campus Map
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Hover and click buildings to inspect and view real photos.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(v => !v)}
              className={`group w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 ${isEditing ? 'bg-amber-400 hover:shadow-xl' : 'bg-white/60 hover:scale-105'}`}
              title={isEditing ? 'Exit edit mode' : 'Edit label positions'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v5m16 4v1a2 2 0 01-2 2h-3m-4 0H9a2 2 0 01-2-2v-3" />
              </svg>
            </button>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-2 mb-3">
            <button onClick={savePositions} className="px-3 py-1 rounded-lg bg-emerald-500 text-white font-semibold">Save</button>
            <button onClick={resetPositions} className="px-3 py-1 rounded-lg bg-red-500 text-white font-semibold">Reset</button>
          </div>
        )}
        
        <div className="relative rounded-2xl overflow-hidden shadow-inner aspect-[6/6] lg:aspect-[16/12]">
          <div 
            className="relative w-full transition-all duration-500 ease-out"
            style={{
              transform: `scale(${mapScale})`,
              transformOrigin: hoveredLabel
                ? `${hoveredLabel.left} ${hoveredLabel.top}`
                : "center"
            }}
            ref={containerRef}
          >
            <img
              src={campusMapImg}
              alt="2.5D Isometric Campus Map of Laureate Institute of Pharmacy, Kathog"
              className="w-full h-full object-cover rounded-2xl transition-all duration-500"
              loading="lazy"
              style={{
                filter: hoveredBuilding ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)'
              }}
              onLoad={() => setImageLoaded(true)}
            />

            {!imageLoaded && (
              <div className="absolute inset-0 rounded-2xl bg-slate-200 animate-pulse" />
            )}
            
            {/* Invisible hover hotspots over buildings so hovering/clicking the image area enlarges and selects that building */}
            {labels.map((label) => (
              <div
                key={`${label.id}-hotspot`}
                className="absolute cursor-pointer"
                style={{
                  top: label.top,
                  left: label.left,
                  width: "10%",
                  height: "10%",
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => handleBuildingHover(label.name, label.zoomLevel)}
                onMouseLeave={handleBuildingLeave}
                onClick={() => onBuildingClick?.(label.name)}
              />
            ))}
            
            {labels.map((label) => (
              <div
                key={label.id}
                className="absolute transition-all duration-300"
                style={{ 
                  top: label.top, 
                  left: label.left, 
                  transform: "translate(-50%, -50%)",
                  zIndex: hoveredBuilding === label.name ? 20 : 10
                }}
              >
                <button
                  onPointerDown={(e) => startDrag(label.id, e)}
                  onMouseEnter={() => handleBuildingHover(label.name, label.zoomLevel)}
                  onMouseLeave={handleBuildingLeave}
                  onClick={() => onBuildingClick?.(label.name)}
                  className={`relative px-2.5 py-1 rounded-full font-semibold text-[11px] transition-all duration-300 ${isEditing ? 'cursor-grab' : 'cursor-pointer'} shadow-lg border-2 ${
                    hoveredBuilding === label.name 
                      ? `bg-gradient-to-r ${label.color} text-white border-white scale-110 shadow-2xl` 
                      : 'bg-white/90 backdrop-blur-sm text-slate-700 border-white/50 hover:scale-105'
                  }`}
                  title={isEditing ? 'Drag to reposition' : label.name}
                >
                  <span className="relative z-10">{label.name}</span>
                  {hoveredBuilding === label.name && (
                    <div className="absolute inset-0 rounded-full animate-ping bg-white/30"></div>
                  )}
                </button>
                
                {hoveredBuilding === label.name && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-black/80 to-black/90 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap animate-bounce">
                    Click to explore!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CampusMap;
