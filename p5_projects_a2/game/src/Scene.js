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
      if (this.duration > 60*3)
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
