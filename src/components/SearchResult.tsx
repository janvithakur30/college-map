import { AlertTriangle, MapPin } from "lucide-react";

interface SearchResultProps {
  selectedBuilding?: string;
}

const buildingInfo: Record<string, { floor: string; desc: string }> = {
  "Pharmacy Block": { floor: "Main Block, Ground–3rd Floor", desc: "Houses all pharmacy departments, lecture halls, and faculty offices." },
  "IT & Management Block": { floor: "Right Wing, Ground–2nd Floor", desc: "IT labs, management classrooms, and seminar halls." },
  "Admin Block": { floor: "Central Tower", desc: "Principal office, examination cell, and student services." },
  "Basketball Court": { floor: "Central Campus", desc: "Outdoor sports facility for basketball and events." },
  "Canteen": { floor: "Left Wing", desc: "Student and staff dining area with refreshments." },
  "Laureate Park": { floor: "Front Campus", desc: "Green recreational area with benches and walking paths." },
  "Washroom": { floor: "Near Court", desc: "Common washroom facility for students and visitors." },
  "Main Gate": { floor: "Entrance", desc: "Main entrance gate with college boundary and security." },
};

const SearchResult = ({ selectedBuilding }: SearchResultProps) => {
  const info = selectedBuilding ? buildingInfo[selectedBuilding] : null;

  return (
    <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
      <div className="glass-panel rounded-2xl p-4 flex-1">
        <p className="text-xs text-muted-foreground mb-1">
          {selectedBuilding ? "Selected Location:" : "Search Results:"}
        </p>
        <div className="flex items-start gap-2">
          <MapPin className="w-5 h-5 text-campus-red mt-0.5 shrink-0" />
          <div>
            <h4 className="font-heading font-bold text-foreground">
              {selectedBuilding || "Computer Lab 1"}
            </h4>
            <p className="text-sm text-muted-foreground">
              ({info?.floor || "Main Block, 2nd Floor"})
            </p>
            {info && <p className="text-xs text-muted-foreground mt-1">{info.desc}</p>}
          </div>
        </div>
      </div>
      <div className="glass-panel rounded-2xl p-4 flex-1">
        <h4 className="font-heading font-bold text-foreground text-sm mb-2">Bottleneck Risks</h4>
        <div className="flex items-center gap-2 p-2 rounded-xl bg-accent/20">
          <AlertTriangle className="w-5 h-5 text-accent" />
          <div>
            <p className="text-sm font-semibold text-foreground">Science Block</p>
            <p className="text-xs text-muted-foreground">Water Leak Detected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
