//When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history.
//put the user input in a variable
//get the weather conditions using a fetch api
//use local storage to save the user input

//global variables
var openWeatherApiKey = "[my_Api_Key]";
var openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat";


// make list of previously searched cities
var searchHistoryList = function(cityName) {
    $('.past-search:contains("' + cityName + '")').remove();






}
