function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(responce) {
  let forecast = responce.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `         <div class="col-2">
                <div class="weather-forecast-date">
                ${formatDay(forecastDay.time)}
                </div>
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  forecastDay.condition.icon
                }.png" alt="" width="42"/>
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> 
                    ${Math.round(forecastDay.temperature.maximum)}°
                  </span>
                  <span class="weather-forecast-temperature-min">
                    ${Math.round(forecastDay.temperature.minimum)}°
                  </span>
                </div>
                
              </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "9t257307ca476845c0efc0e5f24o9bc3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(responce) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(responce.data.temperature.current);
  cityElement.innerHTML = responce.data.city;
  countryElement.innerHTML = responce.data.country;
  descriptionElement.innerHTML = responce.data.condition.description;
  humidityElement.innerHTML = responce.data.temperature.humidity;
  windSpeedElement.innerHTML = Math.round(responce.data.wind.speed);
  dateElement.innerHTML = formatDate(responce.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${responce.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", responce.data.condition.description);

  getForecast(responce.data.coordinates);
}

function search(city) {
  let apiKey = "9t257307ca476845c0efc0e5f24o9bc3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
