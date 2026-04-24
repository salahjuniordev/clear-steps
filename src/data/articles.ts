import paludismeImg from "@/assets/blog/paludisme-saison-pluies.jpg";
import choleraImg from "@/assets/blog/cholera-douala.jpg";
import diabeteImg from "@/assets/blog/alimentation-diabete.jpg";
import vaccinationImg from "@/assets/blog/vaccination-rougeole.jpg";
import marieImg from "@/assets/blog/temoignage-marie.jpg";
import tuberculoseImg from "@/assets/blog/tuberculose-depistage.jpg";
import hypertensionImg from "@/assets/blog/hypertension.jpg";
import vihImg from "@/assets/blog/vih-prep.jpg";

export type ArticleCategory = "Prévention" | "Alerte" | "Nutrition" | "Témoignage" | "Recherche";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  author: string;
  authorRole: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  cover: string; // imported image URL
  tags: string[];
  region?: string;
  featured?: boolean;
  content: { type: "p" | "h2" | "h3" | "quote" | "list"; text?: string; items?: string[] }[];
}

export const articles: Article[] = [
  {
    slug: "paludisme-saison-pluies-2026",
    title: "Saison des pluies 2026 : pourquoi le paludisme explose au Cameroun",
    excerpt:
      "Avec les premières pluies, les cas de paludisme grimpent dans le Littoral et le Centre. Voici les gestes simples pour protéger ta famille.",
    category: "Alerte",
    author: "Dr. Aïcha Ngoma",
    authorRole: "Épidémiologiste · Yaoundé",
    publishedAt: "2026-04-12",
    readMinutes: 6,
    cover: paludismeImg,
    tags: ["paludisme", "moustiquaire", "saison-pluies"],
    region: "Cameroun",
    featured: true,
    content: [
      { type: "p", text: "Chaque année à la même période, les hôpitaux du Littoral voient affluer des familles entières. Le paludisme reste la première cause de consultation pédiatrique au Cameroun, et la saison des pluies est son terrain de jeu favori." },
      { type: "h2", text: "Pourquoi un pic en avril-mai ?" },
      { type: "p", text: "Les eaux stagnantes — flaques, gouttières bouchées, vieux pneus — deviennent des nurseries pour les moustiques Anopheles, vecteurs du parasite Plasmodium falciparum. En quelques jours, une simple flaque produit des centaines de moustiques infectés." },
      { type: "h2", text: "Les 5 gestes qui sauvent" },
      { type: "list", items: [
        "Dormir sous une moustiquaire imprégnée chaque nuit, surtout les enfants de moins de 5 ans.",
        "Vider chaque semaine tout récipient d'eau stagnante autour de la maison.",
        "Porter des vêtements longs en début de soirée, quand les moustiques piquent le plus.",
        "Consulter dans les 24h en cas de fièvre — le test rapide coûte moins de 500 FCFA.",
        "Terminer le traitement complet, même si on se sent mieux après 2 jours.",
      ] },
      { type: "quote", text: "Une moustiquaire imprégnée bien utilisée réduit la mortalité infantile de 20 %. C'est l'outil le plus efficace dont on dispose." },
      { type: "h2", text: "Quand foncer aux urgences" },
      { type: "p", text: "Forte fièvre persistante au-delà de 48h, vomissements répétés, somnolence inhabituelle ou convulsions chez l'enfant : ne perds pas de temps. Appelle le SAMU au 15 ou 999, ou rejoins le centre de santé le plus proche." },
    ],
  },
  {
    slug: "cholera-douala-prevention",
    title: "Choléra à Douala : ce que tu dois savoir cette semaine",
    excerpt:
      "Dix nouveaux cas confirmés à Bonabéri. Le ministère de la Santé appelle à renforcer l'hygiène. Notre guide pratique.",
    category: "Alerte",
    author: "Samuel Kouam",
    authorRole: "Journaliste santé · Douala",
    publishedAt: "2026-04-08",
    readMinutes: 4,
    cover: choleraImg,
    tags: ["choléra", "hygiène", "eau-potable"],
    region: "Littoral",
    content: [
      { type: "p", text: "Le quartier de Bonabéri vit une recrudescence inquiétante de cas de choléra. La maladie, transmise par l'eau et les aliments contaminés, peut tuer en quelques heures si elle n'est pas prise en charge." },
      { type: "h2", text: "Les bons réflexes" },
      { type: "list", items: [
        "Bouillir l'eau au moins 1 minute avant de la boire ou utiliser un filtre certifié.",
        "Se laver les mains au savon avant de cuisiner et après les toilettes.",
        "Éviter les aliments crus vendus dans la rue cette semaine.",
        "En cas de diarrhée aqueuse abondante, foncer au centre de santé.",
      ] },
      { type: "p", text: "La déshydratation est l'ennemi numéro 1. Un sachet de SRO (sels de réhydratation orale) coûte 100 FCFA et peut sauver une vie en attendant la prise en charge." },
    ],
  },
  {
    slug: "alimentation-anti-diabete-afrique",
    title: "Manger africain et combattre le diabète : c'est possible",
    excerpt:
      "Le diabète touche 1 adulte sur 10 en zone urbaine. Bonne nouvelle : nos plats traditionnels peuvent être tes meilleurs alliés.",
    category: "Nutrition",
    author: "Marie-Claire Eyenga",
    authorRole: "Nutritionniste · Yaoundé",
    publishedAt: "2026-04-02",
    readMinutes: 7,
    cover: diabeteImg,
    tags: ["diabète", "nutrition", "ndolè", "manioc"],
    featured: true,
    content: [
      { type: "p", text: "Oublie les régimes occidentaux importés. La cuisine camerounaise regorge d'ingrédients à index glycémique bas, parfaits pour stabiliser ta glycémie." },
      { type: "h2", text: "Les champions à privilégier" },
      { type: "list", items: [
        "Le ndolè aux feuilles amères : riche en fibres et en antioxydants.",
        "Le poisson grillé braisé plutôt que frit.",
        "Le plantain mûr cuit à l'eau, en quantité modérée.",
        "Les légumineuses : haricots, niébé, soja en remplacement partiel du riz.",
      ] },
      { type: "h2", text: "À limiter sans diaboliser" },
      { type: "p", text: "Les sodas, jus industriels, beignets sucrés et le riz blanc à chaque repas font grimper la glycémie en flèche. Réserve-les aux occasions spéciales." },
      { type: "quote", text: "Le diabète n'est pas une fatalité. Avec 30 minutes de marche par jour et une assiette équilibrée, on peut éviter l'insuline pendant des années." },
    ],
  },
  {
    slug: "vaccination-rougeole-enfants",
    title: "Vaccination rougeole : la campagne nationale d'avril",
    excerpt:
      "Le ministère lance une campagne gratuite pour les enfants de 9 mois à 5 ans. Toutes les infos pratiques.",
    category: "Prévention",
    author: "Dr. Etienne Mbida",
    authorRole: "Pédiatre · CHU Yaoundé",
    publishedAt: "2026-03-28",
    readMinutes: 3,
    cover: vaccinationImg,
    tags: ["vaccination", "rougeole", "enfants"],
    content: [
      { type: "p", text: "La rougeole tue encore au Cameroun. La campagne d'avril vise à vacciner gratuitement 4 millions d'enfants à travers les 10 régions." },
      { type: "h2", text: "Où et quand ?" },
      { type: "list", items: [
        "Du 15 au 22 avril dans tous les centres de santé publics.",
        "Équipes mobiles dans les marchés et écoles.",
        "Carnet de santé requis (ou pièce d'identité d'un parent).",
        "Service entièrement gratuit.",
      ] },
      { type: "p", text: "Un enfant vacciné, c'est toute une communauté protégée. L'immunité collective fonctionne à partir de 95 % de couverture." },
    ],
  },
  {
    slug: "temoignage-diabete-marie",
    title: "« J'ai vaincu mon diabète sans médicaments » — le combat de Marie",
    excerpt:
      "Diagnostiquée à 38 ans, Marie a inversé son diabète de type 2 en 18 mois. Son histoire, sans filtre.",
    category: "Témoignage",
    author: "Rédaction AfyaPulse",
    authorRole: "",
    publishedAt: "2026-03-20",
    readMinutes: 8,
    cover: marieImg,
    tags: ["diabète", "témoignage", "lifestyle"],
    content: [
      { type: "p", text: "« Quand le médecin m'a annoncé que ma glycémie était à 2,8 g/L, j'ai cru que c'était la fin. J'avais 38 ans, deux enfants, un travail. Le diabète, c'était pour les vieux. »" },
      { type: "h2", text: "Le déclic" },
      { type: "p", text: "Marie raconte comment elle a tout repris à zéro : marche quotidienne, suppression progressive du sucre raffiné, repas à heures fixes. Pas de régime miracle, juste de la constance." },
      { type: "quote", text: "Le plus dur, ce n'est pas de changer. C'est d'accepter qu'on ne pourra plus jamais manger comme avant. Et pourtant, on est plus heureux." },
      { type: "h2", text: "18 mois plus tard" },
      { type: "p", text: "Sa glycémie est revenue à 0,95 g/L. Elle n'a plus besoin de metformine. Son médecin parle de rémission. Marie, elle, parle de renaissance." },
    ],
  },
  {
    slug: "tuberculose-depistage-2026",
    title: "Tuberculose : le dépistage gratuit s'étend à 50 nouvelles localités",
    excerpt:
      "Plus besoin de se déplacer à Yaoundé : 50 nouveaux points de dépistage TB ouvrent dans les zones rurales.",
    category: "Prévention",
    author: "Dr. Aïcha Ngoma",
    authorRole: "Épidémiologiste · Yaoundé",
    publishedAt: "2026-03-15",
    readMinutes: 5,
    cover: tuberculoseImg,
    tags: ["tuberculose", "dépistage", "rural"],
    content: [
      { type: "p", text: "La tuberculose reste la première cause de mortalité par maladie infectieuse au monde. Au Cameroun, près de 50 000 nouveaux cas par an, dont la moitié non diagnostiqués." },
      { type: "h2", text: "Symptômes à surveiller" },
      { type: "list", items: [
        "Toux qui dure plus de 2 semaines.",
        "Fièvre, sueurs nocturnes.",
        "Perte de poids inexpliquée.",
        "Crachats avec sang.",
      ] },
      { type: "p", text: "Le test est rapide, gratuit, et le traitement guérit dans 95 % des cas s'il est suivi correctement pendant 6 mois." },
    ],
  },
  {
    slug: "hypertension-tueur-silencieux",
    title: "Hypertension : pourquoi on l'appelle le tueur silencieux",
    excerpt:
      "Pas de douleur, pas de signe — et pourtant, l'hypertension cause 1 AVC sur 2 au Cameroun. Comment se protéger.",
    category: "Prévention",
    author: "Dr. Etienne Mbida",
    authorRole: "Cardiologue · Douala",
    publishedAt: "2026-03-10",
    readMinutes: 6,
    cover: hypertensionImg,
    tags: ["hypertension", "AVC", "cardio"],
    content: [
      { type: "p", text: "On l'ignore souvent jusqu'à l'AVC ou l'infarctus. Pourtant, 1 adulte camerounais sur 3 vit avec une tension élevée sans le savoir." },
      { type: "h2", text: "Mesure ta tension régulièrement" },
      { type: "p", text: "À partir de 30 ans, fais contrôler ta tension au moins une fois par an. La plupart des pharmacies le font gratuitement." },
      { type: "list", items: [
        "Tension normale : moins de 130/80 mmHg.",
        "Pré-hypertension : entre 130/80 et 140/90.",
        "Hypertension : au-dessus de 140/90 — consulte.",
      ] },
      { type: "quote", text: "Réduire sa consommation de sel de moitié, c'est gagner 5 ans d'espérance de vie." },
    ],
  },
  {
    slug: "vih-prep-acces-2026",
    title: "VIH : la PrEP désormais disponible dans 8 régions",
    excerpt:
      "La prophylaxie pré-exposition, qui prévient l'infection à 99 %, est maintenant accessible gratuitement à Yaoundé, Douala, Bafoussam et 5 autres villes.",
    category: "Recherche",
    author: "Marie-Claire Eyenga",
    authorRole: "Santé publique",
    publishedAt: "2026-03-05",
    readMinutes: 5,
    cover: vihImg,
    tags: ["VIH", "PrEP", "prévention"],
    content: [
      { type: "p", text: "La PrEP (prophylaxie pré-exposition) est un comprimé quotidien qui empêche le VIH de s'installer dans l'organisme en cas d'exposition. Efficacité : 99 % quand elle est bien prise." },
      { type: "h2", text: "Pour qui ?" },
      { type: "list", items: [
        "Personnes ayant un partenaire séropositif.",
        "Travailleurs et travailleuses du sexe.",
        "Personnes ayant des partenaires multiples sans préservatif systématique.",
      ] },
      { type: "p", text: "La consultation et les comprimés sont gratuits dans les centres de traitement agréés. Aucune ordonnance préalable nécessaire." },
    ],
  },
];

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "Prévention",
  "Alerte",
  "Nutrition",
  "Témoignage",
  "Recherche",
];

export const getArticleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

export const getRelatedArticles = (current: Article, limit = 3) =>
  articles
    .filter((a) => a.slug !== current.slug)
    .sort((a, b) => {
      const aShared = a.tags.filter((t) => current.tags.includes(t)).length;
      const bShared = b.tags.filter((t) => current.tags.includes(t)).length;
      if (aShared !== bShared) return bShared - aShared;
      return a.category === current.category ? -1 : 1;
    })
    .slice(0, limit);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
