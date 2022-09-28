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

  static player = new CSprite(200, 200, 30, 60);
  //static player = new CSprite(, 0, 30, 60);
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
        // Game.player.posx -= 2*(deltaTime/10);
      if((keyIsDown(RIGHT_ARROW)) || (keyIsDown(68)))
        Game.player.posx += 2*(deltaTime/10);
      if(keyIsDown(UP_ARROW) || keyIsDown(87))
        Game.player.posy -= 2*(deltaTime/10);
      if(keyIsDown(DOWN_ARROW) || keyIsDown(83))
        Game.player.posy += 2*(deltaTime/10);

      if (keyIsDown(81))
        Game.player.rotation--;
      if (keyIsDown(69))
        Game.player.rotation++;
    }
  }

  collide(group1, group2)
  {
    // for (let i=0; i<group1.length; ++i)
    // {
    //
    // }
  }

  update()
  {
    this.windowS.onAttach(this.mainMenu);
    // this.windowS.onAttach(this.mainGameScene);
    // this.windowS.onDetach(this.mainMenu);

    if (frameCount % random(60, 60*3) == 0)
      print("count in second");

    this.mainMenu.b1.mousePressed(()=>{Game.gamePause=!Game.gamePause})
    this.windowS.update();
    if (!Game.gamePause)
      Game.player.update();
  }

  draw()
  {
    background(230);
    this.windowS.draw();
    Game.player.draw();
  }
}

function keyPressed()
{
  if (keyCode === ESCAPE)
    Game.gameP();
  // if (keyCode === 81)
  //   Game.player.rotation++;
}
