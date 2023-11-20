//When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history.
//put the user input in a variable
//get the weather conditions using a fetch api
//use local storage to save the user input

//global variables
var openWeatherApiKey = "[my_Api_Key]";
var savedCities = [];

// make list of previously searched cities
var searchHistoryList = function (cityName) {
  $('.last-search:contains("' + cityName + '")').remove();

  //city name
  var historySearch = $("<p>");
  historySearch.addClass("last-search");
  historySearch.text(cityName);

  //container for historySearch
  var historySearchContainer = $("<div>");
  historySearchContainer.addClass("last-search-container");

  //append historySearch to container
  historySearchContainer.append(historySearch);

  //append to history id
  var historyEl = $("#history");
  historyEl.append(historySearchContainer);

  //if statement to populate the savedCities with previous cities
  if (savedCities.length > 0) {
    var previousSavedCities = localStorage.getItem("savedCities");
    savedCities = JSON.parse(previousSavedCities);
  }
  //push a city into the array
  savedCities.push(cityName);
  localStorage.setItem("savedCities", JSON.stringify(savedCities));
};
