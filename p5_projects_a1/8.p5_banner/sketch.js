const width = 800;
const height = 500;

const dots = [];

let font;
let course;

function preload() {
  font = loadFont('Roboto-Bold.ttf');
}

function setup() {
  createCanvas(width, height);
  frameRate(60);
  angleMode(DEGREES);
  noStroke();

  // draw dots
  for (let d=0; d<350; d++) {
    dots.push(new Dot());
  }
}

function draw() {
  const dT = deltaTime / 1000;

  background(0);

  stroke(0);

  course = font.textToPoints('1701ICT', width/2-390, height/2+60, 200);

  push();
  strokeWeight(1);
  for(let i=0; i<dots.length-1; ++i)
  {
    let d = dots[i];
    for (let j=i+1; j<dots.length; ++j)
    {
      if (dist(d.position.x, d.position.y, dots[j].position.x, dots[j].position.y) < 50)
      {
        stroke(random(10,255), random(10,255), random(10,255));
        line(d.position.x, d.position.y, dots[j].position.x, dots[j].position.y);
      }
    }

    for (let w=i+1; w<course.length; ++w)
    {
      if (dist(d.position.x, d.position.y, course[w].x, course[w].y) < 40)
      {
        stroke(random(10,255), random(10,255), random(10,255));
        line(d.position.x, d.position.y, course[w].x, course[w].y);
      }
    }
  }
  for (dot of dots)
  {
    dot.show();
    dot.edge();
    dot.update(dT);
  }
  pop();

  fill(0);
  strokeWeight(3);
  stroke(190);
  textFont(font);
  textSize(200);
  text('1701ICT', width/2-390, height/2+60);
}

class Dot {
  constructor() {
    this.position = createVector(random(10, width), random(10, height));
    this.velocity = p5.Vector.random2D();
    this.accelerate = createVector();
    this.maxspeed = 1;
  }

  show() {
    push();
    strokeWeight(0);
    stroke(255);
    point(this.position.x, this.position.y);
    pop();
  }

  update(dT) {
    this.position.add(this.velocity.mult(dT * 20 + 1));
    this.velocity.div(dT * 20 + 1);

    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.position);
    let distance = dir.mag();
    let steer;
    if (distance < 150) {
      dir.setMag(this.maxspeed);
      dir.mult(-1);
      steer = p5.Vector.sub(dir, this.velocity);
      this.accelerate.add(steer);
      this.velocity.add(this.accelerate);
    }
    this.accelerate.mult(0);
  }

  edge() {
    if (this.position.x < 0 || this.position.x > width)
      this.velocity.x *= -1;
    if (this.position.y < 0 || this.position.y > height)
      this.velocity.y *= -1;
  }
}
