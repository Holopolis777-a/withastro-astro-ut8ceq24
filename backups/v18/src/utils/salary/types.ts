export interface SalaryCalculationParams {
  grossSalary: number;      // Bruttogehalt
  taxClass: string;         // Steuerklasse
  distanceToWork: number;   // Entfernung zur Arbeit in km
  canChargeAtWork: boolean; // Lademöglichkeit beim Arbeitgeber
  monthlyRate: number;      // Monatliche Leasingrate
  listPrice: number;        // Bruttolistenpreis
  hasChurchTax?: boolean;   // Kirchensteuer (optional)
}

export interface SalaryCalculationResult {
  netSalaryWithoutLease: number;    // Netto ohne Leasing
  netSalaryWithLease: number;       // Netto mit Leasing
  effectiveCosts: number;           // Effektive monatliche Kosten
  taxSavings: number;               // Steuerersparnis
  socialSecuritySavings: number;    // Sozialversicherungsersparnis
  monthlyBenefit: number;           // Monatliche Ersparnis
  details: {                        // Detaillierte Berechnungswerte
    privateBenefit: number;         // Geldwerter Vorteil Privatnutzung
    commuteBenefit: number;         // Geldwerter Vorteil Arbeitsweg
    totalBenefit: number;           // Gesamter geldwerter Vorteil
    chargingBenefit: number;        // Ladepauschale
    standardDeduction: number;      // Standardabzug
  };
}