import React from "react";
import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  variant?: "light" | "dark";
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "light",
}) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const getButtonClasses = (lang: string) => {
    const isActive = i18n.language === lang;

    if (variant === "dark") {
      // For dark backgrounds (like dashboard sidebar)
      return `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? "bg-[#ACBAC4] text-[#30364F] shadow-md"
          : "bg-transparent text-white border border-[#ACBAC4] hover:bg-[#ACBAC4]/20"
      }`;
    }

    // For light backgrounds (like welcome/login pages)
    return `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "bg-[#30364F] text-white shadow-md"
        : "bg-white/20 text-white hover:bg-white/30"
    }`;
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage("en")}
        className={getButtonClasses("en")}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("lt")}
        className={getButtonClasses("lt")}
      >
        Lietuvių
      </button>
    </div>
  );
};

export default LanguageSwitcher;
