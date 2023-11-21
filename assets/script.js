//When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history.
//put the user input in a variable
//get the weather conditions using a fetch api
//use local storage to save the user input

//global variables
var openWeatherApiKey = "d7710e304709bf4a5c2281b6356d53fa";
var savedCities = [];

var historySearchList = function (cityName) {
  $('.last-search:contains("' + cityName + '")').remove();

  //city name
  var historySearch = $("<p>");
  historySearch.addClass("last-search");
  historySearch.text(cityName);

  //container-div for historySearch
  var historySearchDiv = $("<div>");
  historySearchDiv.addClass("last-search-container");

  //append historySearch to the div
  historySearchDiv.append(historySearch);

  //append to history id
  var historyEl = $("#history");
  historyEl.append(historySearchDiv);

  //if statement to populate the savedCities with previous cities
  if (savedCities.length > 0) {
    var previousSavedCities = localStorage.getItem("savedCities");
    savedCities = JSON.parse(previousSavedCities);
  }
  //push a city into the array
  savedCities.push(cityName);
  localStorage.setItem("savedCities", JSON.stringify(savedCities));

  //clear search input
  $("#search-input").val("");
};

var loadHistorySearch = function () {
  //from local storage get the saved cities
  var savedHistorySearch = localStorage.getItem("savedCities");
  //return false if there isn't any previous saved cities
  if (!savedHistorySearch) {
    return false;
  }
  //turn the string into an array
  savedHistorySearch = JSON.parse(savedHistorySearch);

  //for loop for each item in the list
  for (var i = 0; i < savedHistorySearch.length; i++) {
    historySearchList(savedHistorySearch[i]);
  }
};

var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "&appid=" +
  openWeatherApiKey;

var getCurrentWeather = function (cityName) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    openWeatherApiKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(queryURL);
      console.log(data);

      var cityLon = data.coord.lon;
      var cityLat = data.coord.lat;

      var oneCallQueryURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        cityLat +
        "&lon=" +
        cityLon +
        "&exclude=minutely,hourly,daily&appid=" +
        openWeatherApiKey +
        "&units=metric";

      return fetch(oneCallQueryURL);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      historySearchList(cityName);

      //add city name, weather icon and date to section
      var titleEl = $("#title");
      // use dayjs to  display the date
      var currentDateEl = dayjs().format("M/D/YYYY");
      titleEl.text(cityName + currentDateEl);

      var todaysIconCode = data.current.weather[0].icon;
      var WeatherIconEl = $("#todays-weather-icon");
      WeatherIconEl.attr(
        "src",
        "https://openweathermap.org/img/wn/" + todaysIconCode + ".png"
      );
      //todays temp</div></p>
      var todaysTempEl = $("#todays-temperature");
      todaysTempEl.text("Temperature: " + data.current.temp + "\u00B0C");

      //todays wind speed
      var todaysWindEl = $("#todays-wind-speed");
      todaysWindEl.text("Wind: " + data.current.wind_speed + " KPH");

      // todays humidity
      var todaysHumidityEl = $("#todays-humidity");
      todaysHumidityEl.text("Humidity: " + data.current.humidity + "%");
    })
    .catch(function (error) {
      $("#search-input").val("");

      // alert the user that there is an error
      alert("City not found or there was an error. Please try again.");
    });
};


