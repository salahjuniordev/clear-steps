import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Activity,
  Pill,
  MapPin,
  Share2,
  Check,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { diseases, categoryStyles, severityStyles } from "@/data/diseases";
import { toast } from "@/hooks/use-toast";

const toneStyles = {
  warning: "bg-warning/10 text-warning ring-warning/20",
  success: "bg-success/10 text-success ring-success/20",
  info: "bg-info/10 text-info ring-info/20",
} as const;

const MaladieDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const disease = diseases.find((d) => d.slug === slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (disease) document.title = `${disease.name} — AfyaPulse`;
    return () => {
      document.title = "AfyaPulse — Comprendre pour mieux se soigner";
    };
  }, [disease]);

  if (!disease) {
    return (
      <main id="main" className="min-h-screen bg-hero">
        <div className="container-tight py-24 text-center">
          <h1 className="text-3xl font-bold text-primary">Fiche introuvable</h1>
          <p className="mt-3 text-foreground/70">La maladie demandée n'existe pas dans notre bibliothèque.</p>
          <Button asChild variant="hero" className="mt-6">
            <Link to="/maladies">Retour à la bibliothèque</Link>
          </Button>
        </div>
      </main>
    );
  }

  const share = async () => {
    const url = window.location.href;
    const data = {
      title: `${disease.name} — AfyaPulse`,
      text: disease.shortDesc,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({ title: "Lien copié", description: "Le lien de la fiche a été copié dans le presse-papier." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled */
    }
  };

  // JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: disease.name,
    description: disease.shortDesc,
    signOrSymptom: disease.symptoms.map((s) => ({ "@type": "MedicalSignOrSymptom", name: s })),
  };

  return (
    <main id="main" className="min-h-screen bg-hero">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="container-tight pt-12 pb-20">
        <nav aria-label="Fil d'Ariane" className="text-sm">
          <Link to="/maladies" className="inline-flex items-center gap-1.5 font-medium text-foreground/60 hover:text-primary transition-smooth">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Bibliothèque des maladies
          </Link>
        </nav>

        {/* Hero */}
        <header className="mt-6 rounded-3xl bg-primary-gradient text-primary-foreground p-7 sm:p-10 shadow-elevated animate-fade-up">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${categoryStyles[disease.category]} bg-primary-foreground/15 ring-primary-foreground/20 text-primary-foreground`}>
              {disease.category}
            </span>
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${severityStyles[disease.severity]} bg-primary-foreground/15 ring-primary-foreground/20 text-primary-foreground`}>
              Gravité : {disease.severity}
            </span>
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">{disease.name}</h1>
          <p className="mt-3 max-w-2xl text-base sm:text-lg text-primary-foreground/85 leading-relaxed">
            {disease.shortDesc}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-primary-foreground/80">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Régions : {disease.regions.join(", ")}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={share}
              size="lg"
              className="bg-background text-primary hover:bg-background/90"
              aria-label={`Partager la fiche ${disease.name}`}
            >
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Share2 className="h-4 w-4" aria-hidden="true" />}
              {copied ? "Lien copié" : "Partager la fiche"}
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/quiz">Faire le quiz santé</Link>
            </Button>
          </div>
        </header>

        {/* Sections */}
        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          <Section icon={<Activity className="h-4 w-4" aria-hidden="true" />} title="Symptômes" tone="warning" items={disease.symptoms} />
          <Section icon={<ShieldCheck className="h-4 w-4" aria-hidden="true" />} title="Prévention" tone="success" items={disease.prevention} />
          <Section icon={<Pill className="h-4 w-4" aria-hidden="true" />} title="Traitement" tone="info" items={disease.treatment} />
        </div>

        {/* Disclaimer + actions */}
        <aside
          role="note"
          aria-label="Avertissement médical"
          className="mt-10 rounded-2xl bg-warning/10 ring-1 ring-warning/20 p-5 sm:p-6 flex gap-4"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-warning/15 text-warning shrink-0">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="text-sm text-foreground/80 leading-relaxed">
            <strong className="text-warning">Important :</strong> ces informations sont éducatives et ne
            remplacent pas l'avis d'un professionnel de santé. En cas d'urgence, contactez le SAMU
            Cameroun au <strong className="text-destructive">15-999</strong>.
          </div>
        </aside>

        <div className="mt-8 rounded-3xl bg-card ring-1 ring-border p-6 sm:p-8 shadow-soft flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary">
              <Stethoscope className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <div className="font-semibold text-primary">Besoin d'une orientation ?</div>
              <div className="text-sm text-foreground/70">Trouve une clinique proche ou parle à notre AI.</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero">
              <Link to="/annuaire">Trouver une clinique</Link>
            </Button>
            <Button asChild variant="soft">
              <Link to="/chat">Demander à l'AI</Link>
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
};

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
  <section
    aria-labelledby={`section-${title}`}
    className="rounded-2xl bg-card ring-1 ring-border p-6 shadow-soft"
  >
    <div className="flex items-center gap-2.5">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ${toneStyles[tone]}`}>
        {icon}
      </span>
      <h2 id={`section-${title}`} className="text-lg font-semibold text-primary">{title}</h2>
    </div>
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-glow" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  </section>
);

export default MaladieDetail;
