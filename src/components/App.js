import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import "../styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });

  const toDate = () => {
    const months = [
      "January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"
    ];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      setWeather({ ...weather, loading: true });
      
      const apiKey = "b15c0ae6b160c4e23569c55b64af4aba";  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;
      
      try {
        const res = await axios.get(url);
        console.log("API Response:", res);
        
        setWeather({
          data: {
            name: res.data.name,
            country: res.data.sys.country,
            main: {
              temp: res.data.main.temp,
              humidity: res.data.main.humidity,
            },
            wind: { speed: res.data.wind.speed },
            weather: [{
              description: res.data.weather[0].description,
              icon: res.data.weather[0].icon
            }]
          },
          loading: false,
          error: false
        });
      } catch (error) {
        setWeather({ ...weather, data: {}, error: true });
        console.log("Error fetching weather data:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "b15c0ae6b160c4e23569c55b64af4aba";  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Amman,JO&appid=${apiKey}&units=metric`; //default city
      
      try {
        const response = await axios.get(url);
        setWeather({
          data: {
            name: response.data.name,
            country: response.data.sys.country,
            main: {
              temp: response.data.main.temp,
              humidity: response.data.main.humidity,
            },
            wind: { speed: response.data.wind.speed },
            weather: [{
              description: response.data.weather[0].description,
              icon: response.data.weather[0].icon
            }]
          },
          loading: false,
          error: false
        });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("Error fetching initial weather data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {/* SearchEngine component */}
      <SearchEngine query={query} setQuery={setQuery} search={search} />

      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching...</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              Sorry, city not found. Please try again.
            </span>
          </span>
        </>
      )}

      {weather && weather.data && (
        <Forecast weather={weather} toDate={toDate} />
      )}
    </div>
  );
}

export default App;
