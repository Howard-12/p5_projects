class Game
{
  constructor()
  {
    this.gameStart = false;
    this.gameRestart = false;
    this.loadScene = false;
    this.settingPause = false;
    this.windowS = new Window();
    this.mainMenu = new MainMenu();
    this.menuSetting = new MenuSetting();
    this.mainGameScene = new MainGameScene();
    this.loadingScence = new LoadingScene();
    this.settingScene = new GameSettingMenu();
    this.upgradeMenu = new UpgradeMenu();
    this.leaderboardMenu = new LeaderboardMenu();

    this.playerBullets = [];

    this.scoreCount = 0;
    this.bgy = 0;
    this.enemyDestoried = new Group();
  }

  static player = new Player(width/2-10, height/2-30, 35, 160);
  static enemies = [];
  static playerScore = 0;
  static playerCurrency = 0;
  static gameWave = 1;
  static nextWave = 10;
  static defeatEnemeyCount = 0;
  static gamePause = false;
  static spwanrate = 60;
  static gameP()
  {
    return Game.gamePause = !Game.gamePause;
  }

  events()
  {
    if (!Game.gamePause)
    {
      // ------ player moving ------ //
      if ((keyIsDown(LEFT_ARROW)) || (keyIsDown(65)))
        Game.player.addSpeed(-2*(deltaTime/10), 0);
      if((keyIsDown(RIGHT_ARROW)) || (keyIsDown(68)))
        Game.player.addSpeed(2*(deltaTime/10), 0);
      if(keyIsDown(UP_ARROW) || keyIsDown(87))
        Game.player.addSpeed(0, -2*(deltaTime/10));
      if(keyIsDown(DOWN_ARROW) || keyIsDown(83))
        Game.player.addSpeed(0, 2*(deltaTime/10));

      // ------ shooting ------ //
      if (keyIsDown(32) || (mouseButton == LEFT && mouseIsPressed == true))
        if (!Game.player.onCooldown)
        {
          playerShoot.setVolume(0.2);
          playerShoot.play();
          Game.player.onCooldown = true;
          this.playerBullets.push(new Bullet(Game.player.posx+cos(Game.player.rotation), (Game.player.posy)-sin(Game.player.rotation)-Game.player.height/2, 10, 10, "pb1"));
        }

      // ------ rotate ------ //
      if (keyIsDown(81))
        Game.player.rotation--;
      if (keyIsDown(69))
        Game.player.rotation++;
    }

    // ------ GUI events ------ //
    this.mainMenu.start.mousePressed(()=>{                  // game start
      startclick.play();
      this.gameStart = true;
      this.loadScene = true;
      this.windowS.onDetach(this.mainMenu);
    })

    this.mainMenu.nextShip.mousePressed(()=>{               // choose next ship
      zipclick.play();
      Game.player.playerSkinType++;
      Game.player.playerSkinType %= 3;
    })

    this.mainMenu.preShip.mousePressed(()=>{                // choose previous ship
      zipclick.play();
      if (Game.player.playerSkinType <= 0)
        Game.player.playerSkinType = 3;
      Game.player.playerSkinType--;
    })

    this.mainMenu.setting.mousePressed(()=>{                // main menu setting menu
      menuSelect.play();
      this.mainMenu.setting.toggle = !this.mainMenu.setting.toggle;
      if(this.mainMenu.setting.toggle)
      {
        this.windowS.onAttach(this.menuSetting);
        Game.gamePause = true;
      }
      else
      {
        this.windowS.onDetach(this.menuSetting);
        Game.gamePause = false;
      }
    })

    this.settingScene.backToMenu.mousePressed(()=>{         // navigate to main menu
      startclick.play();
      Game.gamePause=true;
      Game.player.hp = Game.player.maxHP;
      this.gameRestart = true;
      this.loadingScence.done = false;
      this.settingPause = false;
      this.upgradePause = false;
      this.mainGameScene.setting.toggle = false;
      this.windowS.deAttach(this.mainMenu);
    })

    this.mainGameScene.setting.mousePressed(()=>{           // open setting menu
      menuSelect.play();
      this.mainGameScene.setting.toggle = !this.mainGameScene.setting.toggle;
      this.settingPause = !this.settingPause;
      if(this.mainGameScene.setting.toggle)
      {
        this.windowS.onAttach(this.settingScene);
        Game.gamePause = true;
      }
      else
      {
        this.windowS.onDetach(this.settingScene);
        Game.gamePause = false;
      }
      this.windowS.onAttach(this.mainGameScene);
    })

    this.mainGameScene.upgrade.mousePressed(()=>{           // open upgarde menu

      this.mainGameScene.upgrade.toggle = !this.mainGameScene.upgrade.toggle;
      this.upgradePause = !this.upgradePause;
      if(this.mainGameScene.upgrade.toggle)
      {
        this.windowS.onAttach(this.upgradeMenu);
        Game.gamePause = true;
      }
      else
      {
        this.windowS.onDetach(this.upgradeMenu);
        Game.gamePause = false;
      }
      this.windowS.onAttach(this.mainGameScene);
    })

    this.upgradeMenu.firerate.mousePressed(()=>{            // upgrade fire rate
      if(Game.playerCurrency > 60)
      {
        Game.playerCurrency-=60;
        Game.player.deCooldown(5);
      }
    })

    this.upgradeMenu.firespeed.mousePressed(()=>{           // upgrade fire speed
      if(Game.playerCurrency > 20)
      {
        Game.playerCurrency-=20;
        Game.player.addFirespeed(0.1);
      }
    })

    this.leaderboardMenu.menu.mousePressed(()=>{            // leaderboard to main menu
      this.gameRestart = true;
      this.windowS.deAttach(this.mainMenu);
    })
  }

  update()
  {
    // ------ entry point ------ //
    if (!this.gameStart)
      this.windowS.onAttach(this.mainMenu);

    // ------ loading scene ------ //
    if (this.loadScene)
    {
      this.windowS.onAttach(this.loadingScence);
      if (this.loadingScence.done)
      {
        this.windowS.onDetach(this.loadingScence);
        this.windowS.onAttach(this.mainGameScene);

        Game.gamePause=false;
        this.loadScene = false;
        this.upgradePause = false;
      }
    }

    // ------ scrolling background ------ //
    if(!this.settingPause && !this.upgradePause)
    {
      this.bgy+=0.7*deltaTime/10;
      if (this.bgy >= height-10)
        this.bgy = 0;
    }

    // ----- game restart ------ //
    if (this.gameRestart)
    {
      Game.enemies = [];
      this.playerBullets = [];
      Game.player.posx = width/2-10;
      Game.player.posy = height/2-30;
      Game.player.rotation = 0;
      Game.player.width = 35;
      Game.player.height = 160;
      Game.player.firerate = 30;
      Game.player.firespeed = 1;
      Game.gameWave = 1;
    }
    this.gameRestart = false;

    if (this.windowS.scenes.length > 1)
      Game.gamePause = true;

    // ------ game over ------ //
    if (Game.player.hp == 0)
    {

      Game.player.hp = Game.player.maxHP;
      this.windowS.deAttach(this.leaderboardMenu);
      if (Game.defeatEnemeyCount > parseInt(score[0]))
        saveStrings([str(Game.defeatEnemeyCount)], "score.txt");
      Game.gamePause = true;
    }

    // ------ save game state ------ //
    this.settingScene.save.mousePressed(()=>{
      this.save();
    })

    // ------ load game state ------ //
    this.settingScene.load.mousePressed(()=>{
      this.load();
    })


    this.windowS.update();
    // ------ the game ------ //
    if (!Game.gamePause)
    {
      // ------ player collide with enemies ------ //
      for (let enemy=0; enemy<Game.enemies.length; ++enemy)
        if (this.collide(Game.player.getVertices(), Game.enemies[enemy].getVertices()))
        {
          Game.player.c = true;
          if (Game.player.hp != 0)////////////////////////////////////////////////////////////
            Game.player.hp-=5;
          Game.enemies.splice(Game.enemies.indexOf(Game.enemies[enemy]), 1);

        }
      // ------ player bullets collide with enemies ------ //
      for (let pb=0; pb<this.playerBullets.length; ++pb)
        for (let enemy=0; enemy<Game.enemies.length; ++enemy)
          if (this.collide(this.playerBullets[pb].getVertices(), Game.enemies[enemy].getVertices()))
          {
            if (Game.enemies[enemy].label == "enemy")
            {
              explodeSound.setVolume(0.3);
              explodeSound.play();
              Game.defeatEnemeyCount++;
              Game.playerCurrency+=5;
              let explode = createSprite(this.playerBullets[pb].posx, this.playerBullets[pb].posy);
              explode.scale = 0.3;
              explode.life = 100;
              explode.addAnimation("explode", explodeAnimation);
              this.enemyDestoried.add(explode);
            }
            Game.enemies.splice(Game.enemies.indexOf(Game.enemies[enemy]), 1);
            // this.playerBullets.splice(this.playerBullets.indexOf(this.playerBullets[pb]), 1);
          }

      // ------ edge detect ------ //
      if(Game.player.posx+Game.player.width/2>=width)
        Game.player.posx = width-Game.player.width/2;
      if(Game.player.posx-Game.player.width/2<=0)
        Game.player.posx = Game.player.width/2;
      if( Game.player.posy+Game.player.height/2>=height)
        Game.player.posy = height-Game.player.height/2;
      if(Game.player.posy-Game.player.height/2<=0)
        Game.player.posy = Game.player.height/2;

      // ------ wave system ------ //
      if (Game.defeatEnemeyCount > Game.nextWave)
      {
        Game.gameWave++;
        Game.nextWave += 10;
        Game.defeatEnemeyCount = 0;
        if(Game.spwanrate > 10)
          Game.spwanrate -= 10;
      }

      // ------ chance of spawning enemies ------ //
      if (frameCount % (Game.spwanrate) == 0)
      {
        if (random() < 0.6)
          Game.enemies.push(new Enemy(random(30, width-30),0,20,110,"en1"));////////////////////////////////////////
        else if (random() < 1 && Game.gameWave >= 2)
          Game.enemies.push(new Enemy(random(30, width-30),random(0, height/2),20,60,"en2"));
      }

      // ------ update everything ------ //
      for (let en of Game.enemies)
      {
        if (en.life > en.maxLife)
          Game.enemies.splice(Game.enemies.indexOf(en), 1);
        en.update();
      }
      for (let pb of this.playerBullets)
      {
        if (pb.life > pb.maxLife)
          this.playerBullets.splice(this.playerBullets.indexOf(pb), 1);
        pb.update();
      }
      Game.player.update();
    }
  }

  draw()
  {
    background(230);
    image(bg, 0, this.bgy);
    image(bg, 0, this.bgy-height+10);

    for (let en of Game.enemies)
      en.draw();
    for (let pb of this.playerBullets)
      pb.draw();
    animation(waterRipple, Game.player.posx, Game.player.posy);
    Game.player.draw();
    drawSprites();
    this.windowS.draw();
  }

  save()
  {
    let data = {};
    data.player = Game.player;
    data.enemies = Game.enemies;
    save(data, "data.json");
  }

  load()
  {
    Game.enemies = [];
    loadJSON("data.json", (data)=>{
      Game.player.posx = data.player.posx;
      Game.player.posy = data.player.posy;
      Game.player.firerate = data.player.firerate;
      Game.player.hp = data.player.hp;
      Game.player.rotation = data.player.rotation;

      for (let e=0; e<data.enemies.length; ++e)
      {
        Game.enemies.push(new Enenmy(data.enemies[e].posx, data.enemies[e].posy,30,60, data.enemies[e].type));
        Game.enemies[e].life = data.enemies[e].life;
        Game.enemies[e].hp = data.enemies[e].hp;
      }
    });
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
      let axis = [-edgeY, edgeX];
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

      let edgeX = vbX-vaX;
      let edgeY = vbY-vaY;
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
      if (projection < min) min = projection;
      if (projection > max) max = projection;
    }
    return [min, max];
  }
}

function keyPressed()
{
  // ------ pause the game ------ //
  if (keyCode == ESCAPE)
    Game.gameP();
}
