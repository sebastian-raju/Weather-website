let mainContainer = document.querySelector('.main-container');

let temperature = document.querySelector('.temp');
let weatherDesc = document.querySelector('.weather-desc');

let temperatureTitle = document.querySelector('.temperature-title');

let yourLocation = document.querySelector('.yourLocation');

let icons = document.querySelector('.icons');

let mainWeatherInformation = document.querySelector('.main-weather-information');

let cityTime = document.querySelector('.time');

let humidity = document.querySelector('.humidity');

let humidityBox = document.querySelector('.humidity-box');

let feelsLike = document.querySelector('.feels-like');

let windSpeed = document.querySelector('.wind-speed');

let pressure = document.querySelector('.pressure');

let sunRise = document.querySelector('.sunrise');
let sunSet = document.querySelector('.sunset');

let currentLocation = false;


// timezone 


let time = new Date(); 
let localTime = time.getTime();
let localOffset = time.getTimezoneOffset() * 60000;
let utc = localTime + localOffset;



// for other timezones sunrise and sunset


 


// currentLocationWeather();

// function currentLocationWeather(){
//   let latitude;
//   let longitude;

//   successCallBack = (success) => {
//     latitude = success.coords.latitude;
//     longitude = success.coords.longitude;
//   }
  
//   errorCallBack = (error) => {
//     console.log(error);
//   }

//   navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);

//   currentLocation = true;


//   fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
//   .then(response => response.json())
//   .then(data => getDataLocality(data, currentLocation));

// }


// function getDataLocality(data, currentLocation){
  
//   getWeatherFromLocality(data.locality,currentLocation);

// }


function displayCurrentLocation(){

  fetch('https://api.geoapify.com/v1/ipinfo?apiKey=7f5ecd0663fa47ae965c8d8840e3e362')
.then(response => response.json())
.then(data => {
  currentLocation = true;
  // You can now access the location data in the "data" object
  getWeatherFromLocality(data.city.name, currentLocation);
})

}


displayCurrentLocation();




function getWeatherFromLocality(data, currentLocation){
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=5b4bee0ba241d092159faf007e166080&units=metric`)
  .then(response => response.json())
  .then(weather => outputWeather(weather, currentLocation))
  .catch(async ()=>{
    mainWeatherInformation.style.display = "none";
        document.body.style.opacity = 1;
        await error();
        document.querySelector('.error-message').style.opacity = 1;
  });

  }


  async function error(){
    setTimeout((()=>{
      document.querySelector('.error-message').style.opacity = 0;
    }), 5000);
  }







  function outputWeather(weather, currentLocation = false){

    console.log(weather);


    let weatherMain = weather.weather["0"].main;
    let iconCode = weather.weather["0"].icon;
    let dayOrNight = iconCode.slice(-1);

    let timeZone = utc + (1000 * weather.timezone);

    let locationTime = new Date(timeZone).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});


    let temp = Math.round(weather.main.temp);

    document.body.style.opacity = 0;

     //timezone

    //  solved

    //  let weatherSunrise = new Date((weather.timezone + weather.sys.sunrise)*1000).toUTCString();

    //  let weatherSunset = new Date((weather.timezone + weather.sys.sunset)*1000).toUTCString();


    //  console.log(weatherSunrise);
    //  console.log(weatherSunset);


    function getSunsetOrSunrise(unixTimeStamp, timezoneOffset){
      let browserTimeOffset = new Date().getTimezoneOffset() * 60;
      return (browserTimeOffset + unixTimeStamp + timezoneOffset);
    }
     

    let weatherSunrise = getSunsetOrSunrise(weather.sys.sunrise, weather.timezone);

    let weatherSunset = getSunsetOrSunrise(weather.sys.sunset, weather.timezone);


    let sunrise = new Date(weatherSunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    let sunset = new Date(weatherSunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});



    
    setTimeout(function() {
      document.querySelector('.error-message').style.opacity = 0;
      mainWeatherInformation.style.display = "grid";
      temperature.innerHTML = Math.round(weather.main.temp);
      weatherDesc.innerHTML = weather.weather["0"].description;
      temperatureTitle.innerText = weather.name;
      cityTime.innerText = locationTime;
      humidity.innerText = `${Math.round(weather.main.humidity)}%`;
      humidityBox.innerText =`: ${Math.round(weather.main.humidity)}%`;
      feelsLike.innerText = `${Math.round(weather.main.feels_like)}°C`;
      windSpeed.innerText = `: ${weather.wind.speed} Km/h`;
      pressure.innerText = `: ${weather.main.pressure} hPa`;

      sunRise.innerText = `: ${sunrise}`;
      sunSet.innerText = `: ${sunset}`;

      icons.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
      
      if(dayOrNight === 'd'){
        if(temp <= 5){
          mainContainer.style.backgroundImage = `url('./assets/Snowd.jpg')`;
        }
        else{
          mainContainer.style.backgroundImage = `url('./assets/${weatherMain}d.jpg')`;
        }
        
      }
      else if(dayOrNight === 'n'){
        if(temp <= 5)  {
          mainContainer.style.backgroundImage = `url('./assets/Snown.jpg')`;
        }
        else{
          mainContainer.style.backgroundImage = `url('./assets/${weatherMain}n.jpg')`
        }
        
      }

      inp.value = '';
    
      if(currentLocation === true){
        yourLocation.innerText = "(current location)";
      }
      else{
        yourLocation.innerText = "";
      }

      document.body.style.opacity = 1;
      
    }, 200);
  
  }




