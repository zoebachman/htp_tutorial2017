//construct url
var url = "http://api.openweathermap.org/data/2.5/weather?zip=";
var zip;
var parsedZip;
var countryCode = ",us";
var metric = "&units=metric";
var API = "&appid=2585c2354e7209577fbcb9a5ad1c9367";

var zipData;
var unixTime = 'http://www.convert-unix-time.com/api?timestamp=now'
var timeData;
var time;
var sunset;
var sunrise;
var weatherData;
var humidity;




function setup() {
  createCanvas(400, 400);
  
  //load zip_codes json file
  loadJSON('zip_codes.json', getData, 'jasonp');
}

function getData(data){

  zipData = data;
  zip = random(zipData);
  parsedZip = parseFloat(zip); //since it's a string, convert into a float so API can read it
  var call = url + parsedZip + metric + API; //creating the API query string
  loadJSON(call, gotData, 'jsonp'); //load API url, then complete load of zip_codes json
}


function convertUnixTimeCallback(result) {
  time = result.timestamp;
}

function gotData(data) {

  weatherData = data;

  //get times in unix
  sunset = weatherData.sys.sunset;
  sunrise = weatherData.sys.sunset;
  

  //humidity determinds background color
  var humidityColor = weatherData.main.humidity;

  //compare sunset to real time, see if it is between certain times for it to be light or dark
  if (sunrise < time || time < sunset) {
    //it's day
    background(humidityColor, 195, 255, humidityColor);
  } else {
    //it's night
    background(humidityColor, 10, 10);
  }

  push() //with pop, makes sure certain code doesn't effect what's below (like translate and rotate)
    //first, map temp values
    //temp will be rays

  var temp = weatherData.main.temp; //yellow color of rects
  var density = map(temp, 0, height, 20, 50); //determining size and density or rects, influenced by temp
  translate(width / 2, height / 2); //lines drawn from center
  
  //change alpha of color depending on the temp (cold = transparent, hot = fill)
  if(temp < 0){
    fill(255, 255, temp, temp);
  }else{
    fill(255, 255, temp, (temp*temp)); //some calculation to make this more saturated
  }
  
  //using nested loops to create repetition of rects. Play with parameters to see how sketch changes!
  for (var x = 0; x <= width + 500; x += density) {
    for (var y = 10; y <= height + 500; y += density) {
      rotate((PI/temp)); //rotates the rects each time it draws them. Amount of rotation depends on temp
      rect(x, y, 5, 500) //x and y change as it goes through the loops
    }
  }
  pop()
  
  //check to see if it's Cloudy or Rainy, if it is, do an overlay so it's darker
  if (weatherData.weather[0].main == "Clouds" || weatherData.weather[0].main == "Rain"){
    fill(0,0,0,100)
    rect(0, 0, 400, 400)
  } else{
    noFill();
  }
  
  //text description
  noStroke();
  fill(0,0,0,100)
  rect(0, 360, 400, 40)
  fill("#32CD32");
  stroke(2);
  textSize(20);
  text(weatherData.name, 10, 390)
  text(weatherData.weather[0].main, 180, 390)
  //text(weatherData.weather[0].description, 250, 380)
  text(temp, 300, 390)

}