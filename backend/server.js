import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));

const API_KEY = process.env.OPENWEATHER_API_KEY;
console.log("OPENWEATHER_API_KEY =", API_KEY);

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);
