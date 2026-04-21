import { useMemo, useState } from "react";
import { ArrowLeft, Search, X, ShieldCheck, Activity, Pill, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  diseases,
  categories,
  categoryStyles,
  severityStyles,
  type Disease,
  type DiseaseCategory,
} from "@/data/diseases";

const Maladies = () => {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<DiseaseCategory | "Toutes">("Toutes");
  const [selected, setSelected] = useState<Disease | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return diseases.filter((d) => {
      const matchCat = activeCat === "Toutes" || d.category === activeCat;
      const matchQ =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.shortDesc.toLowerCase().includes(q) ||
        d.symptoms.some((s) => s.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [query, activeCat]);

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
            Bibliothèque
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-primary leading-tight">
            Bibliothèque des maladies
          </h1>
          <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
            Recherche, filtres par catégorie, fiches détaillées : symptômes, prévention et traitement.
            Sources OMS &amp; MSAS.
          </p>
        </header>

        {/* Search + filters */}
        <div className="mt-10 rounded-2xl bg-card ring-1 ring-border p-5 sm:p-6 shadow-soft">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une maladie, un symptôme..."
              className="h-12 pl-11 pr-11 text-base rounded-xl"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-foreground/50 hover:text-primary hover:bg-secondary transition-smooth"
                aria-label="Effacer la recherche"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(["Toutes", ...categories] as const).map((cat) => {
              const active = activeCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ring-1 transition-smooth ${
                    active
                      ? "bg-primary text-primary-foreground ring-primary"
                      : "bg-background text-foreground/70 ring-border hover:ring-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <p className="mt-6 text-sm text-foreground/60">
          {filtered.length} {filtered.length > 1 ? "fiches trouvées" : "fiche trouvée"}
        </p>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((d) => (
            <button
              key={d.slug}
              onClick={() => setSelected(d)}
              className="group text-left rounded-2xl bg-card ring-1 ring-border p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-smooth"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${categoryStyles[d.category]}`}>
                  {d.category}
                </span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${severityStyles[d.severity]}`}>
                  {d.severity}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-primary">{d.name}</h2>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed line-clamp-3">
                {d.shortDesc}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-glow group-hover:gap-2 transition-all">
                Voir la fiche →
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl bg-card ring-1 ring-border p-12 text-center">
            <p className="text-foreground/60">Aucune maladie ne correspond à votre recherche.</p>
            <Button variant="soft" className="mt-4" onClick={() => { setQuery(""); setActiveCat("Toutes"); }}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
          {selected && (
            <>
              <div className="bg-primary-gradient text-primary-foreground p-7 sm:p-8 rounded-t-lg">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[11px] font-semibold">
                    {selected.category}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[11px] font-semibold">
                    Gravité : {selected.severity}
                  </span>
                </div>
                <DialogHeader className="mt-4 space-y-2 text-left">
                  <DialogTitle className="text-3xl font-bold text-primary-foreground">
                    {selected.name}
                  </DialogTitle>
                  <DialogDescription className="text-primary-foreground/80 text-base leading-relaxed">
                    {selected.shortDesc}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary-foreground/80">
                  <MapPin className="h-3.5 w-3.5" />
                  Régions : {selected.regions.join(", ")}
                </div>
              </div>

              <div className="p-7 sm:p-8 space-y-7">
                <Section icon={<Activity className="h-4 w-4" />} title="Symptômes" tone="warning" items={selected.symptoms} />
                <Section icon={<ShieldCheck className="h-4 w-4" />} title="Prévention" tone="success" items={selected.prevention} />
                <Section icon={<Pill className="h-4 w-4" />} title="Traitement" tone="info" items={selected.treatment} />

                <div className="rounded-2xl bg-warning/10 ring-1 ring-warning/20 p-4 text-sm text-foreground/80">
                  <strong className="text-warning">Important :</strong> ces informations sont éducatives.
                  Consultez toujours un professionnel de santé pour un diagnostic.
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="hero">
                    <Link to="/quiz">Faire le quiz santé</Link>
                  </Button>
                  <Button asChild variant="soft">
                    <Link to="/annuaire">Trouver une clinique</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

const toneStyles = {
  warning: "bg-warning/10 text-warning ring-warning/20",
  success: "bg-success/10 text-success ring-success/20",
  info: "bg-info/10 text-info ring-info/20",
} as const;

const Section = ({
  icon,
  title,
  items,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  tone: keyof typeof toneStyles;
}) => (
  <div>
    <div className="flex items-center gap-2.5">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ${toneStyles[tone]}`}>
        {icon}
      </span>
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
    </div>
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-glow" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Maladies;
