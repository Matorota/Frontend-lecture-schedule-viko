// Custom hook for managing lectures
import { useState, useEffect } from "react";
import { apiService } from "../services/api";
import type { Lecture, ViewType } from "../types";
import { formatDate, getWeekDates } from "../utils/dateUtils";

interface UseLecturesOptions {
  viewType: ViewType;
  currentDate: Date;
  selectedGroup: number | null;
}

export const useLectures = ({
  viewType,
  currentDate,
  selectedGroup,
}: UseLecturesOptions) => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLectures();
  }, [viewType, currentDate, selectedGroup]);

  const fetchLectures = async () => {
    setLoading(true);
    setError(null);

    try {
      let lecturesData: Lecture[];

      if (viewType === "day") {
        const dateStr = formatDate(currentDate);
        lecturesData = selectedGroup
          ? await apiService.getLecturesByGroupAndDate(selectedGroup, dateStr)
          : await apiService.getLecturesByDate(dateStr);
      } else if (viewType === "week") {
        const weekDates = getWeekDates(currentDate);
        const dateFrom = formatDate(weekDates[0]);
        const dateTo = formatDate(weekDates[6]);
        lecturesData = selectedGroup
          ? await apiService.getLecturesByGroupAndDateRange(
              selectedGroup,
              dateFrom,
              dateTo
            )
          : await apiService.getLecturesByDateRange(dateFrom, dateTo);
      } else {
        // month
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const dateFrom = formatDate(firstDay);
        const dateTo = formatDate(lastDay);
        lecturesData = selectedGroup
          ? await apiService.getLecturesByGroupAndDateRange(
              selectedGroup,
              dateFrom,
              dateTo
            )
          : await apiService.getLecturesByDateRange(dateFrom, dateTo);
      }

      setLectures(lecturesData);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch lectures");
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchLectures();
  };

  return { lectures, loading, error, refetch };
};
