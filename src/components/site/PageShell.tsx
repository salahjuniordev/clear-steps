import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

interface PageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const PageShell = ({ eyebrow, title, description, children }: PageShellProps) => {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-hero">
      <div className="container-tight py-16 sm:py-24">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-primary transition-smooth">
          <ArrowLeft className="h-4 w-4" /> {t("common.backHome")}
        </Link>
        <div className="mt-8 max-w-2xl animate-fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-glow">{eyebrow}</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-primary leading-tight">{title}</h1>
          <p className="mt-4 text-lg text-foreground/70 leading-relaxed">{description}</p>
        </div>

        <div className="mt-12">
          {children ?? (
            <div className="rounded-3xl bg-card ring-1 ring-border p-10 sm:p-14 shadow-soft text-center max-w-2xl">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary mx-auto">
                <Construction className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-primary">{t("shell.construction")}</h2>
              <p className="mt-2 text-sm text-foreground/70">
                {t("shell.constructionText")}
              </p>
              <Button asChild variant="hero" className="mt-6">
                <Link to="/">{t("shell.explore")}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
