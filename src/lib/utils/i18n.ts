import en from '@/locales/en.json';
import vi from '@/locales/vi.json';

const locales = { en, vi };

export const getTranslation = (lang: 'en' | 'vi') => locales[lang];
