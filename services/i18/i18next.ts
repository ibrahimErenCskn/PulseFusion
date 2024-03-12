import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from './locales/en.json'
import tr from './locales/tr.json'

const languageResource = {
    en: { translation: en },
    tr: { translation: tr },
}

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'tr',
    fallbackLng: 'en',
    resources: languageResource,
    interpolation: {
        escapeValue: false,
    },
})


export default i18next