const width = 500;
const height = 500;
let angle = 0;

let size = 1;

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
  arc(0, 0, 300 * size, 300 * size, angle, angle + 180);
  fill(0);
  arc(0, 0, 300 * size, 300 * size, angle + 180, angle);
  circle(cos(angle) * 75 * size, sin(angle) * 75 * size, 150 * size);
  fill(255);
  circle(cos(angle) * -75 * size, sin(angle) * -75 * size, 150 * size);
  circle(cos(angle) * 75 * size, sin(angle) * 75 * size, 55 * size);
  fill(0);
  circle(cos(angle) * -75 * size, sin(angle) * -75 * size, 55 * size);
  pop();

  if (angle >= 360) {
    angle = 0;
  }
  angle += 1;
}
