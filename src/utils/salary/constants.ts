// Steuerfaktoren basierend auf Steuerklassen
export const TAX_CLASS_FACTORS = {
  '1': 0.1595, // 15.95% Lohnsteuer
  '2': 0.145,  // 14.5% Lohnsteuer
  '3': 0.08,   // 8% Lohnsteuer
  '4': 0.1595, // 15.95% Lohnsteuer
  '5': 0.22,   // 22% Lohnsteuer
  '6': 0.25,   // 25% Lohnsteuer
} as const;

// Sozialversicherungsbeiträge (Arbeitnehmeranteil)
export const SOCIAL_SECURITY_RATES = {
  pension: 0.093,      // 9.3% Rentenversicherung
  health: 0.08,       // 8.0% Krankenversicherung
  care: 0.01875,      // 1.875% Pflegeversicherung
  unemployment: 0.012  // 1.2% Arbeitslosenversicherung
} as const;

// Konstanten für die Berechnung des geldwerten Vorteils
export const BENEFIT_RATES = {
  PRIVATE_USE: 0.0025,     // 0.25% für private Nutzung vom Bruttolistenpreis
  COMMUTE: 0.000075,       // 0.03% pro km für Arbeitsweg vom Bruttolistenpreis
  CHARGING_AT_WORK: 30,    // 30€ Ladepauschale beim Arbeitgeber
  CHARGING_AT_HOME: 70,    // 70€ Ladepauschale zu Hause
  STANDARD_DEDUCTION: 40   // 40€ Standardabzug
} as const;

// Rundungspräzision
export const DECIMAL_PLACES = 2;