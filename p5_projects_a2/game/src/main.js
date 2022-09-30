

let game;

function preload()
{

}
// let t = [0,1,2,3]
function setup()
{
  createCanvas(width, height);
  angleMode(DEGREES);

  game = new Game();



}

function draw()
{
  game.events();
  game.update();
  game.draw();

}


// function scene2()
// {
//   background(0, 255, 0);
//   print("greenb");
//
//   b3.show();
//   b3.position(10,200);
//   b3.mousePressed(()=>{scene.onAttach(scene3);
//     b3.hide();
//   });
// }
//
// function scene3()
// {
//   background(0, 0, 255);
//   print("blueb");
//
//   b1.show();
//   b1.position(10, 100);
//   b1.position(10, 100);
//   b1.mousePressed(()=>{scene.onAttach(scene1, 1,2,3,4);
//     b1.hide();
//   });
// }
