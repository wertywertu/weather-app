import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const weatherIcons = {
    Clear: "/images/clear.png",
    Clouds: "/images/clouds.png",
    Rain: "/images/rain.png",
    Drizzle: "/images/drizzle.png",
    Mist: "/images/mist.png",
    Snow: "/images/snow.png",
  };


  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/weather?city=${city}`
      );

      const data = await res.json();

      if (data.cod === "404" || data.cod === 404) {
        setError("City not found.");
        setWeather(null);
        return;
      }

      setWeather(data);
      setError("");

    } catch (err) {
      setError("Something went wrong.");
      setWeather(null);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#141e30] text-white">
      <div className="w-full max-w-lg p-5">

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl">

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter city name"
              className="w-full px-4 py-3 rounded-full bg-emerald-400 text-white outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              onClick={fetchWeather}
              className="p-4 rounded-full bg-emerald-400 text-white font-semibold cursor-pointer"
            >
              <img src="/images/search.png" className="w-5 mx-auto" />
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm mt-2 text-center">
              {error}
            </p>
          )}


          {weather && (
            <div className="text-center mt-8">
              <img
                src={weatherIcons[weather.weather[0].main] || "/images/clear.png"}
                className="w-28 mx-auto mb-2"
              />

              <h1 className="text-5xl">{Math.round(weather.main.temp)}°C</h1>
              <h2 className="text-xl opacity-90">{weather.name}</h2>

              <div className="flex justify-between mt-8">
                <div className="flex items-center gap-2">
                  <img src="/images/humidity.png" className="w-9" />
                  <div className="text-left">
                    <p className="text-lg">{weather.main.humidity}%</p>
                    <p className="text-xs opacity-70">Humidity</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <img src="/images/wind.png" className="w-9" />
                  <div className="text-left">
                    <p className="text-lg">{weather.wind.speed} km/h</p>
                    <p className="text-xs opacity-70">Wind</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
