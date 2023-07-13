let currentTime = new Date();

let appDate = document.querySelector(".date");

let currentDate = currentTime.getDate();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[currentTime.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[currentTime.getMonth()];

appDate.innerHTML = `${day}, ${currentDate} ${month} ${hours}:${minutes}`;

let city = "pretoria";
let units = "metric";
let apiKey = "3980a7c8f2a782241a093131b099f993";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
    let units = "metric";
    let apiKey = "3980a7c8f2a782241a093131b099f993";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showWeather);
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showWeather(response) {
  let city = response.data.name;
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${city}`;

  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature} °C`;

  let sky = response.data.weather[0].description;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${sky}`;

  let maxTemperature = Math.round(response.data.main.temp_max);
  let maxtemp = document.querySelector("#maxtemp");
  maxtemp.innerHTML = `${maxTemperature}`;

  let minTemperature = Math.round(response.data.main.temp_min);
  let mintemp = document.querySelector("#mintemp");
  mintemp.innerHTML = `${minTemperature} `;

  let todaysWeather = Math.round(response.data.main.feels_like);
  let feel = document.querySelector("#todaysWeather");
  feel.innerHTML = `${todaysWeather} °C`;

  let windSpeed = response.data.wind.speed;
  let speed = document.querySelector("#windspeed");
  speed.innerHTML = `${windSpeed} km/h`;

  let airPressure = response.data.main.pressure;
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `${airPressure} mb`;

  let airHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${airHumidity} %`;
}
axios.get(apiUrl).then(showWeather);

function currentCity(response) {
  let apiKey = "3980a7c8f2a782241a093131b099f993";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  response.navigator.geolocation.getCurrentPosition(currentCity);
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(position) {
  console.log(position.coords);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  navigator.geolocation.getCurrentPosition(currentCity);
  axios.get(apiUrl).then(showWeather);
}

function getCurrent(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let button = document.querySelector(".current");
button.addEventListener("click", getCurrent);
