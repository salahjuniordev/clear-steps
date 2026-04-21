import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Sparkles, ShieldCheck, Search, Stethoscope, MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-afyapulse.jpg";

const stats = [
  { value: "25+", label: "Maladies documentées" },
  { value: "200+", label: "Cliniques référencées" },
  { value: "10", label: "Régions couvertes" },
  { value: "24/7", label: "Assistant AI" },
];

const featured = [
  { name: "Paludisme", category: "Infectieuse", color: "bg-warning/10 text-warning ring-warning/20", desc: "Première cause de mortalité infantile en Afrique." },
  { name: "Typhoïde", category: "Infectieuse", color: "bg-warning/10 text-warning ring-warning/20", desc: "Liée à l'eau et aux conditions sanitaires." },
  { name: "VIH / SIDA", category: "Chronique", color: "bg-info/10 text-info ring-info/20", desc: "Prévention, dépistage et accès aux traitements." },
  { name: "Choléra", category: "Infectieuse", color: "bg-warning/10 text-warning ring-warning/20", desc: "Épidémies saisonnières — hygiène et hydratation." },
  { name: "Diabète", category: "Chronique", color: "bg-info/10 text-info ring-info/20", desc: "Gestion long terme et alimentation équilibrée." },
  { name: "Hypertension", category: "Chronique", color: "bg-info/10 text-info ring-info/20", desc: "Le tueur silencieux — dépistage régulier essentiel." },
];

const steps = [
  { icon: Search, title: "Cherche", desc: "Trouve des informations fiables sur les maladies courantes en Afrique." },
  { icon: Sparkles, title: "Comprends", desc: "Symptômes, prévention, traitement — vulgarisés en français clair." },
  { icon: Stethoscope, title: "Agis", desc: "Localise un médecin, parle à notre AI ou contacte les urgences." },
];

const partners = ["OMS", "UNICEF", "MSF", "Ministère Santé", "Croix-Rouge", "Africa CDC", "USAID"];

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="container-tight grid lg:grid-cols-12 gap-10 lg:gap-12 items-center py-16 sm:py-20 lg:py-28">
          <div className="lg:col-span-7 animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/10">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse-ring" />
              Plateforme de sensibilisation santé · Cameroun &amp; Afrique francophone
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-primary">
              Comprendre pour mieux <span className="text-primary-glow">se soigner</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-foreground/70 leading-relaxed">
              Votre guide santé pour l'Afrique. De l'information médicale fiable, en français,
              pour vous et vos proches.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/maladies">Explorer les maladies <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="soft" size="lg">
                <Link to="/quiz">Faire le quiz santé</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-5 text-xs text-foreground/60">
              <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary-glow" /> Sources OMS &amp; MSAS</div>
              <div className="flex items-center gap-1.5"><MessageCircle className="h-4 w-4 text-primary-glow" /> AI bilingue FR/EN</div>
            </div>
          </div>

          <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-primary-glow/10 blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-[2rem] shadow-elevated ring-1 ring-border bg-card">
                <img
                  src={heroImg}
                  alt="Famille africaine en bonne santé — illustration éditoriale d'AfyaPulse"
                  width={1280}
                  height={1024}
                  className="aspect-[5/4] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden sm:block rounded-2xl bg-card shadow-elevated ring-1 ring-border p-4 w-56">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs text-foreground/60">Information vérifiée</div>
                    <div className="text-sm font-semibold text-primary">Sources officielles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-tight -mt-6 sm:-mt-10 relative z-10">
        <div className="rounded-3xl bg-stats text-primary-foreground shadow-elevated p-8 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="font-mono text-3xl sm:text-4xl font-bold text-primary-foreground">{s.value}</div>
              <div className="mt-1 text-sm text-primary-foreground/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED DISEASES */}
      <section className="container-tight py-20 sm:py-24">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary-glow">Bibliothèque</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary">Maladies en vedette</h2>
            <p className="mt-2 text-foreground/70 max-w-xl">
              Les pathologies prioritaires au Cameroun et en Afrique francophone.
            </p>
          </div>
          <Button asChild variant="ghost" className="text-primary">
            <Link to="/maladies">Voir toutes les maladies <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((d) => (
            <article
              key={d.name}
              className="group rounded-2xl bg-card ring-1 ring-border p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-smooth"
            >
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${d.color}`}>
                {d.category}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-primary">{d.name}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{d.desc}</p>
              <Link to="/maladies" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-glow group-hover:gap-2 transition-all">
                Lire la fiche <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container-tight py-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary-glow">Comment ça marche</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary">Trois étapes vers une meilleure santé</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl bg-card ring-1 ring-border p-7 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-gradient text-primary-foreground">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-foreground/40">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHATBOT TEASER + QUIZ */}
      <section className="container-tight py-20 grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-primary-gradient p-8 sm:p-10 text-primary-foreground shadow-elevated relative overflow-hidden">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary-foreground/10 blur-2xl" aria-hidden />
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold">
            <MessageCircle className="h-3.5 w-3.5" /> Assistant santé AI
          </span>
          <h3 className="mt-5 text-2xl sm:text-3xl font-bold leading-tight">Tu as des symptômes ? Parle à notre AI.</h3>
          <p className="mt-3 text-primary-foreground/80 max-w-md">
            Disponible 24h/24 en français et en anglais. Réponses claires, sources vérifiées, orientation médicale.
          </p>
          <Button asChild size="lg" className="mt-7 bg-background text-primary hover:bg-background/90">
            <Link to="/chat">Démarrer la conversation <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="rounded-3xl bg-card ring-1 ring-border p-8 sm:p-10 shadow-soft flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-info/10 px-3 py-1.5 text-xs font-semibold text-info">
              <Sparkles className="h-3.5 w-3.5" /> Quiz santé
            </span>
            <h3 className="mt-5 text-2xl sm:text-3xl font-bold text-primary leading-tight">
              Évalue ta santé en 2 minutes.
            </h3>
            <p className="mt-3 text-foreground/70 max-w-md">
              Profil, région, symptômes — reçois une orientation personnalisée et des conseils adaptés.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/quiz">Commencer le quiz</Link>
            </Button>
            <Button asChild variant="soft" size="lg">
              <Link to="/annuaire"><MapPin className="h-4 w-4" /> Trouver une clinique</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="border-y border-border bg-muted/40">
        <div className="container-tight py-10 overflow-hidden">
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-foreground/50 mb-6">
            En partenariat avec
          </p>
          <div className="relative">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {[...partners, ...partners].map((p, i) => (
                <span key={i} className="text-2xl font-bold text-foreground/30 tracking-tight shrink-0">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-tight py-20">
        <div className="rounded-3xl bg-card ring-1 ring-border p-8 sm:p-12 shadow-soft grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-warning/10 px-3 py-1.5 text-xs font-semibold text-warning">
              <Bell className="h-3.5 w-3.5" /> Alertes épidémiques
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Reste informé, protège ta communauté.
            </h3>
            <p className="mt-2 text-foreground/70">
              Reçois nos conseils mensuels et alertes santé pour ton pays.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              placeholder="ton@email.com"
              className="flex-1 h-12 rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth"
            />
            <Button variant="hero" size="lg" type="submit">Je m'abonne</Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Index;
