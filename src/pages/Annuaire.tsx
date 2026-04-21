import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  X,
  Phone,
  Navigation,
  MapPin,
  Clock,
  List,
  Map as MapIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clinics, clinicTypes, typeStyles, type Clinic } from "@/data/clinics";

type View = "list" | "map";

const Annuaire = () => {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<Clinic["type"] | "Tous">("Tous");
  const [view, setView] = useState<View>("list");
  const [focused, setFocused] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clinics.filter((c) => {
      const matchType = activeType === "Tous" || c.type === activeType;
      const matchQ =
        !q ||
        c.city.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.specialties.some((s) => s.toLowerCase().includes(q));
      return matchType && matchQ;
    });
  }, [query, activeType]);

  return (
    <main className="min-h-screen bg-hero">
      <div className="container-tight pt-12 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-primary transition-smooth"
        >
          <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
        </Link>

        <header className="mt-8 max-w-2xl animate-fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-glow">
            Annuaire santé
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-primary leading-tight">
            Médecins &amp; cliniques près de toi
          </h1>
          <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
            Recherche par ville ou spécialité, appelle directement ou obtiens l'itinéraire vers
            la structure de santé la plus proche.
          </p>
        </header>

        {/* Search + filters */}
        <div className="mt-10 rounded-2xl bg-card ring-1 ring-border p-5 sm:p-6 shadow-soft">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une ville, un nom ou une spécialité..."
              className="h-12 pl-11 pr-11 text-base rounded-xl"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-foreground/50 hover:text-primary hover:bg-secondary transition-smooth"
                aria-label="Effacer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(["Tous", ...clinicTypes] as const).map((t) => {
                const active = activeType === t;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveType(t)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ring-1 transition-smooth ${
                      active
                        ? "bg-primary text-primary-foreground ring-primary"
                        : "bg-background text-foreground/70 ring-border hover:ring-primary/40 hover:text-primary"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <div className="inline-flex rounded-full bg-secondary p-1 ring-1 ring-border">
              <button
                onClick={() => setView("list")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth ${
                  view === "list" ? "bg-card text-primary shadow-soft" : "text-foreground/60"
                }`}
              >
                <List className="h-3.5 w-3.5" /> Liste
              </button>
              <button
                onClick={() => setView("map")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth ${
                  view === "map" ? "bg-card text-primary shadow-soft" : "text-foreground/60"
                }`}
              >
                <MapIcon className="h-3.5 w-3.5" /> Carte
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-foreground/60">
          {filtered.length} structure{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}
        </p>

        {/* List view */}
        {view === "list" && (
          <div className="mt-4 grid lg:grid-cols-2 gap-5">
            {filtered.map((c) => (
              <ClinicCard key={c.id} clinic={c} />
            ))}
          </div>
        )}

        {/* Map view */}
        {view === "map" && (
          <div className="mt-4 grid lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 rounded-2xl bg-card ring-1 ring-border shadow-soft overflow-hidden order-2 lg:order-1">
              <SimpleMap clinics={filtered} focused={focused} onSelect={setFocused} />
            </div>
            <div className="lg:col-span-2 space-y-3 order-1 lg:order-2 max-h-[640px] overflow-y-auto pr-1">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFocused(c.id)}
                  className={`w-full text-left rounded-2xl bg-card ring-1 p-4 shadow-soft transition-smooth ${
                    focused === c.id ? "ring-primary" : "ring-border hover:ring-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${typeStyles[c.type]}`}>
                      {c.type}
                    </span>
                    <span className="text-[11px] text-foreground/50">{c.region}</span>
                  </div>
                  <div className="mt-2 font-semibold text-primary">{c.name}</div>
                  <div className="text-xs text-foreground/60 mt-0.5 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {c.city}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl bg-card ring-1 ring-border p-12 text-center">
            <p className="text-foreground/60">Aucune structure ne correspond à votre recherche.</p>
            <Button variant="soft" className="mt-4" onClick={() => { setQuery(""); setActiveType("Tous"); }}>
              Réinitialiser
            </Button>
          </div>
        )}

        {/* Emergency banner */}
        <div className="mt-10 rounded-2xl bg-destructive/10 ring-1 ring-destructive/20 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-destructive text-destructive-foreground">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs font-semibold text-destructive">Urgence médicale</div>
              <div className="font-bold text-primary text-lg">SAMU Cameroun · 15-999</div>
            </div>
          </div>
          <Button asChild variant="default" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            <a href="tel:15999">Appeler maintenant</a>
          </Button>
        </div>
      </div>
    </main>
  );
};

const ClinicCard = ({ clinic }: { clinic: Clinic }) => {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`;
  const telHref = `tel:${clinic.phone.replace(/\s/g, "")}`;
  return (
    <article className="rounded-2xl bg-card ring-1 ring-border p-6 shadow-soft hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${typeStyles[clinic.type]}`}>
            {clinic.type}
          </span>
          <span className="text-xs text-foreground/50">{clinic.region}</span>
        </div>
      </div>
      <h2 className="mt-3 text-lg font-semibold text-primary">{clinic.name}</h2>
      <div className="mt-2 space-y-1.5 text-sm text-foreground/70">
        <div className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary-glow shrink-0" /> {clinic.address}</div>
        <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary-glow shrink-0" /> {clinic.hours}</div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {clinic.specialties.map((s) => (
          <span key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button asChild variant="hero" size="sm" className="flex-1 min-w-[140px]">
          <a href={telHref}><Phone className="h-4 w-4" /> Appeler</a>
        </Button>
        <Button asChild variant="soft" size="sm" className="flex-1 min-w-[140px]">
          <a href={mapsUrl} target="_blank" rel="noreferrer">
            <Navigation className="h-4 w-4" /> Itinéraire
          </a>
        </Button>
      </div>
    </article>
  );
};

/** Lightweight SVG map of Cameroon-region pins. Avoids external deps. */
const SimpleMap = ({
  clinics: items,
  focused,
  onSelect,
}: {
  clinics: Clinic[];
  focused: string | null;
  onSelect: (id: string) => void;
}) => {
  // Cameroon bounding box approx
  const minLng = 8.5, maxLng = 16.2;
  const minLat = 1.7, maxLat = 13.1;
  const w = 600, h = 720;
  const project = (lat: number, lng: number) => ({
    x: ((lng - minLng) / (maxLng - minLng)) * w,
    y: h - ((lat - minLat) / (maxLat - minLat)) * h,
  });
  const focusedClinic = items.find((c) => c.id === focused);

  return (
    <div className="relative w-full bg-secondary/40">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="land" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(var(--primary-glow) / 0.15)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.05)" />
          </radialGradient>
        </defs>
        <rect width={w} height={h} fill="url(#grid)" />
        {/* stylized cameroon silhouette */}
        <path
          d="M 180 80 Q 280 50 380 90 L 460 180 Q 480 280 440 360 L 460 440 Q 420 540 360 600 L 320 680 Q 240 700 180 660 L 140 560 Q 100 460 130 380 L 110 280 Q 130 160 180 80 Z"
          fill="url(#land)"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="1.5"
        />
        <text x={w / 2} y={40} textAnchor="middle" className="fill-primary/40" fontSize="14" fontWeight="600">
          CAMEROUN
        </text>
        {items.map((c) => {
          const { x, y } = project(c.lat, c.lng);
          const isFocused = focused === c.id;
          const colorMap = {
            "Hôpital": "hsl(var(--primary))",
            "Clinique": "hsl(var(--info))",
            "Urgences": "hsl(var(--destructive))",
            "Pharmacie": "hsl(var(--accent))",
          } as const;
          return (
            <g
              key={c.id}
              transform={`translate(${x}, ${y})`}
              className="cursor-pointer"
              onClick={() => onSelect(c.id)}
            >
              {isFocused && (
                <circle r={18} fill={colorMap[c.type]} opacity="0.2" className="animate-pulse-ring" />
              )}
              <circle r={isFocused ? 9 : 6} fill={colorMap[c.type]} stroke="white" strokeWidth="2" />
            </g>
          );
        })}
      </svg>

      {focusedClinic && (
        <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-card ring-1 ring-border shadow-elevated p-4 animate-fade-up">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="font-semibold text-primary">{focusedClinic.name}</div>
              <div className="text-xs text-foreground/60 flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" /> {focusedClinic.city}, {focusedClinic.region}
              </div>
            </div>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${typeStyles[focusedClinic.type]}`}>
              {focusedClinic.type}
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            <Button asChild variant="hero" size="sm" className="flex-1">
              <a href={`tel:${focusedClinic.phone.replace(/\s/g, "")}`}><Phone className="h-4 w-4" /> Appeler</a>
            </Button>
            <Button asChild variant="soft" size="sm" className="flex-1">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${focusedClinic.lat},${focusedClinic.lng}`}
                target="_blank"
                rel="noreferrer"
              >
                <Navigation className="h-4 w-4" /> Itinéraire
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Annuaire;
