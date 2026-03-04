import { LayoutDashboard, BookOpen, FlaskConical, Library, Building2, Trees, Search } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BookOpen, label: "Classrooms" },
  { icon: FlaskConical, label: "Labs" },
  { icon: Library, label: "Library" },
  { icon: Building2, label: "Offices" },
  { icon: Trees, label: "Campus" },
];

interface LeftSidebarProps {
  onSelect?: (label: string) => void;
  selected?: string;
}

const LeftSidebar = ({ onSelect, selected = "Dashboard" }: LeftSidebarProps) => {
  const [search, setSearch] = useState("");

  return (
    <aside className="bg-white/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-2xl shadow-black/5 rounded-3xl p-6 flex flex-col gap-6 w-full h-full">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-wide" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Campus Control Hub
        </h2>
        <p className="text-sm text-slate-500 mt-1">Select zones and drill into details.</p>
      </div>
      
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onSelect?.(item.label)}
            className={`group flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
              selected === item.label 
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg" 
                : "bg-white/50 text-slate-700 hover:bg-white/80 hover:shadow-md"
            }`}
          >
            <div className={`p-2 rounded-full ${
              selected === item.label 
                ? "bg-white/20" 
                : "bg-gradient-to-br from-yellow-200 to-yellow-300"
            }`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span>{item.label}</span>
            {selected === item.label && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search the campus..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 backdrop-blur-sm text-slate-700 placeholder:text-slate-400 border-2 border-white/50 outline-none focus:ring-4 focus:ring-red-200 focus:border-red-300 transition-all font-medium"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 text-white font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Advanced Filter
          </button>
          <button className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700 font-bold text-sm shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            Reset
          </button>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
