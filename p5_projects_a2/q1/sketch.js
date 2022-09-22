let map = [];

let grassTile;
let roadTile;
let startTile;
let carTile;

let grass;
let road;
let startLine;
let car;

let startbuffer = [];
let speedOn = false;

function preload()
{
    map = loadStrings("track.txt");
    roadTile = loadImage("assets/desert_rocky_d.jpg", img => { img.width = 40; img.height = 40; });
    grassTile = loadImage("assets/grass_mix_ylw_d.jpg", img => { img.width = 40; img.height = 40; });
    startTile = loadImage("assets/stones_brown_d.jpg", img => { img.width = 40; img.height = 40; });

    carTile = loadImage("assets/car_red.png", img => { img.resize(img.width/13, img.height/13); });
}

function setup()
{
  createCanvas(600, 600);

  grass = new Group();
  road = new Group();
  startLine = new Group();

  let initRotation = 0;
  let tileR = 0;

  for (let i of map)
  {
    let tileC = 0;

    for (let j of i)
    {
      switch (j)
      {
        case "0":
          let g = new Sprite(tileC*40+20,tileR*40,40,40);
          g.setCollider("rectangle", 0, 0, 40, 40);
          // g.debug = true;
          g.addImage(grassTile);
          grass.add(g);
          ++tileC;
          break;
        case "1":
          let r = new Sprite(tileC*40+20,tileR*40,40,40);
          r.addImage(roadTile);
          road.add(r);
          ++tileC;
          break;
        case "2":
          let s = new Sprite(tileC*40+20,tileR*40,40,40);
          s.addImage(startTile);
          road.add(s);
          startbuffer[0] = tileC*40+20;
          startbuffer[1] = tileR*40;
          if (i[tileC-1] == '0' && i[tileC+3] == '0')
          {
            initRotation = 270;
          }
          else if (i[tileC-1] == '1' && i[tileC+3] == '1')
          {
            initRotation = 0;
          }
          ++tileC;
          break;
        default:
          break;
      }
    }
    ++tileR;
  }

  car = new Sprite(startbuffer[0], startbuffer[1], 20, 20);
  car.rotateToDirection = true;
  car.friction = 0.1;
  car.rotation = initRotation;
  //car.debug = true;
  car.addImage(carTile);

}
let pre  = 0;
function draw()
{
  background(250);

  if ((keyIsDown(LEFT_ARROW) && speedOn) || (keyIsDown(65) && speedOn))
      car.rotation-=3;

  if((keyIsDown(RIGHT_ARROW) && speedOn) || (keyIsDown(68) && speedOn))
    car.rotation+=3;
  if(keyIsDown(UP_ARROW) || keyIsDown(87))
  {
    car.addSpeed(.1 *deltaTime/10, car.rotation);
    speedOn = true;
  }
  else if(keyIsDown(DOWN_ARROW) || keyIsDown(83))
  {
    car.rotateToDirection = false;
    car.addSpeed(-.1 *deltaTime/10, car.rotation);
    speedOn = true;
  }
  else
  {
    if (abs(car.velocity.x) <= 0.2 && abs(car.velocity.y) <= 0.2)
    speedOn = false;
  }

  // grass.overlap(car, g => {
  //   car.position.x = startbuffer[0];
  //   car.position.y = startbuffer[1];
  //   car.rotation = 270;
  // })

  grass.draw();
  road.draw();
  startLine.draw();

  drawSprites();
}
