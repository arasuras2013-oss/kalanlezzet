import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: { translation: { title: 'KalanLezzet', subtitle: 'Kalan Malzemelerle Lezzet Yarat!' } },
  en: { translation: { title: 'LeftoverDelight', subtitle: 'Create Delicious Meals with What You Have!' } }
};

i18n.use(initReactI18next).init({ resources, lng: 'tr', interpolation: { escapeValue: false } });

export default i18n;