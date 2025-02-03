import { calendar, getPrayerTimes } from "prayer-time-bd";
const {
  startOfMonth,
  endOfMonth,
  format,
  parse,
  differenceInDays,
  closestTo,
} = require("date-fns");
const { schedule } = calendar;

const getMonthDetails = (month, year = new Date().getFullYear()) => {
  const firstDate = startOfMonth(new Date(year, month));
  const lastDate = endOfMonth(firstDate);
  const monthName = format(firstDate, "MMMM");

  return { monthName, firstDate, lastDate };
};

const generateMonthSpecificSchedules = (monthIndex) => {
  const { firstDate, lastDate, monthName } = getMonthDetails(monthIndex);
  const monthSchedule =
    schedule.months.find((m) => m.name === monthName)?.schedule || [];

  // Extracting available schedule dates
  const availableDates = monthSchedule.map((s) =>
    parse(s.date, "dd", firstDate)
  );

  const findNearestSchedule = (dayDate) => {
    if (availableDates.length === 0) return null;

    const closestDate = closestTo(dayDate, availableDates);
    const formattedDate = format(dayDate, "dd"); // Convert to match schedule format

    return (
      monthSchedule.find((s) => s.date === formattedDate) || {
        date: formattedDate,
        message: "No available schedule",
      }
    );
  };

  const schedules = [];
  let currentDate = firstDate;

  while (currentDate <= lastDate) {
    const scheduleForDay = findNearestSchedule(currentDate);
    schedules.push({ ...scheduleForDay, date: format(currentDate, "dd") });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return { monthName, schedules };
};

function getPermanentPrayerTimes() {
  return Array.from({ length: 12 }, (_, i) =>
    generateMonthSpecificSchedules(i)
  );
}

function getPrayerTimesByDateAndDistrict(
  date = new Date(),
  district = undefined
) {
  return getPrayerTimes(date, district);
}

export { getPermanentPrayerTimes, getPrayerTimesByDateAndDistrict };
