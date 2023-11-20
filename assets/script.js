//When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history.
//put the user input in a variable
//get the weather conditions using a fetch api
//use local storage to save the user input

//global variables
var openWeatherApiKey = "[my_Api_Key]";
var savedCities = [];

// make list of previously searched cities
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

//save the searched cities in the historyEl container
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
console.log("I AM WORKING!!!!!");