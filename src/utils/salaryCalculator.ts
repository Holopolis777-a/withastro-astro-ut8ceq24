interface SalaryCalculationParams {
  grossSalary: number;
  taxClass: string;
  distanceToWork: number;
  canChargeAtWork: boolean;
  monthlyRate: number;
  listPrice: number;
  hasChurchTax?: boolean;
}

export function calculateSalarySacrifice(params: SalaryCalculationParams): SalaryCalculationResult {
  const {
    grossSalary,
    taxClass,
    distanceToWork,
    canChargeAtWork,
    monthlyRate, // Dies ist die tatsächliche Leasingrate aus vehicle.leasingRates
    listPrice,   // Dies ist der Bruttolistenpreis (grossListPrice) des Fahrzeugs
    hasChurchTax = false
  } = params;

  // 1. Ausgangssituation ohne Gehaltsumwandlung
  const taxFactor = TAX_CLASS_FACTORS[taxClass as keyof typeof TAX_CLASS_FACTORS];
  const incomeTax = grossSalary * taxFactor;
  const churchTax = hasChurchTax ? incomeTax * 0.09 : 0;

  // Sozialversicherungsbeiträge berechnen
  const socialSecurityTotal = Object.values(SOCIAL_SECURITY_RATES).reduce((sum, rate) => sum + rate, 0);
  const socialSecurity = grossSalary * socialSecurityTotal;

  // Netto ohne Leasing
  const netSalaryWithoutLease = grossSalary - (incomeTax + churchTax + socialSecurity);

  // 2. Situation mit Gehaltsumwandlung
  const newGrossSalary = grossSalary - monthlyRate;

  // Geldwerter Vorteil berechnen
  const privateBenefit = listPrice * 0.0025; // 0.25% für private Nutzung
  const commuteBenefit = listPrice * 0.000075 * distanceToWork; // 0.03% pro km
  const totalBenefit = privateBenefit + commuteBenefit;

  // Ladepauschale
  const chargingBenefit = canChargeAtWork ? 30 : 70;

  // Neues zu versteuerndes Einkommen
  const newTaxableIncome = newGrossSalary + totalBenefit;
  const newIncomeTax = newTaxableIncome * taxFactor;
  const newChurchTax = hasChurchTax ? newIncomeTax * 0.09 : 0;
  const newSocialSecurity = newGrossSalary * socialSecurityTotal;

  // Neues Nettogehalt
  const netSalaryWithLease = newTaxableIncome - (newIncomeTax + newChurchTax + newSocialSecurity) - totalBenefit + chargingBenefit;

  // Ersparnisse berechnen
  const taxSavings = incomeTax - newIncomeTax;
  const socialSecuritySavings = socialSecurity - newSocialSecurity;

  // Effektive Kosten und monatlicher Benefit
  const effectiveCosts = netSalaryWithoutLease - netSalaryWithLease;
  const monthlyBenefit = monthlyRate - effectiveCosts - (churchTax / 2) - 40;

  return {
    netSalaryWithoutLease,
    netSalaryWithLease,
    effectiveCosts,
    taxSavings,
    socialSecuritySavings,
    monthlyBenefit
  };
}