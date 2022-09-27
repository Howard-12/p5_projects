const width = 600, height = 800;

let scene;

let b1, b2, b3;

function setup() {
  createCanvas(width, height);

  scene = new Window(scene1);

  b1 = createButton("scene1-red");

  b2 = createButton("scene1-green");

  b3 = createButton("scene1-blue");

}

function draw() {
  background(200);

  scene.draw();
}

function scene1()
{
  background(255, 0, 0);
  print("redb");

  b2.show();
  b2.position(10, 150);
  b2.mousePressed(()=>
  {
    scene.onAttach(scene2);
    scene.onDetach(scene1);
    b2.hide();
  });
}

function scene2()
{
  background(0, 255, 0);
  print("greenb");

  b3.show();
  b3.position(10,200);
  b3.mousePressed(()=>{scene.onAttach(scene3);
    b3.hide();
  });
}

function scene3()
{
  background(0, 0, 255);
  print("blueb");

  b1.show();
  b1.position(10, 100);
  b1.position(10, 100);
  b1.mousePressed(()=>{scene.onAttach(scene1, 1,2,3,4);
    b1.hide();
  });
}

class Window
{
  constructor (startScene)
  {
    this.currentScene = startScene;
    this.priScene = this.currentScene;
    this.info;
    this.scenes = [];
  }

  onAttach(scene, ...arg)
  {
    this.currentScene = scene;
    this.info = arg;
    this.scenes.push(scene)
  }

  onDetach()
  {

  }

  draw()
  {
    (this.currentScene)();
  }
}
