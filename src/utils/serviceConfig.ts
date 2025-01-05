import {
  Banknote,
  Wrench,
  Car,
  Shield,
  Snowflake,
  FileText,
  WrenchIcon,
  Settings,
  Truck,
} from 'lucide-react';

export function getServiceConfig() {
  return {
    noDeposit: {
      icon: Banknote,
      title: "Keine Anzahlung"
    },
    maintenance: {
      icon: Wrench,
      title: "Wartung & Verschleiß inklusive"
    },
    delivery: {
      icon: Car,
      title: "Überführungs- und Zulassungskosten inklusive"
    },
    insurance: {
      icon: Shield,
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
      icon: Snowflake,
      title: "Winterreifen inklusive",
      description: [
        'inkl. Einlagerung und Wechsel'
      ]
    },
    gap: {
      icon: FileText,
      title: "GAP Deckung Premium"
    },
    roadside: {
      icon: WrenchIcon,
      title: "KFZ-Schutzbrief & Pannenhilfe"
    },
    damageManagement: {
      icon: Settings,
      title: "Schadensmanagement"
    },
    freeDelivery: {
      icon: Truck,
      title: "Kostenlose Lieferung!"
    }
  } as const;
}