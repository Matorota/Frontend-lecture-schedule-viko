// Month View Component
import React from "react";
import type { Lecture } from "../types";
import { getMonthDates, formatDate, isToday } from "../utils/dateUtils";

interface MonthViewProps {
  date: Date;
  lectures: Lecture[];
  onDateClick: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  date,
  lectures,
  onDateClick,
}) => {
  const monthDates = getMonthDates(date);
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const startDay = firstDayOfMonth.getDay();

  const getLectureCountForDate = (date: Date): number => {
    const dateStr = formatDate(date);
    return lectures.filter((lecture) => lecture.Date === dateStr).length;
  };

  const paddingDays = Array(startDay).fill(null);

  return (
    <div className="bg-white rounded-lg shadow-lg p-10">
      <div className="grid grid-cols-7 gap-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-700 p-3"
          >
            {day}
          </div>
        ))}

        {paddingDays.map((_, index) => (
          <div key={`padding-${index}`} className="p-3"></div>
        ))}

        {monthDates.map((monthDate) => {
          const lectureCount = getLectureCountForDate(monthDate);
          const today = isToday(monthDate);

          return (
            <button
              key={monthDate.toISOString()}
              onClick={() => onDateClick(monthDate)}
              className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                today
                  ? "bg-blue-100 border-blue-400 font-bold"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div className="text-center">
                <p
                  className={`text-lg ${
                    today ? "text-blue-700" : "text-gray-800"
                  }`}
                >
                  {monthDate.getDate()}
                </p>
                {lectureCount > 0 && (
                  <div className="flex justify-center mt-2">
                    <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-0.5">
                      {lectureCount}
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
