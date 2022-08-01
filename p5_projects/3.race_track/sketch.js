const width = 500;
const height = 500;

cars = [];
function setup() {
  createCanvas(width, height);
  frameRate(60);

  noStroke();
  angleMode(DEGREES);

  let car1 = new Car(width/2, 40, [255,0,0], 90, 40, 0.0);
  let car2 = new Car(width/2, 60, [0,0,255], 110, 60, 100);

  cars.push(car1);
  cars.push(car2);
}

function draw() {
  // set delta time
  const dT = deltaTime/1000;

  background(0,116,1,255);
  drawRoad();

  for (const car of cars){
    car.show();
    car.update(dT);
  }
}

class Car {
  constructor(px, py, colour, t1, t2, xoff) {
    this.px = px;
    this.py = py;
    this.colour = colour;
    this.t1 = t1;
    this.t2 = t2;
    this.xoff = xoff;
    this.cx = 0;
    this.cy = 0;
    this.speed = 0;
    this.round = 0;
    this.ifPassTheLine = true;
  }

  show() {
    push();
    fill(this.colour);
    noStroke();
    translate(width/2, height/2);
    circle(this.cx, this.cy, 15);
    text(this.round, this.cx-4, this.cy-10);
    pop();
  }

  update(dT) {
    this.xoff += 0.03;

    this.cx = cos(this.speed) * this.t1;
    this.cy = -sin(this.speed) * this.t2;
    if (this.speed >= 360)
      this.speed = 0;
    this.speed += noise(this.xoff) * 150 * dT; // (pixels/s)/s

    if (this.ifPassTheLine == true && this.speed >= 90 && this.speed <= 93) {
      this.round ++;
      this.ifPassTheLine = false;
    }
    else if (this.speed >= 180 && this.speed <= 183) {
      this.ifPassTheLine = true;
    }
  }
}

function drawRoad() {
  strokeWeight(40);
  stroke(117,116,116,255);
  fill(0,0,0,0);
  ellipse(width/2 , height/2, 200, 100);
  strokeWeight(1);
  stroke(211,220,92,255);
  fill(0,0,0,0);
  ellipse(width/2 , height/2, 202, 102);
  stroke(211,220,92,255);
  fill(0,0,0,0);
  ellipse(width/2 , height/2, 199, 99);
}
