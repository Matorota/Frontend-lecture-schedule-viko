// Month View Component - improved grid layout
import React, { useMemo } from "react";
import type { Lecture } from "../types";
import { formatDate, isToday, getDayName } from "../utils/dateUtils";

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
  // Build a 6x7 month grid (Monday-first) containing Date objects
  const monthGrid = useMemo(() => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstOfMonth = new Date(year, month, 1);
    // get Monday of the week that contains the first of month
    const firstWeekday = firstOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
    const startOffset = firstWeekday === 0 ? -6 : 1 - firstWeekday; // shift so Monday is start
    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(firstOfMonth.getDate() + startOffset);

    const weeks: Date[][] = [];
    const cur = new Date(gridStart);
    for (let w = 0; w < 6; w++) {
      const week: Date[] = [];
      for (let d = 0; d < 7; d++) {
        week.push(new Date(cur));
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  }, [date]);

  const headerWeekDays = useMemo(() => {
    // Use a fixed Monday as reference so localization works for weekday names
    const refMonday = new Date(2021, 0, 4); // Monday
    return Array.from({ length: 7 }).map((_, i) =>
      getDayName(
        new Date(
          refMonday.getFullYear(),
          refMonday.getMonth(),
          refMonday.getDate() + i
        )
      )
    );
  }, []);

  const getLectureCountForDate = (d: Date) => {
    const ds = formatDate(d);
    return lectures.filter((l) => l.Date === ds).length;
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-100 text-sm text-center font-medium text-gray-700 py-2">
          {headerWeekDays.map((wd, idx) => (
            <div key={idx} className="px-2">
              {wd}
            </div>
          ))}
        </div>

        <div className="p-4 grid gap-2">
          {monthGrid.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-2">
              {week.map((day) => {
                const inMonth = day.getMonth() === date.getMonth();
                const today = isToday(day);
                const count = getLectureCountForDate(day);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => onDateClick(day)}
                    className={`h-24 flex flex-col justify-between p-3 rounded-lg border transition shadow-sm text-left ${
                      inMonth
                        ? "bg-white border-gray-200 hover:shadow-md"
                        : "bg-gray-50 border-transparent text-gray-400"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`text-sm font-semibold ${
                          today ? "text-[#30364F]" : "text-gray-800"
                        }`}
                      >
                        {day.getDate()}
                      </div>
                      {today && (
                        <span className="text-xs bg-[#E1D9BC] text-[#30364F] px-2 py-0.5 rounded-full">
                          Today
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 items-center">
                        {count > 0 ? (
                          // show up to 3 dots representing events
                          <div className="flex gap-1">
                            {Array.from({ length: Math.min(3, count) }).map(
                              (_, i) => (
                                <span
                                  key={i}
                                  className="w-2 h-2 rounded-full bg-[#F59E0B]"
                                />
                              )
                            )}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-300">&nbsp;</div>
                        )}
                      </div>

                      {count > 0 && (
                        <div className="text-xs text-gray-600">{count}</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthView;
