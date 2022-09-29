class Game
{
  constructor()
  {
    this.mainMenu = new MainMenu();
    this.mainGameScene = new MainGameScene();
    this.windowS = new Window();

    // this.allEnties = new AllEnties();
    this.enemies = [];
    // for (let en=0; en<10; ++en)
      // this.enemies.push(new CScript());
  }

  static player = new CSprite(200, 200, 30, 60, "player");
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
    for (let i=0; i<group1.length; ++i)
    {

    }
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
        // let rand= random();
        if (random() < 0.5)
          this.enemies.push(new CSprite(random(30, width-30),0,30,60,"en1"));
      }
      for (let en of this.enemies)
      {
        if (en.life > en.maxLife)
          this.enemies.splice(this.enemies.indexOf(en), 1)
        en.update();
      }
      Game.player.update();
    }
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
