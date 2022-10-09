const width = 600, height = 800;

// ======================================= Custom sprite ======================================= //
class CSprite
{
  constructor(posx, posy, width, height)
  // constructor(posx, posy, width, height)
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
    // this.st = [255, 0, 0];
    this.c = false;
    this.dps = 0;
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
    // stroke(...this.st);
    strokeWeight(1);
    // circle(this.getVertices()[0]-this.posx, this.getVertices()[1]-this.posy, 5);
    // circle(this.getVertices()[2]-this.posx, this.getVertices()[3]-this.posy, 5);
    // circle(this.getVertices()[4]-this.posx, this.getVertices()[5]-this.posy, 5);
    // circle(this.getVertices()[6]-this.posx, this.getVertices()[7]-this.posy, 5);

    switch (this.type)
    {
      case "en1":
        rect(0, 0, this.width, this.height);
        break;
      case "pb":
        // rect(0, 0, this.width, this.height);
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
    this.dps = 10;
    // if (this.c)
    //   this.st = [0, 0, 255];
    // else
    //   this.st = [255, 0, 0];
    // this.c = false;


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

    // fill(215, 0, 200);
    // rect(0, 0, this.width, this.height);
    // stroke(...this.st);
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

    // stroke(...this.st);
    // strokeWeight(1);

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
