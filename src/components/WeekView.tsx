// Week View Component
import React from "react";
import LectureCard from "./LectureCard";
import type { Lecture } from "../types";
import {
  getWeekDates,
  formatDate,
  getDayName,
  isToday,
} from "../utils/dateUtils";

interface WeekViewProps {
  date: Date;
  lectures: Lecture[];
}

const WeekView: React.FC<WeekViewProps> = ({ date, lectures }) => {
  const weekDates = getWeekDates(date);

  const getLecturesForDate = (date: Date): Lecture[] => {
    const dateStr = formatDate(date);
    return lectures
      .filter((lecture) => lecture.Date === dateStr)
      .sort((a, b) => a.StartTime.localeCompare(b.StartTime));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-10">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        {weekDates.map((weekDate) => {
          const dayLectures = getLecturesForDate(weekDate);
          const today = isToday(weekDate);

          return (
            <div
              key={weekDate.toISOString()}
              className={`p-6 rounded-lg ${
                today ? "bg-blue-50 border-2 border-blue-400" : "bg-gray-50"
              }`}
            >
              <div className="mb-5">
                <h3
                  className={`font-semibold ${
                    today ? "text-blue-700" : "text-gray-800"
                  }`}
                >
                  {getDayName(weekDate).slice(0, 3)}
                </h3>
                <p
                  className={`text-sm ${
                    today ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {weekDate.getDate()}
                </p>
              </div>

              {dayLectures.length === 0 ? (
                <p className="text-gray-400 text-xs">No lectures</p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {dayLectures.map((lecture) => (
                    <LectureCard key={lecture.ID} lecture={lecture} compact />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;
