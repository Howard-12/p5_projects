let s;
let track;
let p=[];
let texture;

function preload()
{
    texture = loadImage("assets/ground_mud_d.jpg", img => { img.width = 50; img.height = 50; });
}

function setup()
{
  createCanvas(750, 750);
  fill(0);
  s = createSprite(100,100,10,10);
  s.setVelocity(1, 1);
  s.addImage(texture);
  loadStrings("track.txt", (t) => {
    for (i of t)
    {
      for (j of i)
      {
        console.log(
          j == "1" ? j : j == "0" ? j : j == "2" ? j : null
        );
      }
    }
    p = t;
  });
  noLoop();
}

function draw()
{
  background(250);



  drawSprites();



}

// function mousePressed() {
//
// }
