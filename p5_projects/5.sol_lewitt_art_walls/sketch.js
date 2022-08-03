const width = 600;
const height = 400;

let walls = [];

function setup() {
  createCanvas(width, height);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(200);
  
  let first = new Wall('red', 'blue', 0, 0, 'circle', [100, 100, 100], 'yellow');
  let second = new Wall('yellow', 'red', width/3, 0, 'rect', [100, 100, 100, 100], 'blue');
  let third = new Wall('blue', 'yellow', width/3*2, 0, 'triangle', [100, 50, 40, 150, 160, 150], 'red');
  let fourth = new Wall('red', 'yellow', 0, height/2, 'rect', [100, 100, 140, 100], 'blue');
  let fifth = new Wall('yellow', 'blue', width/3, height/2, 'quad', [90, 50, 140, 50, 170, 150, 30, 150], 'red');
  let sixth = new Wall('blue', 'red', width/3*2, height/2, 'quad', [70, 50, 170, 50, 130, 150, 30, 150], 'yellow');

  walls.push(first);
  walls.push(second);
  walls.push(third);
  walls.push(fourth);
  walls.push(fifth);
  walls.push(sixth);

  for (wall of walls) {
    wall.drawHLine();
    wall.drawCShape();
  }
  drawWalls();
}

class Wall {
  constructor(firstColour, secondColour, transX, transY, shape, shapeParameter, centreColour) {
    this.target;
    this.cmask;
    this.mk;
    this.firstColour = firstColour;
    this.secondColour = secondColour;
    this.transX = transX;
    this.transY = transY;
    this.shape = shape;
    this.shapeParameter = shapeParameter;
    this.centreColour = centreColour;
  }

  drawCShape() {
    this.cmask = createGraphics(600, 400);
    this.cmask.translate(this.transX, this.transY);
    this.cmask.rectMode(CENTER);
    this.cmask.noStroke();
    this.cmask.fill(0);
    this['cmask'][this.shape](...this.shapeParameter);

    this.target = createGraphics(600, 400);
    this.target.translate(this.transX+50, this.transY+50);
    this.target.fill(this.firstColour);
    this.target.ellipse(50, 50, 180, 180);
    this.target.stroke(this.centreColour);
    for (let i = 0; i < 170; i+=5)
      this.target.line(i-50, 0, i-50, 170);
    this.mk = this.target.get();
    this.mk.mask(this.cmask);

    image(this.mk, 0, 0);
  }

  drawHLine() {
    push();
    translate(this.transX, this.transY);
    fill(this.firstColour);
    noStroke();
    rect(0, 0, 200, 200);
    strokeWeight(5);
    stroke(this.secondColour);
    for (let i = 0; i<height/2; i+=12)
      line(0+1.5, i+4, width/3-2, i+4);
    pop();
  }
}

function drawWalls() {
  push();
  stroke(200);
  strokeWeight(2.8);
  line(width/3, 0, width/3, height);
  line(width/3*2, 0, width/3*2, height);
  line(0, height/2, width, height/2);
  pop();
}
