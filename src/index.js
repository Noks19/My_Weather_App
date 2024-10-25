function latestWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  getForecast(response.data.city);
  console.log(response);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let isAM = hours < 12;

  hours = hours % 12 || 12;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes} ${isAM ? `AM` : `PM`}`;
}

function searchCity(city) {
  let apiKey = "cob5et6c97b753fe452a00f1cf914a6d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(latestWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "cob5et6c97b753fe452a00f1cf914a6d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = " ";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` 
<div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
       <div >
       <img src= "${
         day.condition.icon_url
       }" class="weather-forecast-icon"/> </div> 
       <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature "><strong>${Math.round(
          day.temperature.maximum
        )}</strong></div>
        <div class="weather-forecast-temperature"><strong>${Math.round(
          day.temperature.minimum
        )}</strong></div> </div> </div>
         </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchformElement = document.querySelector("#search-form");
searchformElement.addEventListener("submit", handleSearchSubmit);

searchCity("New York");
