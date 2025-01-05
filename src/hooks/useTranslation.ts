import { translations } from '../i18n/translations';

export function useTranslation() {
  // In a real app, you might want to add language switching functionality here
  return {
    t: (path: string) => {
      return path.split('.').reduce((obj, key) => obj[key], translations as any) || path;
    },
  };
}