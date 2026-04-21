import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  Baby,
  User,
  HeartPulse,
  UserRound,
  MapPin,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  FileDown,
} from "lucide-react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

type Profile = "Adulte" | "Enfant" | "Femme enceinte" | "Personne âgée";

const profiles: { id: Profile; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
  { id: "Adulte", icon: User, desc: "18 à 59 ans" },
  { id: "Enfant", icon: Baby, desc: "Moins de 18 ans" },
  { id: "Femme enceinte", icon: HeartPulse, desc: "Suivi prénatal" },
  { id: "Personne âgée", icon: UserRound, desc: "60 ans et +" },
];

const regions = [
  "Adamaoua", "Centre", "Est", "Extrême-Nord", "Littoral",
  "Nord", "Nord-Ouest", "Ouest", "Sud", "Sud-Ouest",
];

const symptoms = [
  "Fièvre", "Maux de tête", "Toux", "Fatigue", "Vomissements",
  "Diarrhée", "Douleurs abdominales", "Frissons", "Perte d'appétit",
  "Douleurs musculaires", "Éruption cutanée", "Essoufflement",
  "Vertiges", "Soif intense", "Perte de poids", "Sueurs nocturnes",
  "Raideur de la nuque", "Jaunisse", "Saignements", "Vision floue",
  "Douleurs articulaires", "Nausées", "Constipation", "Urines foncées",
];

interface Recommendation {
  level: "Léger" | "Modéré" | "Urgent";
  title: string;
  message: string;
  suggested: string[];
  actions: string[];
}

const buildRecommendation = (profile: Profile, region: string, picked: string[]): Recommendation => {
  const urgent = ["Raideur de la nuque", "Saignements", "Essoufflement", "Jaunisse"];
  const infectious = ["Fièvre", "Frissons", "Sueurs nocturnes", "Maux de tête"];
  const digestive = ["Diarrhée", "Vomissements", "Douleurs abdominales", "Soif intense"];

  const hasUrgent = picked.some((s) => urgent.includes(s));
  const infCount = picked.filter((s) => infectious.includes(s)).length;
  const digCount = picked.filter((s) => digestive.includes(s)).length;

  const suggested: string[] = [];
  if (infCount >= 2) suggested.push("Paludisme", "Typhoïde");
  if (digCount >= 2) suggested.push("Choléra", "Gastro-entérite");
  if (picked.includes("Toux") && picked.includes("Fièvre")) suggested.push("Tuberculose");
  if (picked.includes("Éruption cutanée") && profile === "Enfant") suggested.push("Rougeole");
  if (suggested.length === 0) suggested.push("Consultation générale recommandée");

  if (hasUrgent || picked.length >= 6) {
    return {
      level: "Urgent",
      title: "Consultation médicale urgente recommandée",
      message: `Plusieurs signes importants ont été identifiés (${profile.toLowerCase()}, région ${region}). Rendez-vous rapidement dans un centre de santé ou contactez les urgences au 15-999.`,
      suggested: [...new Set(suggested)],
      actions: ["Contacter le SAMU au 15-999", "Se rendre aux urgences les plus proches", "Ne pas s'auto-médicamenter"],
    };
  }
  if (picked.length >= 3) {
    return {
      level: "Modéré",
      title: "Consultation conseillée dans les 24-48h",
      message: `Vos symptômes méritent un avis médical. En tant que ${profile.toLowerCase()} en région ${region}, prenez rendez-vous avec un médecin.`,
      suggested: [...new Set(suggested)],
      actions: ["Consulter un médecin sous 48h", "Bien s'hydrater", "Surveiller la température", "Faire le test du paludisme si fièvre"],
    };
  }
  return {
    level: "Léger",
    title: "Surveillance recommandée",
    message: `Vos symptômes semblent modérés. Reposez-vous et surveillez leur évolution. Si l'état persiste plus de 48h, consultez.`,
    suggested: [...new Set(suggested)],
    actions: ["Repos et hydratation", "Surveillance des symptômes", "Reconsulter si aggravation", "Discuter avec notre chatbot AI"],
  };
};

const stepsTotal = 4;

const exportPdf = (profile: Profile, region: string, picked: string[], rec: Recommendation) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const margin = 48;
  let y = 56;

  doc.setFillColor(13, 87, 64);
  doc.rect(0, 0, W, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("AfyaPulse", margin, 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Recapitulatif du quiz sante", margin, 70);
  doc.text(new Date().toLocaleDateString("fr-FR", { dateStyle: "long" }), W - margin, 70, { align: "right" });

  y = 130;
  doc.setTextColor(13, 87, 64);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Profil", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  y += 18;
  doc.text(`Profil : ${profile}`, margin, y); y += 16;
  doc.text(`Region : ${region}`, margin, y); y += 16;
  doc.text(`Symptomes : ${picked.length} selectionne(s)`, margin, y); y += 22;

  doc.setTextColor(13, 87, 64);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Symptomes declares", margin, y); y += 16;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  const sympText = picked.length ? picked.join(" • ") : "Aucun";
  const sympLines = doc.splitTextToSize(sympText, W - margin * 2);
  doc.text(sympLines, margin, y);
  y += sympLines.length * 14 + 16;

  const levelColors: Record<Recommendation["level"], [number, number, number]> = {
    "Urgent": [220, 53, 69],
    "Modéré": [230, 126, 34],
    "Léger": [39, 174, 96],
  };
  const [r, g, b] = levelColors[rec.level];
  doc.setFillColor(r, g, b);
  doc.rect(margin, y, W - margin * 2, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Niveau : ${rec.level}`, margin + 12, y + 18);
  y += 44;

  doc.setTextColor(13, 87, 64);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const titleLines = doc.splitTextToSize(rec.title, W - margin * 2);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 18 + 6;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  const msgLines = doc.splitTextToSize(rec.message, W - margin * 2);
  doc.text(msgLines, margin, y);
  y += msgLines.length * 14 + 18;

  const drawList = (title: string, items: string[], x: number) => {
    doc.setTextColor(13, 87, 64);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, x, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(10.5);
    let yy = y + 16;
    items.forEach((it) => {
      const lines = doc.splitTextToSize(`• ${it}`, (W - margin * 2) / 2 - 10);
      doc.text(lines, x, yy);
      yy += lines.length * 13;
    });
    return yy;
  };
  const yLeft = drawList("Pistes possibles", rec.suggested, margin);
  const yRight = drawList("A faire maintenant", rec.actions, margin + (W - margin * 2) / 2 + 10);
  y = Math.max(yLeft, yRight) + 18;

  if (y > 720) { doc.addPage(); y = 60; }
  doc.setFillColor(255, 244, 230);
  doc.rect(margin, y, W - margin * 2, 60, "F");
  doc.setTextColor(120, 70, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Avertissement", margin + 12, y + 18);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const dis = "Ce resultat est indicatif et ne remplace pas un avis medical. Urgences SAMU Cameroun : 15-999.";
  const disLines = doc.splitTextToSize(dis, W - margin * 2 - 24);
  doc.text(disLines, margin + 12, y + 34);

  doc.setFontSize(9);
  doc.setTextColor(140, 140, 140);
  doc.text("AfyaPulse — La sante bat au coeur de l'Afrique", margin, 820);
  doc.text("afyapulse.app", W - margin, 820, { align: "right" });

  doc.save(`afyapulse-quiz-${new Date().toISOString().slice(0, 10)}.pdf`);
};

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [region, setRegion] = useState<string>("");
  const [picked, setPicked] = useState<string[]>([]);

  const recommendation = useMemo(
    () => (profile && region ? buildRecommendation(profile, region, picked) : null),
    [profile, region, picked],
  );

  const canNext =
    (step === 0 && !!profile) ||
    (step === 1 && !!region) ||
    (step === 2 && picked.length > 0) ||
    step === 3;

  const reset = () => { setStep(0); setProfile(null); setRegion(""); setPicked([]); };

  const togglePick = (s: string) =>
    setPicked((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleExport = () => {
    if (!profile || !region || !recommendation) return;
    try {
      exportPdf(profile, region, picked, recommendation);
      toast({ title: "PDF généré", description: "Ton récap a été téléchargé." });
    } catch {
      toast({ title: "Erreur", description: "Impossible de générer le PDF.", variant: "destructive" });
    }
  };

  return (
    <main id="main" className="min-h-screen bg-hero">
      <div className="container-tight pt-12 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-primary transition-smooth"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Retour à l'accueil
        </Link>

        <header className="mt-8 max-w-2xl animate-fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-glow">
            Auto-évaluation santé
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-primary leading-tight">
            Quiz santé en 2 minutes
          </h1>
          <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
            Réponds à quelques questions pour recevoir une orientation personnalisée. Cette évaluation
            n'est pas un diagnostic médical.
          </p>
        </header>

        {step < 4 && (
          <div className="mt-10 max-w-3xl">
            <div className="flex items-center justify-between mb-2 text-xs font-semibold text-foreground/60">
              <span id="quiz-step-label">Étape {step + 1} sur {stepsTotal}</span>
              <span>{Math.round(((step + 1) / stepsTotal) * 100)}%</span>
            </div>
            <Progress
              value={((step + 1) / stepsTotal) * 100}
              className="h-2"
              aria-labelledby="quiz-step-label"
              aria-valuenow={step + 1}
              aria-valuemin={1}
              aria-valuemax={stepsTotal}
            />
          </div>
        )}

        <div className="mt-8 max-w-3xl">
          <div className="rounded-3xl bg-card ring-1 ring-border p-6 sm:p-10 shadow-soft animate-fade-up">
            {step === 0 && (
              <fieldset>
                <legend className="text-2xl font-semibold text-primary">Quel est ton profil ?</legend>
                <p className="mt-2 text-foreground/70">Choisis l'option qui te correspond.</p>
                <div role="radiogroup" aria-label="Profil" className="mt-6 grid sm:grid-cols-2 gap-3">
                  {profiles.map(({ id, icon: Icon, desc }) => {
                    const active = profile === id;
                    return (
                      <button
                        key={id}
                        role="radio"
                        aria-checked={active}
                        onClick={() => setProfile(id)}
                        className={`text-left rounded-2xl p-5 ring-1 transition-smooth ${
                          active
                            ? "bg-primary-gradient text-primary-foreground ring-primary shadow-elevated"
                            : "bg-background ring-border hover:ring-primary/40 hover:-translate-y-0.5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`grid h-11 w-11 place-items-center rounded-xl ${active ? "bg-primary-foreground/15" : "bg-secondary text-primary"}`}>
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <div>
                            <div className="font-semibold">{id}</div>
                            <div className={`text-xs ${active ? "text-primary-foreground/75" : "text-foreground/60"}`}>{desc}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset>
                <legend className="text-2xl font-semibold text-primary">Dans quelle région es-tu ?</legend>
                <p className="mt-2 text-foreground/70">Cela permet d'adapter les conseils aux maladies endémiques.</p>
                <div role="radiogroup" aria-label="Région du Cameroun" className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {regions.map((r) => {
                    const active = region === r;
                    return (
                      <button
                        key={r}
                        role="radio"
                        aria-checked={active}
                        onClick={() => setRegion(r)}
                        className={`rounded-xl px-4 py-3 text-sm font-medium ring-1 transition-smooth ${
                          active
                            ? "bg-primary text-primary-foreground ring-primary"
                            : "bg-background ring-border text-foreground/80 hover:ring-primary/40 hover:text-primary"
                        }`}
                      >
                        {r}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <legend className="text-2xl font-semibold text-primary">Quels symptômes ressens-tu ?</legend>
                <p className="mt-2 text-foreground/70">Sélectionne tous ceux qui s'appliquent (au moins un).</p>
                <div role="group" aria-label="Symptômes" className="mt-6 flex flex-wrap gap-2">
                  {symptoms.map((s) => {
                    const active = picked.includes(s);
                    return (
                      <button
                        key={s}
                        role="checkbox"
                        aria-checked={active}
                        onClick={() => togglePick(s)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 transition-smooth ${
                          active
                            ? "bg-primary text-primary-foreground ring-primary"
                            : "bg-background text-foreground/70 ring-border hover:ring-primary/40 hover:text-primary"
                        }`}
                      >
                        {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />} {s}
                      </button>
                    );
                  })}
                </div>
                <p aria-live="polite" className="mt-4 text-xs text-foreground/50">
                  {picked.length} symptôme{picked.length > 1 ? "s" : ""} sélectionné{picked.length > 1 ? "s" : ""}
                </p>
              </fieldset>
            )}

            {step === 3 && (
              <>
                <h2 className="text-2xl font-semibold text-primary">Récapitulatif</h2>
                <p className="mt-2 text-foreground/70">Vérifie tes réponses avant d'obtenir tes recommandations.</p>
                <div className="mt-6 space-y-4">
                  <RecapRow icon={<User className="h-4 w-4" aria-hidden="true" />} label="Profil" value={profile!} onEdit={() => setStep(0)} />
                  <RecapRow icon={<MapPin className="h-4 w-4" aria-hidden="true" />} label="Région" value={region} onEdit={() => setStep(1)} />
                  <div className="rounded-2xl bg-secondary/60 ring-1 ring-border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-card text-primary ring-1 ring-border">
                          <Stethoscope className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-foreground/60">Symptômes</div>
                          <div className="font-semibold text-primary">{picked.length} sélectionné{picked.length > 1 ? "s" : ""}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setStep(2)}
                        className="text-xs font-semibold text-primary-glow hover:underline"
                        aria-label="Modifier les symptômes"
                      >
                        Modifier
                      </button>
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-1.5 list-none p-0">
                      {picked.map((s) => (
                        <li key={s} className="rounded-full bg-card px-2.5 py-1 text-xs ring-1 ring-border">{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {step === 4 && recommendation && (
              <>
                <div className="flex items-center gap-2.5">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                    recommendation.level === "Urgent" ? "bg-destructive/10 text-destructive ring-destructive/20" :
                    recommendation.level === "Modéré" ? "bg-warning/10 text-warning ring-warning/20" :
                    "bg-success/10 text-success ring-success/20"
                  }`}>
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Niveau : {recommendation.level}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary leading-tight">
                  {recommendation.title}
                </h2>
                <p className="mt-3 text-foreground/70 leading-relaxed">{recommendation.message}</p>

                <div className="mt-7 grid sm:grid-cols-2 gap-4">
                  <section aria-label="Pistes possibles" className="rounded-2xl bg-secondary/50 ring-1 ring-border p-5">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Stethoscope className="h-4 w-4" aria-hidden="true" /> Pistes possibles
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                      {recommendation.suggested.map((s) => (
                        <li key={s} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-glow shrink-0" aria-hidden="true" />{s}</li>
                      ))}
                    </ul>
                  </section>
                  <section aria-label="Actions à faire" className="rounded-2xl bg-secondary/50 ring-1 ring-border p-5">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" /> À faire maintenant
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                      {recommendation.actions.map((a) => (
                        <li key={a} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />{a}</li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="mt-6 rounded-2xl bg-warning/10 ring-1 ring-warning/20 p-4 text-sm text-foreground/80">
                  <strong className="text-warning">Disclaimer :</strong> ce résultat est indicatif et ne remplace pas un avis médical.
                  Urgences SAMU Cameroun : <strong className="text-destructive">15-999</strong>.
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button onClick={handleExport} variant="hero" aria-label="Exporter le récapitulatif en PDF">
                    <FileDown className="h-4 w-4" aria-hidden="true" /> Exporter en PDF
                  </Button>
                  <Button asChild variant="soft">
                    <Link to="/chat">En parler au chatbot AI</Link>
                  </Button>
                  <Button asChild variant="soft">
                    <Link to="/annuaire">Trouver une clinique</Link>
                  </Button>
                  <Button variant="ghost" onClick={reset} aria-label="Recommencer le quiz">
                    <RotateCcw className="h-4 w-4" aria-hidden="true" /> Refaire le quiz
                  </Button>
                </div>
              </>
            )}
          </div>

          {step < 4 && (
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                aria-label="Étape précédente"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Précédent
              </Button>
              <Button
                variant="hero"
                size="lg"
                disabled={!canNext}
                onClick={() => setStep((s) => s + 1)}
                aria-label={step === 3 ? "Voir mes recommandations" : "Étape suivante"}
              >
                {step === 3 ? "Voir mes recommandations" : "Continuer"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const RecapRow = ({
  icon, label, value, onEdit,
}: { icon: React.ReactNode; label: string; value: string; onEdit: () => void }) => (
  <div className="rounded-2xl bg-secondary/60 ring-1 ring-border p-4 flex items-center justify-between gap-3">
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-card text-primary ring-1 ring-border">{icon}</span>
      <div>
        <div className="text-xs font-semibold text-foreground/60">{label}</div>
        <div className="font-semibold text-primary">{value}</div>
      </div>
    </div>
    <button onClick={onEdit} className="text-xs font-semibold text-primary-glow hover:underline" aria-label={`Modifier ${label.toLowerCase()}`}>
      Modifier
    </button>
  </div>
);

export default Quiz;
