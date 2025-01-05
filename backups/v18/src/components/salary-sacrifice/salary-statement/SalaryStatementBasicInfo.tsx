import React from 'react';

interface SalaryStatementBasicInfoProps {
  taxClass: string;
  churchTax: boolean;
  distanceToWork: number;
}

export function SalaryStatementBasicInfo({ 
  taxClass, 
  churchTax, 
  distanceToWork 
}: SalaryStatementBasicInfoProps) {
  return (
    <div className="bg-green-100 p-4 rounded-lg grid grid-cols-3 gap-4">
      <div>
        <div className="text-sm font-medium">Steuerklasse</div>
        <div className="text-lg">{taxClass}</div>
      </div>
      <div>
        <div className="text-sm font-medium">Kirchensteuer</div>
        <div className="text-lg">{churchTax ? "Ja" : "Nein"}</div>
      </div>
      <div>
        <div className="text-sm font-medium">Arbeitsweg in KM</div>
        <div className="text-lg">{distanceToWork}</div>
      </div>
    </div>
  );
}