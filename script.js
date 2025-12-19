// DOM elements
const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

const weatherBody = document.querySelector(".weather-body");
const locationNotFound = document.querySelector(".location-not-found");

// MAIN FUNCTION
async function checkWeather(city) {
  if (!city) return;

  const apiKey = "ENTER YOUR API KEY NOT MINE "; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API ERROR");
    }

    const data = await response.json();
    console.log("API DATA:", data);

    // SHOW WEATHER UI
    weatherBody.style.display = "flex";
    locationNotFound.style.display = "none";

    // UPDATE VALUES
    temperature.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
    description.innerHTML = data.weather[0].description;
    humidity.innerHTML = `${data.main.humidity}%`;
    windSpeed.innerHTML = `${data.wind.speed} Km/H`;

    // UPDATE IMAGE
    switch (data.weather[0].main) {
      case "Clouds":
        weatherImg.src = "assets/cloud.png";
        break;
      case "Clear":
        weatherImg.src = "assets/clear.png";
        break;
      case "Rain":
        weatherImg.src = "assets/rain.png";
        break;
      case "Mist":
      case "Haze":
        weatherImg.src = "assets/mist.png";
        break;
      case "Snow":
        weatherImg.src = "assets/snow.png";
        break;
      default:
        weatherImg.src = "assets/cloud.png";
    }

  } catch (error) {
    console.error("FETCH FAILED:", error);

    // SHOW ERROR UI
    weatherBody.style.display = "none";
    locationNotFound.style.display = "flex";
  }
}

// BUTTON CLICK
searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value.trim());
});

// ENTER KEY SUPPORT
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(inputBox.value.trim());
  }
});

