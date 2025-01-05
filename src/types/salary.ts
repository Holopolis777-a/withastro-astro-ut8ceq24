export interface SocialSecurityData {
  pension: number;
  health: number;
  care: number;
  unemployment: number;
}

export interface MonetaryBenefit {
  private: number;
  commute: number;
}

export interface SalaryWithoutLease {
  gross: number;
  incomeTax: number;
  churchTax: number;
  socialSecurity: SocialSecurityData;
  net: number;
}

export interface SalaryWithLease {
  gross: number;
  leaseAmount: number;
  monetaryBenefit: MonetaryBenefit;
  chargingBenefit: number;
  incomeTax: number;
  churchTax: number;
  socialSecurity: SocialSecurityData;
  net: number;
}

export interface SavingsData {
  employee: number;
  employer: number;
}

export interface SalaryCalculations {
  withoutLease: SalaryWithoutLease;
  withLease: SalaryWithLease;
  savings: SavingsData;
}

export interface SalaryStatementData {
  grossSalary: number;
  taxClass: string;
  distanceToWork: number;
  monthlyRate: number;
  churchTax: boolean;
  calculations: SalaryCalculations;
}