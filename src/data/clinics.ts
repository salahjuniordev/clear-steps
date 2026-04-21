export interface Clinic {
  id: string;
  name: string;
  type: "Hôpital" | "Clinique" | "Pharmacie" | "Urgences";
  city: string;
  commune: string;
  region: string;
  address: string;
  phone: string;
  hours: string;
  available: boolean; // ouvert maintenant / disponible 24h
  specialties: string[];
  lat: number;
  lng: number;
}

export const clinics: Clinic[] = [
  { id: "chuy", name: "Hôpital Central de Yaoundé", type: "Hôpital", city: "Yaoundé", commune: "Yaoundé III", region: "Centre", address: "Avenue Henri Dunant, Yaoundé", phone: "+237 222 234 010", hours: "24h/24", available: true, specialties: ["Médecine générale", "Urgences", "Chirurgie", "Pédiatrie"], lat: 3.866, lng: 11.521 },
  { id: "chuyo", name: "CHU de Yaoundé", type: "Hôpital", city: "Yaoundé", commune: "Yaoundé VI", region: "Centre", address: "Melen, Yaoundé", phone: "+237 222 311 029", hours: "24h/24", available: true, specialties: ["Cardiologie", "Néphrologie", "Maternité"], lat: 3.86, lng: 11.498 },
  { id: "lqd", name: "Hôpital Laquintinie", type: "Hôpital", city: "Douala", commune: "Douala I", region: "Littoral", address: "Rue Joss, Douala", phone: "+237 233 422 070", hours: "24h/24", available: true, specialties: ["Urgences", "Maladies infectieuses", "Pédiatrie"], lat: 4.05, lng: 9.694 },
  { id: "dge", name: "Hôpital Général de Douala", type: "Hôpital", city: "Douala", commune: "Douala V", region: "Littoral", address: "Boulevard de l'Unité, Douala", phone: "+237 233 372 099", hours: "24h/24", available: true, specialties: ["Cardiologie", "Oncologie", "Chirurgie"], lat: 4.061, lng: 9.713 },
  { id: "bafou", name: "Hôpital Régional de Bafoussam", type: "Hôpital", city: "Bafoussam", commune: "Bafoussam I", region: "Ouest", address: "Centre-ville, Bafoussam", phone: "+237 233 441 218", hours: "24h/24", available: true, specialties: ["Médecine générale", "Maternité"], lat: 5.477, lng: 10.418 },
  { id: "garoua", name: "Hôpital Régional de Garoua", type: "Hôpital", city: "Garoua", commune: "Garoua I", region: "Nord", address: "Avenue Ahidjo, Garoua", phone: "+237 222 271 050", hours: "24h/24", available: true, specialties: ["Médecine tropicale", "Urgences"], lat: 9.301, lng: 13.398 },
  { id: "polyb", name: "Polyclinique Bonanjo", type: "Clinique", city: "Douala", commune: "Douala I", region: "Littoral", address: "Bonanjo, Douala", phone: "+237 233 426 855", hours: "Lun-Sam 7h-20h", available: false, specialties: ["Médecine générale", "Gynécologie", "Pédiatrie"], lat: 4.046, lng: 9.687 },
  { id: "chrac", name: "Clinique de l'Aéroport", type: "Clinique", city: "Yaoundé", commune: "Yaoundé VII", region: "Centre", address: "Route de l'Aéroport, Yaoundé", phone: "+237 222 230 522", hours: "Lun-Dim 7h-22h", available: true, specialties: ["Cardiologie", "Imagerie", "Laboratoire"], lat: 3.84, lng: 11.523 },
  { id: "samu-yde", name: "SAMU Yaoundé", type: "Urgences", city: "Yaoundé", commune: "Yaoundé II", region: "Centre", address: "Caserne Mbankolo", phone: "+237 15 999", hours: "24h/24", available: true, specialties: ["Urgences", "Réanimation mobile"], lat: 3.892, lng: 11.503 },
  { id: "samu-dla", name: "SAMU Douala", type: "Urgences", city: "Douala", commune: "Douala III", region: "Littoral", address: "Bonapriso, Douala", phone: "+237 15 999", hours: "24h/24", available: true, specialties: ["Urgences", "Réanimation mobile"], lat: 4.034, lng: 9.703 },
  { id: "ph-mfou", name: "Pharmacie Mfoundi", type: "Pharmacie", city: "Yaoundé", commune: "Yaoundé II", region: "Centre", address: "Marché Mfoundi, Yaoundé", phone: "+237 222 230 411", hours: "Lun-Dim 8h-22h", available: true, specialties: ["Médicaments", "Garde nocturne"], lat: 3.871, lng: 11.518 },
  { id: "ph-akwa", name: "Pharmacie Akwa", type: "Pharmacie", city: "Douala", commune: "Douala I", region: "Littoral", address: "Avenue de la Liberté, Akwa", phone: "+237 233 425 600", hours: "Lun-Sam 8h-21h", available: false, specialties: ["Médicaments", "Para-pharmacie"], lat: 4.052, lng: 9.7 },
];

export const clinicTypes = ["Hôpital", "Clinique", "Urgences", "Pharmacie"] as const;

export const typeStyles: Record<Clinic["type"], string> = {
  "Hôpital": "bg-primary/10 text-primary ring-primary/20",
  "Clinique": "bg-info/10 text-info ring-info/20",
  "Urgences": "bg-destructive/10 text-destructive ring-destructive/20",
  "Pharmacie": "bg-accent/10 text-accent ring-accent/20",
};

export const allCommunes = Array.from(new Set(clinics.map((c) => c.commune))).sort();
export const allSpecialties = Array.from(new Set(clinics.flatMap((c) => c.specialties))).sort();

/** Haversine distance in km. */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
