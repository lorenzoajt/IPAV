function Vehicle(x, y){
	this.pos = createVector(random(width), random(height));
	this.target = createVector(x, y);
	this.vel = p5.Vector.random2D();
	this.accel = createVector();
	this.r = 10;
	this.maxSpeed = 10	;
	this.maxForce = 1;
}

Vehicle.prototype.behaviors = function(){
	var arrive = this.arrive(this.target);
	var mouse = createVector(mouseX, mouseY);
	var flee = this.flee(mouse);

	//flee is stronger than arrive
	arrive.mult(1);
	flee.mult(10);

	this.applyForce(arrive);
	this.applyForce(flee);

}

Vehicle.prototype.applyForce = function(f){
	this.accel.add(f);
}

Vehicle.prototype.flee = function(target){
	//get a vector that points from position to target
	var desired = p5.Vector.sub(target, this.pos);
	var d = desired.mag();
	if(d< 50){
		desired.setMag(this.maxSpeed);
		desired.mult(-1);//opposite direction of the desired vector
		var steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxForce);
		return steer;
	}
	else{
		return createVector(0, 0); 
	}
}

Vehicle.prototype.arrive = function(target){
	//get a vector that points from position to target
	var desired = p5.Vector.sub(target, this.pos);
	var d = desired.mag();
	var speed = this.maxSpeed;
	if(d < 100){
		speed = map(d, 0, 100, 0, this.maxSpeed);
	}
	desired.setMag(speed);
	var steer = p5.Vector.sub(desired, this.vel);
	steer.limit(this.maxForce);
	return steer;
}

Vehicle.prototype.update = function(){
	this.pos.add(this.vel);
	this.vel.add(this.accel);
	this.accel.mult(0);
}
Vehicle.prototype.show = function(){
	colorA = color(255, 102, 100);
	colorB = color(0);
	colorMode(RGB);
	var trans = lerpColor(colorA, colorB, (((millis()/5000)%2==0)?millis():5000-millis())/5000.0)
	stroke(trans);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
}	














