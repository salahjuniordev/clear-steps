import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  diseases,
  categories,
  categoryStyles,
  severityStyles,
  type DiseaseCategory,
} from "@/data/diseases";

const Maladies = () => {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<DiseaseCategory | "Toutes">("Toutes");

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
    <main id="main" className="min-h-screen bg-hero">
      <div className="container-tight pt-12 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-primary transition-smooth rounded"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Retour à l'accueil
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
        <section
          aria-label="Recherche et filtres"
          className="mt-10 rounded-2xl bg-card ring-1 ring-border p-5 sm:p-6 shadow-soft"
        >
          <label htmlFor="disease-search" className="sr-only">
            Rechercher une maladie ou un symptôme
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" aria-hidden="true" />
            <Input
              id="disease-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une maladie, un symptôme..."
              className="h-12 pl-11 pr-11 text-base rounded-xl"
              aria-describedby="disease-results-count"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-foreground/50 hover:text-primary hover:bg-secondary transition-smooth"
                aria-label="Effacer la recherche"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div role="group" aria-label="Filtrer par catégorie" className="mt-4 flex flex-wrap gap-2">
            {(["Toutes", ...categories] as const).map((cat) => {
              const active = activeCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  aria-pressed={active}
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
        </section>

        <p id="disease-results-count" aria-live="polite" className="mt-6 text-sm text-foreground/60">
          {filtered.length} {filtered.length > 1 ? "fiches trouvées" : "fiche trouvée"}
        </p>

        <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0">
          {filtered.map((d) => (
            <li key={d.slug}>
              <Link
                to={`/maladie/${d.slug}`}
                className="group block h-full rounded-2xl bg-card ring-1 ring-border p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-smooth"
                aria-label={`Voir la fiche complète : ${d.name}, catégorie ${d.category}, gravité ${d.severity}`}
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
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-glow group-hover:gap-2 transition-all" aria-hidden="true">
                  Voir la fiche →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <div role="status" className="mt-10 rounded-2xl bg-card ring-1 ring-border p-12 text-center">
            <p className="text-foreground/60">Aucune maladie ne correspond à votre recherche.</p>
            <Button variant="soft" className="mt-4" onClick={() => { setQuery(""); setActiveCat("Toutes"); }}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Maladies;
