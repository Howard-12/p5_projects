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



let returnToFirst = false;
let s = false;
let drawLine = true;

function preload()
{
  tspFile = loadStrings("TSP_EUC_Problems/berlin52.tsp");
  tspSolFile = loadStrings("TSP_Solutions/berlin52.sol");
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

  showLoadedTEP();
  showSolution();

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

let end = false;
function showSolution()
{
  if (fileMatches)
  {
if (!end) {
    if (t<1)
    {
      // x = lerp(cities[tspSolFile[step+2]-1][1], cities[tspSolFile[step+3]-1][1], t);
      // y = lerp(cities[tspSolFile[step+2]-1][2], cities[tspSolFile[step+3]-1][2], t);
      // console.log(cities[tspSolFile[2]-1][1]);

      // for (trail of trails)
      //   line(trail[0], trail[1], trail[2], trail[3]);
      // console.log(tspSolFile[cities.length], step, x);



      // if (returnToFirst && trails.length < cities.length+1)
      // {
      //   x = lerp(cities[tspSolFile[cities.length+1]-1][1], cities[tspSolFile[2]-1][1], t);
      //   y = lerp(cities[tspSolFile[cities.length+1]-1][2], cities[tspSolFile[2]-1][2], t);
      //   //line(cities[tspSolFile[cities.length+1]-1][1], cities[tspSolFile[cities.length+1]-1][2], x, y);
      //   //console.log(returnToFirst);
      // }
      // else
      // {
        x = lerp(cities[tspSolFile[step+2]-1][1], cities[tspSolFile[step+3]-1][1], t);
        y = lerp(cities[tspSolFile[step+2]-1][2], cities[tspSolFile[step+3]-1][2], t);
        line(cities[tspSolFile[step+2]-1][1], cities[tspSolFile[step+2]-1][2], x, y);

      // }

      //print(step);
      t+=0.05*deltaTime/10;
    }
    else if (step < cities.length-2)
    {
      if (!repeat) {
        trails.push([cities[tspSolFile[step+2]-1][1], cities[tspSolFile[step+2]-1][2], cities[tspSolFile[step+3]-1][1], cities[tspSolFile[step+3]-1][2]]);
      }
      //print(trails.length)

      ++step;
      t=0;
    }

    // else if (returnToFirst == true && t < 1)
    // {
    //   step = 0;
    //   print("strue");
    //   s = false;
    // }
    else
    {
      repeat = true;
      t = 0;
      step = 0;
      returnToFirst = true;
      re = true;
      end = true;
      print(trails.length,cities.length+1, returnToFirst);
      if (re == true && trails.length < cities.length-1)
      {
        trails.push([cities[tspSolFile[cities.length]-1][1], cities[tspSolFile[cities.length]-1][2], cities[tspSolFile[cities.length+1]-1][1], cities[tspSolFile[cities.length+1]-1][2]]);
        re = false;
        print("dasdasdasdas");
      }
//---------------------------
      // if (returnToFirst == true && trails.length == cities.length-1)
      // {
      //   trails.push([cities[tspSolFile[cities.length+1]-1][1], cities[tspSolFile[cities.length+1]-1][2], cities[tspSolFile[2]-1][1], cities[tspSolFile[2]-1][2]])
      //   returnToFirst = false;
      //   print("eoirupweurhfriuwebr8ivw")
      //   drawLine = false;
      // }
      // if (trails.length == cities.length)
      // {
      //   returnToFirst = true;
      //   print("what?")
      // }
// ----------------------------
      // else if (trails.length < cities.length){
      //   returnToFirst = true;
      //   print("rt")
      // }
      print(trails.length,cities.length+1, returnToFirst);
    }

    // print(trails.length,cities.length-2, returnToFirst);
    // if(trails.length == cities.length-2)
    // {
    //   repeat = true;
    //   re = true;
    //   if (re == true && trails.length < cities.length-1)
    //   {
    //     trails.push([cities[tspSolFile[cities.length]-1][1], cities[tspSolFile[cities.length]-1][2], cities[tspSolFile[cities.length+1]-1][1], cities[tspSolFile[cities.length+1]-1][2]]);
    //     // post operation
    //     // returnToFirst = false;
    //     re = false;
    //
    //     print("dasdasdasdas");
    //     s = true;
    //   }
    // }
    // print(trails.length,cities.length-2, returnToFirst);

    // if(trails.length > cities.length-2)
    // {
    // }
}
else
{
  if (t<1)
  {
    if (returnToFirst && trails.length < cities.length+1)
    {
      x = lerp(cities[tspSolFile[cities.length+1]-1][1], cities[tspSolFile[2]-1][1], t);
      y = lerp(cities[tspSolFile[cities.length+1]-1][2], cities[tspSolFile[2]-1][2], t);
      line(cities[tspSolFile[cities.length+1]-1][1], cities[tspSolFile[cities.length+1]-1][2], x, y);

    }
    t+=0.05*deltaTime/10;
  }
  else if (trails.length == cities.length-1)
  {
    trails.push([cities[tspSolFile[cities.length+1]-1][1], cities[tspSolFile[cities.length+1]-1][2], cities[tspSolFile[2]-1][1], cities[tspSolFile[2]-1][2]])
  }
  else
  {
    end = false;
    t=0;
  }
}

    // if (drawLine)
    //   line(cities[tspSolFile[step+2]-1][1], cities[tspSolFile[step+2]-1][2], x, y);

    for (trail of trails)
      line(trail[0], trail[1], trail[2], trail[3]);

    push();
    fill(255,0,0);
    circle(x, y, 6);
    pop();
  }
  else
  {
    textSize(30);
    text("Please check file match!!", width/2-200, height/2-20);
  }
}
