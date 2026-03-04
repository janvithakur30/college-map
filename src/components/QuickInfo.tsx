import { Building2, FlaskConical, Library, FileText, MapPin, GraduationCap } from "lucide-react";

const stats = [
  { icon: Building2, label: "Facilities", sub: "8 buildings", count: 20, color: "from-blue-400 to-blue-500", bgColor: "bg-blue-100" },
  { icon: FlaskConical, label: "Labs", sub: "10 active", count: 10, color: "from-red-400 to-red-500", bgColor: "bg-red-100" },
  { icon: Library, label: "Libraries", sub: "1 floor", count: 1, color: "from-green-400 to-green-500", bgColor: "bg-green-100" },
  { icon: FileText, label: "Departments", sub: "3 majors", count: 3, color: "from-purple-400 to-purple-500", bgColor: "bg-purple-100" },
];

const recentSearches = [
  { icon: FlaskConical, label: "Computer Lab 1", sub: "Main Block", time: "2 min ago", color: "from-amber-400 to-amber-500" },
  { icon: GraduationCap, label: "Physics Lab 2", sub: "Science Block", time: "5 min ago", color: "from-cyan-400 to-cyan-500" },
  { icon: MapPin, label: "Student Services", sub: "Admin Block", time: "1 hour ago", color: "from-pink-400 to-pink-500" },
];

const QuickInfo = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Game Stats Panel */}
      <div className="bg-white/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-2xl shadow-black/5 rounded-3xl p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-slate-800 tracking-wide" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Campus Metrics
          </h3>
          <p className="text-sm text-slate-500 mt-1">Your achievements!</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {stats.map((item, index) => (
            <div
              key={item.label}
              className="group relative p-4 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-white/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-md`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-700">{item.count}</div>
                <p className="text-sm font-semibold text-slate-600">{item.label}</p>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-2xl shadow-black/5 rounded-3xl p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-slate-800 tracking-wide" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Activity Log
          </h3>
          <p className="text-sm text-slate-500 mt-1">Your recent searches!</p>
        </div>
        
        <div className="space-y-3">
          {recentSearches.map((item, index) => (
            <div
              key={item.label}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/60 to-white/30 hover:from-white/80 hover:to-white/50 transform hover:scale-102 transition-all duration-300 cursor-pointer border border-white/30"
              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-slate-700">{item.label}</p>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">{item.time}</p>
                <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickInfo;
