import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "FR" | "EN";

type Dict = Record<string, { FR: string; EN: string }>;

const DICT: Dict = {
  // Nav
  "nav.maladies": { FR: "Maladies", EN: "Diseases" },
  "nav.quiz": { FR: "Quiz", EN: "Quiz" },
  "nav.annuaire": { FR: "Annuaire", EN: "Directory" },
  "nav.blog": { FR: "Blog", EN: "Blog" },
  "nav.about": { FR: "À propos", EN: "About" },
  "nav.contact": { FR: "Contact", EN: "Contact" },
  "nav.chat": { FR: "Chatbot AI", EN: "AI Chatbot" },
  "nav.chatMobile": { FR: "Parler au Chatbot AI", EN: "Talk to AI Chatbot" },
  "nav.menu": { FR: "Menu", EN: "Menu" },
  "nav.langToggle": { FR: "Changer de langue", EN: "Toggle language" },

  // Footer
  "footer.tagline": { FR: "La santé bat au cœur de l'Afrique.", EN: "Health beats at the heart of Africa." },
  "footer.emergency": { FR: "Urgences SAMU · 15-999", EN: "Emergency SAMU · 15-999" },
  "footer.platform": { FR: "Plateforme", EN: "Platform" },
  "footer.library": { FR: "Bibliothèque", EN: "Library" },
  "footer.quizLink": { FR: "Quiz santé", EN: "Health quiz" },
  "footer.directory": { FR: "Annuaire", EN: "Directory" },
  "footer.org": { FR: "Organisation", EN: "Organization" },
  "footer.legal": { FR: "Mentions légales", EN: "Legal notice" },
  "footer.rights": { FR: "Tous droits réservés", EN: "All rights reserved" },
  "footer.buildBy": { FR: "Build By", EN: "Build By" },
  "skip.main": { FR: "Aller au contenu principal", EN: "Skip to main content" },

  // About
  "about.eyebrow": { FR: "Notre mission", EN: "Our mission" },
  "about.title": { FR: "La santé africaine, accessible à tous", EN: "African health, accessible to all" },
  "about.intro": {
    FR: "AfyaPulse est née d'un constat simple : trop d'Africains n'ont pas accès à une information santé fiable, dans leur langue, adaptée à leur réalité. Nous comblons ce vide.",
    EN: "AfyaPulse was born from a simple observation: too many Africans lack access to reliable health information in their language, adapted to their reality. We fill that gap.",
  },
  "about.missionTitle": { FR: "Notre mission", EN: "Our mission" },
  "about.missionText": {
    FR: "Démocratiser l'accès à une information santé vérifiée, gratuite et culturellement pertinente pour 1,4 milliard d'Africains.",
    EN: "Democratize access to verified, free, and culturally relevant health information for 1.4 billion Africans.",
  },
  "about.visionTitle": { FR: "Notre vision", EN: "Our vision" },
  "about.visionText": {
    FR: "Un continent où chaque famille connaît les gestes qui sauvent, où la prévention prime, et où chacun trouve un soignant en quelques clics.",
    EN: "A continent where every family knows life-saving actions, prevention comes first, and everyone finds a caregiver in a few clicks.",
  },
  "about.valuesTitle": { FR: "Nos valeurs", EN: "Our values" },
  "about.value1Title": { FR: "Rigueur médicale", EN: "Medical rigor" },
  "about.value1": { FR: "Chaque contenu est validé par des médecins en exercice.", EN: "Every piece of content is validated by practicing physicians." },
  "about.value2Title": { FR: "Accessibilité", EN: "Accessibility" },
  "about.value2": { FR: "Gratuit, en français, optimisé pour mobile et faible bande passante.", EN: "Free, in French, optimized for mobile and low bandwidth." },
  "about.value3Title": { FR: "Souveraineté", EN: "Sovereignty" },
  "about.value3": { FR: "Construit en Afrique, pour l'Afrique. Données hébergées localement.", EN: "Built in Africa, for Africa. Data hosted locally." },
  "about.value4Title": { FR: "Transparence", EN: "Transparency" },
  "about.value4": { FR: "Sources citées, partenaires affichés, financement ouvert.", EN: "Sources cited, partners disclosed, open funding." },
  "about.teamTitle": { FR: "L'équipe", EN: "The team" },
  "about.teamSubtitle": { FR: "Médecins, ingénieurs et journalistes santé, basés à Yaoundé, Douala et Paris.", EN: "Doctors, engineers and health journalists based in Yaoundé, Douala and Paris." },
  "about.partnersTitle": { FR: "Ils nous font confiance", EN: "They trust us" },
  "about.statUsers": { FR: "utilisateurs/mois", EN: "users/month" },
  "about.statArticles": { FR: "articles vérifiés", EN: "verified articles" },
  "about.statClinics": { FR: "centres référencés", EN: "centers listed" },
  "about.statCountries": { FR: "pays couverts", EN: "countries covered" },
  "about.ctaTitle": { FR: "Rejoins l'aventure", EN: "Join the adventure" },
  "about.ctaText": { FR: "Médecin, développeur, traducteur ou simple citoyen — il y a une place pour toi.", EN: "Doctor, developer, translator or citizen — there's a place for you." },
  "about.ctaBtn": { FR: "Nous contacter", EN: "Contact us" },

  // Contact
  "contact.eyebrow": { FR: "Contact", EN: "Contact" },
  "contact.title": { FR: "Parlons santé ensemble", EN: "Let's talk health" },
  "contact.intro": { FR: "Une question, un partenariat, un signalement ? Notre équipe répond sous 48h ouvrées.", EN: "A question, a partnership, a report? Our team replies within 48 business hours." },
  "contact.formTitle": { FR: "Envoyer un message", EN: "Send a message" },
  "contact.name": { FR: "Nom complet", EN: "Full name" },
  "contact.namePh": { FR: "Aïcha N.", EN: "Jane D." },
  "contact.email": { FR: "Adresse email", EN: "Email address" },
  "contact.subject": { FR: "Sujet", EN: "Subject" },
  "contact.subjectPh": { FR: "Choisir un sujet", EN: "Select a subject" },
  "contact.subjectGeneral": { FR: "Question générale", EN: "General question" },
  "contact.subjectPartner": { FR: "Partenariat", EN: "Partnership" },
  "contact.subjectPress": { FR: "Presse / média", EN: "Press / media" },
  "contact.subjectReport": { FR: "Signaler une erreur", EN: "Report an error" },
  "contact.message": { FR: "Message", EN: "Message" },
  "contact.messagePh": { FR: "Décris ta demande en quelques lignes…", EN: "Describe your request in a few lines…" },
  "contact.send": { FR: "Envoyer le message", EN: "Send message" },
  "contact.sent": { FR: "Message envoyé ! Nous revenons vers toi sous 48h.", EN: "Message sent! We'll get back to you within 48h." },
  "contact.infoTitle": { FR: "Autres canaux", EN: "Other channels" },
  "contact.whatsapp": { FR: "WhatsApp · 7j/7 · 8h-20h", EN: "WhatsApp · 7d/7 · 8am-8pm" },
  "contact.emailLabel": { FR: "Email général", EN: "General email" },
  "contact.address": { FR: "Adresse", EN: "Address" },
  "contact.addressLine": { FR: "Bastos, Yaoundé · Cameroun", EN: "Bastos, Yaoundé · Cameroon" },
  "contact.urgentTitle": { FR: "Urgence médicale ?", EN: "Medical emergency?" },
  "contact.urgentText": { FR: "AfyaPulse n'est pas un service d'urgence. En cas de danger vital, appelle immédiatement le SAMU.", EN: "AfyaPulse is not an emergency service. In life-threatening situations, call SAMU immediately." },
  "contact.urgentBtn": { FR: "Appeler le 15-999", EN: "Call 15-999" },

  // Blog
  "blog.eyebrow": { FR: "Blog AfyaPulse", EN: "AfyaPulse Blog" },
  "blog.title1": { FR: "Actualités, alertes &", EN: "News, alerts &" },
  "blog.title2": { FR: "santé africaine", EN: "African health" },
  "blog.intro": {
    FR: "Articles de fond, alertes épidémiques et témoignages — vérifiés par des médecins du Cameroun et d'Afrique francophone.",
    EN: "In-depth articles, epidemic alerts and testimonials — verified by doctors from Cameroon and French-speaking Africa.",
  },
  "blog.searchPh": { FR: "Rechercher un article, un sujet, un tag…", EN: "Search an article, topic, or tag…" },
  "blog.searchAria": { FR: "Rechercher un article", EN: "Search an article" },
  "blog.clearSearch": { FR: "Effacer la recherche", EN: "Clear search" },
  "blog.filterAria": { FR: "Filtrer par catégorie", EN: "Filter by category" },
  "blog.all": { FR: "Toutes", EN: "All" },
  "blog.found": { FR: "article(s) trouvé(s)", EN: "article(s) found" },
  "blog.featured": { FR: "★ À la une", EN: "★ Featured" },
  "blog.read": { FR: "Lire l'article", EN: "Read article" },
  "blog.readShort": { FR: "Lire", EN: "Read" },
  "blog.empty.title": { FR: "Aucun article trouvé", EN: "No articles found" },
  "blog.empty.text": { FR: "Essaie un autre mot-clé ou réinitialise les filtres.", EN: "Try another keyword or reset the filters." },
  "blog.empty.reset": { FR: "Réinitialiser", EN: "Reset" },
  "blog.minRead": { FR: "min", EN: "min" },
  "blog.newsletter.tag": { FR: "Newsletter santé", EN: "Health newsletter" },
  "blog.newsletter.title": { FR: "Reçois nos articles & alertes directement par email.", EN: "Get our articles & alerts straight to your inbox." },
  "blog.newsletter.text": { FR: "Une fois par semaine, sans spam. Désinscription en un clic.", EN: "Once a week, no spam. Unsubscribe in one click." },
  "blog.newsletter.emailAria": { FR: "Adresse email", EN: "Email address" },
  "blog.newsletter.subscribe": { FR: "Je m'abonne", EN: "Subscribe" },
  "blog.newsletter.ok": { FR: "Inscription réussie ! Vérifie ta boîte email.", EN: "Subscribed! Check your inbox." },

  // Categories
  "cat.Alerte": { FR: "Alerte", EN: "Alert" },
  "cat.Prévention": { FR: "Prévention", EN: "Prevention" },
  "cat.Nutrition": { FR: "Nutrition", EN: "Nutrition" },
  "cat.Témoignage": { FR: "Témoignage", EN: "Testimonial" },
  "cat.Recherche": { FR: "Recherche", EN: "Research" },

  // Article detail
  "article.back": { FR: "Retour au blog", EN: "Back to blog" },
  "article.minRead": { FR: "min de lecture", EN: "min read" },
  "article.share": { FR: "Partager", EN: "Share" },
  "article.shareAria": { FR: "Partager cet article", EN: "Share this article" },
  "article.linkCopied": { FR: "Lien copié", EN: "Link copied" },
  "article.linkCopiedDesc": { FR: "Tu peux maintenant le partager.", EN: "You can now share it." },
  "article.disclaimer": {
    FR: "Cet article fournit une information générale et ne remplace pas un avis médical. En cas d'urgence, appelle le SAMU 15 / 999.",
    EN: "This article provides general information and does not replace medical advice. In an emergency, call SAMU 15 / 999.",
  },
  "article.related": { FR: "À lire aussi", EN: "Also read" },
  "article.allArticles": { FR: "Tous les articles", EN: "All articles" },
  "article.notFound": { FR: "Article introuvable", EN: "Article not found" },
  "article.notFoundText": { FR: "Cet article n'existe pas ou a été déplacé.", EN: "This article doesn't exist or has been moved." },

  // Contact validation
  "contact.err.name": { FR: "Le nom est requis (2–100 caractères).", EN: "Name is required (2–100 characters)." },
  "contact.err.email": { FR: "Adresse email invalide.", EN: "Invalid email address." },
  "contact.err.subject": { FR: "Merci de choisir un sujet.", EN: "Please select a subject." },
  "contact.err.message": { FR: "Le message doit faire entre 10 et 1000 caractères.", EN: "Message must be between 10 and 1000 characters." },
  "contact.err.fix": { FR: "Merci de corriger les erreurs avant d'envoyer.", EN: "Please fix the errors before sending." },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: keyof typeof DICT | string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "FR";
    return (localStorage.getItem("afyapulse.lang") as Lang) || "FR";
  });

  useEffect(() => {
    localStorage.setItem("afyapulse.lang", lang);
    document.documentElement.lang = lang === "FR" ? "fr" : "en";
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((l) => (l === "FR" ? "EN" : "FR"));
  const t = (key: string) => {
    const entry = DICT[key];
    if (!entry) return key;
    return entry[lang];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
