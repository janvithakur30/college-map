import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Building } from "@/data/buildings";

interface BuildingCardProps {
  building: Building;
  onClose: () => void;
}

const BuildingCard = ({ building, onClose }: BuildingCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = building.images;
  const currentImage = images[currentIndex] ?? images[0];
  const hasMultiple = images.length > 1;

  const goNext = () => setCurrentIndex((i) => (i + 1) % images.length);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-xl backdrop-saturate-150 border border-white/20 shadow-2xl shadow-black/40">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 border border-white/20 text-slate-100 hover:bg-black/80 transition-colors"
        aria-label="Close building details"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Hero image with prev/next navigation */}
      <div className="relative h-40 w-full sm:h-48 overflow-hidden">
        <img
          src={currentImage}
          alt={`${building.title} - Photo ${currentIndex + 1}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {hasMultiple && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 border border-white/20 text-white hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 border border-white/20 text-white hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === currentIndex ? "w-5 bg-white" : "w-2 bg-white/50 hover:bg-white/70"}`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-3">
          <div className="text-left">
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-200/70">
              Building
            </p>
            <h2 className="text-lg sm:text-xl font-extrabold text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.7)]">
              {building.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 px-5 pb-5 pt-4">
        <p className="text-xs sm:text-sm text-slate-200/90">
          {building.description}
        </p>

        <div className="grid grid-cols-3 gap-2 text-center">
          {building.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/8 border border-white/10 px-2 py-2 shadow-inner"
            >
              <div className="text-[11px] text-slate-300/80">{stat.label}</div>
              <div className="text-sm font-semibold text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuildingCard;

