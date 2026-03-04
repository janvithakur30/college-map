import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TopNav from "@/components/TopNav";
import LeftSidebar from "@/components/LeftSidebar";
import CampusMap from "@/components/CampusMap";
import QuickInfo from "@/components/QuickInfo";
import SearchResult from "@/components/SearchResult";
import BuildingCard from "@/components/BuildingCard";
import { buildings } from "@/data/buildings";
import campusMapImg from "@/assets/campus-map.png";
import laureVideo from "@/assets/laure_video.mp4";

const Index = () => {
  const [selectedNav, setSelectedNav] = useState("Dashboard");
  const [selectedBuilding, setSelectedBuilding] = useState<string | undefined>();
  const [showWelcome, setShowWelcome] = useState(true);
  const [inspectorBuildingId, setInspectorBuildingId] = useState<string | null>(null);

  const inspectorBuilding = inspectorBuildingId
    ? buildings.find((b) => b.id === inspectorBuildingId) ?? null
    : null;

  const handleBuildingClick = (name: string) => {
    setSelectedBuilding(name);
    const match = buildings.find((b) => b.title === name);
    if (match) {
      setInspectorBuildingId(match.id);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden">
      {/* Full-screen campus background for refraction */}
      <img
        src={campusMapImg}
        alt="Campus background"
        className="fixed inset-0 z-0 h-full w-full object-cover"
        loading="lazy"
      />

      {/* Subtle dark overlay for contrast */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/30" />

      {/* Foreground content (dashboard) */}
      <div className="relative z-10 pointer-events-auto">
        <TopNav />
        <div className="flex gap-6 p-6 pt-24 max-w-[1800px] mx-auto">
          {/* Floating Left Sidebar */}
          <div className="hidden lg:block w-72">
            <div className="m-4 rounded-3xl">
              <LeftSidebar selected={selectedNav} onSelect={setSelectedNav} />
            </div>
          </div>

          {/* Center Content - Map and Search Results */}
          <div className="flex-1 flex flex-col gap-6">
            <CampusMap onBuildingClick={handleBuildingClick} />
            <SearchResult selectedBuilding={selectedBuilding} />
          </div>

          {/* Floating Right Panel */}
          <div className="hidden lg:block w-80">
            <div className="m-4 rounded-3xl">
              <QuickInfo />
            </div>
          </div>
        </div>
      </div>

      {/* Building Inspector Card */}
      <AnimatePresence>
        {inspectorBuilding && (
          <>
            {/* Click-outside area */}
            <motion.button
              type="button"
              className="fixed inset-0 z-[60] bg-transparent"
              onClick={() => setInspectorBuildingId(null)}
              aria-label="Close building inspector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              key={inspectorBuilding.id}
              className="fixed bottom-6 right-6 z-[70] w-[90vw] max-w-sm sm:max-w-md"
              initial={{ opacity: 0, y: 60, x: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, x: 40, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <BuildingCard
                building={inspectorBuilding}
                onClose={() => setInspectorBuildingId(null)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cinematic Welcome Screen */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed inset-0 z-20"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="relative h-full w-full">
              {/* Video background */}
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={laureVideo}
                autoPlay
                muted
                loop
                playsInline
              />

              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Centered content */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
                <div className="max-w-3xl space-y-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-200/80">
                    Welcome to
                  </p>
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                    style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
                  >
                    Laureate Institute of Pharmacy
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-slate-200/90">
                    Digital Campus Map System &mdash; explore every corner of the campus
                    in an immersive, game-inspired interface.
                  </p>
                </div>

                <motion.button
                  onClick={() => setShowWelcome(false)}
                  className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-10 py-3 text-sm font-semibold text-white backdrop-blur-md shadow-lg shadow-black/40 hover:bg-white/20 hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Enter Campus</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
