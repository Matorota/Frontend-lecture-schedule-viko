// Lecture Card Component
import React from "react";
import type { Lecture } from "../types";

interface LectureCardProps {
  lecture: Lecture;
  compact?: boolean;
}

const LectureCard: React.FC<LectureCardProps> = ({
  lecture,
  compact = false,
}) => {
  const backgroundColor = lecture.Colors[0]?.Hex || "#3B82F6";

  return (
    <div
      className={`rounded-lg shadow-md border-l-4 hover:shadow-lg transition-shadow ${
        compact ? "p-4" : "p-6"
      }`}
      style={{ borderLeftColor: backgroundColor }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3
          className={`font-semibold text-gray-800 ${
            compact ? "text-sm" : "text-lg"
          }`}
        >
          {lecture.Subject.Name}
        </h3>
        <span
          className={`text-gray-600 font-medium ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {lecture.StartTime} - {lecture.EndTime}
        </span>
      </div>

      {!compact && (
        <>
          {lecture.Lecturers.length > 0 && (
            <p className="text-gray-700 text-sm mb-2">
              Lecturer: {lecture.Lecturers.map((l) => l.Name).join(", ")}
            </p>
          )}

          {lecture.Rooms.length > 0 && (
            <p className="text-gray-600 text-sm mb-2">
              Room: {lecture.Rooms.map((r) => r.RoomNumber).join(", ")}
            </p>
          )}

          {lecture.Groups.length > 0 && (
            <p className="text-gray-500 text-xs">
              Groups: {lecture.Groups.map((g) => g.Name).join(", ")}
            </p>
          )}
        </>
      )}

      {compact && lecture.Rooms.length > 0 && (
        <p className="text-gray-600 text-xs">
          {lecture.Rooms.map((r) => r.RoomNumber).join(", ")}
        </p>
      )}
    </div>
  );
};

export default LectureCard;
