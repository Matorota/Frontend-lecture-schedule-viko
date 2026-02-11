// Day View Component
import React from "react";
import LectureCard from "./LectureCard";
import EmptyState from "./EmptyState";
import type { Lecture } from "../types";
import { getDayName, formatDate } from "../utils/dateUtils";

interface DayViewProps {
  date: Date;
  lectures: Lecture[];
}

const DayView: React.FC<DayViewProps> = ({ date, lectures }) => {
  const sortedLectures = [...lectures].sort((a, b) =>
    a.StartTime.localeCompare(b.StartTime)
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-10">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800">{getDayName(date)}</h2>
        <p className="text-gray-600">{formatDate(date)}</p>
      </div>

      {sortedLectures.length === 0 ? (
        <EmptyState
          title="No lectures scheduled"
          message="Enjoy your free time!"
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {sortedLectures.map((lecture) => (
            <LectureCard key={lecture.ID} lecture={lecture} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DayView;
