import React from "react";
import EmptyState from "./EmptyState";
import LectureCard from "./LectureCard";

interface ThemeChangeEvent {
  theme: "Black-Yellow" | "White-Blue" | "Dark-Mode";
}

const Theme: React.FC = () => {
  const [theme, setTheme] = React.useState<
    "Black-Yellow" | "White-Blue" | "Dark-Mode"
  >("Black-Yellow");

  const handleThemeChange = (event: ThemeChangeEvent) => {
    setTheme(event.theme);
  };

  return (
    <div className="p-4">
      <EmptyState
        title="Theme Settings"
        message="Select your preferred theme for the lecture schedule."
      />
      <></>
      <h2 className="text-2xl font-bold mb-4">Select Theme</h2>
      <button
        onClick={() => handleThemeChange({ theme: "Black-Yellow" })}
        className={`px-4 py-2 rounded-lg ${
          theme === "Black-Yellow"
            ? "bg-yellow-500 text-black"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Black-Yellow
      </button>
      <button
        onClick={() => handleThemeChange({ theme: "White-Blue" })}
        className={`px-4 py-2 rounded-lg ${
          theme === "White-Blue"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        White-Blue
      </button>
      return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Select Theme</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleThemeChange({ theme: "Black-Yellow" })}
            className={`px-4 py-2 rounded-lg ${
              theme === "Black-Yellow"
                ? "bg-yellow-500 text-black"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Black-Yellow
          </button>
          <button
            onClick={() => handleThemeChange({ theme: "White-Blue" })}
            className={`px-4 py-2 rounded-lg ${
              theme === "White-Blue"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            White-Blue
          </button>
          <button
            onClick={() => handleThemeChange({ theme: "Dark-Mode" })}
            className={`px-4 py-2 rounded-lg ${
              theme === "Dark-Mode"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Dark-Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Theme;
