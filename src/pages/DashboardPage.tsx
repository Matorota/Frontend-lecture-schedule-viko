// Dashboard Page - Main Schedule View
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { apiService } from "../services/api";
import type { Lecture, ViewType, Group } from "../types";
import { formatDate, getMonthName, getWeekDates } from "../utils/dateUtils";
import DayView from "../components/DayView";
import WeekView from "../components/WeekView";
import MonthView from "../components/MonthView";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [viewType, setViewType] = useState<ViewType>("day");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsData = await apiService.getGroups();
        setGroups(groupsData);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    fetchLectures();
  }, [viewType, currentDate, selectedGroup]);

  const fetchLectures = async () => {
    setLoading(true);
    setError("");

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

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewType === "day") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewType === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewType === "day") {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewType === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
    setViewType("day");
  };

  const getDateRangeText = () => {
    if (viewType === "day") {
      return formatDate(currentDate);
    } else if (viewType === "week") {
      const weekDates = getWeekDates(currentDate);
      return `${formatDate(weekDates[0])} - ${formatDate(weekDates[6])}`;
    } else {
      return `${getMonthName(currentDate)} ${currentDate.getFullYear()}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0DB] flex">
      <aside
        className="w-80 bg-[#30364F] shadow-xl flex flex-col"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          className="p-8 border-b border-[#ACBAC4]"
          style={{ padding: "32px", borderBottom: "2px solid #ACBAC4" }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">VIKO Lectures</h1>
          {user && (
            <p
              className="text-base text-[#ACBAC4]"
              style={{ marginTop: "16px" }}
            >
              {user.firstName} {user.lastName}
              <br />
              <span className="text-sm text-[#E1D9BC]">{user.group.name}</span>
            </p>
          )}
        </div>

        <div
          className="flex-1 overflow-y-auto"
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <h3 className="text-sm font-bold text-[#E1D9BC] uppercase tracking-wider">
              {t("dashboard.viewMode")}
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <button
                onClick={() => setViewType("day")}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all text-base text-left ${
                  viewType === "day"
                    ? "bg-[#ACBAC4] text-[#30364F] shadow-lg"
                    : "bg-[#30364F] text-white hover:bg-[#ACBAC4] hover:text-[#30364F]"
                }`}
                style={{
                  border: viewType === "day" ? "2px solid #30364F" : "none",
                }}
              >
                {t("dashboard.viewDay")}
              </button>
              <button
                onClick={() => setViewType("week")}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all text-base text-left ${
                  viewType === "week"
                    ? "bg-[#ACBAC4] text-[#30364F] shadow-lg"
                    : "bg-[#30364F] text-white hover:bg-[#ACBAC4] hover:text-[#30364F]"
                }`}
                style={{
                  border: viewType === "week" ? "2px solid #30364F" : "none",
                }}
              >
                {t("dashboard.viewWeek")}
              </button>
              <button
                onClick={() => setViewType("month")}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all text-base text-left ${
                  viewType === "month"
                    ? "bg-[#ACBAC4] text-[#30364F] shadow-lg"
                    : "bg-[#30364F] text-white hover:bg-[#ACBAC4] hover:text-[#30364F]"
                }`}
                style={{
                  border: viewType === "month" ? "2px solid #30364F" : "none",
                }}
              >
                {t("dashboard.viewMonth")}
              </button>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <h3 className="text-sm font-bold text-[#E1D9BC] uppercase tracking-wider">
              {t("dashboard.filterByGroup")}
            </h3>
            <select
              id="group-select"
              value={selectedGroup || ""}
              onChange={(e) =>
                setSelectedGroup(e.target.value ? Number(e.target.value) : null)
              }
              className="w-full px-4 py-3 bg-white border-2 border-[#ACBAC4] rounded-lg focus:ring-2 focus:ring-[#E1D9BC] focus:border-[#ACBAC4] outline-none text-base text-gray-900"
            >
              <option value="">
                {t("dashboard.myGroup")} ({user?.group.name})
              </option>
              {groups.map((group) => (
                <option key={group.ID} value={group.ID}>
                  {group.Name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="px-6 py-4 border-t border-[#ACBAC4]"
          style={{ padding: "16px 24px", borderTop: "2px solid #ACBAC4" }}
        >
          <h3 className="text-sm font-bold text-[#E1D9BC] uppercase tracking-wider mb-3">
            {t("common.language")}
          </h3>
          <LanguageSwitcher variant="dark" />
        </div>

        <div
          className="p-6 border-t border-[#ACBAC4]"
          style={{ padding: "24px", borderTop: "2px solid #ACBAC4" }}
        >
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold text-base shadow-lg"
          >
            {t("dashboard.logout")}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div
          style={{
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-xl border-2 border-[#ACBAC4]"
            style={{
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                onClick={handlePrevious}
                className="px-8 py-3 bg-[#30364F] text-white rounded-lg hover:bg-[#ACBAC4] hover:text-[#30364F] transition-all font-semibold text-base"
              >
                ← Previous
              </button>

              <h2 className="text-3xl font-bold text-[#30364F] text-center">
                {getDateRangeText()}
              </h2>

              <button
                onClick={handleNext}
                className="px-8 py-3 bg-[#30364F] text-white rounded-lg hover:bg-[#ACBAC4] hover:text-[#30364F] transition-all font-semibold text-base"
              >
                Next →
              </button>
            </div>
          </div>

          {error && (
            <div style={{ marginBottom: "32px" }}>
              <ErrorMessage message={error} onRetry={fetchLectures} />
            </div>
          )}

          {loading && <LoadingSpinner text="Loading lectures..." />}

          {!loading && (
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[#ACBAC4] p-8">
              {viewType === "day" && (
                <DayView date={currentDate} lectures={lectures} />
              )}
              {viewType === "week" && (
                <WeekView date={currentDate} lectures={lectures} />
              )}
              {viewType === "month" && (
                <MonthView
                  date={currentDate}
                  lectures={lectures}
                  onDateClick={handleDateClick}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
