export function calculateMonthlyRate(
  months: number,
  kilometers: number,
  rates: Record<string, number>
): number {
  const key = `${months}_${kilometers}`;
  return rates[key] || 0;
}

export function calculateAdditionalKilometerCosts(kilometers: number): number {
  if (kilometers <= 1000) return 0;
  return ((kilometers - 1000) / 500) * 150;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}