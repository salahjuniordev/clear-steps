import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Activity, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/maladies", label: "Maladies" },
  { to: "/quiz", label: "Quiz" },
  { to: "/annuaire", label: "Annuaire" },
  { to: "/blog", label: "Blog" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"FR" | "EN">("FR");

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
            onClick={() => setLang(lang === "FR" ? "EN" : "FR")}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full border border-border text-foreground/70 hover:text-primary hover:border-primary transition-smooth"
            aria-label="Toggle language"
          >
            <span className={lang === "FR" ? "text-primary" : ""}>FR</span>
            <span className="text-border">·</span>
            <span className={lang === "EN" ? "text-primary" : ""}>EN</span>
          </button>
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
            <Link to="/chat">Chatbot AI</Link>
          </Button>
          <button
            className="lg:hidden p-2 -mr-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
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
                <Link to="/chat" onClick={() => setOpen(false)}>Parler au Chatbot AI</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
