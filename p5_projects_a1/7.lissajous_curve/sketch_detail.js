const width = 600;
const height = 600;

let startX = 0;
let startY = 0;
let endX = 440;
let endY = 0;

const increment = 44;

function setup() {
  createCanvas(width, height);

  noStroke();
  rectMode(CENTER);
  noLoop();
}

function draw() {

  background(0);

  fill(200);
  rect(width/2, height/2, 550, 550, 30);
  fill(89, 147, 184);
  rect(width/2, height/2, 500, 500, 20);
  push();
  translate(80, 80);
  stroke(0);
  for (let h=0; h<11; h++) {
    line(startX - startX, startY, endX, endY);   // horizontal line
    line(startX, startY - startY, endY, endX);   // vertical line
    startX += increment;
    startY += increment;
    endX += increment;
    endY += increment;
  }
  pop();
}
