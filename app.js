import express from "express";
import cors from "cors";
import { getPrayerTimes, getRamadanData } from "./controllers/parayer-data";

const app = express();

app.use(cors());

app.get("/", () => {
  return "Server Running";
});

app.get("/get-prayer-times/:date", (req, res) => {
    try {
        return getPrayerTimes()
    } catch(e){
        res.send(400);
    }
});

app.get("/get-ramadan-times/:date", (req, res) => {
    return getRamadanData();
});
