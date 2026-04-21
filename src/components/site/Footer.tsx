import { Link } from "react-router-dom";
import { Activity, Phone } from "lucide-react";

export const Footer = () => (
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
          La santé bat au cœur de l'Afrique.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-warning/15 px-3 py-1.5 text-xs font-semibold text-warning ring-1 ring-warning/30">
          <Phone className="h-3.5 w-3.5" /> Urgences SAMU · 15-999
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">Plateforme</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/70">
          <li><Link to="/maladies" className="hover:text-primary-foreground transition-smooth">Bibliothèque</Link></li>
          <li><Link to="/quiz" className="hover:text-primary-foreground transition-smooth">Quiz santé</Link></li>
          <li><Link to="/annuaire" className="hover:text-primary-foreground transition-smooth">Annuaire</Link></li>
          <li><Link to="/chat" className="hover:text-primary-foreground transition-smooth">Chatbot AI</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">Organisation</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/70">
          <li><Link to="/a-propos" className="hover:text-primary-foreground transition-smooth">À propos</Link></li>
          <li><Link to="/blog" className="hover:text-primary-foreground transition-smooth">Blog</Link></li>
          <li><Link to="/contact" className="hover:text-primary-foreground transition-smooth">Contact</Link></li>
          <li><a href="#" className="hover:text-primary-foreground transition-smooth">Mentions légales</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container-tight py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
        <p>© 2025 AfyaPulse · Tous droits réservés</p>
        <p>Préparé par XEON-CORE × Hands On Pixels</p>
      </div>
    </div>
  </footer>
);
