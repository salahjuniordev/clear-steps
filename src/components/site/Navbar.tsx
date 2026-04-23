import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Activity, Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { lang, toggle, t } = useLanguage();

  const links = [
    { to: "/maladies", label: t("nav.maladies") },
    { to: "/quiz", label: t("nav.quiz") },
    { to: "/annuaire", label: t("nav.annuaire") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/a-propos", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="container-tight flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-gradient text-primary-foreground shadow-soft transition-smooth group-hover:scale-105">
            <Activity className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="text-lg font-bold tracking-tight text-primary">
            Afya<span className="text-primary-glow">Pulse</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-smooth ${
                    isActive
                      ? "text-primary bg-secondary"
                      : "text-foreground/70 hover:text-primary hover:bg-secondary/60"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-border text-foreground/70 hover:text-primary hover:border-primary transition-smooth"
            aria-label={t("nav.langToggle")}
            title={t("nav.langToggle")}
          >
            <Languages className="h-3.5 w-3.5" />
            <span className={lang === "FR" ? "text-primary" : ""}>FR</span>
            <span className="text-border">·</span>
            <span className={lang === "EN" ? "text-primary" : ""}>EN</span>
          </button>
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
            <Link to="/chat">{t("nav.chat")}</Link>
          </Button>
          <button
            className="lg:hidden p-2 -mr-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label={t("nav.menu")}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-up">
          <ul className="container-tight py-3 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 text-sm font-medium rounded-lg ${
                      isActive ? "text-primary bg-secondary" : "text-foreground/80 hover:bg-secondary/60"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild variant="hero" className="w-full">
                <Link to="/chat" onClick={() => setOpen(false)}>{t("nav.chatMobile")}</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
