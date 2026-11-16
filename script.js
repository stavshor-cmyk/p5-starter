//preview: python -m http.server

let allBalls = [];

function setup() {
  createCanvas(windowWidth-20, windowHeight-20);
  background(30);
  // screen is 1820 long 890 tall
  for (let i = 0; i < 100; i++){
  allBalls.push(new Ball(random(width),random(height), random(1,50)));
  }
}

function draw() {
  background(30);
  for (let i = 0; i < 100; i++){
  allBalls[i].update();   // Calculate physics
  allBalls[i].checkKeys(); // Check for keyboard input
  allBalls[i].display();    // Draw the ball
  allBalls[i].checkEdges(); // make the ball not go off screen
  }
}

class Ball {
  constructor(x, y, d) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.d = d;
    this.topSpeed = random(-75,75);
    this.friction = 0.75; 
    this.red = random(0, 255);
    this.yellow = random(0, 255);
    this.green = random(0, 255);
  }

  // Method to check keyboard input and apply forces
  checkKeys() {
    let forceMagnitude = random(30,100);
    
    if (keyIsDown(LEFT_ARROW))  this.applyForce(createVector(-forceMagnitude, 0));
    if (keyIsDown(RIGHT_ARROW)) this.applyForce(createVector(forceMagnitude, 0));
    if (keyIsDown(UP_ARROW))    this.applyForce(createVector(0, -forceMagnitude));
    if (keyIsDown(DOWN_ARROW))  this.applyForce(createVector(0, forceMagnitude));
  }

  // The "Force" pattern: Force adds to Acceleration
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    // 1. Acceleration changes Velocity
    this.vel.add(this.acc);
    
    // 2. Limit the speed so it doesn't go infinite
    this.vel.limit(this.topSpeed);
    
    // 3. Velocity changes Position
    this.pos.add(this.vel);
    
    // 4. Apply friction (velocity decay)
    this.vel.mult(this.friction);
    
    // 5. Reset acceleration for the next frame
    this.acc.mult(0);
  }

  display() {
    fill(this.red, this.yellow, this.green);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.d);
  }


  checkEdges(){
    if (this.pos.x < 0-this.d / 2){
      this.pos.x = width+this.d / 2;
    }

    if (this.pos.x > width+this.d / 2){
      this.pos.x = 0-this.d / 2;
    }

    if (this.pos.y < 0-this.d / 2){
      this.pos.y = height+this.d / 2;
    }

    if (this.pos.y > height+this.d / 2){
      this.pos.y = 0-this.d / 2;
    }
  }
}
