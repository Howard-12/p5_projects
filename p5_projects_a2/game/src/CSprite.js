const width = 600, height = 800;

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
    this.vertices = [];
  }

  update()
  {
    // print();
    // print(mouseX, mouseY)
  }

  draw()
  {
    push();
    rectMode(CENTER);
    // translate(width/2, height/2);
    translate(this.posx, this.posy);

    rotate(this.rotation);

    fill(215, 0, 200);
    rect(0, 0, 30, 60);
    pop();
  }

  addSpeed(xSpeed, ySpeed)
  {
    this.posx += xSpeed;
    // translate(xSpeed, ySpeed);
  }
}
