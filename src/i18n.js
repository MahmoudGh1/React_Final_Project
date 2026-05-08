import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishLang from "./localization/en.json";
import arabicLang from "./localization/ar.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en: {
		translation: englishLang,
	},
	ar: {
		translation: arabicLang,
	},
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
        lng: "en",
        fallbackLng: "en",
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

i18n.on("initialized", () => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
});

export default i18n;

// https://react.i18next.com/latest/usetranslation-hook
// https://react.i18next.com/guides/quick-start