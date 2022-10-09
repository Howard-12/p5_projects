const width = 600, height = 800;

// ======================================= Custom sprite ======================================= //
class CSprite
{
  constructor(posx, posy, width, height)
  {
    this.posx = posx;
    this.posy = posy;
    this.width = width;
    this.height = height;
    this.rotation = 0;
    this.speed = 0;
    this.life = 0;
    this.maxLife;
    this.vertices = [];
    this.c = false;
    this.firerate = 30;
    this.onCooldown = false;
    this.cooldown = 30;
    this.hp = 100;
    this.maxHP = 100;
  }

  update()
  {

  }

  deCooldown(value=10)
  {
    if (this.firerate > 0)
      this.firerate -= value;
  }

  addSpeed(xSpeed, ySpeed)
  {
    this.posx += xSpeed;
    this.posy += ySpeed;
  }

  getVertices()
  {
    return [
      (-this.width/2)*Math.cos(this.rotation*PI/180) - (-this.height/2)*Math.sin(this.rotation*PI/180) + this.posx,
      (-this.width/2)*Math.sin(this.rotation*PI/180) + (-this.height/2)*Math.cos(this.rotation*PI/180) + this.posy,
      (this.width/2)*Math.cos(this.rotation*PI/180)  - (-this.height/2)*Math.sin(this.rotation*PI/180) + this.posx,
      (this.width/2)*Math.sin(this.rotation*PI/180)  + (-this.height/2)*Math.cos(this.rotation*PI/180) + this.posy,
      (this.width/2)*Math.cos(this.rotation*PI/180)  - (this.height/2)*Math.sin(this.rotation*PI/180)  + this.posx,
      (this.width/2)*Math.sin(this.rotation*PI/180)  + (this.height/2)*Math.cos(this.rotation*PI/180)  + this.posy,
      (-this.width/2)*Math.cos(this.rotation*PI/180) - (this.height/2)*Math.sin(this.rotation*PI/180)  + this.posx,
      (-this.width/2)*Math.sin(this.rotation*PI/180) + (this.height/2)*Math.cos(this.rotation*PI/180)  + this.posy,
    ]
  }

  draw()
  {
    push();
    rectMode(CENTER);
    translate(this.posx, this.posy);
    rotate(this.rotation);
    fill(215, 0, 200);
    switch (this.type)
    {
      case "en1":
        rect(0, 0, this.width, this.height);
        break;
      case "pb":
        break;
    }
    pop();
  }
 }
// ======================================= Player ======================================= //
class Player extends CSprite
{
  constructor(posx, posy, width, height)
  {
    super(posx, posy, width, height);
    this.playerSkinType = 0;
    this.maxHP = 100;
    this.firespeed = 1;
  }

  update()
  {
    if (this.onCooldown)
      this.cooldown--;
    if (this.cooldown < 0)
    {
      this.cooldown = this.firerate;
      this.onCooldown = false;
    }
  }

  addFirespeed(value)
  {
    this.firespeed += value;
  }

  draw()
  {
    push();
    rectMode(CENTER);
    translate(this.posx, this.posy);
    rotate(this.rotation);
    noStroke();
    this.playerSkin();
    strokeWeight(10)
    stroke("yellow");
    pop();
  }

  setPlayerSkin(type)
  {
    this.playerSkinType = type;
  }

  playerSkin()
  {
    switch (this.playerSkinType)
    {
      case 0:
        image(ship, -this.width/2-13, -this.height/2-20);
        break;
      case 1:
        image(ship1, -this.width/2-13, -this.height/2-20);
        break;
      case 2:
        image(ship2, -this.width/2-13, -this.height/2-20);
        break;
    }
  }
}
// ======================================= Bullet ======================================= //
class Bullet extends CSprite
{
  constructor(posx, posy, width, height, bulletType)
  {
    super(posx, posy, width, height);
    this.label = "bullet";
    this.bulletType = bulletType;
    this.dir = Game.player.rotation+90;
    this.fireDir = atan2( Game.player.posy-posy, Game.player.posx-posx);
  }

  update()
  {
    switch (this.bulletType)
    {
      case "enb1":
        this.speed = 0.5;
        this.maxLife = 400;
        this.life++;
        this.addSpeed(cos(this.fireDir)*(3*deltaTime/10)*this.speed, sin(this.fireDir)*(3*deltaTime/10)*this.speed);
        break;
      case "pb1":
        this.speed = Game.player.firespeed;
        this.maxLife = 200;
        this.life++;
        this.addSpeed(-cos(this.dir)*(3*deltaTime/10)*this.speed, -sin(this.dir)*(3*deltaTime/10)*this.speed);
        break;
    }
  }

  draw()
  {
    push();
    rectMode(CENTER);
    translate(this.posx, this.posy);
    rotate(this.dir);
    noStroke();
    switch (this.bulletType)
    {
      case "enb1":
        fill(255, 0, 0);
        circle(0, 0, this.width, this.height);
        break;
      case "pb1":
        fill(200);
        circle(0, 0, this.width, this.height);
        break;
    }
    pop();
  }
}
// ======================================= Enemy ======================================= //
class Enemy extends CSprite
{
  constructor(posx, posy, width, height, enemyType)
  {
    super(posx, posy, width, height);
    this.label = "enemy";
    this.enemyType = enemyType;
    this.spawnEdge = Math.round(random(1,3));

    switch (this.enemyType)
    {
      case "en2":
        if(this.spawnEdge == 1)
        {
          this.posx = 650;
          this.rotation = 270;
        }
        else if(this.spawnEdge == 2)
        {
          this.posx = -50;
          this.rotation = 90;
        }
        else if (this.spawnEdge == 3)
        {
          this.posx = posx;
          this.posy = 0;
          this.rotation = 180;
        }
    }
  }

  update()
  {
    switch (this.enemyType)
    {
      case "en1":
        this.maxLife = 850;
        this.life++;
        this.posy++;
        break;
      case "en2":
        this.maxLife = 850;
        this.life++;
        if(this.spawnEdge == 1)
          this.posx-=2;
        else if(this.spawnEdge == 2)
          this.posx+=2;
        else if (this.spawnEdge == 3)
          this.posy+=2;
        if (frameCount % (60*2) == 0)
        {
          enShoot.play();
          Game.enemies.push(new Bullet(this.posx, this.posy, 10, 10, "enb1"));
        }
        break;
    }

    if (this.onCooldown)
      this.cooldown--;
    if (this.cooldown < 0)
    {
      this.cooldown = this.firerate;
      this.onCooldown = false;
    }
  }

  draw()
  {
    push();
    rectMode(CENTER);
    translate(this.posx, this.posy);
    rotate(this.rotation);

    switch (this.enemyType)
    {
      case "en1":
        image(enShip, -9.5, -55);
        break;
      case "en2":
        image(plane, -38, -30);
        break;
    }
    strokeWeight(3)
    point(0, -50)
    pop();
  }
}
// ==================================================== Game object ==================================================== //
// ===================================================================================================================== //
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
// ==================================================== Window object ==================================================== //
// ======================================================================================================================= //
class Window
{
  constructor ()
  {
    this.scenes = [];
  }

  onAttach(attachedS)
  {
    if (!this.scenes.includes(attachedS, 0))
    {
      this.scenes.push(attachedS);
      for (let button of attachedS.elements)
        button.show();
    }
  }

  deAttach(attachedS)
  {
    for (let scene of this.scenes)
      for (let button of scene.elements)
        button.hide();
    this.scenes = [];
    if (!this.scenes.includes(attachedS, 0))
    {
      this.scenes.push(attachedS);
      for (let button of attachedS.elements)
        button.show();
    }
  }

  onDetach(detachS)
  {
    for (let button of detachS.elements)
      button.hide();
    this.scenes.splice(this.scenes.indexOf(detachS), 1);
  }

  update()
  {
    for (let s=0; s<this.scenes.length; ++s) this.scenes[s].update();
  }

  draw()
  {
    for (let s=0; s<this.scenes.length; ++s) this.scenes[s].draw();
  }
}
// ==================================================== Scenes ==================================================== //
// ================================================================================================================ //
// ======================================= Main menu ======================================= //
class MainMenu
{
  constructor()
  {
    this.id = 1;
    this.elements = [];

    this.setting = createElement("i");
    this.elements.push(this.setting);
    this.setting.class("fa fa-gear");
    this.setting.style("font-size", "30px");
    this.setting.style("color", "#D3D3D3");
    this.setting.hide();

    this.nextShip = createDiv();
    this.elements.push(this.nextShip);
    this.nextShip.style("border", "solid black");
    this.nextShip.style("border-width", "0 9px 9px 0");
    this.nextShip.style("border-color", "#D3D3D3");
    this.nextShip.style("width", "15px");
    this.nextShip.style("height", "15px");
    this.nextShip.style("display", "inline-block");
    this.nextShip.style("padding", "3px");
    this.nextShip.style("transform", "rotate(-45deg)");
    this.nextShip.style("-webkit-transform", "rotate(-45deg)");
    this.nextShip.hide();

    this.preShip = createDiv();
    this.elements.push(this.preShip);
    this.preShip.style("border", "solid black");
    this.preShip.style("border-width", "0 9px 9px 0");
    this.preShip.style("border-color", "#D3D3D3");
    this.preShip.style("width", "15px");
    this.preShip.style("height", "15px");
    this.preShip.style("display", "inline-block");
    this.preShip.style("padding", "3px");
    this.preShip.style("transform", "rotate(135deg)");
    this.preShip.style("-webkit-transform", "rotate(135deg)");
    this.preShip.hide();

    this.start = createButton("Start");
    this.elements.push(this.start);
    this.start.position(width/2-60, height-280);
    this.start.style("text-align", "center");
    this.start.style("display", "inline-block");
    this.start.style("margin", "5px");
    this.start.style("font-weight", "bold");
    this.start.style("font-size", "30px");
    this.start.style("padding", "5px 10px 5px 10px");
    this.start.style("background-color", "lightgray");
    this.start.style("text-shadow", "-1px -1px black, 1px 1px white");
    this.start.style("color", "gray");
    this.start.style("-webkit-border-radius", "7px");
    this.start.style("-moz-border-radius", "7px");
    this.start.style("-o-border-radius", "7px");
    this.start.style("border-radius", "7px");
    this.start.style("border-color", "transparent");
    this.start.style("box-shadow", "0 .1em gray");
    this.start.style("cursor", "cursor: pointer;");
    this.start.hide();

    this.up = createButton("&#8593");
    this.elements.push(this.up);
    this.up.position(110, height-101);
    this.up.style("text-align", "center");
    this.up.style("display", "inline-block");
    this.up.style("margin", "5px");
    this.up.style("font-weight", "bold");
    this.up.style("font-size", "15px");
    this.up.style("padding", "3px 6px 3px 6px");
    this.up.style("background-color", "lightgray");
    this.up.style("text-shadow", "1px 1px white");
    this.up.style("color", "gray");
    this.up.style("-webkit-border-radius", "7px");
    this.up.style("-moz-border-radius", "7px");
    this.up.style("-o-border-radius", "7px");
    this.up.style("border-radius", "7px");
    this.up.style("border-color", "transparent");
    this.up.style("box-shadow", "0 .1em gray");
    this.up.style("cursor", "cursor: pointer;");
    this.up.hide();

    this.left = createButton("&#8592;");
    this.elements.push(this.left);
    this.left.position(80, height-70);
    this.left.style("text-align", "center");
    this.left.style("display", "inline-block");
    this.left.style("margin", "5px");
    this.left.style("font-weight", "bold");
    this.left.style("font-size", "15px");
    this.left.style("padding", "3px 4px 3px 4px");
    this.left.style("background-color", "lightgray");
    this.left.style("text-shadow", "1px 1px white");
    this.left.style("color", "gray");
    this.left.style("-webkit-border-radius", "7px");
    this.left.style("-moz-border-radius", "7px");
    this.left.style("-o-border-radius", "7px");
    this.left.style("border-radius", "7px");
    this.left.style("border-color", "transparent");
    this.left.style("box-shadow", "0 .1em gray");
    this.left.style("cursor", "cursor: pointer;");
    this.left.hide();

    this.down = createButton("&#8595;");
    this.elements.push(this.down);
    this.down.position(110, height-70);
    this.down.style("text-align", "center");
    this.down.style("display", "inline-block");
    this.down.style("margin", "5px");
    this.down.style("font-weight", "bold");
    this.down.style("font-size", "15px");
    this.down.style("padding", "3px 6px 3px 6px");
    this.down.style("background-color", "lightgray");
    this.down.style("text-shadow", "1px 1px white");
    this.down.style("color", "gray");
    this.down.style("-webkit-border-radius", "7px");
    this.down.style("-moz-border-radius", "7px");
    this.down.style("-o-border-radius", "7px");
    this.down.style("border-radius", "7px");
    this.down.style("border-color", "transparent");
    this.down.style("box-shadow", "0 .1em gray");
    this.down.style("cursor", "cursor: pointer;");
    this.down.hide();

    this.right= createButton("&#8594");
    this.elements.push(this.right);
    this.right.position(137, height-70);
    this.right.style("text-align", "center");
    this.right.style("display", "inline-block");
    this.right.style("margin", "5px");
    this.right.style("font-weight", "bold");
    this.right.style("font-size", "15px");
    this.right.style("padding", "3px 4px 3px 4px");
    this.right.style("background-color", "lightgray");
    this.right.style("text-shadow", "1px 1px white");
    this.right.style("color", "gray");
    this.right.style("-webkit-border-radius", "7px");
    this.right.style("-moz-border-radius", "7px");
    this.right.style("-o-border-radius", "7px");
    this.right.style("border-radius", "7px");
    this.right.style("border-color", "transparent");
    this.right.style("box-shadow", "0 .1em gray");
    this.right.style("cursor", "cursor: pointer;");
    this.right.hide();

    this.space = createButton("");
    this.elements.push(this.space);
    this.space.position(width/2+20, height-80);
    this.space.style("text-align", "center");
    this.space.style("display", "inline-block");
    this.space.style("margin", "5px");
    this.space.style("font-weight", "bold");
    this.space.style("font-size", "30px");
    this.space.style("padding", "10px 40px");
    this.space.style("background-color", "lightgray");
    this.space.style("text-shadow", "-1px -1px black, 1px 1px white");
    this.space.style("color", "gray");
    this.space.style("-webkit-border-radius", "7px");
    this.space.style("-moz-border-radius", "7px");
    this.space.style("-o-border-radius", "7px");
    this.space.style("border-radius", "7px");
    this.space.style("border-color", "transparent");
    this.space.style("box-shadow", "0 .1em gray");
    this.space.style("cursor", "cursor: pointer;");
    this.space.hide();

    this.fireSparks = new Group();
    for(let sp=0; sp<30; ++sp)
    {
      let spark = new Sprite(random(0, width), random(0, height), 5, random(5,30));
      spark.addImage(fire);
      spark.setVelocity(random(-1,1),random(-1,1));
      this.fireSparks.add(spark);
    }
  }

  update()
  {
    Game.gamePause = true;

    this.nextShip.mouseOver(()=>{
      this.nextShip.style("width", "17px");
      this.nextShip.style("height", "17px");
      this.nextShip.style("border-width", "0 10px 10px 0");
    })
    this.nextShip.mouseOut(()=>{
      this.nextShip.style("width", "15px");
      this.nextShip.style("height", "15px");
      this.nextShip.style("border-width", "0 9px 9px 0");
    })
    this.preShip.mouseOver(()=>{
      this.preShip.style("width", "17px");
      this.preShip.style("height", "17px");
      this.preShip.style("border-width", "0 10px 10px 0");
    })
    this.preShip.mouseOut(()=>{
      this.preShip.style("width", "15px");
      this.preShip.style("height", "15px");
      this.preShip.style("border-width", "0 9px 9px 0");
    })
    this.setting.mouseOver(()=>{
      this.setting.class("fa fa-gear fa-spin");
    })
    this.setting.mouseOut(()=>{
      this.setting.class("fa fa-gear");
    })

    this.start.mouseOver(()=>{
      this.start.position(width/2-65, height-285);

      this.start.style("font-size", "35px");
    })

    this.start.mouseOut(()=>{
      this.start.position(width/2-60, height-280);
      this.start.style("font-size", "30px");
    })

    this.fireSparks.collide(this.fireSparks);
  }

  draw()
  {
    this.setting.position(width-40, 10);
    this.nextShip.position(width-50, height/2-50);
    this.preShip.position(20, height/2-50);

    this.fireSparks.draw();
    drawSprites();

    push();
    stroke(255);
    textFont(titleFont);
    textSize(55);
    text("Battle Ship", width/2-250, height/2-190);
    pop();

    push();
    textSize(12);
    stroke("grey");
    strokeWeight(2);
    fill("white");
    text("Move the Player", 190, height-60);
    text("Fire", 430, height-58);
    pop();
  }
}
// ======================================= Main menu setting ======================================= //
class MenuSetting
{
  constructor()
  {
    this.elements = [];

    this.volume = createSlider(0, 1, 0.5, 0.01);
    this.elements.push(this.volume);
    this.volume.hide();
  }

  update()
  {
    battleSong.setVolume(this.volume.value());
  }

  draw()
  {
    push();
    this.volume.position(width-240, 100);

    noStroke();
    fill("#D3D3D3");
    rect(width-350, 20, 300, 300, 20);
    fill(0, 0);
    stroke("black");
    rect(width-340, 30, 280,280, 10);
    textSize(15);
    stroke(5);
    strokeWeight(2);
    fill("white");
    text("Volume", width-300, 115);
    pop();
  }
}
// ======================================= Game Scene ======================================= //
class MainGameScene
{
  constructor()
  {
    this.id = 2;
    this.elements = [];

    this.setting = createElement("i");
    this.elements.push(this.setting);
    this.setting.class("fa fa-gear");
    this.setting.style("font-size", "30px");
    this.setting.style("color", "#D3D3D3");
    this.setting.hide();

    this.upgrade = createElement("i");
    this.elements.push(this.upgrade);
    this.upgrade.class("fa fa-arrow-up");
    this.upgrade.style("font-size", "30px");
    this.upgrade.style("color", "#D3D3D3");
    this.upgrade.style('height', '45px');
    this.upgrade.style('width', '40px');
    this.upgrade.hide();

    this.heart = createDiv();
    this.elements.push(this.heart);
    this.heart.class("fa fa-heart");
    this.heart.style("color", "red");
    this.heart.hide();
  }

  update()
  {
    this.setting.mouseOver(()=>{
      this.setting.class("fa fa-gear fa-spin");
    })
    this.setting.mouseOut(()=>{
      this.setting.class("fa fa-gear");
    })
  }

  draw()
  {
    push();
    noStroke();

    this.setting.position(width-40, 10);
    this.upgrade.position(width-40, height/2-40);

    let wave = Game.gameWave;
    stroke("black");
    fill("white");
    textSize(20);
    text("Wave  " + wave, width/2-50, height-15);
    fill("red");
    stroke("white");
    strokeWeight(1);
    this.heart.position(25, height-32);
    rect(50, height-30, Game.player.hp, 10);
    fill("yellow")
    text(Game.playerCurrency, width-70, height-15);
    pop();
  }
}
// ======================================= Game setting ======================================= //
class GameSettingMenu
{
  constructor()
  {
    this.elements = [];

    this.volume = createSlider(0, 1, 0.5, 0.01);
    this.elements.push(this.volume);
    this.volume.hide();

    this.backToMenu = createButton("Back to menu");
    this.elements.push(this.backToMenu);
    this.backToMenu.style("border", "none");
    this.backToMenu.style("background-color", "inherit");
    this.backToMenu.style("padding", "14px 28px");
    this.backToMenu.style("font-size", "16px");
    this.backToMenu.style("cursor", "pointer");
    this.backToMenu.style("display", "inline-block");
    this.backToMenu.hide();

    this.save = createButton("Save");
    this.elements.push(this.save);
    this.save.style("border", "none");
    this.save.style("background-color", "inherit");
    this.save.style("padding", "14px 28px");
    this.save.style("font-size", "16px");
    this.save.style("cursor", "pointer");
    this.save.style("display", "inline-block");
    this.save.hide();

    this.load = createButton("Load");
    this.elements.push(this.load);
    this.load.style("border", "none");
    this.load.style("background-color", "inherit");
    this.load.style("padding", "14px 28px");
    this.load.style("font-size", "16px");
    this.load.style("cursor", "pointer");
    this.load.style("display", "inline-block");
    this.load.hide();
  }

  update()
  {
    battleSong.setVolume(this.volume.value());
  }

  draw()
  {
    push();
    this.volume.position(width-240, 100);
    this.backToMenu.position(width-280, 260);
    this.save.position(width-330, 220);
    this.load.position(width-170, 220);

    noStroke();
    stroke(0);
    fill("#D3D3D3");
    stroke(0);
    rect(width-350, 20, 300, 300, 20);
    fill(0, 0);
    stroke("black");
    rect(width-340, 30, 280,280, 10);
    textSize(15);
    stroke(0);
    strokeWeight(2);
    fill("white");
    text("Volume", width-300, 115);
    pop();
  }
}
// ======================================= Upgrade menu ======================================= //
class UpgradeMenu
{
  constructor()
  {
    this.id = 2;
    this.elements = [];

    this.firerate = createButton("Upgrade");
    this.elements.push(this.firerate);
    this.firerate.style("border", "none");
    this.firerate.style("color", "grey");
    this.firerate.style("background-color", "inherit");
    this.firerate.style("padding", "14px 28px");
    this.firerate.style("font-size", "15px");
    this.firerate.style("cursor", "pointer");
    this.firerate.style("display", "inline-block");
    this.firerate.hide();

    this.firespeed = createButton("Upgrade");
    this.elements.push(this.firespeed);
    this.firespeed.style("border", "none");
    this.firespeed.style("color", "grey");
    this.firespeed.style("background-color", "inherit");
    this.firespeed.style("padding", "14px 28px");
    this.firespeed.style("font-size", "15px");
    this.firespeed.style("cursor", "pointer");
    this.firespeed.style("display", "inline-block");
    this.firespeed.hide();
  }

  update()
  {

  }

  draw()
  {
    this.firerate.position(width-180, 370);
    this.firespeed.position(width-180, 420);

    push();
    noStroke();

    fill("#D3D3D3");
    rect(width-320, 350, 250, 350, 20);
    fill(0, 0);
    stroke("black");
    rect(width-310, 360, 230, 330, 10);

    textSize(15);
    fill("black");
    text("Firerate: ", width-300, 400);
    text("FireSpeed: ", width-300, 450);
    textSize(17);
    text((Game.player.firerate / 60).toFixed(1), width-230, 400);
    text((Game.player.firespeed).toFixed(1), width-220, 450);
    stroke("gold");
    fill("black");
    textSize(20);
    strokeWeight(1);
    text("60", width-180, 400);
    text("20", width-180, 450);
    pop();
  }
}
// ======================================= Loading scene ======================================= //
class LoadingScene
{
  constructor()
  {
    this.id = 9;
    this.elements = [];
    this.done = false;
    this.duration = 0;
  }

  update()
  {
    if (!this.done)
    {
      Game.player.posy+=1*deltaTime/10;
      if (this.duration > 20*1)
      {
        this.duration = 0;
        this.done = true;
      }
      this.duration++;
    }
  }

  draw()
  {
    push();
    noStroke();

    pop();
  }
}
// ======================================= Leaderboard menu ======================================= //
class LeaderboardMenu
{
  constructor()
  {
    this.elements = [];

    this.menu = createButton("Back to Menu");
    this.elements.push(this.menu);
    this.menu.position(width/2-100, height-65);
    this.menu.style("text-align", "center");
    this.menu.style("display", "inline-block");
    this.menu.style("margin", "5px");
    this.menu.style("font-weight", "bold");
    this.menu.style("font-size", "20px");
    this.menu.style("padding", "5px 10px 5px 10px");
    this.menu.style("background-color", "lightgray");
    this.menu.style("text-shadow", "-1px -1px black, 1px 1px white");
    this.menu.style("color", "gray");
    this.menu.style("-webkit-border-radius", "7px");
    this.menu.style("-moz-border-radius", "7px");
    this.menu.style("-o-border-radius", "7px");
    this.menu.style("border-radius", "7px");
    this.menu.style("border-color", "transparent");
    this.menu.style("box-shadow", "0 .1em gray");
    this.menu.style("cursor", "cursor: pointer;");
    this.menu.hide();
  }

  update()
  {
    this.menu.mouseOver(()=>{
      this.menu.position(width/2-101, height-66);

      this.menu.style("font-size", "21px");
    })

    this.menu.mouseOut(()=>{
      this.menu.position(width/2-100, height-65);
      this.menu.style("font-size", "20px");
    })
  }

  draw()
  {
    background(bg);
    textSize(30);
    textFont(titleFont);
    stroke(255);

    text("LeaderBoard", width/2-170, 100);
    textSize(20);
    fill("black");
    text("Score:", 130, 200);
    text("Heighest Score:", 130, 280);
    noStroke();
    fill("red");
    text(Game.defeatEnemeyCount, 300, 200);
    text(score[0], 430, 280);
  }
}
// ==================================================== main program ==================================================== //
// ====================================================================================================================== //
let bg;
let titleFont;
let game;
let battleSong, battleSong1, battleSong2;
let menuSelect, zipclick, startclick;
let playerShoot, enShoot, explodeSound, deathSound;
let ship, ship1, ship2;
let plane, enShip;
let waterRipple;
let fire, explodeResized, explodeSheet, explodeAnimation;
let score;
function preload()
{
  bg = loadImage("./texture/water4.png", img=>{ img.resize(width,height); });
  fire = loadImage("./texture/fire1.png", img=>{ img.resize(8, 8); });
  ship = loadImage("./texture/ship_large_body.png", img=>{ img.resize(img.width/2, img.height/2); });
  ship1 = loadImage("./texture/ship_large_body1.png", img=>{ img.resize(img.width/2, img.height/2); });
  ship2 = loadImage("./texture/ship_large_body2.png", img=>{ img.resize(img.width/2, img.height/2); });
  titleFont = loadFont("./font/Quarterback-6YrgD.otf");
  battleSong = loadSound("./sounds/bassline_SpringEdit1DX7BASS.ogg");
  battleSong1 = loadSound("./sounds/BattleInTheWinter.mp3");
  battleSong2 = loadSound("./sounds/FinalBossBattle6V1.WAV");
  menuSelect = loadSound("./sounds/MenuSelectionClick.wav");
  zipclick = loadSound("./sounds/zipclick.flac");
  startclick = loadSound("./sounds/interface/click.ogg");
  playerShoot = loadSound("./sounds/playerShoot.ogg");
  enShoot = loadSound("./sounds/enShoot.ogg");
  explodeSound = loadSound("./sounds/explosionFlash.ogg");
  deathSound = loadSound("./sounds/death.ogg");
  score = loadStrings("./score.txt");
  waterRipple = loadAnimation("texture/water_ripple_big_000.png",
                              "texture/water_ripple_big_001.png",
                              "texture/water_ripple_big_002.png",
                              "texture/water_ripple_big_003.png",
                              "texture/water_ripple_big_004.png");
  plane = loadImage("./texture/plane.png", img=>{ img.resize(img.width/9, img.height/9); });
  enShip = loadImage("./texture/enship.png", img=>{ img.resize(img.width/9, img.height/9); });
  explodeSheet = loadSpriteSheet("texture/explode.png", 240, 240, 48);
  explodeAnimation = loadAnimation(explodeSheet);
}

function setup()
{
  createCanvas(width, height);
  angleMode(DEGREES);

  for (let w of waterRipple.images)
    w.resize(w.width/2, w.height/2);

  game = new Game();
}

function draw()
{
  if (battleSong.isPlaying() == false)
    battleSong.play();

  zipclick.setVolume(1);
  game.events();
  game.update();
  game.draw();
}
