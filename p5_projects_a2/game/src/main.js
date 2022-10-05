
let bg;
let titleFont;
let game;
let battleSong;
let battleSong1;
let battleSong2;
let menuSelect;
let zipclick;
let playerTexture;

function preload()
{
  bg = loadImage("./texture/water4.png", img=>{
    img.resize(width,height);
  });
  // playerTexture = loadImage("./texture/ship_large_body.png", img=>{
  //   img.resize(img.width/1.7, img.height/1.7);
  //   // img.
  // });
  titleFont = loadFont("./font/Quarterback-6YrgD.otf");
  battleSong = loadSound("./sounds/bassline_SpringEdit1DX7BASS.ogg");
  battleSong1 = loadSound("./sounds/BattleInTheWinter.mp3");
  battleSong2 = loadSound("./sounds/FinalBossBattle6V1.WAV");
  menuSelect = loadSound("./sounds/MenuSelectionClick.wav");
  zipclick = loadSound("./sounds/zipclick.flac");
}

function setup()
{
  createCanvas(width, height);
  angleMode(DEGREES);

  game = new Game();
}
let diir = 0;
let an = 0;
function draw()
{
  if (battleSong.isPlaying() == false)
    battleSong.play();

  battleSong.setVolume(0.5);
  zipclick.setVolume(1);
  game.events();
  game.update();
  game.draw();

// push()
//   translate(width/2, height/2);
//   fill("blue");
//   rect(0, 0, 50, 50);
//   fill("red");
//   // rect(cos(diir*PI/180)*100, -sin(diir*PI/180)*100, 50, 50);
//   rect(50*cos(diir), 50*-sin(diir), 50, 50);
//   // fill("red");
//   // rect(cos(90*PI/180)*100, -sin(0*PI/180)*100, 40, 40);
//   // fill("red");
//   // rect(cos(180*PI/180)*100, -sin(0*PI/180)*100, 30, 30);
//   pop()
// diir++;
// an++;
}
