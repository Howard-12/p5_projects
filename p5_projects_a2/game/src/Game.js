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

  collide(verticesA, verticesB)
  {
<<<<<<< HEAD
    for (let i=0; i<group2.length; ++i)
=======
    for (let i=0; i<verticesA.length; i+=2)
>>>>>>> 94f30d862c02d16900fad8c994dac73a0f4b8c45
    {
      let vaX = verticesA[i];
      let vaY = verticesA[i+1];
      let vbX = verticesA[(i+2) % verticesA.length];
      let vbY = verticesA[(i+3) % verticesA.length];

      let edgeX = Math.abs(vbX-vaX);
      let edgeY = Math.abs(vbY-vaY);
      let axis = [-edgeY, edgeX];

      let 
    }
  }

  projectVertices()
  {

  }

  update()
  {
    this.windowS.onAttach(this.mainMenu);
    // this.windowS.onAttach(this.mainGameScene);
    // this.windowS.onDetach(this.mainMenu);
    this.mainMenu.b1.mousePressed(()=>{Game.gamePause=!Game.gamePause})
    this.windowS.update();
    if (!Game.gamePause)
    {
      // if collide(Game.player, this.enemies);
      if (frameCount % 60 == 0)
      {
<<<<<<< HEAD
        if (random() < 0.5)
=======
        if (random() < 0.4)
>>>>>>> 94f30d862c02d16900fad8c994dac73a0f4b8c45
          this.enemies.push(new CSprite(random(30, width-30),0,30,60,"en1"));
      }
      for (let en of this.enemies)
      {
        if (en.life > en.maxLife)
          this.enemies.splice(this.enemies.indexOf(en), 1);
        en.update();
      }
      Game.player.update();
      print(Game.player.getVertices().length);
      // for (let i=0; i<Game.player.getVertices().length; i+=4)
      // {
      //   let vaX = Game.player.getVertices()[i];
      //   let vaY = Game.player.getVertices()[i+1];
      //   let vbX = Game.player.getVertices()[i+2];
      //   let vbY = Game.player.getVertices()[i+3];
      //
      //   // let edgeX =
      //   print(vaX, vaY, vbX, vbY)
      // }
    }
  }

  draw()
  {
    background(230);
    circle(Game.player.getVertices()[0], Game.player.getVertices()[1], 10);
    circle(Game.player.getVertices()[2], Game.player.getVertices()[3], 10);
    circle(Game.player.getVertices()[4], Game.player.getVertices()[5], 10);
    circle(Game.player.getVertices()[6], Game.player.getVertices()[7], 10);


    this.windowS.draw();
    for (let en of this.enemies)
    {
      circle(en.getVertices()[0], en.getVertices()[1], 10);
      circle(en.getVertices()[2], en.getVertices()[3], 10);
      circle(en.getVertices()[4], en.getVertices()[5], 10);
      circle(en.getVertices()[6], en.getVertices()[7], 10);
      en.draw();
    }
    Game.player.draw();
  }
}

function keyPressed()
{
  if (keyCode === ESCAPE)
    Game.gameP();
}
