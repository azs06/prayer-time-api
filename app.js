import express from "express";
import cors from "cors";
import { getDistricts } from "./controllers/district-data.js";
import { getPermanentPrayerTimes } from "./controllers/prayer-data.js";

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

app.listen(3000, () => {
  console.log("Server Running", 3000);
});
