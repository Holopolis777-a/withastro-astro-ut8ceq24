import { jsPDF } from 'jspdf';
import type { SalaryStatementData } from '../types/salary';
import { formatCurrency } from './formatters';

export function generateSalaryStatementPDF(data: SalaryStatementData) {
  const doc = new jsPDF();
  
  // Konfiguration
  const margin = 20;
  let y = margin;
  const lineHeight = 7;
  
  // Titel
  doc.setFontSize(16);
  doc.text('Gehaltsabrechnung Entgeltumwandlung', margin, y);
  y += lineHeight * 2;

  // Basisdaten
  doc.setFontSize(12);
  doc.text(`Steuerklasse: ${data.taxClass}`, margin, y);
  doc.text(`Kirchensteuer: ${data.churchTax ? 'Ja' : 'Nein'}`, margin + 60, y);
  doc.text(`Arbeitsweg: ${data.distanceToWork} km`, margin + 120, y);
  y += lineHeight * 2;

  // Tabelle
  const columns = ['Position', 'Ohne Vilonda', 'Mit Vilonda'];
  const columnWidths = [80, 45, 45];
  let x = margin;

  // Tabellenkopf
  doc.setFillColor(240, 240, 240);
  doc.rect(x, y - 5, 170, 8, 'F');
  columns.forEach((col, i) => {
    doc.text(col, x, y);
    x += columnWidths[i];
  });
  y += lineHeight;

  // Tabellenzeilen
  const addRow = (label: string, without: string, with_: string) => {
    x = margin;
    doc.text(label, x, y);
    x += columnWidths[0];
    doc.text(without, x, y, { align: 'right' });
    x += columnWidths[1];
    doc.text(with_, x, y, { align: 'right' });
    y += lineHeight;
  };

  // Grundbrutto
  addRow(
    'Grundbrutto',
    formatCurrency(data.calculations.withoutLease.gross),
    formatCurrency(data.calculations.withLease.gross)
  );

  // Entgeltumwandlung
  addRow(
    'Entgeltumwandlung Dienstwagen',
    '-',
    `-${formatCurrency(data.monthlyRate)}`
  );

  // Geldwerter Vorteil
  addRow(
    'Geldwerter Vorteil Privatfahrten',
    '-',
    formatCurrency(data.calculations.withLease.monetaryBenefit.private)
  );

  // Lohnsteuer
  addRow(
    'Lohnsteuer',
    `-${formatCurrency(data.calculations.withoutLease.incomeTax)}`,
    `-${formatCurrency(data.calculations.withLease.incomeTax)}`
  );

  // Sozialversicherung
  const withoutSV = Object.values(data.calculations.withoutLease.socialSecurity)
    .reduce((a, b) => a + b, 0);
  const withSV = Object.values(data.calculations.withLease.socialSecurity)
    .reduce((a, b) => a + b, 0);
  
  addRow(
    'Sozialversicherung gesamt',
    `-${formatCurrency(withoutSV)}`,
    `-${formatCurrency(withSV)}`
  );

  // Netto
  y += 2;
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, y - 5, 170, 8, 'F');
  addRow(
    'Netto zur Auszahlung',
    formatCurrency(data.calculations.withoutLease.net),
    formatCurrency(data.calculations.withLease.net)
  );

  // Effektive Kosten
  y += lineHeight * 2;
  const effectiveCosts = data.calculations.withoutLease.net - data.calculations.withLease.net;
  doc.setFontSize(14);
  doc.text('Effektive monatliche Kosten:', margin, y);
  doc.text(formatCurrency(effectiveCosts), margin + 100, y);

  // Fußnote
  y += lineHeight * 3;
  doc.setFontSize(10);
  doc.text('*Die tatsächliche Einsparung ist abhängig von steuerlichen Verhältnissen und kann', margin, y);
  y += lineHeight;
  doc.text('abweichen. Für eine Überprüfung wenden Sie sich bitte an Ihren Steuerberater.', margin, y);

  return doc;
}