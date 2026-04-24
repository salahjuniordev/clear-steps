import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

const NotFound = () => {
  const location = useLocation();
  const { t, lang } = useLanguage();

  useSeo({
    title: lang === "FR" ? "Page introuvable (404) · AfyaPulse" : "Page not found (404) · AfyaPulse",
    description: lang === "FR"
      ? "La page que tu cherches n'existe pas ou a été déplacée. Retourne à l'accueil AfyaPulse."
      : "The page you are looking for does not exist or has been moved. Return to the AfyaPulse home.",
    canonical: location.pathname,
    image: "/afyapulse-og.png",
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("nf.title")}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {t("nf.back")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
