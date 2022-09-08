const width = 600;
const height = 600;

const increment = 44;

let time = 0;
let train = [];

function setup() {
  createCanvas(width, height);
  frameRate(60);
  noStroke();
  rectMode(CENTER);
  angleMode(DEGREES);
  // noLoop();
}

function draw() {

  background(0);

  drawBoard(); // draw board

  push();
  translate(width/2, height/2);
  strokeWeight(2);
  noFill();
  let cPoint = createVector(cos(1*time+10)*220, sin(3*time+30)*220);
  if (train.length >= 300)
    train.shift();
  train.push(cPoint);
  for (let p=1; p<train.length; p++) {
    stroke(255, 255, 255, 255*p/150);
    line(train[p-1].x, train[p-1].y, train[p].x, train[p].y);
  }
  pop();
  time++;
}

function drawBoard() { 
  let min = 0;
  let max = 440;

  fill(200);
  rect(width/2, height/2, 550, 550, 30);
  fill(89, 147, 184);
  rect(width/2, height/2, 500, 500, 20);
  push();
  translate(80, 80);
  stroke(0);
  for (let h=0; h<11; h++) {
    line(min - min, min, max, min);   // horizontal line
    line(min, min - min, min, max);   // vertical line
    min += increment;
  }
  pop();
}
