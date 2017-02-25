var input;
var button;

//construct url
var url = "http://api.openweathermap.org/data/2.5/weather?zip=";
var countryCode = ",us";
var metric = "&units=metric";
var API = "&appid=2585c2354e7209577fbcb9a5ad1c9367";

var unixTime = 'http://www.convert-unix-time.com/api?timestamp=now'
var timeData;
var time;
var sunset;
var sunrise;
var weatherData;
var humidity;


function setup() {
  createCanvas(400, 400);

  button = select("#submit");
  button.mousePressed(weatherAsk);
  input = select('#zip')

  
  refreshButton = select("#refresh")
  refreshButton.mousePressed(resetSketch)
}

function weatherAsk() {
  var call = url + input.value() + metric + API;
  loadJSON(call, gotData, 'jsonp');
}

function resetSketch() {
  background("white")
}

function convertUnixTimeCallback(result) {
  time = result.timestamp;
}

function gotData(data) {

  weatherData = data;

  sunset = weatherData.sys.sunset;
  sunrise = weatherData.sys.sunset;
  
  //convert sunset into real time, see if it is between certain times for it to be light or dark
  var humidityColor = weatherData.main.humidity;

  if (sunrise < time || time < sunset) {
    //it's day
    background(humidityColor, 195, 255, humidityColor);
  } else {
    //it's night
    background(humidityColor, 10, 10);
  }

  push()
    //first, map temp values
    //temp will be rays
  var temp = weatherData.main.temp; //yellow color
  var density = map(temp, 0, height, 20, 50); //
  translate(width / 2, height / 2); //lines drawn from center
  if(temp < 0){
    fill(255, 255, temp, temp);
  }else{
    fill(255, 255, temp, temp*20);
  }
  
  for (var x = 0; x <= width + 500; x += density) {
    for (var y = 10; y <= height + 500; y += density) {
      rotate((PI/temp));
      rect(x, y, 5, 500)
    }
  }
  pop()
  
  //add overlay for clouds/rain description
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