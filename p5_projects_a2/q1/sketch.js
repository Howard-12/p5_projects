let sT;
let track;
let grass;
let grassTile;


function preload()
{
    grassTile = loadImage("assets/ground_mud_d.jpg", img => { img.width = 40; img.height = 40; });
}

function setup()
{
  createCanvas(600, 600);

  grass = new Group();

  // for (let i = 0; i < 15; i++)
  // {
  //   s = createSprite(i*40+20,100,10,10);
  //   s.setVelocity(1, 1);
  //   s.addImage(grassTile);
  //   grass.add(s);
  // }
  loadStrings("track.txt", (t) => {
    for (let i of t)
    {
      let tileC = 0;
      for (let j of i)
      {
        switch (j)
        {
          case "0":
            console.log("0");
          case "1":
            console.log("1");
            // let s = new Sprite(grassT*40+20,100,10,10);
            // s.setVelocity(1, 1);
            // s.addImage(grassTile);
            // grass.add(s);
            ++tileC;
          case "2":
            console.log("2");
        }
          // j == "1"
          //   ?
          //   console.log("adfsg")
          //   : j == "0"
          //     ? j
          //     : j == "2"
          //       ? j
          //       : null

        // console.log(t[i].length);
        // console.log(
        //   j == "1" ? j : j == "0" ? j : j == "2" ? j : null
        // );
      }
    }
    let s = createSprite(1*40+20,1*40+20,10,10);
    s.setVelocity(1, 1);
    s.addImage(grassTile);
    grass.add(s);

  });
  noLoop();
}

function draw()
{
  background(250);


  grass.draw();
  // drawSprites();
}

// function mousePressed() {
//
// }
