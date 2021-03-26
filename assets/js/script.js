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



var zipcodeFormEl = document.querySelector("#zipcode-form");
var zipcodeInputEl = document.querySelector("#zipcode");

var forecastContainerEl = document.querySelector("#forecast-container");

var searchContainerEl = document.querySelector("#search-history")
var searchHistory = [];
var currentSearch = 0;

function getWeather(zipcode) {
    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&units=imperial&appid=0444a9f6e39557fee6a4f8463a2448cd";

    fetch(weatherAPI).then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var cityName = document.querySelector("#city-name");
            cityName.textContent = response.name;

            var currentDay = document.querySelector("#current-date");
            currentDay.textContent = moment().format("[(]MM[/]D[/]YYYY[)]")

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
                zipcode: zipcode
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
            console.log(historyButton)

            buttonContainer.appendChild(historyButton);
            searchContainerEl.appendChild(buttonContainer);

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
        var day1El = document.createElement("div")
        day1El.className = "column col-2 forecast-container"

        var day1Header = document.createElement("h2")
        day1Header.className = "forecast-header";
        day1Header.textContent = moment().add(1,"days").format("[(]MM[/]D[/]YYYY[)]");
        day1El.appendChild(day1Header);

        var day1Temp = document.createElement("p")
        day1Temp.className = "forecast-info"
        day1Temp.textContent = "Temp: " + Math.floor(response.list[3].main.temp)  + "°F";
        day1El.appendChild(day1Temp);

        var day1Humidity = document.createElement("p")
        day1Humidity.className = "forecast-info"
        day1Humidity.textContent = "Humidity: " + response.list[3].main.humidity +"%";
        day1El.appendChild(day1Humidity);

        // day 2 forecast
        var day2El = document.createElement("div")
        day2El.className = "column col-2 forecast-container"

        var day2Header = document.createElement("h2")
        day2Header.className = "forecast-header";
        day2Header.textContent = moment().add(2,"days").format("[(]MM[/]D[/]YYYY[)]");
        day2El.appendChild(day2Header);

        var day2Temp = document.createElement("p")
        day2Temp.className = "forecast-info"
        day2Temp.textContent = "Temp: " + Math.floor(response.list[11].main.temp)  + "°F";
        day2El.appendChild(day2Temp);

        var day2Humidity = document.createElement("p")
        day2Humidity.className = "forecast-info"
        day2Humidity.textContent = "Humidity: " + response.list[11].main.humidity +"%";
        day2El.appendChild(day2Humidity);

        // day 3 forecast
        var day3El = document.createElement("div")
        day3El.className = "column col-2 forecast-container"

        var day3Header = document.createElement("h2")
        day3Header.className = "forecast-header";
        day3Header.textContent = moment().add(3,"days").format("[(]MM[/]D[/]YYYY[)]");
        day3El.appendChild(day3Header);

        var day3Temp = document.createElement("p")
        day3Temp.className = "forecast-info"
        day3Temp.textContent = "Temp: " + Math.floor(response.list[19].main.temp)  + "°F";
        day3El.appendChild(day3Temp);

        var day3Humidity = document.createElement("p")
        day3Humidity.className = "forecast-info"
        day3Humidity.textContent = "Humidity: " + response.list[19].main.humidity +"%";
        day3El.appendChild(day3Humidity);

        // day 4 forecast
        var day4El = document.createElement("div")
        day4El.className = "column col-2 forecast-container"

        var day4Header = document.createElement("h2")
        day4Header.className = "forecast-header";
        day4Header.textContent = moment().add(4,"days").format("[(]MM[/]D[/]YYYY[)]");
        day4El.appendChild(day4Header);

        var day4Temp = document.createElement("p")
        day4Temp.className = "forecast-info"
        day4Temp.textContent = "Temp: " + Math.floor(response.list[27].main.temp)  + "°F";
        day4El.appendChild(day4Temp);

        var day4Humidity = document.createElement("p")
        day4Humidity.className = "forecast-info"
        day4Humidity.textContent = "Humidity: " + response.list[27].main.humidity +"%";
        day4El.appendChild(day4Humidity);

        //day 5 forecast
        var day5El = document.createElement("div")
        day5El.className = "column col-2 forecast-container"

        var day5Header = document.createElement("h2")
        day5Header.className = "forecast-header";
        day5Header.textContent = moment().add(5,"days").format("[(]MM[/]D[/]YYYY[)]");
        day5El.appendChild(day5Header);

        var day5Temp = document.createElement("p")
        day5Temp.className = "forecast-info"
        day5Temp.textContent = "Temp: " + Math.floor(response.list[35].main.temp)  + "°F";
        day5El.appendChild(day5Temp);

        var day5Humidity = document.createElement("p")
        day5Humidity.className = "forecast-info"
        day5Humidity.textContent = "Humidity: " + response.list[35].main.humidity +"%";
        day5El.appendChild(day5Humidity);

        forecastContainerEl.appendChild(day1El);
        forecastContainerEl.appendChild(day2El);
        forecastContainerEl.appendChild(day3El);
        forecastContainerEl.appendChild(day4El);
        forecastContainerEl.appendChild(day5El);
    })
}

function loadSearchHistory() {
    searchHistory = localStorage.getItem("searches")
    console.log(searchHistory);
    if (!searchHistory || searchHistory === null) {
        searchHistory = [];
        return false;
    }
    searchHistory = JSON.parse(searchHistory)
    console.log(searchHistory);
    displaySearches();
}

function displaySearches() {
    currentSearch = 0;
    for (var i = 0; i < searchHistory.length; i++) {
        console.log(searchHistory[currentSearch][0].city)

        var buttonContainer = document.createElement("div")
        buttonContainer.className = "row"

        var historyButton = document.createElement("button")
        historyButton.className = "btn bg-white border city-button"
        historyButton.id = "history-" + currentSearch
        historyButton.textContent = searchHistory[currentSearch][0].city
        historyButton.value = searchHistory[currentSearch][0].zipcode

        buttonContainer.appendChild(historyButton);
        searchContainerEl.appendChild(buttonContainer);

        currentSearch++
    }
}

function handleSubmit(event) {
    event.preventDefault();
    var zipcode = zipcodeInputEl.value.trim();

    if (zipcode) {
        getWeather(zipcode);
        getForecast(zipcode);
        zipcodeInputEl.value = "";
    } else {
        alert("Please enter a valid zipcode!");
    }
};

zipcodeFormEl.addEventListener("submit", handleSubmit);

loadSearchHistory();