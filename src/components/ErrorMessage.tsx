// Error Message Component
import React from "react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      <div className="flex items-start">
        <div className="flex-1">
          <p className="font-semibold mb-1">Error</p>
          <p className="text-sm">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
