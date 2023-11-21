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




