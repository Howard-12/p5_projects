const width = 500;
const height = 120;

let rectSize = 70;
function setup() {
  createCanvas(width, height);
  noLoop();
}

function draw() {
  background(100, 104, 251);

  for (let i = 0; i < 6; ++i) {
    fill(104, 203, 152, 255/5*(i+1));
    rect(width/5*i + 15, height/2 - rectSize/2 , rectSize, rectSize, 20);
  }
}
