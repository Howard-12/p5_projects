class Game
{
  constructor()
  {
    this.mainMenu = new MainMenu();
    this.mainGameScene = new MainGameScene();
    this.windowS = new Window();

    // this.allEnties = new AllEnties();
    this.enemies = [];
  }

  static player = new CSprite(200, 200, 30, 60, "player");
  static gamePause = false;
  static gameP()
  {
    return Game.gamePause = !Game.gamePause;
  }

  events()
  {
    if (!Game.gamePause)
    {
      if ((keyIsDown(LEFT_ARROW)) || (keyIsDown(65)))
        Game.player.addSpeed(-2*(deltaTime/10), 0);
      if((keyIsDown(RIGHT_ARROW)) || (keyIsDown(68)))
        Game.player.addSpeed(2*(deltaTime/10), 0);
      if(keyIsDown(UP_ARROW) || keyIsDown(87))
        Game.player.addSpeed(0, -2*(deltaTime/10));
      if(keyIsDown(DOWN_ARROW) || keyIsDown(83))
        Game.player.addSpeed(0, 2*(deltaTime/10));

      if (keyIsDown(81))
        Game.player.rotation--;
      if (keyIsDown(69))
        Game.player.rotation++;
    }
  }

  update()
  {
    this.windowS.onAttach(this.mainMenu);
    this.windowS.onAttach(this.mainGameScene);
    // this.windowS.onDetach(this.mainMenu);
    this.mainMenu.b1.mousePressed(()=>{Game.gamePause=!Game.gamePause})
    this.windowS.update();
    if (!Game.gamePause)
    {
      // for (let i = 0; i < t.length - 1; ++i)
      // {
      //   for (let j = i + 1; j < t.length; ++j)
      //   {
      //
      //   }
      // }

        for (let enemy=0; enemy<this.enemies.length; ++enemy)
        {
          if (this.collide(Game.player.getVertices(), this.enemies[enemy].getVertices()))
          {
            print("collided")

            Game.player.c = true;
          }

          // else Game.player.st = [255, 0, 0];
        }


      if (frameCount % 60 == 0)
      {
        if (random() < 0.5)
          this.enemies.push(new CSprite(random(30, width-30),0,30,60,"en1"));
      }
// if (this.enemies.length < 1)
//       this.enemies.push(new CSprite(random(30, width-30),300,30,60,"en1"));

      for (let en of this.enemies)
      {
        if (en.life > en.maxLife)
          this.enemies.splice(this.enemies.indexOf(en), 1);
        en.update();
      }
      Game.player.update();

    }
  }

  collide(verticesA, verticesB)
  {
    for (let i=0; i<verticesA.length; i+=2)
    {
      let vaX = verticesA[i];
      let vaY = verticesA[i+1];
      let vbX = verticesA[(i+2) % verticesA.length];
      let vbY = verticesA[(i+3) % verticesA.length];

      let edgeX = vbX-vaX;
      let edgeY = vbY-vaY;
      // let edgeX = Math.abs(vbX-vaX);
      // let edgeY = Math.abs(vbY-vaY);
      let axis = [-edgeY, edgeX];
      // print(axis);
      let vA = this.projectVertices(verticesA, axis);
      let vB = this.projectVertices(verticesB, axis);

      if (vA[0] >= vB[1] || vB[0] >= vA[1])
      {
        return false;
      }
    }

    for (let i=0; i<verticesB.length; i+=2)
    {
      let vaX = verticesB[i];
      let vaY = verticesB[i+1];
      let vbX = verticesB[(i+2) % verticesA.length];
      let vbY = verticesB[(i+3) % verticesA.length];

      let edgeX = Math.abs(vbX-vaX);
      let edgeY = Math.abs(vbY-vaY);
      let axis = [-edgeY, edgeX];

      let vA = this.projectVertices(verticesA, axis);
      let vB = this.projectVertices(verticesB, axis);

      if (vA[0] >= vB[1] || vB[0] >= vA[1])
        return false;
    }

    return true;
  }

  projectVertices(vertices, axis)
  {
    let min = Infinity;
    let max = -Infinity;

    for (let i=0; i<vertices.length; i+=2)
    {
      let v = [vertices[i], vertices[i+1]];
      let projection = v[0]*axis[0] + v[1]*axis[1];
      // print(vertices[0]);
      if (projection < min) min = projection;
      if (projection > max) max = projection;
    }
    // print(min, max);
    return [min, max];
  }

  draw()
  {
    background(230);


    this.windowS.draw();
    for (let en of this.enemies)
      en.draw();
    Game.player.draw();
  }
}

function keyPressed()
{
  if (keyCode === ESCAPE)
    Game.gameP();
}
