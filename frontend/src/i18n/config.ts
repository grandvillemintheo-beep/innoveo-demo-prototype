import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enAuth from '../locales/en/auth.json';
import enDashboard from '../locales/en/dashboard.json';
import frAuth from '../locales/fr/auth.json';
import frDashboard from '../locales/fr/dashboard.json';

export const defaultNamespace = 'common';

void i18n.use(initReactI18next).init({
  fallbackLng: 'fr',
  supportedLngs: ['fr', 'en'],
  debug: false,
  defaultNS: defaultNamespace,
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: {
      auth: enAuth,
      dashboard: enDashboard
    },
    fr: {
      auth: frAuth,
      dashboard: frDashboard
    }
  }
});

export default i18n;
