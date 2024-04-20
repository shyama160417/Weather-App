// function getCurrentUnixUTCTime() {
//     const currentTime = new Date(); // Get current date and time
//     const unixUTCTime = Math.floor(currentTime.getTime() / 1000); // Convert milliseconds to seconds
//     return unixUTCTime;
//   }
  
//   // Example usage
//   const currentUnixUTC = getCurrentUnixUTCTime();
//   const sunsetTime = 1712800549
//   const sunriseTime = 1712751545

  

//   const check = 0==1 || 1==1
//   const isDark = getCurrentUnixUTCTime < sunriseTime || getCurrentUnixUTCTime > sunsetTime
//   console.log(isDark)
//   console.log("Check: "+check)

var weatherCodes = [{name: "clear", codes: [800]},
                      {name: "few_clouds", codes: [801]},
                      {name: "scattered_clouds", codes: [802]},
                      {name: "broken_clouds", codes: [803, 804]},
                      {name: "shower_rain", codes: [300, 301, 302, 310, 311, 312, 313, 314, 321]},
                      {name: "rain", codes: [500, 501, 502, 503, 504, 520, 521, 522, 531]},
                      {name: "thunderstorm", codes: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]},
                      {name: "snow", codes: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622]},
                      {name: "mist", codes: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781]}]

var code = 611
// console.log(weatherCodes)

function checkElement(element){
    return element == code
}

function findWeatherInfo(weather){ // {name: "clear", codes: [800]}
    return code == weather.codes.find(checkElement)
}

const arr = [803, 804]
const result = arr.find(checkElement)
console.log("result: " +result)

const weatherElement = weatherCodes.find(findWeatherInfo)
console.log("Weather Element: " +weatherElement)
console.log("Weather name: " +weatherElement.name)
    