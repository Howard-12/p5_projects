const width = 900;
const height = 500;

const maxCurvePoint = 50;

function setup() {
  createCanvas(width, height);
  frameRate(1); // update every second
  noStroke();
  // noLoop();
}

function draw() {
  background(200);

  // ============================= initial declaration/setup ============================= //
  let initFirscPoint = createVector(-40, height);
  let initEndPoint = createVector(width+40, height);

  let preCurveFirscPoint = createVector(0, 0);
  let preCurveEndPoint = createVector(0, 0);

  let prePattern = [];                                  // privious curve
  let totalVGap = 0;                                    // gap of the first point of every curve

  let ranPointNum = floor(random(20, maxCurvePoint));   // random numbers of points
  if (ranPointNum % 2 == 1)
    ranPointNum ++;

  for (let r=0; r<ranPointNum; r++) {
    let initV = createVector(0,0);
    prePattern.push(initV);
  }
  // ============================= Draw Curves ============================= //
  for (let c=0; c<80; c++) {

    let vGap = random(0, 30);
    let hGap = random(-5, 10);

    totalVGap += vGap;

    let firstCurvePoint = createVector(initFirscPoint.x, initFirscPoint.y + totalVGap);
    let endCurvePoint = createVector(initEndPoint.x + hGap, initEndPoint.y + totalVGap);

    push();
    translate(0,-550);
    // ------ Draw Points ------ //
    pointBuffer = [];                   // the current curve
    prePoint = createVector(0, 0);
    for (let p=0; p<ranPointNum; p++) {
      let cP;                           // curve point
      if (c==0) {                       // draw first curve
        if (p % 2 == 1 && p != 0)
          cP = createVector(random(prePoint.x + 70, prePoint.x + 90),
                            random(prePoint.y - 15, prePoint.y + 15));    // draw odd number point
        cP = createVector(random(prePoint.x + 60, prePoint.x + 70),
                          random(endCurvePoint.y));                       // draw even number point
      }
      else {
        if (p % 2 == 1 && p != 0)       // draw the rest of the curves
          cP = createVector(random(prePattern[p].x - 10, prePattern[p].x + 10),
                            random(prePattern[p].y + 10, prePattern[p].y + 20));
        cP = createVector(random(prePattern[p].x -10, prePattern[p].x + 10),
                          random(prePattern[p].y + 15, prePattern[p].y + 20));

      }
      pointBuffer.push(cP);
      prePoint = cP;
    }
    // ------ Draw Vertexs ------ //
    noStroke();
    fill(random(10, 255), random(10, 255), random(10, 255));
    beginShape();
    curveVertex(firstCurvePoint.x, firstCurvePoint.y);
    curveVertex(firstCurvePoint.x, firstCurvePoint.y);
    for (let curve=0; curve<ranPointNum; curve++)
      curveVertex(pointBuffer[curve].x, pointBuffer[curve].y);
    curveVertex(endCurvePoint.x, endCurvePoint.y + preCurveEndPoint.y);
    curveVertex(endCurvePoint.x, endCurvePoint.y + preCurveEndPoint.y);
    endShape();
    pop();

    // --- Set current curve to privious curve --- //
    preCurveFirscPoint = firstCurvePoint;
    preCurveEndPoint = endCurvePoint;
    prePattern = pointBuffer;
  }
}
