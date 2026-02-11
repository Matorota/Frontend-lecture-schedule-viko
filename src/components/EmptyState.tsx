// Empty State Component
import React from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Data",
  message = "There is nothing to display",
  icon = "",
}) => {
  return (
    <div className="text-center py-12 px-4">
      {icon && <div className="text-6xl mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;
