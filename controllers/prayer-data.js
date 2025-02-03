import { calendar, getPrayerTimes } from "prayer-time-bd";
import {
  startOfMonth,
  endOfMonth,
  format,
  parse,
  differenceInDays,
  closestTo,
  isBefore,
} from "date-fns";
const schedule = calendar;

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

  // Convert schedule dates to actual Date objects
  const scheduleDates = monthSchedule.map((s) => ({
    ...s,
    parsedDate: parse(s.date, "dd", firstDate),
  }));

  // Function to find the nearest **previous** schedule
  const findNearestSchedule = (currentDate) => {
    let nearestSchedule = null;

    for (const sch of scheduleDates) {
      if (
        isBefore(sch.parsedDate, currentDate) ||
        sch.parsedDate.getTime() === currentDate.getTime()
      ) {
        nearestSchedule = sch;
      } else {
        break; // Stop once we pass the last previous match
      }
    }

    return nearestSchedule
      ? { ...nearestSchedule, date: format(currentDate, "dd") }
      : { date: format(currentDate, "dd"), message: "No schedule available" };
  };

  const schedules = [];
  let currentDate = firstDate;

  while (currentDate <= lastDate) {
    schedules.push(findNearestSchedule(currentDate));
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
