export type DiseaseCategory = "Infectieuse" | "Chronique" | "Pédiatrique" | "Virale" | "Nutritionnelle";
export type Severity = "Légère" | "Modérée" | "Sévère";

export interface Disease {
  slug: string;
  name: string;
  category: DiseaseCategory;
  severity: Severity;
  shortDesc: string;
  symptoms: string[];
  prevention: string[];
  treatment: string[];
  regions: string[];
}

export const diseases: Disease[] = [
  {
    slug: "paludisme",
    name: "Paludisme",
    category: "Infectieuse",
    severity: "Sévère",
    shortDesc: "Maladie parasitaire transmise par les moustiques anophèles, première cause de mortalité infantile.",
    symptoms: ["Fièvre élevée et frissons", "Maux de tête intenses", "Douleurs musculaires", "Vomissements et diarrhée", "Fatigue extrême"],
    prevention: ["Dormir sous moustiquaire imprégnée", "Éliminer les eaux stagnantes", "Porter des vêtements longs au crépuscule", "Utiliser des répulsifs anti-moustiques", "Traitement préventif pour femmes enceintes"],
    treatment: ["Test rapide TDR ou goutte épaisse", "Artéméther-luméfantrine (ACT) sur prescription", "Hydratation abondante", "Consultation urgente en cas de signes graves"],
    regions: ["Toutes régions"],
  },
  {
    slug: "typhoide",
    name: "Typhoïde",
    category: "Infectieuse",
    severity: "Sévère",
    shortDesc: "Infection bactérienne liée à l'eau et aux aliments contaminés par Salmonella typhi.",
    symptoms: ["Fièvre prolongée (>7 jours)", "Maux de tête persistants", "Douleurs abdominales", "Perte d'appétit", "Constipation ou diarrhée"],
    prevention: ["Boire de l'eau bouillie ou en bouteille", "Laver les fruits et légumes", "Se laver les mains régulièrement", "Vaccination disponible", "Éviter les glaçons douteux"],
    treatment: ["Antibiotiques (ciprofloxacine, azithromycine)", "Hospitalisation si forme grave", "Réhydratation orale ou IV", "Repos prolongé"],
    regions: ["Centre", "Littoral", "Ouest"],
  },
  {
    slug: "vih-sida",
    name: "VIH / SIDA",
    category: "Chronique",
    severity: "Sévère",
    shortDesc: "Virus qui affaiblit le système immunitaire — prévention, dépistage et traitement antirétroviral.",
    symptoms: ["Fièvre persistante", "Perte de poids inexpliquée", "Sueurs nocturnes", "Infections récurrentes", "Ganglions enflés"],
    prevention: ["Utiliser un préservatif", "Dépistage régulier (gratuit en CDV)", "PrEP pour personnes à haut risque", "Ne pas partager seringues", "Dépistage prénatal"],
    treatment: ["Trithérapie antirétrovirale (gratuite au Cameroun)", "Suivi de charge virale", "Soutien psychosocial", "Traitement des infections opportunistes"],
    regions: ["Toutes régions"],
  },
  {
    slug: "cholera",
    name: "Choléra",
    category: "Infectieuse",
    severity: "Sévère",
    shortDesc: "Infection intestinale aiguë causée par Vibrio cholerae — épidémies saisonnières.",
    symptoms: ["Diarrhée aqueuse abondante", "Vomissements", "Crampes musculaires", "Déshydratation rapide", "Soif intense"],
    prevention: ["Eau potable uniquement", "Lavage des mains avec savon", "Cuisson complète des aliments", "Latrines hygiéniques", "Vaccin oral disponible"],
    treatment: ["Sels de réhydratation orale (SRO) immédiats", "Perfusion IV en cas de déshydratation sévère", "Antibiotiques selon gravité", "Hospitalisation urgente"],
    regions: ["Extrême-Nord", "Nord", "Littoral"],
  },
  {
    slug: "diabete",
    name: "Diabète",
    category: "Chronique",
    severity: "Modérée",
    shortDesc: "Trouble métabolique caractérisé par un taux élevé de sucre dans le sang.",
    symptoms: ["Soif excessive", "Urines fréquentes", "Fatigue inhabituelle", "Vision floue", "Cicatrisation lente"],
    prevention: ["Alimentation équilibrée pauvre en sucre", "Activité physique régulière", "Maintenir un poids santé", "Éviter alcool et tabac", "Dépistage annuel après 40 ans"],
    treatment: ["Contrôle glycémique régulier", "Metformine ou insuline selon type", "Suivi diététique", "Surveillance des complications"],
    regions: ["Toutes régions"],
  },
  {
    slug: "hypertension",
    name: "Hypertension",
    category: "Chronique",
    severity: "Modérée",
    shortDesc: "Le tueur silencieux — pression artérielle élevée souvent sans symptômes.",
    symptoms: ["Souvent asymptomatique", "Maux de tête à l'arrière du crâne", "Vertiges", "Bourdonnements d'oreilles", "Saignements de nez"],
    prevention: ["Réduire le sel (<5g/jour)", "Activité physique 30 min/jour", "Limiter l'alcool", "Arrêter le tabac", "Mesure tensionnelle régulière"],
    treatment: ["Antihypertenseurs sur prescription", "Modifications du mode de vie", "Suivi médical mensuel", "Contrôle des facteurs de risque"],
    regions: ["Toutes régions"],
  },
  {
    slug: "tuberculose",
    name: "Tuberculose",
    category: "Infectieuse",
    severity: "Sévère",
    shortDesc: "Infection bactérienne pulmonaire transmise par voie aérienne.",
    symptoms: ["Toux persistante (>3 semaines)", "Crachats parfois sanglants", "Fièvre et sueurs nocturnes", "Perte de poids", "Fatigue chronique"],
    prevention: ["Vaccination BCG à la naissance", "Aération des espaces de vie", "Couvrir bouche en toussant", "Dépistage des contacts", "Nutrition adéquate"],
    treatment: ["Traitement de 6 mois (gratuit au Cameroun)", "Combinaison d'antibiotiques", "Suivi en centre DOTS", "Isolement initial recommandé"],
    regions: ["Toutes régions"],
  },
  {
    slug: "rougeole",
    name: "Rougeole",
    category: "Pédiatrique",
    severity: "Modérée",
    shortDesc: "Maladie virale très contagieuse touchant principalement les enfants.",
    symptoms: ["Fièvre élevée", "Éruption cutanée rouge", "Toux et écoulement nasal", "Yeux rouges et larmoyants", "Taches blanches dans la bouche"],
    prevention: ["Vaccination ROR (9 et 15 mois)", "Isolement des cas", "Hygiène des mains", "Vaccination de rattrapage"],
    treatment: ["Pas de traitement spécifique", "Paracétamol pour la fièvre", "Hydratation", "Vitamine A", "Surveillance des complications"],
    regions: ["Toutes régions"],
  },
  {
    slug: "dengue",
    name: "Dengue",
    category: "Virale",
    severity: "Modérée",
    shortDesc: "Infection virale transmise par les moustiques Aedes en zones forestières.",
    symptoms: ["Fièvre brutale", "Douleurs articulaires intenses", "Maux de tête frontaux", "Éruption cutanée", "Saignements (forme grave)"],
    prevention: ["Éliminer eaux stagnantes domestiques", "Moustiquaires", "Répulsifs en journée", "Vêtements couvrants"],
    treatment: ["Repos et hydratation", "Paracétamol uniquement (PAS d'aspirine)", "Surveillance plaquettes", "Hospitalisation si signes d'alarme"],
    regions: ["Sud", "Est", "Centre"],
  },
  {
    slug: "malnutrition",
    name: "Malnutrition infantile",
    category: "Nutritionnelle",
    severity: "Sévère",
    shortDesc: "Carence alimentaire affectant le développement physique et mental des enfants.",
    symptoms: ["Retard de croissance", "Maigreur extrême", "Œdèmes (kwashiorkor)", "Cheveux cassants", "Apathie"],
    prevention: ["Allaitement exclusif jusqu'à 6 mois", "Diversification alimentaire équilibrée", "Suivi de croissance", "Compléments vitaminés"],
    treatment: ["Aliments thérapeutiques (Plumpy'Nut)", "Suivi en CRENA/CRENI", "Traitement des infections associées", "Éducation nutritionnelle"],
    regions: ["Extrême-Nord", "Nord", "Adamaoua"],
  },
  {
    slug: "meningite",
    name: "Méningite",
    category: "Infectieuse",
    severity: "Sévère",
    shortDesc: "Inflammation des membranes du cerveau — urgence médicale absolue.",
    symptoms: ["Fièvre brutale", "Maux de tête intenses", "Raideur de la nuque", "Vomissements", "Photophobie", "Troubles de conscience"],
    prevention: ["Vaccination (méningo A, C, W, Y)", "Éviter la promiscuité en saison sèche", "Hygiène respiratoire"],
    treatment: ["URGENCE : hospitalisation immédiate", "Antibiotiques IV (ceftriaxone)", "Soins intensifs", "Prophylaxie des contacts"],
    regions: ["Extrême-Nord", "Nord", "Adamaoua"],
  },
  {
    slug: "hepatite-b",
    name: "Hépatite B",
    category: "Virale",
    severity: "Modérée",
    shortDesc: "Infection virale du foie pouvant devenir chronique.",
    symptoms: ["Fatigue", "Jaunisse (ictère)", "Urines foncées", "Douleurs abdominales", "Nausées"],
    prevention: ["Vaccination dès la naissance", "Préservatifs", "Ne pas partager rasoirs/aiguilles", "Dépistage prénatal"],
    treatment: ["Antiviraux pour formes chroniques", "Suivi hépatique régulier", "Éviter alcool", "Vaccination de l'entourage"],
    regions: ["Toutes régions"],
  },
];

export const categories: DiseaseCategory[] = ["Infectieuse", "Chronique", "Pédiatrique", "Virale", "Nutritionnelle"];

export const severityStyles: Record<Severity, string> = {
  "Légère": "bg-success/10 text-success ring-success/20",
  "Modérée": "bg-warning/10 text-warning ring-warning/20",
  "Sévère": "bg-destructive/10 text-destructive ring-destructive/20",
};

export const categoryStyles: Record<DiseaseCategory, string> = {
  "Infectieuse": "bg-warning/10 text-warning ring-warning/20",
  "Chronique": "bg-info/10 text-info ring-info/20",
  "Pédiatrique": "bg-accent/10 text-accent ring-accent/20",
  "Virale": "bg-primary/10 text-primary ring-primary/20",
  "Nutritionnelle": "bg-success/10 text-success ring-success/20",
};
