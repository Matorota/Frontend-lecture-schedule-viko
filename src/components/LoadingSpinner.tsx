// Loading Spinner Component
import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  text,
}) => {
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-12 w-12",
    large: "h-16 w-16",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`inline-block animate-spin rounded-full border-b-2 border-[#30364F] ${sizeClasses[size]}`}
      ></div>
      {text && <p className="mt-4 text-[#30364F] font-medium">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
