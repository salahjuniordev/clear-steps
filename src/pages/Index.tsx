import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle, Sparkles, ShieldCheck, Search, Stethoscope, MapPin, Bell, HeartPulse, Globe2, Users, BookOpen, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-afyapulse.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const partners = ["OMS", "UNICEF", "MSF", "Ministère Santé", "Croix-Rouge", "Africa CDC", "USAID"];

function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { value, ref };
}

const Counter = ({ target, suffix, label, Icon }: { target: number; suffix: string; label: string; Icon: typeof BookOpen }) => {
  const { value, ref } = useCountUp(target);
  const display = value >= 1000 ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k` : value.toString();
  return (
    <div ref={ref} className="text-center sm:text-left">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/10 text-primary-foreground mb-3">
        <Icon className="h-5 w-5" />
      </span>
      <div className="font-mono text-3xl sm:text-4xl font-bold text-primary-foreground tabular-nums">
        {display}{suffix}
      </div>
      <div className="mt-1 text-sm text-primary-foreground/70">{label}</div>
    </div>
  );
};

const Index = () => {
  const { t } = useLanguage();

  const counters = [
    { value: 25, suffix: "+", label: t("index.counter1"), icon: BookOpen },
    { value: 200, suffix: "+", label: t("index.counter2"), icon: MapPin },
    { value: 10, suffix: "", label: t("index.counter3"), icon: Globe2 },
    { value: 50000, suffix: "+", label: t("index.counter4"), icon: Users },
  ];

  const whyChoose = [
    { icon: ShieldCheck, title: t("index.why.1.title"), desc: t("index.why.1.desc") },
    { icon: Globe2, title: t("index.why.2.title"), desc: t("index.why.2.desc") },
    { icon: HeartPulse, title: t("index.why.3.title"), desc: t("index.why.3.desc") },
    { icon: MapPin, title: t("index.why.4.title"), desc: t("index.why.4.desc") },
    { icon: Sparkles, title: t("index.why.5.title"), desc: t("index.why.5.desc") },
    { icon: Bell, title: t("index.why.6.title"), desc: t("index.why.6.desc") },
  ];

  const testimonials = [
    { name: "Aïcha N.", role: t("index.testi.1.role"), text: t("index.testi.1.text"), rating: 5 },
    { name: "Dr. Etienne M.", role: t("index.testi.2.role"), text: t("index.testi.2.text"), rating: 5 },
    { name: "Samuel K.", role: t("index.testi.3.role"), text: t("index.testi.3.text"), rating: 5 },
  ];

  const featured = [
    { name: "Paludisme", category: t("dcat.Infectieuse"), color: "bg-warning/10 text-warning ring-warning/20", desc: t("index.featured.d1.desc") },
    { name: "Typhoïde", category: t("dcat.Infectieuse"), color: "bg-warning/10 text-warning ring-warning/20", desc: t("index.featured.d2.desc") },
    { name: "VIH / SIDA", category: t("dcat.Chronique"), color: "bg-info/10 text-info ring-info/20", desc: t("index.featured.d3.desc") },
    { name: "Choléra", category: t("dcat.Infectieuse"), color: "bg-warning/10 text-warning ring-warning/20", desc: t("index.featured.d4.desc") },
    { name: "Diabète", category: t("dcat.Chronique"), color: "bg-info/10 text-info ring-info/20", desc: t("index.featured.d5.desc") },
    { name: "Hypertension", category: t("dcat.Chronique"), color: "bg-info/10 text-info ring-info/20", desc: t("index.featured.d6.desc") },
  ];

  const steps = [
    { icon: Search, title: t("index.steps.1.title"), desc: t("index.steps.1.desc") },
    { icon: Sparkles, title: t("index.steps.2.title"), desc: t("index.steps.2.desc") },
    { icon: Stethoscope, title: t("index.steps.3.title"), desc: t("index.steps.3.desc") },
  ];

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="container-tight grid lg:grid-cols-12 gap-10 lg:gap-12 items-center py-16 sm:py-20 lg:py-28">
          <div className="lg:col-span-7 animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/10">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse-ring" />
              {t("index.hero.badge")}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-primary">
              {t("index.hero.title1")} <span className="text-primary-glow">{t("index.hero.title2")}</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-foreground/70 leading-relaxed">
              {t("index.hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/maladies">{t("index.hero.cta1")} <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="soft" size="lg">
                <Link to="/quiz">{t("index.hero.cta2")}</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-5 text-xs text-foreground/60">
              <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary-glow" /> {t("index.hero.trust1")}</div>
              <div className="flex items-center gap-1.5"><MessageCircle className="h-4 w-4 text-primary-glow" /> {t("index.hero.trust2")}</div>
            </div>
          </div>

          <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-primary-glow/10 blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-[2rem] shadow-elevated ring-1 ring-border bg-card">
                <img
                  src={heroImg}
                  alt={t("index.hero.imgAlt")}
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
                    <div className="text-xs text-foreground/60">{t("index.hero.verifiedTag")}</div>
                    <div className="text-sm font-semibold text-primary">{t("index.hero.verifiedSub")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTERS */}
      <section className="container-tight -mt-6 sm:-mt-10 relative z-10" aria-label={t("index.counters.aria")}>
        <div className="rounded-3xl bg-stats text-primary-foreground shadow-elevated p-8 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {counters.map((c) => (
            <Counter key={c.label} target={c.value} suffix={c.suffix} label={c.label} Icon={c.icon} />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-tight py-20 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-glow">{t("index.why.eyebrow")}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary">
            {t("index.why.title")}
          </h2>
          <p className="mt-3 text-foreground/70">
            {t("index.why.sub")}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChoose.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl bg-card ring-1 ring-border p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-smooth"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary group-hover:bg-primary-gradient group-hover:text-primary-foreground transition-smooth">
                <item.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container-tight py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary-glow">{t("index.testi.eyebrow")}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary">
              {t("index.testi.title")}
            </h2>
            <p className="mt-3 text-foreground/70">
              {t("index.testi.sub")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((tm) => (
              <figure
                key={tm.name}
                className="relative rounded-2xl bg-card ring-1 ring-border p-7 shadow-soft hover:shadow-elevated transition-smooth"
              >
                <Quote className="absolute -top-3 left-6 h-7 w-7 text-primary-glow bg-card rounded-full p-1 ring-1 ring-border" aria-hidden />
                <div className="flex gap-0.5 mb-4" aria-label={t("index.testi.ratingAria").replace("{n}", String(tm.rating))}>
                  {Array.from({ length: tm.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <blockquote className="text-sm text-foreground/80 leading-relaxed">
                  « {tm.text} »
                </blockquote>
                <figcaption className="mt-5 pt-5 border-t border-border">
                  <div className="text-sm font-semibold text-primary">{tm.name}</div>
                  <div className="text-xs text-foreground/60">{tm.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DISEASES */}
      <section className="container-tight py-20 sm:py-24">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary-glow">{t("index.featured.eyebrow")}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary">{t("index.featured.title")}</h2>
            <p className="mt-2 text-foreground/70 max-w-xl">
              {t("index.featured.sub")}
            </p>
          </div>
          <Button asChild variant="ghost" className="text-primary">
            <Link to="/maladies">{t("index.featured.cta")} <ArrowRight className="h-4 w-4" /></Link>
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
                {t("index.featured.read")} <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container-tight py-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary-glow">{t("index.steps.eyebrow")}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary">{t("index.steps.title")}</h2>
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
            <MessageCircle className="h-3.5 w-3.5" /> {t("index.chat.tag")}
          </span>
          <h3 className="mt-5 text-2xl sm:text-3xl font-bold leading-tight">{t("index.chat.title")}</h3>
          <p className="mt-3 text-primary-foreground/80 max-w-md">
            {t("index.chat.sub")}
          </p>
          <Button asChild size="lg" className="mt-7 bg-background text-primary hover:bg-background/90">
            <Link to="/chat">{t("index.chat.cta")} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="rounded-3xl bg-card ring-1 ring-border p-8 sm:p-10 shadow-soft flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-info/10 px-3 py-1.5 text-xs font-semibold text-info">
              <Sparkles className="h-3.5 w-3.5" /> {t("index.quiz.tag")}
            </span>
            <h3 className="mt-5 text-2xl sm:text-3xl font-bold text-primary leading-tight">
              {t("index.quiz.title")}
            </h3>
            <p className="mt-3 text-foreground/70 max-w-md">
              {t("index.quiz.sub")}
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/quiz">{t("index.quiz.cta")}</Link>
            </Button>
            <Button asChild variant="soft" size="lg">
              <Link to="/annuaire"><MapPin className="h-4 w-4" /> {t("index.quiz.findClinic")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="border-y border-border bg-muted/40">
        <div className="container-tight py-10 overflow-hidden">
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-foreground/50 mb-6">
            {t("index.partners")}
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
              <Bell className="h-3.5 w-3.5" /> {t("index.newsletter.tag")}
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              {t("index.newsletter.title")}
            </h3>
            <p className="mt-2 text-foreground/70">
              {t("index.newsletter.sub")}
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="flex-1 h-12 rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth"
            />
            <Button variant="hero" size="lg" type="submit">{t("index.newsletter.cta")}</Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Index;
