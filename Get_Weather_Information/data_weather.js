// HOW TO GET "weather.json" file
// node data_weather.js

const axios = require('axios');
const fs = require('fs');

// object for adding data weather
let obj = {};
// api key
let apiKey = "b6b02859068bcceff1997fd8aca4df5f";
// city
let city = "Moscow";
// create url for get request
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;

// get request
axios.get(url)
  .then(res => {
    WriteToJson(res.data);
  });

// write our data to json file
function WriteToJson(weather) {
  obj.temp = String(weather.main.temp)
  obj.temp_min = String(weather.main.temp_min)
  obj.temp_max = String(weather.main.temp_max)
  obj.speed = String(weather.wind.speed)
  obj.main = weather.weather[0].main
  obj.description = weather.weather[0].description
  // write object to json file
  fs.writeFileSync('weather.json', JSON.stringify(obj))
  // console.log(weather) => if you want to get all data
  console.log('weather.json created')
};
