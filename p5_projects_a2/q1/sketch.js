let s;

function setup() {
  createCanvas(400, 400);
  fill(0);
  s = createSprite(100,100,10,10);
  s.setVelocity(2, 2);
}

function draw() {
  background(250);


 
  drawSprites();

}

// function mousePressed() {
//
// }
