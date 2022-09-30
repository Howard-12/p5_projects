const width = 600, height = 800;

class CSprite
{
  constructor(posx, posy, width, height, type)
  {
    this.posx = posx;
    this.posy = posy;
    this.width = width;
    this.height = height;
    this.rotation = 0;
    this.speed = 0;
    this.life = 0;
    this.vertices = [];
    this.type = type;
    this.maxLife;
    this.st = [255, 0, 0];
    this.c = false;
  }

  update()
  {
    switch (this.type)
    {
      case "player":
        if (this.c)
          this.st = [0, 0, 255];
        else
          this.st = [255, 0, 0];
        this.c = false;

        break;
      case "en1":
        this.maxLife = 500;
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
    rotate(this.rotation);
    // rotate(this.rotation*PI/180);

    fill(215, 0, 200);
    stroke(...this.st);
    strokeWeight(1);
    rect(0, 0, this.width, this.height);
    pop();
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
      (this.width/2)*Math.cos(this.rotation*PI/180) - (-this.height/2)*Math.sin(this.rotation*PI/180) + this.posx,
      (this.width/2)*Math.sin(this.rotation*PI/180) + (-this.height/2)*Math.cos(this.rotation*PI/180) + this.posy,
      (this.width/2)*Math.cos(this.rotation*PI/180) - (this.height/2)*Math.sin(this.rotation*PI/180) + this.posx,
      (this.width/2)*Math.sin(this.rotation*PI/180) + (this.height/2)*Math.cos(this.rotation*PI/180) + this.posy,
      (-this.width/2)*Math.cos(this.rotation*PI/180) - (this.height/2)*Math.sin(this.rotation*PI/180) + this.posx,
      (-this.width/2)*Math.sin(this.rotation*PI/180) + (this.height/2)*Math.cos(this.rotation*PI/180) + this.posy,
    ]
  }
 }
