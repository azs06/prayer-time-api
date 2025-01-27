import { calendar, getPrayerTimes } from "prayer-time-bd";

function getPermanentPrayerTimes() {
  return calendar;
}

function getPrayerTimesByDateAndDistrict(
  date = new Date(),
  district = undefined
) {
  console.log("date", date);
  console.log("district", district);
  return getPrayerTimes(date, district);
}

export { getPermanentPrayerTimes, getPrayerTimesByDateAndDistrict };
