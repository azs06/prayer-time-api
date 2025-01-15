import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", () => {
    return "Server Running"
})

app.get("/get-prayer-times/:date", () => {

})

app.get("/get-ramadan-times/:date", () => {
    
})