import { Link } from "react-router-dom";
import { Activity, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-tight py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-foreground/10">
              <Activity className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">AfyaPulse</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-primary-foreground/70 italic">
            {t("footer.tagline")}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-warning/15 px-3 py-1.5 text-xs font-semibold text-warning ring-1 ring-warning/30">
            <Phone className="h-3.5 w-3.5" /> {t("footer.emergency")}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">{t("footer.platform")}</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/maladies" className="hover:text-primary-foreground transition-smooth">{t("footer.library")}</Link></li>
            <li><Link to="/quiz" className="hover:text-primary-foreground transition-smooth">{t("footer.quizLink")}</Link></li>
            <li><Link to="/annuaire" className="hover:text-primary-foreground transition-smooth">{t("footer.directory")}</Link></li>
            <li><Link to="/chat" className="hover:text-primary-foreground transition-smooth">{t("nav.chat")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">{t("footer.org")}</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/a-propos" className="hover:text-primary-foreground transition-smooth">{t("nav.about")}</Link></li>
            <li><Link to="/blog" className="hover:text-primary-foreground transition-smooth">{t("nav.blog")}</Link></li>
            <li><Link to="/contact" className="hover:text-primary-foreground transition-smooth">{t("nav.contact")}</Link></li>
            <li><a href="#" className="hover:text-primary-foreground transition-smooth">{t("footer.legal")}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-tight py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} AfyaPulse · {t("footer.rights")}</p>
          <p>
            {t("footer.buildBy")}{" "}
            <a
              href="https://salahjuniordev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-foreground hover:text-primary-foreground/80 underline-offset-4 hover:underline transition-smooth"
            >
              Salah Junior Dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
