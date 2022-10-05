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
    this.start.style("width", "70px");
    this.start.style("height", "30px");
    this.start.hide();

    this.title = createDiv();
  }

  update()
  {
    Game.gamePause = true;

    // this.nextShip.mousePressed(()=>{
    // })
    //
    // this.preShip.mousePressed(()=>{
    //   zipclick.play();
    // })

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
  }

  draw()
  {
    this.setting.position(width-40, 10);
    this.nextShip.position(width-50, height/2-50);
    this.preShip.position(20, height/2-50);
    this.start.position(width/2-45, height-280);

    push();
    stroke(255);
    textFont(titleFont);
    textSize(55);
    text("Battle Ship", width/2-250, height/2-190);
    pop();
  }
}

class MainGameScene
{
  constructor()
  {
    this.id = 2;
    // this.toggle = true;
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

    textSize(20);
    fill("red");
    this.heart.position(25, height-32);
    rect(50, height-30, Game.player.hp, 10);
    // if (Game.player.hp != 0)
    //   Game.player.hp--;
    pop();
  }
}

class SettingMenu
{
  constructor()
  {
    this.elements = [];

    this.backToMenu = createButton("Back to menu");
    this.elements.push(this.backToMenu);
    this.backToMenu.hide();

    this.save = createButton("Save");
    this.elements.push(this.save);
    this.save.hide();

    this.load = createButton("Load");
    this.elements.push(this.load);
    this.load.hide();
  }

  update()
  {

  }

  draw()
  {
    push();
    this.backToMenu.position(width-250, 270);
    this.save.position(width-300, 220);
    this.load.position(width-140, 220);

    noStroke();
    rect(width-350, 20, 300, 300, 20);
    pop();
  }
}

class UpgradeMenu
{
  constructor()
  {
    this.id = 2;
    this.elements = [];

    this.firerate = createButton("Upgrade");
    this.firerate.hide();
    this.elements.push(this.firerate);
  }

  update()
  {

  }

  draw()
  {
    this.firerate.show();
    this.firerate.position(width-230, 370);
    push();
    noStroke();

    fill("grey");
    rect(width-320, 350, 250, 350, 20);
    pop();
  }
}

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
      Game.player.width-=.095*deltaTime/10;
      Game.player.height-=.203*deltaTime/10;
      // if (this.duration > 60*3)
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
