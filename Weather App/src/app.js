const apiKey = "c76567f3a6ccf9bc25c03b77b8604335";
const input = document.querySelector("#textInput");
const searchBtn = document.querySelector("#searchBtn");
const weatherImg = document.querySelector("#weatherImg");
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const displayBox = document.querySelector("#displayBox");
const currentLocation = document.querySelector("#location");
const dropdown = document.querySelector("#dropdown");
const recentCitiesDiv = document.querySelector("#recentCities");

// function to hide dropdown based on events
input.addEventListener("dblclick", () => {
  dropdown.style.display = "none";
});

displayBox.addEventListener("click", () => (dropdown.style.display = "none"));
document
  .querySelector("#errBox")
  .addEventListener("click", () => (dropdown.style.display = "none"));
// function to take out date based on the data recieved from api
function formatDate(dateString) {
  // convert the numbers to date object
  const date = new Date(dateString);
  // return the year month and date taken out from number converted to date object 
  // pad to add 0 when there is single number, adding 1 to month as js months count start from 0
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")} `;
}

currentLocation.addEventListener("click", getLocation);
// higherOrder function to handle error, get location and display data
function getLocation() {
  if (navigator.geolocation) {
    // to get the current position
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
//function to get coordinate and display the recieved data from api based on latitude and longitude
async function showPosition(position) {
  try {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const getResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    const data = await getResponse.json();
    // specifying which data to display in specfic element by manipulating the recieved json object
    cityName.innerHTML = data.name;
    temperature.innerHTML = Math.round(data.main.temp) + "°C"; // rounding the temperature to get a number without decimal point
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + " Km/h";
    // display weather icon based on the condition recieved from the api
    if (data.weather[0].main == "Rain") {
      weatherImg.src = "../assets/rain.png";
    } else if (data.weather[0].main == "Clouds") {
      weatherImg.src = "../assets/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherImg.src = "../assets/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherImg.src = "../assets/clouds.png";
    } else if (data.weather[0].main == "Mist") {
      weatherImg.src = "../assets/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weatherImg.src = "../assets/snow.png";
    }
    // to show display box if hidden and hide error box
    displayBox.style.display = "block";
    document.querySelector("#errBox").style.display = "none";

    //calling function which will fetch and display data forecast of 5 days
    locationForcast(latitude, longitude);
    // hide the dropdown if it is shown
    dropdown.style.display = "none";

    input.value = "";
  } catch (error) {
    console.log(error);
  }
}
// function to handle error and give alert based on the type of error
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Location access denied.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information unavailable.");
      break;
    case error.TIMEOUT:
      alert("Location request timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

// function to fetch data from api and display 5 days data
async function locationForcast(latitude, longitude) {
  try {
    const locationData = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    const reply = await locationData.json();
    // filling up data according to the api to display
    // 1st day forecast

    document.querySelector("#day1Date").innerHTML = formatDate(
      reply.list[7].dt_txt
    ); //api data passed as argument to function to extract only date
    document.querySelector("#temp1").innerHTML =
      Math.round(reply.list[7].main.temp) + "°C";
    document.querySelector("#wind1").innerHTML =
      reply.list[7].wind.speed + "Km/h";
    document.querySelector("#humid1").innerHTML =
      reply.list[7].main.humidity + "%";

    if (reply.list[7].weather[0].main == "Rain") {
      document.querySelector("#day1img").src = "../assets/rain.png";
    } else if (reply.list[7].weather[0].main == "Clouds") {
      document.querySelector("#day1img").src = "../assets/clouds.png";
    } else if (reply.list[7].weather[0].main == "Clear") {
      document.querySelector("#day1img").src = "../assets/clear.png";
    } else if (reply.list[7].weather[0].main == "Drizzle") {
      document.querySelector("#day1img").src = "../assets/clouds.png";
    } else if (reply.list[7].weather[0].main == "Mist") {
      document.querySelector("#day1img").src = "../assets/mist.png";
    } else if (reply.list[7].weather[0].main == "Snow") {
      document.querySelector("#day1img").src = "../assets/snow.png";
    }

    // 2nd day forecast

    document.querySelector("#day2Date").innerHTML = formatDate(
      reply.list[15].dt_txt
    );
    document.querySelector("#temp2").innerHTML =
      Math.round(reply.list[15].main.temp) + "°C";
    document.querySelector("#wind2").innerHTML =
      reply.list[15].wind.speed + "Km/h";
    document.querySelector("#humid2").innerHTML =
      reply.list[15].main.humidity + "%";

    if (reply.list[15].weather[0].main == "Rain") {
      document.querySelector("#day2img").src = "../assets/rain.png";
    } else if (reply.list[15].weather[0].main == "Clouds") {
      document.querySelector("#day2img").src = "../assets/clouds.png";
    } else if (reply.list[15].weather[0].main == "Clear") {
      document.querySelector("#day2img").src = "../assets/clear.png";
    } else if (reply.list[15].weather[0].main == "Drizzle") {
      document.querySelector("#day2img").src = "../assets/clouds.png";
    } else if (reply.list[15].weather[0].main == "Mist") {
      document.querySelector("#day2img").src = "../assets/mist.png";
    } else if (reply.list[15].weather[0].main == "Snow") {
      document.querySelector("#day2img").src = "../assets/snow.png";
    }

    // 3rd day forecast

    document.querySelector("#day3Date").innerHTML = formatDate(
      reply.list[23].dt_txt
    );
    document.querySelector("#temp3").innerHTML =
      Math.round(reply.list[23].main.temp) + "°C";
    document.querySelector("#wind3").innerHTML =
      reply.list[23].wind.speed + "Km/h";
    document.querySelector("#humid3").innerHTML =
      reply.list[23].main.humidity + "%";

    if (reply.list[23].weather[0].main == "Rain") {
      document.querySelector("#day3img").src = "../assets/rain.png";
    } else if (reply.list[23].weather[0].main == "Clouds") {
      document.querySelector("#day3img").src = "../assets/clouds.png";
    } else if (reply.list[23].weather[0].main == "Clear") {
      document.querySelector("#day3img").src = "../assets/clear.png";
    } else if (reply.list[23].weather[0].main == "Drizzle") {
      document.querySelector("#day3img").src = "../assets/clouds.png";
    } else if (reply.list[23].weather[0].main == "Mist") {
      document.querySelector("#day3img").src = "../assets/mist.png";
    } else if (reply.list[23].weather[0].main == "Snow") {
      document.querySelector("#day3img").src = "../assets/snow.png";
    }

    // 4th day forecast

    document.querySelector("#day4Date").innerHTML = formatDate(
      reply.list[31].dt_txt
    );
    document.querySelector("#temp4").innerHTML =
      Math.round(reply.list[31].main.temp) + "°C";
    document.querySelector("#wind4").innerHTML =
      reply.list[31].wind.speed + "Km/h";
    document.querySelector("#humid4").innerHTML =
      reply.list[31].main.humidity + "%";

    if (reply.list[31].weather[0].main == "Rain") {
      document.querySelector("#day4img").src = "../assets/rain.png";
    } else if (reply.list[31].weather[0].main == "Clouds") {
      document.querySelector("#day4img").src = "../assets/clouds.png";
    } else if (reply.list[31].weather[0].main == "Clear") {
      document.querySelector("#day4img").src = "../assets/clear.png";
    } else if (reply.list[31].weather[0].main == "Drizzle") {
      document.querySelector("#day4img").src = "../assets/clouds.png";
    } else if (reply.list[31].weather[0].main == "Mist") {
      document.querySelector("#day4img").src = "../assets/mist.png";
    } else if (reply.list[31].weather[0].main == "Snow") {
      document.querySelector("#day4img").src = "../assets/snow.png";
    }

    // day5

    document.querySelector("#day5Date").innerHTML = formatDate(
      reply.list[39].dt_txt
    );
    document.querySelector("#temp5").innerHTML =
      Math.round(reply.list[39].main.temp) + "°C";
    document.querySelector("#wind5").innerHTML =
      reply.list[39].wind.speed + "Km/h";
    document.querySelector("#humid5").innerHTML =
      reply.list[39].main.humidity + "%";

    if (reply.list[39].weather[0].main == "Rain") {
      document.querySelector("#day5img").src = "../assets/rain.png";
    } else if (reply.list[39].weather[0].main == "Clouds") {
      document.querySelector("#day5img").src = "../assets/clouds.png";
    } else if (reply.list[39].weather[0].main == "Clear") {
      document.querySelector("#day5img").src = "../assets/clear.png";
    } else if (reply.list[39].weather[0].main == "Drizzle") {
      document.querySelector("#day5img").src = "../assets/clouds.png";
    } else if (reply.list[39].weather[0].main == "Mist") {
      document.querySelector("#day5img").src = "../assets/mist.png";
    } else if (reply.list[39].weather[0].main == "Snow") {
      document.querySelector("#day5img").src = "../assets/snow.png";
    }
    // to show the forecast section if hidden
    document.querySelector("#forecastBox").style.display = "block";
  } catch (err) {
    console.log(err);
  }
}

// function to fetch api and display current data based on city name entered from input
async function apiCall() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`
    );

    // checking the input if it is correct and throw error if input is incorrect
    if (input.value == "" || !response.ok) {
      displayBox.style.display = "none";
      dropdown.style.display = "none";
      document.querySelector("#errBox").style.display = "block";
      throw new Error("Data not found: Enter valid city");
    } else {
      //display the data if input is correct
      document.querySelector("#errBox").style.display = "none";
      displayBox.style.display = "block";

      const result = await response.json();

      cityName.innerHTML = result.name;
      temperature.innerHTML = Math.round(result.main.temp) + "°C";
      humidity.innerHTML = result.main.humidity + "%";
      windSpeed.innerHTML = result.wind.speed + " Km/h";

      if (result.weather[0].main == "Rain") {
        weatherImg.src = "../assets/rain.png";
      } else if (result.weather[0].main == "Clouds") {
        weatherImg.src = "../assets/clouds.png";
      } else if (result.weather[0].main == "Clear") {
        weatherImg.src = "../assets/clear.png";
      } else if (result.weather[0].main == "Drizzle") {
        weatherImg.src = "../assets/clouds.png";
      } else if (result.weather[0].main == "Mist") {
        weatherImg.src = "../assets/mist.png";
      } else if (result.weather[0].main == "Snow") {
        weatherImg.src = "../assets/snow.png";
      }
      // calling function to display weather data when selected from dropdown
      displayWeatherData(result);
      // calling function which handles and display 5 days forecast based on inputed city name
      daysForecast();
      document.querySelector("#forecastBox").style.display = "block";
      // calling function which save the city name inputed to local storage
      saveCityToLocalStorage();
      dropdown.style.display = "none";
    }
    // handle error and display the error
  } catch (err) {
    document.querySelector("#forecastBox").style.display = "none";
    document.querySelector("#errorText").innerHTML = err.message;
  }

  input.value = "";
}
// adding click event listener tsearch button which will display data
searchBtn.addEventListener("click", apiCall);

// function to handle and display 5 days forecast based on city name entered
async function daysForecast() {
  try {
    const days = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${apiKey}&units=metric`
    );
    const results = await days.json();

    //  1st day forecast

    document.querySelector("#day1Date").innerHTML = formatDate(
      results.list[7].dt_txt
    );
    document.querySelector("#temp1").innerHTML =
      Math.round(results.list[7].main.temp) + "°C";
    document.querySelector("#wind1").innerHTML =
      results.list[7].wind.speed + "Km/h";
    document.querySelector("#humid1").innerHTML =
      results.list[7].main.humidity + "%";

    if (results.list[7].weather[0].main == "Rain") {
      document.querySelector("#day1img").src = "../assets/rain.png";
    } else if (results.list[7].weather[0].main == "Clouds") {
      document.querySelector("#day1img").src = "../assets/clouds.png";
    } else if (results.list[7].weather[0].main == "Clear") {
      document.querySelector("#day1img").src = "../assets/clear.png";
    } else if (results.list[7].weather[0].main == "Drizzle") {
      document.querySelector("#day1img").src = "../assets/clouds.png";
    } else if (results.list[7].weather[0].main == "Mist") {
      document.querySelector("#day1img").src = "../assets/mist.png";
    } else if (results.list[7].weather[0].main == "Snow") {
      document.querySelector("#day1img").src = "../assets/snow.png";
    }

    // 2nd day forecast

    document.querySelector("#day2Date").innerHTML = formatDate(
      results.list[15].dt_txt
    );
    document.querySelector("#temp2").innerHTML =
      Math.round(results.list[15].main.temp) + "°C";
    document.querySelector("#wind2").innerHTML =
      results.list[15].wind.speed + "Km/h";
    document.querySelector("#humid2").innerHTML =
      results.list[15].main.humidity + "%";

    if (results.list[15].weather[0].main == "Rain") {
      document.querySelector("#day2img").src = "../assets/rain.png";
    } else if (results.list[15].weather[0].main == "Clouds") {
      document.querySelector("#day2img").src = "../assets/clouds.png";
    } else if (results.list[15].weather[0].main == "Clear") {
      document.querySelector("#day2img").src = "../assets/clear.png";
    } else if (results.list[15].weather[0].main == "Drizzle") {
      document.querySelector("#day2img").src = "../assets/clouds.png";
    } else if (results.list[15].weather[0].main == "Mist") {
      document.querySelector("#day2img").src = "../assets/mist.png";
    } else if (results.list[15].weather[0].main == "Snow") {
      document.querySelector("#day2img").src = "../assets/snow.png";
    }

    // 3rd day forecast

    document.querySelector("#day3Date").innerHTML = formatDate(
      results.list[23].dt_txt
    );
    document.querySelector("#temp3").innerHTML =
      Math.round(results.list[23].main.temp) + "°C";
    document.querySelector("#wind3").innerHTML =
      results.list[23].wind.speed + "Km/h";
    document.querySelector("#humid3").innerHTML =
      results.list[23].main.humidity + "%";

    if (results.list[23].weather[0].main == "Rain") {
      document.querySelector("#day3img").src = "../assets/rain.png";
    } else if (results.list[23].weather[0].main == "Clouds") {
      document.querySelector("#day3img").src = "../assets/clouds.png";
    } else if (results.list[23].weather[0].main == "Clear") {
      document.querySelector("#day3img").src = "../assets/clear.png";
    } else if (results.list[23].weather[0].main == "Drizzle") {
      document.querySelector("#day3img").src = "../assets/clouds.png";
    } else if (results.list[23].weather[0].main == "Mist") {
      document.querySelector("#day3img").src = "../assets/mist.png";
    } else if (results.list[23].weather[0].main == "Snow") {
      document.querySelector("#day3img").src = "../assets/snow.png";
    }

    // 4th day forecast

    document.querySelector("#day4Date").innerHTML = formatDate(
      results.list[31].dt_txt
    );
    document.querySelector("#temp4").innerHTML =
      Math.round(results.list[31].main.temp) + "°C";
    document.querySelector("#wind4").innerHTML =
      results.list[31].wind.speed + "Km/h";
    document.querySelector("#humid4").innerHTML =
      results.list[31].main.humidity + "%";

    if (results.list[31].weather[0].main == "Rain") {
      document.querySelector("#day4img").src = "../assets/rain.png";
    } else if (results.list[31].weather[0].main == "Clouds") {
      document.querySelector("#day4img").src = "../assets/clouds.png";
    } else if (results.list[31].weather[0].main == "Clear") {
      document.querySelector("#day4img").src = "../assets/clear.png";
    } else if (results.list[31].weather[0].main == "Drizzle") {
      document.querySelector("#day4img").src = "../assets/clouds.png";
    } else if (results.list[31].weather[0].main == "Mist") {
      document.querySelector("#day4img").src = "../assets/mist.png";
    } else if (results.list[31].weather[0].main == "Snow") {
      document.querySelector("#day4img").src = "../assets/snow.png";
    }

    // 5th day forecast

    document.querySelector("#day5Date").innerHTML = formatDate(
      results.list[39].dt_txt
    );
    document.querySelector("#temp5").innerHTML =
      Math.round(results.list[39].main.temp) + "°C";
    document.querySelector("#wind5").innerHTML =
      results.list[39].wind.speed + "Km/h";
    document.querySelector("#humid5").innerHTML =
      results.list[39].main.humidity + "%";

    if (results.list[39].weather[0].main == "Rain") {
      document.querySelector("#day5img").src = "../assets/rain.png";
    } else if (results.list[39].weather[0].main == "Clouds") {
      document.querySelector("#day5img").src = "../assets/clouds.png";
    } else if (results.list[39].weather[0].main == "Clear") {
      document.querySelector("#day5img").src = "../assets/clear.png";
    } else if (results.list[39].weather[0].main == "Drizzle") {
      document.querySelector("#day5img").src = "../assets/clouds.png";
    } else if (results.list[39].weather[0].main == "Mist") {
      document.querySelector("#day5img").src = "../assets/mist.png";
    } else if (results.list[39].weather[0].main == "Snow") {
      document.querySelector("#day5img").src = "../assets/snow.png";
    }
  } catch (err) {
    //handle error
    console.log(err);
  }
}

// function to set the inputed city name to local storage
function saveCityToLocalStorage() {
  let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];

  // Add city to the top of the list if it doesn’t already exist
  if (!recentCities.includes(input.value)) {
    recentCities.unshift(input.value);
    if (recentCities.length > 5) recentCities.pop(); // Limit to 5 cities
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
  }
}

// add dropdown with recent cities from local storage
function populateDropdown() {
  dropdown.style.display = "block";
  const recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];

  // If there are recent cities, display the dropdown and if not available hide it
  if (recentCities.length === 0) {
    dropdown.style.display = "none";
    return;
  }

  recentCitiesDiv.innerHTML = ""; // Clear previous items

  // Add each recent cityname inputed to the dropdown
  recentCities.forEach((city) => {
    const cityItem = document.createElement("p");
    cityItem.classList.add(
      "px-4",
      "py-2",
      "text-sm",
      "text-gray-700",
      "cursor-pointer",
      "hover:bg-gray-100",
      "hover:text-gray-900",
      "active:text-yellow-900"
    );
    cityItem.textContent = city;

    // Click event for each city in the dropdown
    cityItem.addEventListener("click", () => {
      input.value = city; // Update input field with city name
      apiCall(); // Fetch weather data for selected city
      dropdown.style.display = "none"; // Hide dropdown after selection
      setTimeout(() => (input.value = ""), 500);
    });

    recentCitiesDiv.appendChild(cityItem);
  });
}

// Function to display fetched weather data
function displayWeatherData(data) {
  document.querySelector("#cityName").textContent = data.name;
  document.querySelector("#temperature").textContent =
    Math.round(data.main.temp) + "°C";
  document.querySelector("#humidity").textContent = data.main.humidity + "%";
  document.querySelector("#windSpeed").textContent = data.wind.speed + " Km/h";

  if (data.weather[0].main == "Rain") {
    weatherImg.src = "../assets/rain.png";
  } else if (data.weather[0].main == "Clouds") {
    weatherImg.src = "../assets/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherImg.src = "../assets/clear.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherImg.src = "../assets/clouds.png";
  } else if (data.weather[0].main == "Mist") {
    weatherImg.src = "../assets/mist.png";
  } else if (data.weather[0].main == "Snow") {
    weatherImg.src = "../assets/snow.png";
  }

  document.querySelector("#errBox").style.display = "none";
  // calling the function which forecast 5 days
  daysForecast();
  document.querySelector("#forecastBox").style.display = "block";
  displayBox.style.display = "block";
}

// Load recent cities from local storage on clicking inputBox
input.addEventListener("click", populateDropdown);
