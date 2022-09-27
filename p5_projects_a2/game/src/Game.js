class Game
{
  constructor()
  {
    this.mainMenu = new MainMenu();
    this.mainGameScene = new MainGameScene();
    this.windowS = new Window();

    // this.allEnties = new AllEnties();
    this.enemies = [];
    this.player = new CSprite();

  }

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
        this.player.posx -= 2*(deltaTime/10);
      if((keyIsDown(RIGHT_ARROW)) || (keyIsDown(68)))
        this.player.posx += 2*(deltaTime/10);
      if(keyIsDown(UP_ARROW) || keyIsDown(87))
        this.player.posy -= 2*(deltaTime/10);
      if(keyIsDown(DOWN_ARROW) || keyIsDown(83))
        this.player.posy += 2*(deltaTime/10);
    }
  }

  collide()
  {

  }

  update()
  {
    this.windowS.onAttach(this.mainMenu);

    this.mainMenu.b1.mousePressed(()=>{Game.gamePause=!Game.gamePause})
    this.windowS.update();
  }

  draw()
  {
    background(230);
    this.windowS.draw();
    this.player.draw();
  }
}

function keyPressed()
{
  if (keyCode === ESCAPE)
    Game.gameP();
}
