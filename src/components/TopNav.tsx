import { useState, useRef, useEffect } from "react";
import { Home, User, Bell, Settings, Volume2, VolumeX } from "lucide-react";

const TopNav = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Blue by Yung Kai - sweet music track
  const musicTrack = "/audio/Blue-Yung-Kai (1).mp3";

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  // Auto-play music when component mounts
  useEffect(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(() => {
        // Auto-play might be blocked by browser
      });
    }
  }, []);
  return (
    <>
    <header className="bg-white/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-2xl shadow-black/5 rounded-3xl px-6 py-4 mx-6 mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-amber-400 to-sky-500 flex items-center justify-center shadow-lg ring-2 ring-white/60 ring-offset-2 ring-offset-white/20">
              <Home className="w-6 h-6 text-white drop-shadow" />
            </div>
            <div>
              <span className="font-bold text-xl text-slate-800 tracking-wide" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Laureate Campus Atlas
              </span>
              <p className="text-xs text-slate-500">Immersive Digital Map System</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleMute}
            className="group w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            title={isMuted ? 'Unmute Music' : 'Mute Music'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
          <button className="group relative w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
            <Bell className="w-5 h-5 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
          </button>
          <button className="group w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
            <Settings className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3 ml-4 pl-4 border-l-2 border-white/30">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-700">Admin User</p>
              <p className="text-xs text-slate-500">Campus Guide</p>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    {/* Hidden Audio Element */}
    <audio
      ref={audioRef}
      src={musicTrack}
      loop
      preload="auto"
    />
    </>
  );
};

export default TopNav;
