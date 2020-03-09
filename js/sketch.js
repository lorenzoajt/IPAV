var canvas;
var font;
var vehicles = [];

function preload() {
    font = loadFont('Hi_Melody/HiMelody-Regular.ttf');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', -1);
  background(0);

  var points = font.textToPoints('Hola mundo', windowWidth/2-200, windowHeight/2, 200);

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}


function draw() {
  background(255);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
  // console.log(Vehicle.vel);


}


