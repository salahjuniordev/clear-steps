import { useEffect, useMemo, useState } from "react";
import { Mail, MessageCircle, MapPin, Phone, Send, AlertTriangle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

const Contact = () => {
  const { t, lang } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useSeo({
    title: lang === "FR" ? "Contact · AfyaPulse" : "Contact us · AfyaPulse",
    description: lang === "FR"
      ? "Une question, un partenariat, un signalement ? Contacte l'équipe AfyaPulse à Yaoundé et Douala. Réponse sous 48h."
      : "A question, a partnership, a report? Reach out to the AfyaPulse team in Yaoundé and Douala. Reply within 48h.",
    canonical: "/contact",
    image: "/afyapulse-og.png",
  });

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t("contact.err.name")).max(100, t("contact.err.name")),
        email: z.string().trim().email(t("contact.err.email")).max(255, t("contact.err.email")),
        subject: z.enum(["general", "partner", "press", "report"], {
          errorMap: () => ({ message: t("contact.err.subject") }),
        }),
        message: z.string().trim().min(10, t("contact.err.message")).max(1000, t("contact.err.message")),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  // Re-validate displayed errors when language switches
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    const result = schema.safeParse({ name, email, subject, message });
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as string;
        if (touched[k]) next[k] = issue.message;
      }
      setErrors(next);
    } else {
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const validateField = (field: string, values = { name, email, subject, message }) => {
    const result = schema.safeParse(values);
    if (result.success) {
      setErrors((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
      return;
    }
    const issue = result.error.issues.find((i) => i.path[0] === field);
    setErrors((prev) => {
      const next = { ...prev };
      if (issue) next[field] = issue.message;
      else delete next[field];
      return next;
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    const result = schema.safeParse({ name, email, subject, message });
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as string;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      toast({ title: t("contact.err.fix"), variant: "destructive" });
      return;
    }
    setErrors({});
    toast({ title: t("contact.sent") });
    setName(""); setEmail(""); setSubject(""); setMessage("");
    setTouched({});
  };

  const fieldClass = (k: string) =>
    errors[k] ? "border-destructive focus-visible:ring-destructive" : "";

  return (
    <main id="main" className="min-h-screen bg-hero">
      {/* HERO */}
      <section className="container-tight pt-14 pb-10 sm:pt-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/10">
            <Mail className="h-3.5 w-3.5" /> {t("contact.eyebrow")}
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-primary leading-tight">{t("contact.title")}</h1>
          <p className="mt-5 text-lg text-foreground/70 leading-relaxed">{t("contact.intro")}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container-tight pb-20">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* FORM */}
          <form
            onSubmit={onSubmit}
            noValidate
            className="lg:col-span-3 rounded-3xl bg-card ring-1 ring-border p-6 sm:p-8 shadow-soft"
          >
            <h2 className="text-xl font-semibold text-primary">{t("contact.formTitle")}</h2>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">{t("contact.name")}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (touched.name) validateField("name", { name: e.target.value, email, subject, message });
                  }}
                  onBlur={() => { setTouched((p) => ({ ...p, name: true })); validateField("name"); }}
                  placeholder={t("contact.namePh")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-err" : undefined}
                  className={fieldClass("name")}
                  maxLength={100}
                />
                {errors.name && <p id="name-err" className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">{t("contact.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched.email) validateField("email", { name, email: e.target.value, subject, message });
                  }}
                  onBlur={() => { setTouched((p) => ({ ...p, email: true })); validateField("email"); }}
                  placeholder="you@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-err" : undefined}
                  className={fieldClass("email")}
                  maxLength={255}
                />
                {errors.email && <p id="email-err" className="text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <Label htmlFor="subject">{t("contact.subject")}</Label>
              <Select
                value={subject}
                onValueChange={(v) => {
                  setSubject(v);
                  setTouched((p) => ({ ...p, subject: true }));
                  validateField("subject", { name, email, subject: v, message });
                }}
              >
                <SelectTrigger id="subject" aria-invalid={!!errors.subject} className={fieldClass("subject")}>
                  <SelectValue placeholder={t("contact.subjectPh")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">{t("contact.subjectGeneral")}</SelectItem>
                  <SelectItem value="partner">{t("contact.subjectPartner")}</SelectItem>
                  <SelectItem value="press">{t("contact.subjectPress")}</SelectItem>
                  <SelectItem value="report">{t("contact.subjectReport")}</SelectItem>
                </SelectContent>
              </Select>
              {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <Label htmlFor="message">{t("contact.message")}</Label>
              <Textarea
                id="message"
                rows={6}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (touched.message) validateField("message", { name, email, subject, message: e.target.value });
                }}
                onBlur={() => { setTouched((p) => ({ ...p, message: true })); validateField("message"); }}
                placeholder={t("contact.messagePh")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-err" : undefined}
                className={fieldClass("message")}
                maxLength={1000}
              />
              <div className="flex justify-between text-xs">
                {errors.message
                  ? <p id="message-err" className="text-destructive">{errors.message}</p>
                  : <span />}
                <span className="text-foreground/50">{message.length}/1000</span>
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="mt-6 w-full sm:w-auto">
              <Send className="h-4 w-4" /> {t("contact.send")}
            </Button>
          </form>

          {/* SIDE INFO */}
          <aside className="lg:col-span-2 flex flex-col gap-5">
            <div className="rounded-3xl bg-card ring-1 ring-border p-6 shadow-soft">
              <h3 className="text-base font-semibold text-primary">{t("contact.infoTitle")}</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success shrink-0">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <a href="https://wa.me/237600000000" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary-glow transition-smooth">
                      +237 6 00 00 00 00
                    </a>
                    <p className="text-xs text-foreground/60 mt-0.5">{t("contact.whatsapp")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary shrink-0">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <a href="mailto:hello@afyapulse.africa" className="font-semibold text-primary hover:text-primary-glow transition-smooth">
                      hello@afyapulse.africa
                    </a>
                    <p className="text-xs text-foreground/60 mt-0.5">{t("contact.emailLabel")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent shrink-0">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-primary">{t("contact.address")}</div>
                    <p className="text-xs text-foreground/60 mt-0.5">{t("contact.addressLine")}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-warning/10 ring-1 ring-warning/30 p-6">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-warning/20 text-warning shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-warning">{t("contact.urgentTitle")}</h3>
                  <p className="mt-1.5 text-sm text-foreground/70 leading-relaxed">{t("contact.urgentText")}</p>
                  <Button asChild variant="destructive" size="sm" className="mt-4">
                    <a href="tel:15">
                      <Phone className="h-4 w-4" /> {t("contact.urgentBtn")}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Contact;
