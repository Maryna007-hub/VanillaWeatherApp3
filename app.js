function formatDate(timestamp) {
    // calculate the date
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
      }
    if (hours < 10) {
        hours = `0${hours}`;
      }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}
function displayForecast() {
  let forecastElement = document.querySelector('#forecast')
  
  let forecastHTML = '<div class="row">';
  let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
days.forEach(function(day) {
     forecastHTML = 
    forecastHTML + 
    `<div class="col-2"> 
      <div class="weather-fofecast-date">
      ${day}
      </div>
     <img src="https://openweathermap.org/img/wn/01n@2x.png" alt="clear" width="42" id="icon"/>
     <div class="weather-fofecast-tematurepers">
        <span class="weather-fofecast-temperature-max">18°</span>
        <span class="weather-fofecast-temperature-min">12°</span>
     </div>
    </div>`;
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
console.log(forecastHTML);
axios.get(apiUrl).then(displayForecast);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
   console.log(apiUrl);
}

function displayTemperature(response) {

    let temperatureElement = document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description1');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let dateElement = document.querySelector('#date');
    let iconElement = document.querySelector('#icon');

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute('src', `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute('alt', response.data.weather[0].description);

    getForecast(response.data.coord);
}
function search(city) {
    let apiKey = "ed7bf7f5cf99619f0aa2717501c76f85";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayTemperature);    
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector('#city-input');
   search(cityInputElement.value);
}
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector('#temperature');
  
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
 function displayCelsiusTemperature(event) {
    event.preventDefault();
     let temperatureElement = document.querySelector('#temperature');
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
 }

let celsiusTemperature = null;

  let form = document.querySelector('#search-form');
  form.addEventListener('submit', handleSubmit);

  let fahrenheitLink = document.querySelector('#fahrenheit-link');
  fahrenheitLink.addEventListener('click', displayFahrenheitTemperature);

   let celsiusLink = document.querySelector('#celsius-link');
   celsiusLink.addEventListener('click', displayCelsiusTemperature);

  search('Lisbon');
  displayForecast();

