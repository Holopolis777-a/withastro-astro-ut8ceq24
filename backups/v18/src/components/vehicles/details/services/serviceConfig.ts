import { 
  BanknoteIcon,
  WrenchIcon,
  CarIcon,
  ShieldIcon,
  SnowflakeIcon,
  FileTextIcon,
  WrenchIcon as WrenchIconAlt,
  SettingsIcon,
  TruckIcon
} from 'lucide-react';

export function getServiceConfig() {
  return {
    noDeposit: {
      icon: BanknoteIcon,
      title: "Keine Anzahlung"
    },
    maintenance: {
      icon: WrenchIcon,
      title: "Wartung & Verschleiß inklusive"
    },
    delivery: {
      icon: CarIcon,
      title: "Überführungs- und Zulassungskosten inklusive"
    },
    insurance: {
      icon: ShieldIcon,
      title: "Vollkasko- & Haftpflichtversicherung",
      description: [
        'Vollkasko, Teilkasko und Haftpflicht',
        'Kein beschränkter Fahrerkreis',
        'Keine Einstufung im Schadensfall',
        'Selbstbeteiligung: 500 € (VK & TK)',
        'Umfassende Akku-Versicherung inklusive'
      ]
    },
    winterTires: {
      icon: SnowflakeIcon,
      title: "Winterreifen inklusive",
      description: [
        'inkl. Einlagerung und Wechsel'
      ]
    },
    gap: {
      icon: FileTextIcon,
      title: "GAP Deckung Premium"
    },
    roadside: {
      icon: WrenchIconAlt,
      title: "KFZ-Schutzbrief & Pannenhilfe"
    },
    damageManagement: {
      icon: SettingsIcon,
      title: "Schadensmanagement"
    },
    freeDelivery: {
      icon: TruckIcon,
      title: "Kostenlose Lieferung!"
    }
  } as const;
}