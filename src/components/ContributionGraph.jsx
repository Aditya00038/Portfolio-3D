import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const WEEKS_IN_YEAR = 53;
const DAYS_IN_WEEK = 7;
const JANUARY_MONTH = 0;
const DECEMBER_MONTH = 11;
const SUNDAY_DAY = 0;
const MIN_WEEKS_FOR_DECEMBER_HEADER = 2;
const TOOLTIP_OFFSET_X = 10;
const TOOLTIP_OFFSET_Y = 40;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Contribution level colors (GitHub colors)
const CONTRIBUTION_COLORS = [
  "bg-[#161b22]", // Level 0 - No contributions
  "bg-[#0e4429]", // Level 1
  "bg-[#006d32]", // Level 2
  "bg-[#26a641]", // Level 3
  "bg-[#39d353]", // Level 4 - Max
];

const LEVEL_0 = 0;
const LEVEL_1 = 1;
const LEVEL_2 = 2;
const LEVEL_3 = 3;
const LEVEL_4 = 4;
const CONTRIBUTION_LEVELS = [LEVEL_0, LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4];
const DAY_1 = 1;
const DAY_31 = 31;

const isDateInValidRange = (currentDate, startDate, endDate, targetYear) => {
  const isInRange = currentDate >= startDate && currentDate <= endDate;
  const isPreviousYearDecember =
    currentDate.getFullYear() === targetYear - 1 &&
    currentDate.getMonth() === DECEMBER_MONTH;
  const isNextYearJanuary =
    currentDate.getFullYear() === targetYear + 1 &&
    currentDate.getMonth() === JANUARY_MONTH;
  return isInRange || isPreviousYearDecember || isNextYearJanuary;
};

const createDayData = (currentDate, contributionData) => {
  // Pad month and day to ensure correct string matching (YYYY-MM-DD)
  const yyyy = currentDate.getFullYear();
  const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
  const dd = String(currentDate.getDate()).padStart(2, '0');
  const dateString = `${yyyy}-${mm}-${dd}`;
  
  const existingData = contributionData.find((d) => d.date === dateString);
  return {
    date: dateString,
    count: existingData?.count ?? LEVEL_0,
    level: existingData?.level ?? LEVEL_0,
  };
};

const shouldShowMonthHeader = ({
  currentYear,
  currentMonth,
  weekCount,
}) => {
  // Simplistic rule: show if it spans at least 2 weeks
  return weekCount >= 2;
};

const calculateMonthHeaders = (endDate) => {
  const headers = [];
  const startDate = new Date(endDate);
  startDate.setFullYear(endDate.getFullYear() - 1);
  
  const firstSunday = new Date(startDate);
  firstSunday.setDate(startDate.getDate() - startDate.getDay());

  let currentMonth = -1;
  let currentYear = -1;
  let monthStartWeek = 0;
  let weekCount = 0;

  for (let weekNumber = 0; weekNumber < WEEKS_IN_YEAR; weekNumber++) {
    const weekDate = new Date(firstSunday);
    weekDate.setDate(firstSunday.getDate() + weekNumber * DAYS_IN_WEEK);

    const monthKey = weekDate.getMonth();
    const yearKey = weekDate.getFullYear();

    if (monthKey !== currentMonth || yearKey !== currentYear) {
      if (
        currentMonth !== -1 &&
        shouldShowMonthHeader({
          currentYear,
          currentMonth,
          weekCount,
        })
      ) {
        headers.push({
          month: MONTHS[currentMonth],
          colspan: weekCount,
          startWeek: monthStartWeek,
        });
      }
      currentMonth = monthKey;
      currentYear = yearKey;
      monthStartWeek = weekNumber;
      weekCount = 1;
    } else {
      weekCount++;
    }
  }

  if (
    currentMonth !== -1 &&
    shouldShowMonthHeader({
      currentYear,
      currentMonth,
      weekCount,
    })
  ) {
    headers.push({
      month: MONTHS[currentMonth],
      colspan: weekCount,
      startWeek: monthStartWeek,
    });
  }

  return headers;
};

export default function ContributionGraph({
  data = [],
  endDate = new Date(),
  className = "",
  showLegend = true,
  showTooltips = true,
}) {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const yearData = useMemo(() => {
    const startDate = new Date(endDate);
    startDate.setFullYear(endDate.getFullYear() - 1);
    const days = [];

    const firstSunday = new Date(startDate);
    firstSunday.setDate(startDate.getDate() - startDate.getDay());

    for (let weekNum = 0; weekNum < WEEKS_IN_YEAR; weekNum++) {
      for (let day = 0; day < DAYS_IN_WEEK; day++) {
        const currentDate = new Date(firstSunday);
        currentDate.setDate(firstSunday.getDate() + weekNum * DAYS_IN_WEEK + day);

        if (currentDate >= startDate && currentDate <= endDate) {
          days.push(createDayData(currentDate, data));
        } else {
          days.push({
            date: "",
            count: LEVEL_0,
            level: LEVEL_0,
          });
        }
      }
    }

    return days;
  }, [data, endDate]);

  const monthHeaders = useMemo(() => calculateMonthHeaders(endDate), [endDate]);

  const handleDayHover = (day, event) => {
    if (showTooltips && day.date) {
      setHoveredDay(day);
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleDayLeave = () => {
    setHoveredDay(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    // Avoid timezone shift by splitting
    const [y, m, d] = dateString.split('-');
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getContributionText = (count) => {
    if (count === LEVEL_0) return "No contributions";
    if (count === LEVEL_1) return "1 contribution";
    return `${count} contributions`;
  };

  return (
    <div className={`contribution-graph ${className}`}>
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <table className="border-separate border-spacing-1 text-xs mx-auto">
          <caption className="sr-only">Contribution Graph</caption>
          <thead>
            <tr className="h-3">
              <td className="w-7 min-w-7" />
              {monthHeaders.map((header) => (
                <td
                  className="relative text-left text-white"
                  colSpan={header.colspan}
                  key={`${header.month}-${header.startWeek}`}
                >
                  <span className="absolute top-0 left-1">{header.month}</span>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: DAYS_IN_WEEK }, (_, dayIndex) => (
              <tr className="h-[12px]" key={DAYS[dayIndex]}>
                <td className="relative w-7 min-w-7 text-white">
                  {dayIndex % 2 === 0 && (
                    <span className="absolute -bottom-0.5 left-0 text-xs text-[#7d8590]">
                      {DAYS[dayIndex]}
                    </span>
                  )}
                </td>
                {Array.from({ length: WEEKS_IN_YEAR }, (_, w) => {
                  const dayData = yearData[w * DAYS_IN_WEEK + dayIndex];
                  const cellKey = `${dayData?.date ?? "empty"}-${w}-${dayIndex}`;
                  
                  if (!dayData?.date) {
                    return (
                      <td className="h-[12px] w-[12px] p-0" key={cellKey}>
                        <div className="h-[12px] w-[12px]" />
                      </td>
                    );
                  }

                  return (
                    <td
                      className="h-[12px] w-[12px] cursor-pointer p-0"
                      key={cellKey}
                      onMouseEnter={(e) => handleDayHover(dayData, e)}
                      onMouseLeave={handleDayLeave}
                    >
                      <div
                        className={`h-[12px] w-[12px] rounded-[2px] transition-all duration-200 ${
                          CONTRIBUTION_COLORS[dayData.level]
                        } hover:ring-2 hover:ring-[#4493f8] hover:scale-110 z-10 relative`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showTooltips && hoveredDay && (
        <motion.div
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          className="pointer-events-none fixed z-[999] rounded-lg border border-[#30363d] bg-[#6e7681] px-3 py-2 text-white text-sm shadow-xl"
          exit={shouldReduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.8 }}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
          style={{
            left: tooltipPosition.x + TOOLTIP_OFFSET_X,
            top: tooltipPosition.y - TOOLTIP_OFFSET_Y,
          }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
        >
          <div className="font-semibold text-center">
            {getContributionText(hoveredDay.count)}
          </div>
          <div className="text-white/80 text-xs text-center mt-1">
            {formatDate(hoveredDay.date)}
          </div>
        </motion.div>
      )}

      {showLegend && (
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[#7d8590] text-[13px]">
          <span>
            {yearData.reduce((s, x) => s + (x.count || 0), 0)} contributions in the last year
          </span>
          <div className="flex items-center gap-1.5 mt-2 sm:mt-0 text-[11px]">
            <span>Less</span>
            <div className="flex items-center gap-[3px]">
              {CONTRIBUTION_LEVELS.map((level) => (
                <div
                  className={`h-[12px] w-[12px] rounded-[2px] ${CONTRIBUTION_COLORS[level]}`}
                  key={level}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      )}
    </div>
  );
}
