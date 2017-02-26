//construct url
// http://api.openweathermap.org/data/2.5/weather?zip=11222,us&units=metric&appid=2585c2354e7209577fbcb9a5ad1c9367
var url = "http://api.openweathermap.org/data/2.5/weather?zip=";
var zip = "19081"
var countryCode = ",us";
var metric = "&units=metric";
var API = "&appid=2585c2354e7209577fbcb9a5ad1c9367";


function setup() {
  createCanvas(400, 400);
  var call = url + zip + metric + API;
  console.log(call)
  loadJSON(call, gotData, 'jsonp');
}

function gotData(data) {

  var weatherData = data;

  //use humidity data to generate background color
  var humidityColor = weatherData.main.humidity;
  background(humidityColor, 195, 255, humidityColor);


  push()
  var temp = weatherData.main.temp; //yellow color

  //how temp will affect color of rays
   //change alpha of color depending on the temp (cold = transparent, hot = fill)
  if (temp < 0) {
    fill(255, 255, temp, temp);
  } else {
    fill(255, 255, temp, temp * 20);
  }

  var mappedTemp = map(temp, -10, 30, 40, 0); //map it so that values are within a specific range, doesn't get too dense
  translate(width / 2, height / 2); //lines drawn from center
  
  for (var x = 0; x <= width; x += mappedTemp) { //controls spiral definition
    for (var y = 0; y <= height; y += mappedTemp) { //controls spacing between the rectangles
      rotate((PI / mappedTemp));
      rect(x, y, 5, 500)
      //ellipse(x,y,5,500)
    }
  }
  pop()

  //if it's cloudy or rainy, place a grey rectangle on top to dim color
  if (weatherData.weather[0].main == "Clouds" || weatherData.weather[0].main == "Rain") {
    fill(0, 0, 0, 100)
    rect(0, 0, 400, 400)
  } else {
    noFill();
  }

  //text description
  noStroke();
  fill(0, 0, 0, 100)
  rect(0, 360, 400, 40)
  fill("#32CD32");
  stroke(50);
  textSize(20);
  text(weatherData.name, 10, 390)
  text(weatherData.weather[0].main, 180, 390)
  text(temp, 300, 390)
}