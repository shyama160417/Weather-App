    const city = document.querySelector(".city")
    const temperature = document.querySelector(".temperature")
    const weather = document.querySelector(".weather")
    const icon = document.querySelector(".icon")
    const feels_like = document.querySelector("#feels_like")
    const high = document.querySelector("#high")
    const low = document.querySelector("#low")
    const wind = document.querySelector("#wind")
    const humidity = document.querySelector("#humidity")
    const weather_info = document.querySelector(".weather-info")
    const error = document.querySelector(".error")
    var weatherCodes = [{name: "clear", codes: [800]},
                      {name: "few_clouds", codes: [801]},
                      {name: "scattered_clouds", codes: [802]},
                      {name: "broken_clouds", codes: [803, 804]},
                      {name: "shower_rain", codes: [300, 301, 302, 310, 311, 312, 313, 314, 321]},
                      {name: "rain", codes: [500, 501, 502, 503, 504, 520, 521, 522, 531]},
                      {name: "thunderstorm", codes: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]},
                      {name: "snow", codes: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622]},
                      {name: "mist", codes: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781]}]
    var code = 0

    function checkElement(element){
        return element == code
    }
    
    function findWeatherInfo(weather){ // {name: "clear", codes: [800]}
        return code == weather.codes.find(checkElement)
    }
    
  




    getWeatherData("Toronto");

    function UpdateWeather(){
        const input = document.getElementById("input");
        if(!input.value.trim()){
            alert("Enter a city name");
        }
        else{
            getWeatherData(input.value);
        }
    }


    function getCurrentUnixUTCTime() {
        const currentTime = new Date(); // Get current date and time
        const unixUTCTime = Math.floor(currentTime.getTime() / 1000); // Convert milliseconds to seconds
        return unixUTCTime;
      }



async function getWeatherData(cityname){
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?q="
    const appid = "&appid=1d1c057e83b7b88dc71537304d7bbc99&units=metric"
    const url = apiurl + cityname + appid
    const response = await fetch(url);
    const WeatherData = await response.json();

    
    console.log(WeatherData);
    console.log(WeatherData.cod)

    if(WeatherData.cod == 404){
        weather_info.style.display = "none";
        error.style.display = "block";
        error.innerHTML = "City Not Found"
    }
    else{
        weather_info.style.display = "flex";
        error.style.display = "none";
        const sunsetTime = WeatherData.sys.sunset
        const sunriseTime = WeatherData.sys.sunrise
        const isDark = getCurrentUnixUTCTime() < sunriseTime || getCurrentUnixUTCTime() > sunsetTime
        console.log('isDark: ' +isDark)
        city.innerHTML = WeatherData.name;
        temperature.innerHTML = Math.round(WeatherData.main.temp);
        weather.innerHTML = WeatherData.weather[0].main;
        code = WeatherData.weather[0].id;
        console.log("Code: " +code)

        console.log("WeatherCodes: " +weatherCodes)
        const weatherElement = weatherCodes.find(findWeatherInfo)
        console.log("WeatherElement: " +weatherElement)
        
        const weatherName = weatherElement.name
        console.log("Weather Name: " +weatherName)

        icon.src = isDark? "media/"+weatherName+"_Night.gif" : "media/"+weatherName+"_Day.gif"
        feels_like.innerHTML = `&nbsp; ${Math.round(WeatherData.main.feels_like)}`;
        high.innerHTML = Math.round(WeatherData.main.temp_max);
        low.innerHTML = Math.round(WeatherData.main.temp_min);
        wind.innerHTML = Math.round(WeatherData.wind.speed);
        humidity.innerHTML = Math.round(WeatherData.main.humidity);
    
    }
    

}
