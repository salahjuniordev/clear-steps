import { useEffect, useState } from "react";
import { Mail, MessageCircle, MapPin, Phone, Send, AlertTriangle } from "lucide-react";
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

const Contact = () => {
  const { t, lang } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = lang === "FR" ? "Contact · AfyaPulse" : "Contact · AfyaPulse";
  }, [lang]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: t("contact.sent") });
    setName(""); setEmail(""); setSubject(""); setMessage("");
  };

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
            className="lg:col-span-3 rounded-3xl bg-card ring-1 ring-border p-6 sm:p-8 shadow-soft"
          >
            <h2 className="text-xl font-semibold text-primary">{t("contact.formTitle")}</h2>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">{t("contact.name")}</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder={t("contact.namePh")} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">{t("contact.email")}</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <Label htmlFor="subject">{t("contact.subject")}</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder={t("contact.subjectPh")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">{t("contact.subjectGeneral")}</SelectItem>
                  <SelectItem value="partner">{t("contact.subjectPartner")}</SelectItem>
                  <SelectItem value="press">{t("contact.subjectPress")}</SelectItem>
                  <SelectItem value="report">{t("contact.subjectReport")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <Label htmlFor="message">{t("contact.message")}</Label>
              <Textarea
                id="message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("contact.messagePh")}
              />
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
