class MainMenu
{

  constructor()
  {
    this.id = 1;
    this.fade = false;
    this.b1 = createButton("Pause");
    this.b1.hide();
  }

  update()
  {

  }

  draw()
  {
    this.b1.show();
    this.b1.position(10, 150);

  }

}

class MainGameScene
{

  constructor()
  {
    this.id = 2;
    this.start = false;
    this.b2 = createButton("scene1-r");
    this.b2.hide();
  }

  update()
  {

  }

  draw()
  {
    // background(255, 255, 0);

    this.b2.show();
    this.b2.position(10, 200);
    fill("yellow");
    circle(100, 100, 10);
  }

}
