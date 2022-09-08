const width = 500;
const height = 120;

let rectSize = 70;
function setup() {
  createCanvas(width, height);
  noLoop();
}

function draw() {
  background(100, 104, 251);

  // for (let i = 0; i < 6; ++i) {
  //   fill(104, 203, 152, 255/5*(i+1));
  //   rect(width/5*i + 15, height/2 - rectSize/2 , rectSize, rectSize, 20);
  // }
  fill(104, 203, 152, 255/5*1);
  rect(width/5*0 + 15, height/2 - rectSize/2 , rectSize, rectSize, 20);

  fill(104, 203, 152, 255/5*2);
  rect(width/5*1 + 15, height/2 - rectSize/2 , rectSize, rectSize, 20);

  fill(104, 203, 152, 255/5*3);
  rect(width/5*2 + 15, height/2 - rectSize/2 , rectSize, rectSize, 20);

  fill(104, 203, 152, 255/5*4);
  rect(width/5*3 + 15, height/2 - rectSize/2 , rectSize, rectSize, 20);

  fill(104, 203, 152, 255/5*5);
  rect(width/5*4 + 15, height/2 - rectSize/2 , rectSize, rectSize, 20);
}
