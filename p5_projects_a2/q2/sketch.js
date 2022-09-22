const width = 720;
const height = 720;

let tspFile;
let tspSolFile;
let headers;
let cities;

let fileMatches = false;

let x = 0;
let y = 0;
let t = 0;
let step = 0;
let trails = [];

function preload()
{
  tspFile = loadStrings("TSP_EUC_Problems/a280.tsp");
  tspSolFile = loadStrings("TSP_Solutions/a280.sol");
}


function setup()
{
  createCanvas(width, height);

  // ------ process tsp header------ //
  headers = loadTSPHeaders(tspFile);
  // ------ process tsp city ------ //
  cities = loadTSP(tspFile);
  // ------ check file match ------ //
  if (headers[0][1].trim() == tspSolFile[0])
    fileMatches = true;
}

function draw()
{
  background(255);
  translate(20, 20);

  if (fileMatches)
  {
    showLoadedTEP();
    showSolution();
  }
  else
  {
    textSize(30);
    text("Please check file match!!", width/2-200, height/2-20);
  }
}


function loadTSPHeaders(tsp)
{
  let tspHeaders = [];
  let node = tspFile.indexOf("NODE_COORD_SECTION")+2;
  for (let header=0; header<node-1; ++header)
    tspHeaders.push(tsp[header].trim().split(":"));

  return tspHeaders;
}

function loadTSP(tsp)
{
  let tspCities = [];
  let node = tsp.indexOf("NODE_COORD_SECTION")+2;
  for (let city=0; city<tsp.length-node; ++city)
  {
    let c = [];

    if (tsp[city+node-1].trim().split(" ")[0] == "EOF")
      break;

    for (fc of tsp[city+node-1].trim().split(" "))
      fc!='' ? c.push(parseInt(fc)) : undefined;

    tspCities.push(c);
  }
  // console.log(tspCities);

  let minX = 0, minY = 0, maxX = 0, maxY = 0;
  let minXs =[], minYs = [], maxXs = [], maxYs = [];

  for (let i=0; i<tspCities.length; ++i)
  {
    minXs.push(tspCities[i][1]);
    minYs.push(tspCities[i][2]);
    maxXs.push(tspCities[i][1]);
    maxYs.push(tspCities[i][2]);
    minX = Math.min(...minXs);
    minY = Math.min(...minYs);
    maxX = Math.max(...maxXs);
    maxY = Math.max(...maxYs);
  }

  for (let city=0; city<tspCities.length; ++city)
  {
    tspCities[city][1] = map(tspCities[city][1], minX, maxX, 25, width-40);
    tspCities[city][2] = map(tspCities[city][2], minY, maxY, 25, height-40);
  }

  return tspCities;
}

function showLoadedTEP()
{
  for (city of cities)
    circle(city[1], city[2], 3);

  textSize(15);
  for (header of headers) {
    header[0].trim() == "COMMENT" ? text(header[1], -17, -1) : undefined;
    header[0].trim() == "DIMENSION" ? text(header[1], -17, 15) : undefined;
  }
}

function showSolution()
{
  if (t<1)
  {
    x = lerp(cities[tspSolFile[step+2]-1][1], cities[tspSolFile[step+3]-1][1], t);
    y = lerp(cities[tspSolFile[step+2]-1][2], cities[tspSolFile[step+3]-1][2], t);

    for (trail of trails)
      line(trail[0], trail[1], trail[2], trail[3]);
    line(cities[tspSolFile[step+2]-1][1], cities[tspSolFile[step+2]-1][2], x, y);
    t+=0.09;
  }
  else if (step < cities.length-2)
  {
    trails.push([cities[tspSolFile[step+2]-1][1], cities[tspSolFile[step+2]-1][2], x, y]);
    ++step;
    t=0;
  }

  line(cities[tspSolFile[step+2]-1][1], cities[tspSolFile[step+2]-1][2], x, y);
  for (trail of trails)
    line(trail[0], trail[1], trail[2], trail[3]);

  push();
  fill(255,0,0);
  circle(x, y, 6);
  pop();
}
