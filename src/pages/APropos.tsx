import { Link } from "react-router-dom";
import { Heart, Eye, ShieldCheck, Globe2, Users, Sparkles, ArrowRight, Stethoscope, Code2, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

const APropos = () => {
  const { t, lang } = useLanguage();
  useSeo({
    title: lang === "FR" ? "À propos · AfyaPulse" : "About · AfyaPulse",
    description: lang === "FR"
      ? "AfyaPulse milite pour une santé claire et accessible au Cameroun. Découvre notre mission, notre équipe et nos partenaires."
      : "AfyaPulse advocates for clear, accessible healthcare in Cameroon. Meet our mission, team and partners.",
    canonical: "/a-propos",
    image: "/afyapulse-og.png",
  });

  const values = [
    { icon: ShieldCheck, title: t("about.value1Title"), text: t("about.value1") },
    { icon: Globe2, title: t("about.value2Title"), text: t("about.value2") },
    { icon: Heart, title: t("about.value3Title"), text: t("about.value3") },
    { icon: Eye, title: t("about.value4Title"), text: t("about.value4") },
  ];

  const stats = [
    { value: "120k+", label: t("about.statUsers") },
    { value: "300+", label: t("about.statArticles") },
    { value: "850+", label: t("about.statClinics") },
    { value: "8", label: t("about.statCountries") },
  ];

  const team = [
    { name: "Dr. Aïcha Ngoma", role: lang === "FR" ? "Directrice médicale · Yaoundé" : "Medical Director · Yaoundé", icon: Stethoscope },
    { name: "Samuel Kouam", role: lang === "FR" ? "Lead engineering · Douala" : "Lead engineering · Douala", icon: Code2 },
    { name: "Marie-Claire Eyenga", role: lang === "FR" ? "Rédactrice en chef · Paris" : "Editor-in-chief · Paris", icon: Newspaper },
    { name: "Dr. Etienne Mbida", role: lang === "FR" ? "Comité scientifique" : "Scientific board", icon: Stethoscope },
  ];

  const partners = ["Ministère Santé CM", "OMS Afrique", "UNICEF", "Croix-Rouge", "CHU Yaoundé", "Institut Pasteur"];

  return (
    <main id="main" className="min-h-screen bg-hero">
      {/* HERO */}
      <section className="container-tight pt-14 pb-12 sm:pt-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/10">
            <Sparkles className="h-3.5 w-3.5" /> {t("about.eyebrow")}
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-primary leading-tight">
            {t("about.title")}
          </h1>
          <p className="mt-5 text-lg text-foreground/70 leading-relaxed">{t("about.intro")}</p>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-card ring-1 ring-border p-6 shadow-soft text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary">{s.value}</div>
              <div className="mt-1 text-xs text-foreground/60 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="container-tight pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-card ring-1 ring-border p-8 shadow-soft">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-gradient text-primary-foreground shadow-soft">
              <Heart className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-primary">{t("about.missionTitle")}</h2>
            <p className="mt-3 text-foreground/70 leading-relaxed">{t("about.missionText")}</p>
          </div>
          <div className="rounded-3xl bg-card ring-1 ring-border p-8 shadow-soft">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/20 text-accent">
              <Eye className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-primary">{t("about.visionTitle")}</h2>
            <p className="mt-3 text-foreground/70 leading-relaxed">{t("about.visionText")}</p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="container-tight pb-16">
        <h2 className="text-3xl font-bold text-primary">{t("about.valuesTitle")}</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-card ring-1 ring-border p-6 shadow-soft hover:shadow-elevated transition-smooth">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-primary">{v.title}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="container-tight pb-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-primary">{t("about.teamTitle")}</h2>
          <p className="mt-3 text-foreground/70">{t("about.teamSubtitle")}</p>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((m) => (
            <div key={m.name} className="rounded-2xl bg-card ring-1 ring-border p-6 shadow-soft text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-gradient text-primary-foreground">
                <m.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-primary">{m.name}</h3>
              <p className="mt-1 text-xs text-foreground/60 leading-relaxed">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="container-tight pb-16">
        <h2 className="text-2xl font-bold text-primary">{t("about.partnersTitle")}</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {partners.map((p) => (
            <span key={p} className="inline-flex items-center rounded-full bg-card ring-1 ring-border px-4 py-2 text-sm font-semibold text-foreground/70 shadow-soft">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-tight pb-20">
        <div className="rounded-3xl bg-primary-gradient text-primary-foreground p-8 sm:p-12 shadow-elevated relative overflow-hidden">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary-foreground/10 blur-2xl" aria-hidden />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-semibold">
              <Users className="h-3.5 w-3.5" /> Open to all
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold">{t("about.ctaTitle")}</h2>
            <p className="mt-3 text-primary-foreground/80">{t("about.ctaText")}</p>
            <Button asChild size="lg" className="mt-6 bg-background text-primary hover:bg-background/90">
              <Link to="/contact">
                {t("about.ctaBtn")} <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default APropos;
