import express from "express";
import cors from "cors";
import { getDistricts } from "./controllers/district-data.js";
import { getPermanentPrayerTimes, getPrayerTimesByDateAndDistrict } from "./controllers/prayer-data.js";
import { formatDate } from "./utils/date.js";
const app = express();

app.use(cors());

app.get("/", () => {
  return "Server Running";
});

app.get("/districts", (req, res) => {
  return res.json(getDistricts());
});
app.get("/permanent-prayer-times", (req, res) => {
    return res.json(getPermanentPrayerTimes());
});

app.get("/prayer-times", (req, res) => {
    const date = new Date(req.query.date || new Date());
    const district = req.query.district || undefined;
    const response = getPrayerTimesByDateAndDistrict(date, district);
    response.date = formatDate(date);
    return res.json(response);
})

app.listen(3000, () => {
  console.log("Server Running", 3000);
});
