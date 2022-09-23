const width = 720;
const height = 720;

let tspFile;
let tspSolFile;
let headers;
let cities;

let fileMatches = false;
let repeat = false;
let re = false;

let x = 0;
let y = 0;
let t = 0;
let step = 0;
let trails = [];

let fromCity, targetCity;
let tm = 0;

function preload() {
  tspFile = loadStrings("TSP_EUC_Problems/berlin52.tsp");
  tspSolFile = loadStrings("TSP_Solutions/berlin52.sol");
}

function setup() {
  createCanvas(width, height);

  // ------ process tsp header------ //
  headers = loadTSPHeaders(tspFile);
  // ------ process tsp city ------ //
  cities = loadTSP(tspFile);
  // ------ check file match ------ //
  console.log(cities);
  if (headers[0][1].trim() == tspSolFile[0]) fileMatches = true;

  (fromCity = tspSolFile[2]), (targetCity = tspSolFile[3]);
}

function draw() {
  background(255);
  translate(20, 20);

  showLoadedTEP();
  showSolution();
}

function loadTSPHeaders(tsp) {
  let tspHeaders = [];
  let node = tspFile.indexOf("NODE_COORD_SECTION") + 2;
  for (let header = 0; header < node - 1; ++header)
    tspHeaders.push(tsp[header].trim().split(":"));

  return tspHeaders;
}

function loadTSP(tsp) {
  let tspCities = [];
  let node = tsp.indexOf("NODE_COORD_SECTION") + 2;
  for (let city = 0; city < tsp.length - node; ++city) {
    let c = [];

    if (tsp[city + node - 1].trim().split(" ")[0] == "EOF") break;

    for (fc of tsp[city + node - 1].trim().split(" "))
      fc != "" ? c.push(parseInt(fc)) : undefined;

    tspCities.push(c);
  }
  // console.log(tspCities);

  let minX = 0,
    minY = 0,
    maxX = 0,
    maxY = 0;
  let minXs = [],
    minYs = [],
    maxXs = [],
    maxYs = [];

  for (let i = 0; i < tspCities.length; ++i) {
    minXs.push(tspCities[i][1]);
    minYs.push(tspCities[i][2]);
    maxXs.push(tspCities[i][1]);
    maxYs.push(tspCities[i][2]);
    minX = Math.min(...minXs);
    minY = Math.min(...minYs);
    maxX = Math.max(...maxXs);
    maxY = Math.max(...maxYs);
  }

  for (let city = 0; city < tspCities.length; ++city) {
    tspCities[city][1] = map(tspCities[city][1], minX, maxX, 25, width - 40);
    tspCities[city][2] = map(tspCities[city][2], minY, maxY, 25, height - 40);
  }

  return tspCities;
}

function showLoadedTEP() {
  for (city of cities) circle(city[1], city[2], 3);

  textSize(15);
  for (header of headers) {
    header[0].trim() == "COMMENT" ? text(header[1], -17, -1) : undefined;
    header[0].trim() == "DIMENSION" ? text(header[1], -17, 15) : undefined;
  }
}

let returnToFirst = false;
function getDotPoint(ct1, ct2, t) {
  return [
    lerp(cities[ct1 - 1][1], cities[ct2 - 1][1], t),
    lerp(cities[ct1 - 1][2], cities[ct2 - 1][2], t),
  ];
}
function getCityPoint(ct) {
  return [cities[ct - 1][1], cities[ct - 1][2]];
}

function drawLineAndDot(ct1, ct2, t) {
  const [x0, y0] = getCityPoint(ct1);
  const [x1, y1] = getDotPoint(ct1, ct2, t);
  line(x0, y0, x1, y1);
  push();
  fill(255, 0, 0);
  circle(x1, y1, 6);
  pop();
}
function tryRegistTrack(ct1, ct2) {
  if (trails.length < cities.length) {
    trails.push([
      cities[ct1 - 1][1],
      cities[ct1 - 1][2],
      cities[ct2 - 1][1],
      cities[ct2 - 1][2],
    ]);
  }
}

function showSolution() {
  if (!fileMatches) {
    textSize(30);
    text("Please check file match!!", width / 2 - 200, height / 2 - 20);
    return;
  }

  drawLineAndDot(fromCity, targetCity, tm);
  tm += 0.1 * (deltaTime / 10);

  if (tm > 1) {
    tryRegistTrack(fromCity, targetCity);
    step = (step + 1) % cities.length;
    fromCity = tspSolFile[step + 2];
    targetCity = tspSolFile[((step + 1) % cities.length) + 2];
    tm = 0;
  }

  for (trail of trails) line(trail[0], trail[1], trail[2], trail[3]);
}
