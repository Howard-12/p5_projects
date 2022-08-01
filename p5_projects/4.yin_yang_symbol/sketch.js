const width = 500;
const height = 500;
let angle = 0;

function setup() {
  createCanvas(width, height);
  angleMode(DEGREES);

  noStroke();
}

function draw() {
  background(200);

  push();
  translate(width/2, height/2);
  fill(255);
  arc(0, 0, 300, 300 , angle, angle + 180);
  fill(0);
  arc(0, 0, 300, 300 , angle + 180, angle);
  circle(cos(angle) * 75, sin(angle) * 75, 150);
  fill(255);
  circle(cos(angle) * -75, sin(angle) * -75, 150);
  circle(cos(angle) * 75, sin(angle) * 75, 55);
  fill(0);
  circle(cos(angle) * -75, sin(angle) * -75, 55);
  pop();

  if (angle >= 360) {
    angle = 0;
  }
  angle += 1;
}
