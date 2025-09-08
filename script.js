document.addEventListener("DOMContentLoaded", function () {
 
  const cityInput = document.getElementById("city-input");
  const searchBtn = document.getElementById("search-btn");
  const unitToggle = document.getElementById("unit-toggle");
  const weatherDisplay = document.getElementById("weather-display");
  const loadingSpinner = document.getElementById("loading-spinner");
  const errorMessage = document.getElementById("error-message");

  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const weatherIcon = document.getElementById("weather-icon");
  const weatherStatus = document.getElementById("weather-status");
  const feelsLike = document.getElementById("feels-like");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind-speed");
  const pressure = document.getElementById("pressure");
  const dateDisplay = document.getElementById("date-display");

  
  let isCelsius = true; 

  
  searchBtn.addEventListener("click", handleSearch);

  cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  unitToggle.addEventListener("click", toggleTemperatureUnit);



  function handleSearch() {
    const city = cityInput.value.trim();

    if (city) {
      fetchWeatherData(city);
    } else {
      showError("Please enter a city name");
    }
  }

  function toggleTemperatureUnit() {
    isCelsius = !isCelsius;

    unitToggle.textContent = isCelsius ? "Switch to °F" : "Switch to °C";

    updateTemperatureDisplay();
  }

  function fetchWeatherData(city) {
    showLoading();

    hideError();

  
    setTimeout(function () {
      if (city.toLowerCase() === "invalid") {
        showError("City not found. Please try a different city.");
        hideLoading();
        return;
      }


      const weatherData = {
        city: city,
        country: "Country",
        temperature: {
          celsius: 24,
          fahrenheit: 75,
        },
        feelsLike: {
          celsius: 26,
          fahrenheit: 79,
        },
        humidity: 65,
        windSpeed: {
          kmh: 3.6,
          mph: 2.2,
        },
        pressure: 1015,
        condition: "Sunny",
        icon: "fa-sun",
      };

      updateWeatherDisplay(weatherData);

      hideLoading();
    }, 1500); 
  }

  function updateWeatherDisplay(data) {
    cityName.textContent = data.city;

    weatherIcon.className = "fas " + data.icon;

    weatherStatus.textContent = data.condition;

    const now = new Date();
    dateDisplay.textContent = formatDate(now);

    window.currentWeatherData = data;

    updateTemperatureDisplay();

    humidity.textContent = data.humidity + "%";
    pressure.textContent = data.pressure + " hPa";

    weatherDisplay.style.display = "block";
  }

  function updateTemperatureDisplay() {
    if (!window.currentWeatherData) return;

    const data = window.currentWeatherData;
    if (isCelsius) {
      temperature.textContent = data.temperature.celsius;
      feelsLike.textContent = data.feelsLike.celsius + "°C";
      windSpeed.textContent = data.windSpeed.kmh + " km/h";
    } else {
      temperature.textContent = data.temperature.fahrenheit;
      feelsLike.textContent = data.feelsLike.fahrenheit + "°F";
      windSpeed.textContent = data.windSpeed.mph + " mph";
    }
  }

  function formatDate(date) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayName}, ${monthName} ${day}, ${year}`;
  }

  function showLoading() {
    loadingSpinner.style.display = "block";
    weatherDisplay.style.display = "none";
  }

  function hideLoading() {
    loadingSpinner.style.display = "none";
  }

  function showError(message) {
    errorMessage.style.display = "block";
    document.getElementById("error-text").textContent = message;
  }

  function hideError() {
    errorMessage.style.display = "none";
  }


  showLoading();

  setTimeout(function () {
    fetchWeatherData("Addis-Abeba");
  }, 1000);
});
