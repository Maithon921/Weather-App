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

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} `;
}

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

  
    positionForecast();

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

function positionForecast() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locationForcast,showError)
  } else {
    alert("Geolocation not supported by browser")
  }
}



async function locationForcast(position) {
  try{
    const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const locationData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
  const reply = await locationData.json();

  //  day1

  document.querySelector("#day1Date").innerHTML=formatDate(reply.list[7].dt_txt);
  document.querySelector("#temp1").innerHTML=Math.round(reply.list[7].main.temp) +"°C";
  document.querySelector("#wind1").innerHTML= reply.list[7].wind.speed +"Km/h";
  document.querySelector("#humid1").innerHTML = reply.list[7].main.humidity +"%";

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

  // day2

  document.querySelector("#day2Date").innerHTML=formatDate(reply.list[15].dt_txt);
  document.querySelector("#temp2").innerHTML=Math.round(reply.list[15].main.temp) +"°C";
  document.querySelector("#wind2").innerHTML= reply.list[15].wind.speed +"Km/h";
  document.querySelector("#humid2").innerHTML = reply.list[15].main.humidity +"%";

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

  // day3

  document.querySelector("#day3Date").innerHTML=formatDate(reply.list[23].dt_txt);
  document.querySelector("#temp3").innerHTML=Math.round(reply.list[23].main.temp) +"°C";
  document.querySelector("#wind3").innerHTML= reply.list[23].wind.speed +"Km/h";
  document.querySelector("#humid3").innerHTML = reply.list[23].main.humidity +"%";

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

  // day4

  document.querySelector("#day4Date").innerHTML=formatDate(reply.list[31].dt_txt);
  document.querySelector("#temp4").innerHTML=Math.round(reply.list[31].main.temp) +"°C";
  document.querySelector("#wind4").innerHTML= reply.list[31].wind.speed +"Km/h";
  document.querySelector("#humid4").innerHTML = reply.list[31].main.humidity +"%";

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

  document.querySelector("#day5Date").innerHTML=formatDate(reply.list[39].dt_txt);
  document.querySelector("#temp5").innerHTML=Math.round(reply.list[39].main.temp) +"°C";
  document.querySelector("#wind5").innerHTML= reply.list[39].wind.speed +"Km/h";
  document.querySelector("#humid5").innerHTML = reply.list[39].main.humidity +"%";

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

  document.querySelector("#forecastBox").style.display="block";

  }catch(err) {
    console.log(err);
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

    daysForecast();
    document.querySelector("#forecastBox").style.display="block"

  }
  } catch (err) {
    document.querySelector("#forecastBox").style.display="none"
    document.querySelector("#errorText").innerHTML= err.message;
  }
  
  input.value = "";
}

searchBtn.addEventListener("click", apiCall);





async function daysForecast () {
  const days = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${apiKey}&units=metric`);
  const results = await days.json();
  

//  day1

  document.querySelector("#day1Date").innerHTML=formatDate(results.list[7].dt_txt);
  document.querySelector("#temp1").innerHTML=Math.round(results.list[7].main.temp) +"°C";
  document.querySelector("#wind1").innerHTML= results.list[7].wind.speed +"Km/h";
  document.querySelector("#humid1").innerHTML = results.list[7].main.humidity +"%";

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

  // day2

  document.querySelector("#day2Date").innerHTML=formatDate(results.list[15].dt_txt);
  document.querySelector("#temp2").innerHTML=Math.round(results.list[15].main.temp) +"°C";
  document.querySelector("#wind2").innerHTML= results.list[15].wind.speed +"Km/h";
  document.querySelector("#humid2").innerHTML = results.list[15].main.humidity +"%";

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

  // day3

  document.querySelector("#day3Date").innerHTML=formatDate(results.list[23].dt_txt);
  document.querySelector("#temp3").innerHTML=Math.round(results.list[23].main.temp) +"°C";
  document.querySelector("#wind3").innerHTML= results.list[23].wind.speed +"Km/h";
  document.querySelector("#humid3").innerHTML = results.list[23].main.humidity +"%";

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

  // day4

  document.querySelector("#day4Date").innerHTML=formatDate(results.list[31].dt_txt);
  document.querySelector("#temp4").innerHTML=Math.round(results.list[31].main.temp) +"°C";
  document.querySelector("#wind4").innerHTML= results.list[31].wind.speed +"Km/h";
  document.querySelector("#humid4").innerHTML = results.list[31].main.humidity +"%";

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

  // day5

  document.querySelector("#day5Date").innerHTML=formatDate(results.list[39].dt_txt);
  document.querySelector("#temp5").innerHTML=Math.round(results.list[39].main.temp) +"°C";
  document.querySelector("#wind5").innerHTML= results.list[39].wind.speed +"Km/h";
  document.querySelector("#humid5").innerHTML = results.list[39].main.humidity +"%";

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

}

// daysForecast();