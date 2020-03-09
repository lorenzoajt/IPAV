/*var canvas;
var font;
var vehicles = [];

function preload() {
    font = loadFont('Hi_Melody/HiMelody-Regular.ttf');
    console.log("loading");
}

function setup() {
  console.log("loaded");
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
  background(0);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
  // console.log(Vehicle.vel);


}
*/


let systems;
var canvas;
var numParticles = 0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', -1);
  systems = [];
  this.p = new ParticleSystem(createVector(windowWidth/2, windowHeight/2));
  systems.push(p);
}

function draw() {
  background(51);
  background(0);
  for (i = 0; i < systems.length; i++) {
    systems[i].run();
    if(numParticles < 200){
      systems[i].addParticle();
      numParticles++;
    }
    
  }
  
}

// function mousePressed() {
//   this.p = new ParticleSystem(createVector(mouseX, mouseY));
//   systems.push(p);
// }

// A simple Particle class
let Particle = function(position) {
  // this.acceleration = createVector(0, 0);
  var velx = 0;
  var vely = 0;

  do{
    velx = random(-1,1);
    vely = random(-1,1);
  }while(velx == 0 || vely == 0);

  this.velocity = createVector(velx, vely);
  this.position = position.copy();
  // this.lifespan = 255.0;
  
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  // this.lifespan -= 2;

};

// Method to display
Particle.prototype.display = function () {
  stroke(0,50,103);
  strokeWeight(1);
  fill(18,164,241,125);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function () {
  if (this.position.x <= 0 || this.position.x >= windowWidth || this.position.y <= 0 || this.position.y >= windowHeight) {
    return true;

  } else {
    return false;
  }
};

let ParticleSystem = function (position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
  // Add either a Particle or CrazyParticle to the system
  if (int(random(0, 2)) == 0) {
    p = new Particle(this.origin);
  }
  else {
    p = new CrazyParticle(this.origin);
  }
  this.particles.push(p);
};

ParticleSystem.prototype.run = function () {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

// A subclass of Particle

function CrazyParticle(origin) {
  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  Particle.call(this, origin);

  // Initialize our added properties
  this.theta = 0.0;
};

// Create a Crazy.prototype object that inherits from Particle.prototype.
// Note: A common error here is to use "new Particle()" to create the
// Crazy.prototype. That's incorrect for several reasons, not least
// that we don't have anything to give Particle for the "origin"
// argument. The correct place to call Particle is above, where we call
// it from Crazy.
CrazyParticle.prototype = Object.create(Particle.prototype); // See note below

// Set the "constructor" property to refer to CrazyParticle
CrazyParticle.prototype.constructor = CrazyParticle;

// Notice we don't have the method run() here; it is inherited from Particle

// This update() method overrides the parent class update() method
CrazyParticle.prototype.update=function() {
  Particle.prototype.update.call(this);
  // Increment rotation based on horizontal velocity
  this.theta += (this.velocity.x * this.velocity.mag()) / 10.0;
}

// This display() method overrides the parent class display() method
CrazyParticle.prototype.display=function() {
  // Render the ellipse just like in a regular particle
  Particle.prototype.display.call(this);
  // Then add a rotating line
  push();
  translate(this.position.x, this.position.y);
  rotate(this.theta);
  stroke(124,143,172,150);
  line(0, 0, 25, 50);
  pop();
}


