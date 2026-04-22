import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock, ArrowRight, BookOpen, Tag, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { articles, ARTICLE_CATEGORIES, formatDate, type ArticleCategory } from "@/data/articles";

const categoryColor = (cat: ArticleCategory) => {
  switch (cat) {
    case "Alerte": return "bg-warning/10 text-warning ring-warning/20";
    case "Prévention": return "bg-primary/10 text-primary ring-primary/20";
    case "Nutrition": return "bg-success/10 text-success ring-success/20";
    case "Témoignage": return "bg-accent/10 text-accent ring-accent/20";
    case "Recherche": return "bg-info/10 text-info ring-info/20";
  }
};

const Blog = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | "Toutes">("Toutes");

  useEffect(() => {
    document.title = "Blog santé · AfyaPulse";
  }, []);

  const featured = useMemo(() => articles.find((a) => a.featured), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles
      .filter((a) => activeCategory === "Toutes" || a.category === activeCategory)
      .filter((a) => {
        if (!q) return true;
        return (
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  }, [query, activeCategory]);

  return (
    <main id="main" className="min-h-screen bg-hero">
      {/* HERO */}
      <section className="container-tight pt-14 pb-10 sm:pt-20 sm:pb-12">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/10">
            <BookOpen className="h-3.5 w-3.5" /> Blog AfyaPulse
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-primary leading-tight">
            Actualités, alertes &amp; <span className="text-primary-glow">santé africaine</span>.
          </h1>
          <p className="mt-4 text-lg text-foreground/70 leading-relaxed max-w-2xl">
            Articles de fond, alertes épidémiques et témoignages — vérifiés par des médecins du Cameroun et d'Afrique francophone.
          </p>
        </div>

        {/* Search + filters */}
        <div className="mt-10 rounded-3xl bg-card ring-1 ring-border shadow-soft p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" aria-hidden />
              <label htmlFor="blog-search" className="sr-only">Rechercher un article</label>
              <Input
                id="blog-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un article, un sujet, un tag…"
                className="pl-10 h-11 rounded-xl"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Effacer la recherche"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-smooth"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
              {(["Toutes", ...ARTICLE_CATEGORIES] as const).map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 transition-smooth ${
                      isActive
                        ? "bg-primary text-primary-foreground ring-primary shadow-soft"
                        : "bg-background text-foreground/70 ring-border hover:ring-primary hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="mt-4 text-xs text-foreground/50" aria-live="polite">
            {filtered.length} article{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* FEATURED — only when no filter / search active */}
      {featured && activeCategory === "Toutes" && !query && (
        <section className="container-tight pb-12">
          <Link
            to={`/blog/${featured.slug}`}
            className="group block rounded-3xl overflow-hidden ring-1 ring-border shadow-soft hover:shadow-elevated transition-smooth bg-card"
          >
            <div className="grid lg:grid-cols-5">
              <div className={`lg:col-span-2 aspect-[16/10] lg:aspect-auto bg-gradient-to-br ${featured.cover} relative`}>
                <div className="absolute inset-0 grid place-items-center opacity-30">
                  <Sparkles className="h-24 w-24 text-primary-foreground/40" aria-hidden />
                </div>
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-card/95 backdrop-blur px-3 py-1.5 text-xs font-bold text-primary shadow-soft">
                  ★ À la une
                </span>
              </div>
              <div className="lg:col-span-3 p-7 sm:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${categoryColor(featured.category)}`}>
                    {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-foreground/60">
                    <Calendar className="h-3 w-3" /> {formatDate(featured.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-foreground/60">
                    <Clock className="h-3 w-3" /> {featured.readMinutes} min
                  </span>
                </div>
                <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary leading-tight group-hover:text-primary-glow transition-smooth">
                  {featured.title}
                </h2>
                <p className="mt-3 text-foreground/70 leading-relaxed">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-gradient text-primary-foreground font-semibold text-sm">
                    {featured.author.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-primary">{featured.author}</div>
                    {featured.authorRole && <div className="text-xs text-foreground/60">{featured.authorRole}</div>}
                  </div>
                  <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-primary-glow group-hover:gap-2 transition-all">
                    Lire l'article <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ARTICLE GRID */}
      <section className="container-tight pb-20">
        {filtered.length === 0 ? (
          <div className="rounded-3xl bg-card ring-1 ring-border p-12 text-center shadow-soft">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary mx-auto">
              <Search className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-primary">Aucun article trouvé</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Essaie un autre mot-clé ou réinitialise les filtres.
            </p>
            <Button
              variant="soft"
              className="mt-6"
              onClick={() => {
                setQuery("");
                setActiveCategory("Toutes");
              }}
            >
              Réinitialiser
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a) => (
              <article
                key={a.slug}
                className="group rounded-2xl bg-card ring-1 ring-border shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-smooth overflow-hidden flex flex-col"
              >
                <Link to={`/blog/${a.slug}`} className="block" aria-label={`Lire ${a.title}`}>
                  <div className={`aspect-[16/10] bg-gradient-to-br ${a.cover} relative`}>
                    <div className="absolute inset-0 grid place-items-center opacity-25">
                      <BookOpen className="h-14 w-14 text-primary-foreground/40" aria-hidden />
                    </div>
                    <span className={`absolute top-3 left-3 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 backdrop-blur bg-card/90 ${categoryColor(a.category)}`}>
                      {a.category}
                    </span>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-foreground/55">
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(a.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {a.readMinutes} min</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-primary leading-snug">
                    <Link to={`/blog/${a.slug}`} className="group-hover:text-primary-glow transition-smooth">
                      {a.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed line-clamp-3">{a.excerpt}</p>
                  <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-primary font-semibold text-xs">
                        {a.author.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                      </span>
                      <span className="text-xs font-semibold text-foreground/80 truncate max-w-[120px]">{a.author}</span>
                    </div>
                    <Link
                      to={`/blog/${a.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary-glow hover:gap-2 transition-all"
                    >
                      Lire <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* NEWSLETTER CTA */}
      <section className="container-tight pb-20">
        <div className="rounded-3xl bg-primary-gradient text-primary-foreground p-8 sm:p-12 shadow-elevated relative overflow-hidden">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary-foreground/10 blur-2xl" aria-hidden />
          <div className="relative max-w-2xl">
            <Badge className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/15 border-0">
              <Tag className="h-3 w-3 mr-1" /> Newsletter santé
            </Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold">
              Reçois nos articles &amp; alertes directement par email.
            </h2>
            <p className="mt-3 text-primary-foreground/80">
              Une fois par semaine, sans spam. Désinscription en un clic.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex flex-col sm:flex-row gap-3"
            >
              <label htmlFor="newsletter-email" className="sr-only">Adresse email</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="ton@email.com"
                className="flex-1 h-12 rounded-xl bg-primary-foreground/15 backdrop-blur border border-primary-foreground/20 px-4 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
              />
              <Button type="submit" size="lg" className="bg-background text-primary hover:bg-background/90">
                Je m'abonne
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
