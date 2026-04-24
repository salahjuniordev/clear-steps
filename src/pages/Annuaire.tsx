import { useEffect, useMemo, useState } from "react";
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
  Filter,
  LocateFixed,
  ArrowDownUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  clinics,
  clinicTypes,
  typeStyles,
  allCommunes,
  allSpecialties,
  distanceKm,
  type Clinic,
} from "@/data/clinics";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

type View = "list" | "map";
type SortBy = "default" | "distance" | "name";
type Availability = "all" | "open" | "24h";

const Annuaire = () => {
  const { t, lang } = useLanguage();
  useSeo({
    title: lang === "FR"
      ? "Annuaire des cliniques · AfyaPulse"
      : "Clinic directory · AfyaPulse",
    description: lang === "FR"
      ? "Trouve une clinique, hôpital ou pharmacie de garde près de toi à Douala, Yaoundé et partout au Cameroun."
      : "Find a clinic, hospital or on-duty pharmacy near you in Douala, Yaoundé and across Cameroon.",
    canonical: "/annuaire",
    image: "/afyapulse-og.png",
  });
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<Clinic["type"] | "Tous">("Tous");
  const [commune, setCommune] = useState<string>("Toutes");
  const [specialty, setSpecialty] = useState<string>("Toutes");
  const [availability, setAvailability] = useState<Availability>("all");
  const [view, setView] = useState<View>("list");
  const [focused, setFocused] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("default");
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = clinics.filter((c) => {
      const matchType = activeType === "Tous" || c.type === activeType;
      const matchCommune = commune === "Toutes" || c.commune === commune;
      const matchSpecialty = specialty === "Toutes" || c.specialties.includes(specialty);
      const matchAvail =
        availability === "all" ||
        (availability === "open" && c.available) ||
        (availability === "24h" && c.hours.includes("24h"));
      const matchQ =
        !q ||
        c.city.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.commune.toLowerCase().includes(q) ||
        c.specialties.some((s) => s.toLowerCase().includes(q));
      return matchType && matchCommune && matchSpecialty && matchAvail && matchQ;
    });

    if (sortBy === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "distance" && userPos) {
      list = [...list].sort((a, b) => distanceKm(userPos, a) - distanceKm(userPos, b));
    }
    return list;
  }, [query, activeType, commune, specialty, availability, sortBy, userPos]);

  const locate = () => {
    if (!navigator.geolocation) {
      toast({ title: t("annuaire.geo.unavailable"), description: t("annuaire.geo.unavailableDesc"), variant: "destructive" });
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setSortBy("distance");
        setLocating(false);
        toast({ title: t("annuaire.geo.detected"), description: t("annuaire.geo.detectedDesc") });
      },
      () => {
        setLocating(false);
        toast({ title: t("annuaire.geo.refused"), description: t("annuaire.geo.refusedDesc"), variant: "destructive" });
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const resetFilters = () => {
    setQuery(""); setActiveType("Tous"); setCommune("Toutes");
    setSpecialty("Toutes"); setAvailability("all"); setSortBy("default");
  };

  const activeFiltersCount =
    (commune !== "Toutes" ? 1 : 0) +
    (specialty !== "Toutes" ? 1 : 0) +
    (availability !== "all" ? 1 : 0);

  useEffect(() => {
    if (activeFiltersCount > 0) setShowAdvanced(true);
  }, [activeFiltersCount]);

  return (
    <main id="main" className="min-h-screen bg-hero">
      <div className="container-tight pt-12 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-primary transition-smooth"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t("common.backHome")}
        </Link>

        <header className="mt-8 max-w-2xl animate-fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-glow">{t("annuaire.eyebrow")}</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-primary leading-tight">
            {t("annuaire.title")}
          </h1>
          <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
            {t("annuaire.intro")}
          </p>
        </header>

        <section
          aria-label={t("common.search")}
          className="mt-10 rounded-2xl bg-card ring-1 ring-border p-5 sm:p-6 shadow-soft"
        >
          <label htmlFor="clinic-search" className="sr-only">{t("annuaire.searchAria")}</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" aria-hidden="true" />
            <Input
              id="clinic-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("annuaire.searchPh")}
              className="h-12 pl-11 pr-11 text-base rounded-xl"
              aria-describedby="clinic-results-count"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-foreground/50 hover:text-primary hover:bg-secondary transition-smooth"
                aria-label={t("common.clear")}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div role="group" aria-label={t("annuaire.filterByType")} className="flex flex-wrap gap-2">
              {(["Tous", ...clinicTypes] as const).map((ty) => {
                const active = activeType === ty;
                const label = ty === "Tous" ? t("annuaire.allTypes") : t(`ctype.${ty}`);
                return (
                  <button
                    key={ty}
                    onClick={() => setActiveType(ty)}
                    aria-pressed={active}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ring-1 transition-smooth ${
                      active
                        ? "bg-primary text-primary-foreground ring-primary"
                        : "bg-background text-foreground/70 ring-border hover:ring-primary/40 hover:text-primary"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAdvanced((v) => !v)}
                aria-expanded={showAdvanced}
                aria-controls="advanced-filters"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ring-1 ring-border text-foreground/70 hover:text-primary hover:ring-primary/40 transition-smooth"
              >
                <Filter className="h-3.5 w-3.5" aria-hidden="true" />
                {t("annuaire.advanced")}
                {activeFiltersCount > 0 && (
                  <span className="ml-1 rounded-full bg-primary-glow text-primary-foreground px-1.5 text-[10px] font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div role="group" aria-label={t("annuaire.viewAria")} className="inline-flex rounded-full bg-secondary p-1 ring-1 ring-border">
                <button
                  onClick={() => setView("list")}
                  aria-pressed={view === "list"}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth ${
                    view === "list" ? "bg-card text-primary shadow-soft" : "text-foreground/60"
                  }`}
                >
                  <List className="h-3.5 w-3.5" aria-hidden="true" /> {t("annuaire.viewList")}
                </button>
                <button
                  onClick={() => setView("map")}
                  aria-pressed={view === "map"}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth ${
                    view === "map" ? "bg-card text-primary shadow-soft" : "text-foreground/60"
                  }`}
                >
                  <MapIcon className="h-3.5 w-3.5" aria-hidden="true" /> {t("annuaire.viewMap")}
                </button>
              </div>
            </div>
          </div>

          {showAdvanced && (
            <div
              id="advanced-filters"
              className="mt-5 pt-5 border-t border-border grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up"
            >
              <div>
                <label htmlFor="commune-filter" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                  {t("annuaire.commune")}
                </label>
                <select
                  id="commune-filter"
                  value={commune}
                  onChange={(e) => setCommune(e.target.value)}
                  className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="Toutes">{t("annuaire.allCommunes")}</option>
                  {allCommunes.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>

              <div>
                <label htmlFor="specialty-filter" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                  {t("annuaire.specialty")}
                </label>
                <select
                  id="specialty-filter"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="Toutes">{t("annuaire.allSpecialties")}</option>
                  {allSpecialties.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>

              <div>
                <label htmlFor="avail-filter" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                  {t("annuaire.availability")}
                </label>
                <select
                  id="avail-filter"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as Availability)}
                  className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="all">{t("annuaire.availAll")}</option>
                  <option value="open">{t("annuaire.availOpen")}</option>
                  <option value="24h">{t("annuaire.avail24")}</option>
                </select>
              </div>

              <div>
                <label htmlFor="sort-by" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                  {t("annuaire.sortBy")}
                </label>
                <div className="flex gap-2">
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className="flex-1 h-10 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="default">{t("annuaire.sortDefault")}</option>
                    <option value="name">{t("annuaire.sortName")}</option>
                    <option value="distance" disabled={!userPos}>
                      {t("annuaire.sortDistance")} {userPos ? "" : t("annuaire.geoRequired")}
                    </option>
                  </select>
                  <button
                    onClick={locate}
                    disabled={locating}
                    aria-label={t("annuaire.locateAria")}
                    className="h-10 w-10 grid place-items-center rounded-xl bg-secondary text-primary ring-1 ring-border hover:ring-primary/40 transition-smooth disabled:opacity-50"
                  >
                    <LocateFixed className={`h-4 w-4 ${locating ? "animate-pulse" : ""}`} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {(activeFiltersCount > 0 || sortBy !== "default") && (
                <div className="sm:col-span-2 lg:col-span-4">
                  <button
                    onClick={resetFilters}
                    className="text-xs font-semibold text-primary-glow hover:underline"
                  >
                    {t("annuaire.resetAll")}
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        <div id="clinic-results-count" aria-live="polite" className="mt-6 flex items-center justify-between gap-3 flex-wrap">
          <p className="text-sm text-foreground/60">
            {filtered.length} {filtered.length > 1 ? t("annuaire.found.many") : t("annuaire.found.one")}
            {sortBy === "distance" && userPos && ` · ${t("annuaire.sortedDistance")}`}
          </p>
          {sortBy === "distance" && userPos && (
            <span className="inline-flex items-center gap-1 text-xs text-primary-glow">
              <ArrowDownUp className="h-3 w-3" aria-hidden="true" /> {t("annuaire.sortActive")}
            </span>
          )}
        </div>

        {view === "list" && (
          <ul className="mt-4 grid lg:grid-cols-2 gap-5 list-none p-0">
            {filtered.map((c) => (
              <li key={c.id}><ClinicCard clinic={c} userPos={userPos} /></li>
            ))}
          </ul>
        )}

        {view === "map" && (
          <div className="mt-4 grid lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 rounded-2xl bg-card ring-1 ring-border shadow-soft overflow-hidden order-2 lg:order-1">
              <SimpleMap clinics={filtered} focused={focused} onSelect={setFocused} userPos={userPos} />
            </div>
            <ul className="lg:col-span-2 space-y-3 order-1 lg:order-2 max-h-[640px] overflow-y-auto pr-1 list-none p-0">
              {filtered.map((c) => {
                const dist = userPos ? distanceKm(userPos, c) : null;
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => setFocused(c.id)}
                      aria-pressed={focused === c.id}
                      className={`w-full text-left rounded-2xl bg-card ring-1 p-4 shadow-soft transition-smooth ${
                        focused === c.id ? "ring-primary" : "ring-border hover:ring-primary/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${typeStyles[c.type]}`}>
                          {t(`ctype.${c.type}`)}
                        </span>
                        <span className="text-[11px] text-foreground/50">
                          {dist !== null ? `${dist.toFixed(1)} km` : c.region}
                        </span>
                      </div>
                      <div className="mt-2 font-semibold text-primary">{c.name}</div>
                      <div className="text-xs text-foreground/60 mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" /> {c.commune}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {filtered.length === 0 && (
          <div role="status" className="mt-10 rounded-2xl bg-card ring-1 ring-border p-12 text-center">
            <p className="text-foreground/60">{t("annuaire.empty")}</p>
            <Button variant="soft" className="mt-4" onClick={resetFilters}>{t("common.reset")}</Button>
          </div>
        )}

        <aside aria-label={t("annuaire.emergencyTag")} className="mt-10 rounded-2xl bg-destructive/10 ring-1 ring-destructive/20 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-destructive text-destructive-foreground">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <div className="text-xs font-semibold text-destructive">{t("annuaire.emergencyTag")}</div>
              <div className="font-bold text-primary text-lg">{t("annuaire.emergencyLabel")}</div>
            </div>
          </div>
          <Button asChild variant="default" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            <a href="tel:15999" aria-label={t("common.callNow")}>{t("common.callNow")}</a>
          </Button>
        </aside>
      </div>
    </main>
  );
};

const ClinicCard = ({ clinic, userPos }: { clinic: Clinic; userPos: { lat: number; lng: number } | null }) => {
  const { t } = useLanguage();
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`;
  const telHref = `tel:${clinic.phone.replace(/\s/g, "")}`;
  const dist = userPos ? distanceKm(userPos, clinic) : null;

  return (
    <article className="h-full rounded-2xl bg-card ring-1 ring-border p-6 shadow-soft hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${typeStyles[clinic.type]}`}>
            {t(`ctype.${clinic.type}`)}
          </span>
          {clinic.available ? (
            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold bg-success/10 text-success ring-1 ring-success/20">
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" /> {t("annuaire.open")}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold bg-muted text-muted-foreground ring-1 ring-border">
              {t("annuaire.closed")}
            </span>
          )}
        </div>
        {dist !== null && (
          <span className="font-mono text-xs font-semibold text-primary-glow shrink-0">
            {dist.toFixed(1)} km
          </span>
        )}
      </div>
      <h2 className="mt-3 text-lg font-semibold text-primary">{clinic.name}</h2>
      <div className="mt-2 space-y-1.5 text-sm text-foreground/70">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-0.5 text-primary-glow shrink-0" aria-hidden="true" />
          <span>{clinic.address} · <span className="text-foreground/50">{clinic.commune}</span></span>
        </div>
        <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary-glow shrink-0" aria-hidden="true" /> {clinic.hours}</div>
      </div>
      <ul className="mt-3 flex flex-wrap gap-1.5 list-none p-0">
        {clinic.specialties.map((s) => (
          <li key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button asChild variant="hero" size="sm" className="flex-1 min-w-[140px]">
          <a href={telHref} aria-label={`${t("common.call")} ${clinic.name}`}>
            <Phone className="h-4 w-4" aria-hidden="true" /> {t("common.call")}
          </a>
        </Button>
        <Button asChild variant="soft" size="sm" className="flex-1 min-w-[140px]">
          <a href={mapsUrl} target="_blank" rel="noreferrer" aria-label={`${t("common.directions")} → ${clinic.name}`}>
            <Navigation className="h-4 w-4" aria-hidden="true" /> {t("common.directions")}
          </a>
        </Button>
      </div>
    </article>
  );
};

const SimpleMap = ({
  clinics: items, focused, onSelect, userPos,
}: {
  clinics: Clinic[];
  focused: string | null;
  onSelect: (id: string) => void;
  userPos: { lat: number; lng: number } | null;
}) => {
  const { t } = useLanguage();
  const minLng = 8.5, maxLng = 16.2;
  const minLat = 1.7, maxLat = 13.1;
  const w = 600, h = 720;
  const project = (lat: number, lng: number) => ({
    x: ((lng - minLng) / (maxLng - minLng)) * w,
    y: h - ((lat - minLat) / (maxLat - minLat)) * h,
  });
  const focusedClinic = items.find((c) => c.id === focused);
  const userProj = userPos ? project(userPos.lat, userPos.lng) : null;

  return (
    <div className="relative w-full bg-secondary/40">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block" role="img" aria-label="Carte du Cameroun avec les structures de santé">
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
        <path
          d="M 180 80 Q 280 50 380 90 L 460 180 Q 480 280 440 360 L 460 440 Q 420 540 360 600 L 320 680 Q 240 700 180 660 L 140 560 Q 100 460 130 380 L 110 280 Q 130 160 180 80 Z"
          fill="url(#land)"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="1.5"
        />
        <text x={w / 2} y={40} textAnchor="middle" className="fill-primary/40" fontSize="14" fontWeight="600">
          CAMEROUN
        </text>
        {userProj && (
          <g transform={`translate(${userProj.x}, ${userProj.y})`}>
            <circle r={14} fill="hsl(var(--info))" opacity="0.25" className="animate-pulse-ring" />
            <circle r={6} fill="hsl(var(--info))" stroke="white" strokeWidth="2" />
          </g>
        )}
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
              className="cursor-pointer focus:outline-none"
              onClick={() => onSelect(c.id)}
              tabIndex={0}
              role="button"
              aria-label={`${c.name}, ${c.type} à ${c.city}`}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(c.id); } }}
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
                <MapPin className="h-3 w-3" aria-hidden="true" /> {focusedClinic.commune}, {focusedClinic.region}
              </div>
            </div>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${typeStyles[focusedClinic.type]}`}>
              {t(`ctype.${focusedClinic.type}`)}
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            <Button asChild variant="hero" size="sm" className="flex-1">
              <a href={`tel:${focusedClinic.phone.replace(/\s/g, "")}`}><Phone className="h-4 w-4" aria-hidden="true" /> {t("common.call")}</a>
            </Button>
            <Button asChild variant="soft" size="sm" className="flex-1">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${focusedClinic.lat},${focusedClinic.lng}`}
                target="_blank" rel="noreferrer"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" /> {t("common.directions")}
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Annuaire;
