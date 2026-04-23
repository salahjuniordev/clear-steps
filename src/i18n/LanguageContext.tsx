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
  "footer.buildBy": { FR: "Build By", EN: "Built by" },
  "skip.main": { FR: "Aller au contenu principal", EN: "Skip to main content" },

  // Common
  "common.backHome": { FR: "Retour à l'accueil", EN: "Back to home" },
  "common.search": { FR: "Rechercher", EN: "Search" },
  "common.reset": { FR: "Réinitialiser", EN: "Reset" },
  "common.clear": { FR: "Effacer", EN: "Clear" },
  "common.edit": { FR: "Modifier", EN: "Edit" },
  "common.previous": { FR: "Précédent", EN: "Previous" },
  "common.continue": { FR: "Continuer", EN: "Continue" },
  "common.call": { FR: "Appeler", EN: "Call" },
  "common.directions": { FR: "Itinéraire", EN: "Directions" },
  "common.callNow": { FR: "Appeler maintenant", EN: "Call now" },

  // Index / Landing
  "index.hero.badge": { FR: "Plateforme de sensibilisation santé · Cameroun & Afrique francophone", EN: "Health awareness platform · Cameroon & French-speaking Africa" },
  "index.hero.title1": { FR: "Comprendre pour mieux", EN: "Understand to better" },
  "index.hero.title2": { FR: "se soigner", EN: "care for yourself" },
  "index.hero.subtitle": { FR: "Votre guide santé pour l'Afrique. De l'information médicale fiable, en français, pour vous et vos proches.", EN: "Your health guide for Africa. Reliable medical information for you and your loved ones." },
  "index.hero.cta1": { FR: "Explorer les maladies", EN: "Explore diseases" },
  "index.hero.cta2": { FR: "Faire le quiz santé", EN: "Take the health quiz" },
  "index.hero.trust1": { FR: "Sources OMS & MSAS", EN: "WHO & MSAS sources" },
  "index.hero.trust2": { FR: "AI bilingue FR/EN", EN: "Bilingual AI FR/EN" },
  "index.hero.imgAlt": { FR: "Famille africaine en bonne santé — illustration éditoriale d'AfyaPulse", EN: "Healthy African family — AfyaPulse editorial illustration" },
  "index.hero.verifiedTag": { FR: "Information vérifiée", EN: "Verified information" },
  "index.hero.verifiedSub": { FR: "Sources officielles", EN: "Official sources" },

  "index.counter1": { FR: "Maladies documentées", EN: "Documented diseases" },
  "index.counter2": { FR: "Cliniques référencées", EN: "Listed clinics" },
  "index.counter3": { FR: "Régions couvertes", EN: "Regions covered" },
  "index.counter4": { FR: "Utilisateurs informés", EN: "Informed users" },
  "index.counters.aria": { FR: "Chiffres clés AfyaPulse", EN: "AfyaPulse key figures" },

  "index.why.eyebrow": { FR: "Pourquoi AfyaPulse", EN: "Why AfyaPulse" },
  "index.why.title": { FR: "La santé africaine, enfin accessible.", EN: "African health, finally accessible." },
  "index.why.sub": { FR: "Une plateforme conçue par et pour les communautés d'Afrique francophone.", EN: "A platform built by and for French-speaking African communities." },
  "index.why.1.title": { FR: "Information vérifiée", EN: "Verified information" },
  "index.why.1.desc": { FR: "Toutes nos fiches sont basées sur des sources officielles : OMS, MSAS et Africa CDC.", EN: "All our content is based on official sources: WHO, MSAS, and Africa CDC." },
  "index.why.2.title": { FR: "Pensé pour l'Afrique", EN: "Built for Africa" },
  "index.why.2.desc": { FR: "Contenu localisé en français, adapté aux réalités sanitaires camerounaises et sub-sahariennes.", EN: "Localized content adapted to Cameroonian and sub-Saharan health realities." },
  "index.why.3.title": { FR: "Assistance 24/7", EN: "24/7 assistance" },
  "index.why.3.desc": { FR: "Un assistant IA bilingue FR/EN disponible à tout moment pour répondre à vos questions santé.", EN: "A bilingual FR/EN AI assistant available anytime for your health questions." },
  "index.why.4.title": { FR: "Réseau de proximité", EN: "Local network" },
  "index.why.4.desc": { FR: "Plus de 200 structures de santé géolocalisées avec itinéraires et appel direct en un clic.", EN: "Over 200 geo-located health facilities with directions and one-click calls." },
  "index.why.5.title": { FR: "Quiz personnalisé", EN: "Personalized quiz" },
  "index.why.5.desc": { FR: "Évaluation rapide en 2 minutes pour une orientation médicale adaptée à votre profil.", EN: "Quick 2-minute assessment for medical guidance tailored to your profile." },
  "index.why.6.title": { FR: "Alertes épidémiques", EN: "Epidemic alerts" },
  "index.why.6.desc": { FR: "Soyez prévenu en temps réel des risques sanitaires dans votre région.", EN: "Get real-time alerts about health risks in your region." },

  "index.testi.eyebrow": { FR: "Témoignages", EN: "Testimonials" },
  "index.testi.title": { FR: "Ils nous font confiance", EN: "They trust us" },
  "index.testi.sub": { FR: "Des milliers de familles, soignants et étudiants utilisent AfyaPulse au quotidien.", EN: "Thousands of families, caregivers and students use AfyaPulse daily." },
  "index.testi.1.role": { FR: "Mère de famille · Douala", EN: "Mother · Douala" },
  "index.testi.1.text": { FR: "AfyaPulse m'a aidée à comprendre les symptômes du paludisme chez mon fils. Le quiz m'a orientée vers la bonne clinique.", EN: "AfyaPulse helped me understand my son's malaria symptoms. The quiz directed me to the right clinic." },
  "index.testi.2.role": { FR: "Médecin généraliste · Yaoundé", EN: "General practitioner · Yaoundé" },
  "index.testi.2.text": { FR: "Une plateforme indispensable. Je la recommande à mes patients pour qu'ils s'informent avant la consultation.", EN: "An essential platform. I recommend it to my patients so they're informed before consultation." },
  "index.testi.3.role": { FR: "Étudiant · Bafoussam", EN: "Student · Bafoussam" },
  "index.testi.3.text": { FR: "L'assistant IA m'a sauvé pendant un épisode de typhoïde. Réponses claires et orientation rapide vers les urgences.", EN: "The AI assistant saved me during a typhoid episode. Clear answers and quick guidance to the ER." },
  "index.testi.ratingAria": { FR: "Note {n} sur 5", EN: "Rating {n} out of 5" },

  "index.featured.eyebrow": { FR: "Bibliothèque", EN: "Library" },
  "index.featured.title": { FR: "Maladies en vedette", EN: "Featured diseases" },
  "index.featured.sub": { FR: "Les pathologies prioritaires au Cameroun et en Afrique francophone.", EN: "Priority pathologies in Cameroon and French-speaking Africa." },
  "index.featured.cta": { FR: "Voir toutes les maladies", EN: "See all diseases" },
  "index.featured.read": { FR: "Lire la fiche", EN: "Read more" },
  "index.featured.d1.desc": { FR: "Première cause de mortalité infantile en Afrique.", EN: "Leading cause of child mortality in Africa." },
  "index.featured.d2.desc": { FR: "Liée à l'eau et aux conditions sanitaires.", EN: "Linked to water and sanitation conditions." },
  "index.featured.d3.desc": { FR: "Prévention, dépistage et accès aux traitements.", EN: "Prevention, screening and access to treatment." },
  "index.featured.d4.desc": { FR: "Épidémies saisonnières — hygiène et hydratation.", EN: "Seasonal outbreaks — hygiene and hydration." },
  "index.featured.d5.desc": { FR: "Gestion long terme et alimentation équilibrée.", EN: "Long-term management and balanced diet." },
  "index.featured.d6.desc": { FR: "Le tueur silencieux — dépistage régulier essentiel.", EN: "The silent killer — regular screening is essential." },

  "index.steps.eyebrow": { FR: "Comment ça marche", EN: "How it works" },
  "index.steps.title": { FR: "Trois étapes vers une meilleure santé", EN: "Three steps to better health" },
  "index.steps.1.title": { FR: "Cherche", EN: "Search" },
  "index.steps.1.desc": { FR: "Trouve des informations fiables sur les maladies courantes en Afrique.", EN: "Find reliable information on common diseases in Africa." },
  "index.steps.2.title": { FR: "Comprends", EN: "Understand" },
  "index.steps.2.desc": { FR: "Symptômes, prévention, traitement — vulgarisés en français clair.", EN: "Symptoms, prevention, treatment — explained in plain language." },
  "index.steps.3.title": { FR: "Agis", EN: "Act" },
  "index.steps.3.desc": { FR: "Localise un médecin, parle à notre AI ou contacte les urgences.", EN: "Find a doctor, talk to our AI or contact emergency services." },

  "index.chat.tag": { FR: "Assistant santé AI", EN: "AI health assistant" },
  "index.chat.title": { FR: "Tu as des symptômes ? Parle à notre AI.", EN: "Got symptoms? Talk to our AI." },
  "index.chat.sub": { FR: "Disponible 24h/24 en français et en anglais. Réponses claires, sources vérifiées, orientation médicale.", EN: "Available 24/7 in French and English. Clear answers, verified sources, medical guidance." },
  "index.chat.cta": { FR: "Démarrer la conversation", EN: "Start the conversation" },
  "index.quiz.tag": { FR: "Quiz santé", EN: "Health quiz" },
  "index.quiz.title": { FR: "Évalue ta santé en 2 minutes.", EN: "Assess your health in 2 minutes." },
  "index.quiz.sub": { FR: "Profil, région, symptômes — reçois une orientation personnalisée et des conseils adaptés.", EN: "Profile, region, symptoms — get personalized guidance and tailored advice." },
  "index.quiz.cta": { FR: "Commencer le quiz", EN: "Start the quiz" },
  "index.quiz.findClinic": { FR: "Trouver une clinique", EN: "Find a clinic" },

  "index.partners": { FR: "En partenariat avec", EN: "In partnership with" },
  "index.newsletter.tag": { FR: "Alertes épidémiques", EN: "Epidemic alerts" },
  "index.newsletter.title": { FR: "Reste informé, protège ta communauté.", EN: "Stay informed, protect your community." },
  "index.newsletter.sub": { FR: "Reçois nos conseils mensuels et alertes santé pour ton pays.", EN: "Get our monthly tips and health alerts for your country." },
  "index.newsletter.cta": { FR: "Je m'abonne", EN: "Subscribe" },

  // Disease categories & severity
  "dcat.Infectieuse": { FR: "Infectieuse", EN: "Infectious" },
  "dcat.Chronique": { FR: "Chronique", EN: "Chronic" },
  "dcat.Pédiatrique": { FR: "Pédiatrique", EN: "Pediatric" },
  "dcat.Virale": { FR: "Virale", EN: "Viral" },
  "dcat.Nutritionnelle": { FR: "Nutritionnelle", EN: "Nutritional" },
  "dcat.Toutes": { FR: "Toutes", EN: "All" },
  "sev.Légère": { FR: "Légère", EN: "Mild" },
  "sev.Modérée": { FR: "Modérée", EN: "Moderate" },
  "sev.Sévère": { FR: "Sévère", EN: "Severe" },

  // Maladies (list)
  "maladies.eyebrow": { FR: "Bibliothèque", EN: "Library" },
  "maladies.title": { FR: "Bibliothèque des maladies", EN: "Disease library" },
  "maladies.intro": { FR: "Recherche, filtres par catégorie, fiches détaillées : symptômes, prévention et traitement. Sources OMS & MSAS.", EN: "Search, category filters, detailed cards: symptoms, prevention and treatment. WHO & MSAS sources." },
  "maladies.searchPh": { FR: "Rechercher une maladie, un symptôme...", EN: "Search a disease or symptom..." },
  "maladies.searchAria": { FR: "Rechercher une maladie ou un symptôme", EN: "Search a disease or symptom" },
  "maladies.found.one": { FR: "fiche trouvée", EN: "result found" },
  "maladies.found.many": { FR: "fiches trouvées", EN: "results found" },
  "maladies.viewCard": { FR: "Voir la fiche", EN: "View details" },
  "maladies.empty": { FR: "Aucune maladie ne correspond à votre recherche.", EN: "No disease matches your search." },
  "maladies.resetFilters": { FR: "Réinitialiser les filtres", EN: "Reset filters" },
  "maladies.filterAria": { FR: "Filtrer par catégorie", EN: "Filter by category" },

  // Disease detail
  "disease.notFoundTitle": { FR: "Fiche introuvable", EN: "Page not found" },
  "disease.notFoundText": { FR: "La maladie demandée n'existe pas dans notre bibliothèque.", EN: "The requested disease isn't in our library." },
  "disease.backLib": { FR: "Retour à la bibliothèque", EN: "Back to library" },
  "disease.crumbAria": { FR: "Fil d'Ariane", EN: "Breadcrumb" },
  "disease.crumb": { FR: "Bibliothèque des maladies", EN: "Disease library" },
  "disease.severity": { FR: "Gravité", EN: "Severity" },
  "disease.regions": { FR: "Régions", EN: "Regions" },
  "disease.share": { FR: "Partager la fiche", EN: "Share" },
  "disease.linkCopied": { FR: "Lien copié", EN: "Link copied" },
  "disease.linkCopiedDesc": { FR: "Le lien de la fiche a été copié dans le presse-papier.", EN: "The page link was copied to your clipboard." },
  "disease.takeQuiz": { FR: "Faire le quiz santé", EN: "Take the health quiz" },
  "disease.symptoms": { FR: "Symptômes", EN: "Symptoms" },
  "disease.prevention": { FR: "Prévention", EN: "Prevention" },
  "disease.treatment": { FR: "Traitement", EN: "Treatment" },
  "disease.disclaimerLabel": { FR: "Avertissement médical", EN: "Medical disclaimer" },
  "disease.important": { FR: "Important :", EN: "Important:" },
  "disease.disclaimer": { FR: "ces informations sont éducatives et ne remplacent pas l'avis d'un professionnel de santé. En cas d'urgence, contactez le SAMU Cameroun au", EN: "this information is educational and does not replace professional medical advice. In emergencies, call SAMU Cameroon at" },
  "disease.guidance": { FR: "Besoin d'une orientation ?", EN: "Need guidance?" },
  "disease.guidanceSub": { FR: "Trouve une clinique proche ou parle à notre AI.", EN: "Find a nearby clinic or talk to our AI." },
  "disease.findClinic": { FR: "Trouver une clinique", EN: "Find a clinic" },
  "disease.askAi": { FR: "Demander à l'AI", EN: "Ask the AI" },

  // Annuaire
  "annuaire.eyebrow": { FR: "Annuaire santé", EN: "Health directory" },
  "annuaire.title": { FR: "Médecins & cliniques près de toi", EN: "Doctors & clinics near you" },
  "annuaire.intro": { FR: "Recherche par ville ou spécialité, filtres avancés, et tri par distance grâce à la géolocalisation.", EN: "Search by city or specialty, advanced filters, and distance sorting via geolocation." },
  "annuaire.searchPh": { FR: "Rechercher une ville, un nom ou une spécialité...", EN: "Search a city, name or specialty..." },
  "annuaire.searchAria": { FR: "Rechercher une clinique", EN: "Search a clinic" },
  "annuaire.advanced": { FR: "Filtres avancés", EN: "Advanced filters" },
  "annuaire.viewList": { FR: "Liste", EN: "List" },
  "annuaire.viewMap": { FR: "Carte", EN: "Map" },
  "annuaire.viewAria": { FR: "Vue", EN: "View" },
  "annuaire.commune": { FR: "Commune", EN: "District" },
  "annuaire.allCommunes": { FR: "Toutes les communes", EN: "All districts" },
  "annuaire.specialty": { FR: "Spécialité", EN: "Specialty" },
  "annuaire.allSpecialties": { FR: "Toutes spécialités", EN: "All specialties" },
  "annuaire.availability": { FR: "Disponibilité", EN: "Availability" },
  "annuaire.availAll": { FR: "Toutes", EN: "All" },
  "annuaire.availOpen": { FR: "Ouvert maintenant", EN: "Open now" },
  "annuaire.avail24": { FR: "Ouvert 24h/24", EN: "Open 24/7" },
  "annuaire.sortBy": { FR: "Trier par", EN: "Sort by" },
  "annuaire.sortDefault": { FR: "Pertinence", EN: "Relevance" },
  "annuaire.sortName": { FR: "Nom (A-Z)", EN: "Name (A-Z)" },
  "annuaire.sortDistance": { FR: "Distance", EN: "Distance" },
  "annuaire.geoRequired": { FR: "(géoloc requise)", EN: "(geolocation required)" },
  "annuaire.locateAria": { FR: "Utiliser ma position pour trier par distance", EN: "Use my position to sort by distance" },
  "annuaire.resetAll": { FR: "Réinitialiser tous les filtres", EN: "Reset all filters" },
  "annuaire.found.one": { FR: "structure trouvée", EN: "facility found" },
  "annuaire.found.many": { FR: "structures trouvées", EN: "facilities found" },
  "annuaire.sortedDistance": { FR: "triées par distance", EN: "sorted by distance" },
  "annuaire.sortActive": { FR: "Tri actif", EN: "Sort active" },
  "annuaire.empty": { FR: "Aucune structure ne correspond à votre recherche.", EN: "No facility matches your search." },
  "annuaire.filterByType": { FR: "Filtrer par type", EN: "Filter by type" },
  "annuaire.allTypes": { FR: "Tous", EN: "All" },
  "annuaire.open": { FR: "Ouvert", EN: "Open" },
  "annuaire.closed": { FR: "Fermé", EN: "Closed" },
  "annuaire.emergencyTag": { FR: "Urgence médicale", EN: "Medical emergency" },
  "annuaire.emergencyLabel": { FR: "SAMU Cameroun · 15-999", EN: "SAMU Cameroon · 15-999" },
  "annuaire.geo.unavailable": { FR: "Géolocalisation indisponible", EN: "Geolocation unavailable" },
  "annuaire.geo.unavailableDesc": { FR: "Ton navigateur ne supporte pas la géolocalisation.", EN: "Your browser doesn't support geolocation." },
  "annuaire.geo.detected": { FR: "Position détectée", EN: "Position detected" },
  "annuaire.geo.detectedDesc": { FR: "Tri par distance activé.", EN: "Sorting by distance enabled." },
  "annuaire.geo.refused": { FR: "Position refusée", EN: "Position denied" },
  "annuaire.geo.refusedDesc": { FR: "Active la géolocalisation pour trier par distance.", EN: "Enable geolocation to sort by distance." },

  // Clinic types
  "ctype.Hôpital": { FR: "Hôpital", EN: "Hospital" },
  "ctype.Clinique": { FR: "Clinique", EN: "Clinic" },
  "ctype.Pharmacie": { FR: "Pharmacie", EN: "Pharmacy" },
  "ctype.Urgences": { FR: "Urgences", EN: "Emergency" },

  // Quiz
  "quiz.eyebrow": { FR: "Auto-évaluation santé", EN: "Health self-assessment" },
  "quiz.title": { FR: "Quiz santé en 2 minutes", EN: "2-minute health quiz" },
  "quiz.intro": { FR: "Réponds à quelques questions pour recevoir une orientation personnalisée. Cette évaluation n'est pas un diagnostic médical.", EN: "Answer a few questions to receive personalized guidance. This assessment is not a medical diagnosis." },
  "quiz.step": { FR: "Étape", EN: "Step" },
  "quiz.of": { FR: "sur", EN: "of" },
  "quiz.q1": { FR: "Quel est ton profil ?", EN: "What's your profile?" },
  "quiz.q1.sub": { FR: "Choisis l'option qui te correspond.", EN: "Pick the option that matches you." },
  "quiz.profile.Adulte": { FR: "Adulte", EN: "Adult" },
  "quiz.profile.Enfant": { FR: "Enfant", EN: "Child" },
  "quiz.profile.Femme enceinte": { FR: "Femme enceinte", EN: "Pregnant woman" },
  "quiz.profile.Personne âgée": { FR: "Personne âgée", EN: "Senior" },
  "quiz.profile.Adulte.desc": { FR: "18 à 59 ans", EN: "18 to 59 years" },
  "quiz.profile.Enfant.desc": { FR: "Moins de 18 ans", EN: "Under 18" },
  "quiz.profile.Femme enceinte.desc": { FR: "Suivi prénatal", EN: "Prenatal care" },
  "quiz.profile.Personne âgée.desc": { FR: "60 ans et +", EN: "60 and over" },
  "quiz.q2": { FR: "Dans quelle région es-tu ?", EN: "Which region are you in?" },
  "quiz.q2.sub": { FR: "Cela permet d'adapter les conseils aux maladies endémiques.", EN: "This helps tailor advice to endemic diseases." },
  "quiz.q2.aria": { FR: "Région du Cameroun", EN: "Cameroon region" },
  "quiz.q3": { FR: "Quels symptômes ressens-tu ?", EN: "What symptoms do you have?" },
  "quiz.q3.sub": { FR: "Sélectionne tous ceux qui s'appliquent (au moins un).", EN: "Select all that apply (at least one)." },
  "quiz.q3.aria": { FR: "Symptômes", EN: "Symptoms" },
  "quiz.q3.count.one": { FR: "symptôme sélectionné", EN: "symptom selected" },
  "quiz.q3.count.many": { FR: "symptômes sélectionnés", EN: "symptoms selected" },
  "quiz.recap": { FR: "Récapitulatif", EN: "Summary" },
  "quiz.recap.sub": { FR: "Vérifie tes réponses avant d'obtenir tes recommandations.", EN: "Review your answers before getting your recommendations." },
  "quiz.recap.profile": { FR: "Profil", EN: "Profile" },
  "quiz.recap.region": { FR: "Région", EN: "Region" },
  "quiz.recap.symptoms": { FR: "Symptômes", EN: "Symptoms" },
  "quiz.recap.count.one": { FR: "sélectionné", EN: "selected" },
  "quiz.recap.count.many": { FR: "sélectionnés", EN: "selected" },
  "quiz.next": { FR: "Continuer", EN: "Continue" },
  "quiz.seeReco": { FR: "Voir mes recommandations", EN: "See my recommendations" },
  "quiz.previous": { FR: "Précédent", EN: "Previous" },
  "quiz.level": { FR: "Niveau", EN: "Level" },
  "quiz.level.Léger": { FR: "Léger", EN: "Mild" },
  "quiz.level.Modéré": { FR: "Modéré", EN: "Moderate" },
  "quiz.level.Urgent": { FR: "Urgent", EN: "Urgent" },
  "quiz.suggested": { FR: "Pistes possibles", EN: "Possible leads" },
  "quiz.actions": { FR: "À faire maintenant", EN: "What to do now" },
  "quiz.disclaimer": { FR: "ce résultat est indicatif et ne remplace pas un avis médical. Urgences SAMU Cameroun :", EN: "this result is indicative and doesn't replace medical advice. Emergency SAMU Cameroon:" },
  "quiz.exportPdf": { FR: "Exporter en PDF", EN: "Export as PDF" },
  "quiz.talkToAi": { FR: "En parler au chatbot AI", EN: "Discuss with AI chatbot" },
  "quiz.findClinic": { FR: "Trouver une clinique", EN: "Find a clinic" },
  "quiz.retake": { FR: "Refaire le quiz", EN: "Retake the quiz" },
  "quiz.pdf.ok": { FR: "PDF généré", EN: "PDF generated" },
  "quiz.pdf.okDesc": { FR: "Ton récap a été téléchargé.", EN: "Your summary was downloaded." },
  "quiz.pdf.err": { FR: "Erreur", EN: "Error" },
  "quiz.pdf.errDesc": { FR: "Impossible de générer le PDF.", EN: "Unable to generate the PDF." },
  "quiz.reco.urgent.title": { FR: "Consultation médicale urgente recommandée", EN: "Urgent medical consultation recommended" },
  "quiz.reco.moderate.title": { FR: "Consultation conseillée dans les 24-48h", EN: "Consultation advised within 24-48h" },
  "quiz.reco.mild.title": { FR: "Surveillance recommandée", EN: "Monitoring recommended" },

  // Chat
  "chat.title": { FR: "Chatbot AfyaPulse", EN: "AfyaPulse Chatbot" },
  "chat.docTitle": { FR: "Chatbot santé AI · AfyaPulse", EN: "AI Health Chatbot · AfyaPulse" },
  "chat.tag": { FR: "Assistant santé · FR / EN · 24/7", EN: "Health assistant · FR / EN · 24/7" },
  "chat.disclaimer": { FR: "Cet assistant fournit des informations générales et ne remplace pas un avis médical. En cas d'urgence, appelle le", EN: "This assistant provides general information and doesn't replace medical advice. In emergencies, call" },
  "chat.welcome": { FR: "Bonjour 👋 Je suis ton assistant santé.", EN: "Hello 👋 I'm your health assistant." },
  "chat.welcomeSub": { FR: "Pose-moi une question sur les symptômes, la prévention ou les maladies courantes en Afrique francophone.", EN: "Ask me about symptoms, prevention, or common diseases in French-speaking Africa." },
  "chat.s1": { FR: "Quels sont les symptômes du paludisme ?", EN: "What are malaria symptoms?" },
  "chat.s2": { FR: "Comment prévenir le choléra à Douala ?", EN: "How to prevent cholera in Douala?" },
  "chat.s3": { FR: "Que faire en cas de forte fièvre chez un enfant ?", EN: "What to do if a child has high fever?" },
  "chat.s4": { FR: "Différence entre typhoïde et paludisme ?", EN: "Difference between typhoid and malaria?" },
  "chat.thinking": { FR: "L'assistant réfléchit…", EN: "The assistant is thinking…" },
  "chat.placeholder": { FR: "Décris tes symptômes ou pose une question santé…", EN: "Describe your symptoms or ask a health question…" },
  "chat.placeholderListening": { FR: "🎙️ Parle, je t'écoute…", EN: "🎙️ Speak, I'm listening…" },
  "chat.send": { FR: "Envoyer le message", EN: "Send message" },
  "chat.stop": { FR: "Arrêter la réponse en cours", EN: "Stop the response" },
  "chat.mic.start": { FR: "Dicter ma question au micro", EN: "Dictate via microphone" },
  "chat.mic.stop": { FR: "Arrêter la dictée vocale", EN: "Stop voice dictation" },
  "chat.editLast": { FR: "Modifier le dernier message", EN: "Edit last message" },
  "chat.export": { FR: "Exporter", EN: "Export" },
  "chat.newConv": { FR: "Nouvelle conversation", EN: "New conversation" },
  "chat.composerHint": { FR: "Entrée pour envoyer · Maj+Entrée pour saut de ligne · 🎙️ Micro pour dicter", EN: "Enter to send · Shift+Enter for new line · 🎙️ Mic to dictate" },
  "chat.err.tooMany": { FR: "Trop de requêtes", EN: "Too many requests" },
  "chat.err.tooManyDesc": { FR: "Patiente quelques secondes puis réessaie.", EN: "Wait a few seconds and try again." },
  "chat.err.credits": { FR: "Crédits AI épuisés", EN: "AI credits depleted" },
  "chat.err.creditsDesc": { FR: "Ajoute des crédits dans Settings → Workspace → Usage.", EN: "Add credits in Settings → Workspace → Usage." },
  "chat.err.generic": { FR: "Erreur", EN: "Error" },
  "chat.err.genericDesc": { FR: "Impossible de joindre l'assistant.", EN: "Unable to reach the assistant." },
  "chat.err.network": { FR: "Erreur réseau", EN: "Network error" },
  "chat.err.networkDesc": { FR: "Vérifie ta connexion et réessaie.", EN: "Check your connection and try again." },
  "chat.stopped": { FR: "Réponse interrompue", EN: "Response stopped" },
  "chat.stoppedDesc": { FR: "Le texte partiel a été conservé.", EN: "Partial text was kept." },
  "chat.empty.title": { FR: "Conversation vide", EN: "Empty conversation" },
  "chat.empty.desc": { FR: "Pose une question avant d'exporter.", EN: "Ask a question before exporting." },

  // 404
  "nf.title": { FR: "Page introuvable", EN: "Page not found" },
  "nf.back": { FR: "Retour à l'accueil", EN: "Return to home" },

  // PageShell
  "shell.construction": { FR: "Section en construction", EN: "Section under construction" },
  "shell.constructionText": { FR: "Cette page sera bientôt disponible.", EN: "This page will be available soon." },
  "shell.explore": { FR: "Explorer la plateforme", EN: "Explore the platform" },

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
  "about.value2": { FR: "Gratuit, en français, optimisé pour mobile et faible bande passante.", EN: "Free, optimized for mobile and low bandwidth." },
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
  "about.openToAll": { FR: "Ouvert à tous", EN: "Open to all" },

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
