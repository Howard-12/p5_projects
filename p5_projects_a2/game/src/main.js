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
