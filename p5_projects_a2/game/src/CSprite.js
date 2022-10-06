const width = 600, height = 800;

// ======================================= Custom sprite ======================================= //
class CSprite
{
  constructor(posx, posy, width, height, type="n")
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
    this.type = type;
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
    switch (this.type)
    {
      case "player":
        // this.dps = 10;
        // if (this.c)
        //   this.st = [0, 0, 255];
        // else
        //   this.st = [255, 0, 0];
        // this.c = false;
        //
        // if (this.onCooldown)
        //   this.cooldown--;
        // if (this.cooldown < 0)
        // {
        //   this.cooldown = this.firerate;
        //   this.onCooldown = false;
        // }

        break;
      case "en1":
        this.maxLife = 850;
        this.life++;
        this.posy++;
        break;
      case "pb":
        // this.maxLife = 200;
        // this.life++;
        // this.posy-=3*deltaTime/10;
        break;
    }
  }

  deCooldown(value=10)
  {
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

  draw()
  {
    push();
    rectMode(CENTER);
    translate(this.posx, this.posy);
    rotate(this.rotation);
    this.playerSkin();
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
        noStroke();
        fill("black");

        rect(0, 0, this.width, this.height, 20);
        break;
      case 1:
        noStroke();
        fill("white");
        rect(0, 0, this.width, this.height, 20);
        break;
      case 2:
        noStroke();
        fill("grey");
        rect(0, 0, this.width, this.height, 20);
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
    this.hit = false;
    this.bulletType = bulletType;
    this.dir = Game.player.rotation+90;
  }

  update()
  {
    switch (this.bulletType)
    {
      case "enb1":

        break;
      case "pb1":
        this.speed = 2;
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

    fill(215, 0, 200);
    // stroke(...this.st);
    strokeWeight(1);
    rect(0, 0, this.width, this.height);
    switch (this.bulleteType)
    {
      case "enb1":

        break;
      case "pb1":
        rect(0, 0, this.width, this.height);

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
    this.enemyType = enemyType;
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
    }
  }

  draw()
  {
    push();
    rectMode(CENTER);
    translate(this.posx, this.posy);
    rotate(this.dir);

    fill(215, 0, 200);
    // stroke(...this.st);
    strokeWeight(1);
    rect(0, 0, this.width, this.height);

    switch (this.enemyType)
    {
      case "en1":

        break;
    }

    pop();
  }
}
