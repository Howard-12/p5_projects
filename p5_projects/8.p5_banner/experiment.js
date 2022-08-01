const width = 800;
const height = 500;

const dots = [];

let font;
let p5js;
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
  for (let d=0; d<250; d++) {
    dots.push(new Dot());
  }
}

function draw() {
  const dT = deltaTime / 1000;

  background(0);

  stroke(0);
  drawWords();
  for (dot of dots) {
    dot.show();
    dot.edge();
    for (other of dots) {
      // if (inTheWords(dot.position)) {
        strokeWeight(1);
        if (other != dot && dist(dot.position.x, dot.position.y, other.position.x, other.position.y) < 50) {
          stroke(random(10,255), random(10,255), random(10,255));
          line(dot.position.x, dot.position.y, other.position.x, other.position.y);
        }
      // }
    }
    dot.update(dT);
    push();
    for (word of course) {
      if (dist(dot.position.x, dot.position.y, word.x, word.y) < 40) {
        stroke(random(10,255), random(10,255), random(10,255));
        line(dot.position.x, dot.position.y, word.x, word.y);
      }
    }
    pop();
  }

  push();
  fill(190);
  noStroke();
  textFont(font);
  textSize(200);
  text('1701ICT', width/2-390, height/2+60);
  pop();

  // push();
  // noStroke();
  // fill(255, 0,0, 100);
  // circle(mouseX, mouseY, 300);
  // pop();
}

class Dot {
  constructor() {
    this.position = createVector(random(10, width), random(10, height));
    this.initVel = p5.Vector.random2D();
    this.velocity = this.initVel;
    this.accelerate = createVector();
    this.maxspeed = 1;
    // this.maxforce = 1;
  }

  show() {
    push();
    strokeWeight(0);
    stroke(255);
    point(this.position.x, this.position.y);
    pop();
  }

  update(dT) {
    // console.log(dT * 100);
    this.position.add(this.velocity.mult(dT * 20 + 1));
    this.velocity.div(dT * 20 + 1);

    let mouse = createVector(mouseX, mouseY);
    let d = p5.Vector.sub(mouse, this.position);
    let de = d.mag();
    let steer;
    if (de < 150) {
      d.setMag(this.maxspeed);
      d.mult(-1);
      steer = p5.Vector.sub(d, this.velocity);
      // steer.limit(this.maxforce);
      this.accelerate.add(steer);
      this.velocity.add(this.accelerate);
    }
    else {
      // steer = createVector(0,0);
      // this.velocity.setMag(this.initVel);
      // this.velocity = this.initVel;
      // this.velocity.sub(this.accelerate);

    }
    // console.log(this.velocity);
    // if (dist(this.position.x, this.position.y, mouseX, mouseY) < 100) {
    // }

      this.accelerate.mult(0);
  }

  edge() {
    if (this.position.x < 0 || this.position.x > width)
      this.velocity.x *= -1;
    if (this.position.y < 0 || this.position.y > height)
      this.velocity.y *= -1;
  }
}


function drawWords() {

  push();
  // fill(100);
  // textFont(font);
  // textSize(200);
  // text('1701ICT', width/2-390, height/2+60);

  // p5js = font.textToPoints('p5.js', width/2-200, height/2, 200);
  course = font.textToPoints('1701ICT', width/2-390, height/2+60, 200);
  // for (p of p5js) {
  //   stroke(255);
  //   strokeWeight(8);
  //   point(p.x, p.y);
  // }
  //===============
  // for (c of course) {
  //   stroke(255);
  //   strokeWeight(8);
  //   point(c.x, c.y);
  // }
  pop();

  /*
  noStroke();
  fill(200);
  beginShape();
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height);
  vertex(0, height);
  beginContour();
  vertex(120, 120);
  vertex(120, 400);
  vertex(150, 400);
  vertex(150, 120);
  endContour();
  // beginContour();
  //
  // endContour();
  // beginContour();
  // vertex(220, 220);
  // vertex(220, 280);
  // vertex(280, 280);
  // vertex(280, 220);
  // endContour();
  endShape(CLOSE);
  */




}
