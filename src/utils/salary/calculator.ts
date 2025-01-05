import { TAX_CLASS_FACTORS, SOCIAL_SECURITY_RATES, BENEFIT_RATES, DECIMAL_PLACES } from './constants';
import type { SalaryCalculationParams, SalaryCalculationResult } from './types';

function round(value: number): number {
  return Number(value.toFixed(DECIMAL_PLACES));
}

export function calculateSalarySacrifice(params: SalaryCalculationParams): SalaryCalculationResult {
  const {
    grossSalary,
    taxClass,
    distanceToWork,
    canChargeAtWork,
    monthlyRate,
    listPrice,
    hasChurchTax = false
  } = params;

  // 1. Ausgangssituation ohne Leasing
  const taxFactor = TAX_CLASS_FACTORS[taxClass as keyof typeof TAX_CLASS_FACTORS];
  const incomeTax = round(grossSalary * taxFactor);
  const churchTax = hasChurchTax ? round(incomeTax * 0.09) : 0;

  const socialSecurityTotal = Object.values(SOCIAL_SECURITY_RATES)
    .reduce((sum, rate) => sum + rate, 0);
  const socialSecurity = round(grossSalary * socialSecurityTotal);

  const netSalaryWithoutLease = round(
    grossSalary - incomeTax - churchTax - socialSecurity
  );

  // 2. Situation mit Gehaltsumwandlung
  const newGrossSalary = grossSalary - monthlyRate;

  // Geldwerter Vorteil
  const privateBenefit = round(listPrice * BENEFIT_RATES.PRIVATE_USE);
  const commuteBenefit = round(listPrice * BENEFIT_RATES.COMMUTE * distanceToWork);
  const totalBenefit = round(privateBenefit + commuteBenefit);

  // Ladepauschale
  const chargingBenefit = canChargeAtWork ? 
    BENEFIT_RATES.CHARGING_AT_WORK : 
    BENEFIT_RATES.CHARGING_AT_HOME;

  // Neues zu versteuerndes Einkommen
  const newTaxableIncome = round(newGrossSalary + totalBenefit);
  const newIncomeTax = round(newTaxableIncome * taxFactor);
  const newChurchTax = hasChurchTax ? round(newIncomeTax * 0.09) : 0;
  const newSocialSecurity = round(newGrossSalary * socialSecurityTotal);

  // Neues Nettogehalt
  const netSalaryWithLease = round(
    newTaxableIncome - 
    newIncomeTax - 
    newChurchTax - 
    newSocialSecurity - 
    totalBenefit + 
    chargingBenefit
  );

  // 3. Ersparnisse
  const taxSavings = round(incomeTax - newIncomeTax);
  const socialSecuritySavings = round(socialSecurity - newSocialSecurity);
  const effectiveCosts = round(netSalaryWithoutLease - netSalaryWithLease);
  const monthlyBenefit = round(
    monthlyRate - 
    effectiveCosts - 
    (churchTax / 2) - 
    BENEFIT_RATES.STANDARD_DEDUCTION
  );

  return {
    netSalaryWithoutLease,
    netSalaryWithLease,
    effectiveCosts,
    taxSavings,
    socialSecuritySavings,
    monthlyBenefit,
    // Zusätzliche Details für Transparenz
    details: {
      privateBenefit,
      commuteBenefit,
      totalBenefit,
      chargingBenefit,
      standardDeduction: BENEFIT_RATES.STANDARD_DEDUCTION
    }
  };
}