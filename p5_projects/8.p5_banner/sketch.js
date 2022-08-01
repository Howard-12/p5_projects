const width = 800;
const height = 500;

const dots = [];

let font;
function preload() {
  font = loadFont('Roboto-Bold.ttf');
}

function setup() {
  createCanvas(width, height);
  frameRate(60);
  angleMode(DEGREES);
  noStroke();

  for (let d=0; d<250; d++) {
    dots.push(new Dot());
  }
}

function draw() {
  const dT = deltaTime / 1000;

  background(200);

  stroke(0);

  for (dot of dots) {
    dot.show();
    dot.edge();
    for (other of dots) {
      // if (inTheWords(dot.position)) {
        strokeWeight(1);
        if (other != dot && dist(dot.position.x, dot.position.y, other.position.x, other.position.y) < 50) {
          line(dot.position.x, dot.position.y, other.position.x, other.position.y);
        }
      // }
    }
    dot.update(dT);
  }

  //drawWords();
}

class Dot {
  constructor() {
    this.position = createVector(random(10, width), random(10, height));
    this.velocity = p5.Vector.random2D();
  }

  show() {
    push();
    strokeWeight(0);
    point(this.position.x, this.position.y);
    pop();
  }

  update(dT) {
    // console.log(dT * 100);
    this.position.add(this.velocity.mult(dT * 20 + 1));
    this.velocity.div(dT * 20 + 1);
  }

  edge() {
    if (this.position.x < 0 || this.position.x > width)
      this.velocity.x *= -1;
    if (this.position.y < 0 || this.position.y > height)
      this.velocity.y *= -1;
  }
}


function drawWords() {

  fill(100);
  textSize(100);
  text('p5.js', 100, 100);
  font = new p5.Font();
  let po = font.textToPoints('p5.js', 100, 100, 100);
  for (p of po) {
    stroke(255);
    strokeWeight(8);
    point(p.x, p.y);
  }


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
