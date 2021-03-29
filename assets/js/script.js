// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


var clearHistoryBtn = document.querySelector("#reset-button")
var zipcodeFormEl = document.querySelector("#zipcode-form");
var zipcodeInputEl = document.querySelector("#zipcode");

var searchContainerEl = document.querySelector("#search-history")
var searchHistory = [];
var currentSearch = 0;


function getWeather(zipcode) {
    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&units=imperial&appid=0444a9f6e39557fee6a4f8463a2448cd";

    fetch(weatherAPI).then(function (response) {
            return response.json();
        })
        .then(function(response) {
            var cityName = document.querySelector("#city-name")
            cityName.textContent = response.name;

            var currentDay = document.querySelector("#current-day")
            currentDay.textContent = moment().format("[(]MM[/]D[/]YYYY[)]")

            var weatherIcon = document.querySelector("#weather-icon")
            weatherIcon.setAttribute("src", 'http://openweathermap.org/img/wn/'+response.weather[0].icon+'.png');

            var temp = document.querySelector("#current-temp")
            temp.textContent = "Temperature: " + response.main.temp + "°F";
            var feelsLike = document.querySelector("#feels-like")
            feelsLike.textContent = "Feels Like: " + response.main.feels_like + "°F";

            var humidity = document.querySelector("#humidity")
            humidity.textContent = "Humidity: " + response.main.humidity + "%";

            var windSpeed = document.querySelector("#wind-speed")
            windSpeed.textContent = "Wind: " + response.wind.speed + " mph";

            var searchObj = [{
                city: response.name,
                searchID: currentSearch,
                zipcode: zipcode,
                lat: response.coord.lat,
                long: response.coord.lon
            }]
            searchHistory.push(searchObj)
            localStorage.setItem("searches", JSON.stringify(searchHistory))

            var buttonContainer = document.createElement("div")
            buttonContainer.className = "row"

            var historyButton = document.createElement("button")
            historyButton.className = "btn bg-white border city-button"
            historyButton.id = "history-" + currentSearch
            historyButton.textContent = response.name
            historyButton.value = zipcode

            buttonContainer.appendChild(historyButton);
            searchContainerEl.appendChild(buttonContainer);

            var lat = response.coord.lat
            var lon = response.coord.lon
            getUVindex(lat,lon)
        })
    currentSearch++
};

function getForecast(zipcode) {
    var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?zip="+zipcode+",us&units=imperial&appid=0444a9f6e39557fee6a4f8463a2448cd";
    
    fetch(forecastAPI).then(function(response){
        return response.json();
    })
    .then(function(response){
        //day 1 forecast
        var day1El = document.querySelector("#day1")
        day1El.className = "column col forecast-container"

        var day1Header = document.querySelector("#day1date")
        day1Header.className = "forecast-header";
        day1Header.textContent = moment().add(1,"days").format("MM[/]D[/]YYYY");

        var day1Temp = document.querySelector("#day1temp")
        day1Temp.className = "forecast-info"
        day1Temp.textContent = "Temp: " + Math.floor(response.list[3].main.temp)  + "°F";

        var day1Humidity = document.querySelector("#day1humidity")
        day1Humidity.className = "forecast-info"
        day1Humidity.textContent = "Humidity: " + response.list[3].main.humidity +"%";

        var day1Icon = document.querySelector("#day1-icon")
        day1Icon.setAttribute("src", 'http://openweathermap.org/img/wn/'+response.list[3].weather[0].icon+'.png')

        // day 2 forecast
        var day2El = document.querySelector("#day2")
        day2El.className = "column col forecast-container"

        var day2Header = document.querySelector("#day2date")
        day2Header.className = "forecast-header";
        day2Header.textContent = moment().add(2,"days").format("MM[/]D[/]YYYY");

        var day2Temp = document.querySelector("#day2temp")
        day2Temp.className = "forecast-info"
        day2Temp.textContent = "Temp: " + Math.floor(response.list[11].main.temp)  + "°F";

        var day2Humidity = document.querySelector("#day2humidity")
        day2Humidity.className = "forecast-info"
        day2Humidity.textContent = "Humidity: " + response.list[11].main.humidity +"%";

        var day2Icon = document.querySelector("#day2-icon")
        day2Icon.setAttribute("src", 'http://openweathermap.org/img/wn/'+response.list[11].weather[0].icon+'.png')

        // day 3 forecast
        var day3El = document.querySelector("#day3")
        day3El.className = "column col forecast-container"

        var day3Header = document.querySelector("#day3date")
        day3Header.className = "forecast-header";
        day3Header.textContent = moment().add(3,"days").format("MM[/]D[/]YYYY");

        var day3Temp = document.querySelector("#day3temp")
        day3Temp.className = "forecast-info"
        day3Temp.textContent = "Temp: " + Math.floor(response.list[19].main.temp)  + "°F";

        var day3Humidity = document.querySelector("#day3humidity")
        day3Humidity.className = "forecast-info"
        day3Humidity.textContent = "Humidity: " + response.list[19].main.humidity +"%";

        var day3Icon = document.querySelector("#day3-icon")
        day3Icon.setAttribute("src", 'http://openweathermap.org/img/wn/'+response.list[19].weather[0].icon+'.png')

        // day 4 forecast
        var day4El = document.querySelector("#day4")
        day4El.className = "column col forecast-container"

        var day4Header = document.querySelector("#day4date")
        day4Header.className = "forecast-header";
        day4Header.textContent = moment().add(4,"days").format("MM[/]D[/]YYYY");

        var day4Temp = document.querySelector("#day4temp")
        day4Temp.className = "forecast-info"
        day4Temp.textContent = "Temp: " + Math.floor(response.list[27].main.temp)  + "°F";

        var day4Humidity = document.querySelector("#day4humidity")
        day4Humidity.className = "forecast-info"
        day4Humidity.textContent = "Humidity: " + response.list[27].main.humidity +"%";

        var day4Icon = document.querySelector("#day4-icon")
        day4Icon.setAttribute("src", 'http://openweathermap.org/img/wn/'+response.list[27].weather[0].icon+'.png')

        //day 5 forecast
        var day5El = document.querySelector("#day5")
        day5El.className = "column col forecast-container"

        var day5Header = document.querySelector("#day5date")
        day5Header.className = "forecast-header";
        day5Header.textContent = moment().add(5,"days").format("MM[/]D[/]YYYY");

        var day5Temp = document.querySelector("#day5temp")
        day5Temp.className = "forecast-info"
        day5Temp.textContent = "Temp: " + Math.floor(response.list[35].main.temp)  + "°F";

        var day5Humidity = document.querySelector("#day5humidity")
        day5Humidity.className = "forecast-info"
        day5Humidity.textContent = "Humidity: " + response.list[35].main.humidity +"%";

        var day5Icon = document.querySelector("#day5-icon")
        day5Icon.setAttribute("src", 'http://openweathermap.org/img/wn/'+response.list[35].weather[0].icon+'.png')
    })
}

function loadSearchHistory() {
    searchHistory = localStorage.getItem("searches")
    if (!searchHistory || searchHistory === null) {
        searchHistory = [];
        return false;
    }
    searchHistory = JSON.parse(searchHistory)
    displaySearches();
}

function clearSearchHistory() {
    searchHistory = [];
    localStorage.clear();
    location.reload();
}

function displaySearches() {
    currentSearch = 0;
    for (var i = 0; i < searchHistory.length; i++) {

        var buttonContainer = document.createElement("div")
        buttonContainer.className = "row"

        var historyButton = document.createElement("button")
        historyButton.className = "btn bg-white border city-button"
        historyButton.id = "history-" + currentSearch
        historyButton.textContent = searchHistory[currentSearch][0].city
        historyButton.data = searchHistory[currentSearch][0].zipcode

        historyButton.addEventListener("click", getWeather(historyButton.data));
        console.log(historyButton.data)

        buttonContainer.appendChild(historyButton);
        searchContainerEl.appendChild(buttonContainer);

        currentSearch++
    }
}

function handleSubmit(event) {
    event.preventDefault();
    var zipcode = Number(zipcodeInputEl.value.trim());

    if (zipcode) {
        getWeather(zipcode);
        getForecast(zipcode);
        zipcodeInputEl.value = "";
    } else {
        alert("Please enter a valid zipcode!");
    }
};

function getUVindex(lat,lon) {
    console.log(lat,lon)
    fetch("https://api.weatherbit.io/v2.0/current?lat="+lat+"&lon="+lon+"&key=8079923170d64d1e815aaed58f097dc4&include=minutely")
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        var uvIndex = document.querySelector("#uv-index")
        uvIndex.textContent = "UV Index: " + Math.floor(response.data[0].uv)
        uvIndex.classList ="info-display"

        var uvIndexData = Math.floor(response.data[0].uv);

        if (uvIndexData <= 2){
            uvIndex.classList = "info-display uv-safe";
            console.log(uvIndexData)
        }
        if (uvIndexData >= 3){
            uvIndex.classList = "info-display uv-warning";
        }
        if (uvIndexData >= 6) {
            uvIndex.classList = "info-display uv-danger";
        }
    })
}

zipcodeFormEl.addEventListener("submit", handleSubmit);
clearHistoryBtn.addEventListener("click", clearSearchHistory)

loadSearchHistory();