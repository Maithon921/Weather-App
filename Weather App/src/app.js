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

currentLocation.addEventListener("click", getLocation);

function getLocation() {
  if (navigator.geolocation) {
    // Request the current position
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

async function showPosition(position) {
  try {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const getResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    const data = await getResponse.json();
  
    cityName.innerHTML = data.name;
    temperature.innerHTML = Math.round(data.main.temp) + "°C";
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + " Km/h";

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

    displayBox.style.display = "block";
    document.querySelector("#errBox").style.display = "none"

    input.value= "";
  } catch (error) {
    console.log(error);
  }
 
}

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

async function apiCall() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`
    );


    if (input.value == "" || !response.ok) {
      displayBox.style.display = "none";
      document.querySelector("#errBox").style.display = "block";
      throw new Error("Data not found: Enter valid city");
    
    } else {
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

  }
  } catch (err) {
    document.querySelector("#errorText").innerHTML= err.message;
  }
  
  input.value = "";
}

searchBtn.addEventListener("click", apiCall);
