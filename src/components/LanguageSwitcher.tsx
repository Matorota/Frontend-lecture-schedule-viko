import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          i18n.language === "en"
            ? "bg-[#30364F] text-white shadow-md"
            : "bg-white/20 text-white hover:bg-white/30"
        }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("lt")}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          i18n.language === "lt"
            ? "bg-[#30364F] text-white shadow-md"
            : "bg-white/20 text-white hover:bg-white/30"
        }`}
      >
        Lietuvių
      </button>
    </div>
  );
};

export default LanguageSwitcher;
