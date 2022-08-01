const width = 900;
const height = 500;

let firstCurve = true;
const maxCurvePoint = 50;

function setup() {
  createCanvas(width, height);
  frameRate(1);
  noStroke();
  // noLoop();
}

function draw() {
  background(200);

  let initFirstPoint = createVector(-30, height);
  let initEndPoint = createVector(width+30, height);

  let preCurveFirstPoint = createVector(0, 0);
  let preCurveEndPoint = createVector(0, 0);

  let prePattern = [];
  let totalVGap = 0;

  let ranPointNum = floor(random(20, maxCurvePoint));
  if (ranPointNum % 2 == 1) {
    ranPointNum ++;
  }
  for (let r=0; r<ranPointNum; r++) {
    let initV = createVector(0,0);
    prePattern.push(initV);
  }
  // ============================= Start Drawing ============================= //
  for (let c=0; c<70; c++) {

    let vGap = random(0, 30);
    let hGap = random(-5, 10);

    totalVGap += vGap;

    let firstCurvePoint = createVector(initFirstPoint.x, initFirstPoint.y + totalVGap);
    let endCurvePoint = createVector(initEndPoint.x + hGap, initEndPoint.y + totalVGap);
    console.log("firstCurvePoint: " + firstCurvePoint);
    console.log("endCurvePoint: " + endCurvePoint);

    push();
    translate(0,-500);
    stroke(random(10, 255), random(10, 255), random(10, 255));
    strokeWeight(5);
    noStroke();//
    point(firstCurvePoint.x, firstCurvePoint.y);
    pointBuffer = [];
    prePoint = createVector(0, 0);
    for (let p=0; p<ranPointNum; p++) {
      let tP;
      if (c==0) {
        if (p % 2 == 1 && p != 0) {
          tP = createVector(random(prePoint.x + 70, prePoint.x + 90),
                            random(prePoint.y - 15, prePoint.y + 15));
        }
        else {
          tP = createVector(random(prePoint.x + 60, prePoint.x + 70),
                            random(endCurvePoint.y));
        }
      }
      else {
        if (p % 2 == 1 && p != 0) {
          tP = createVector(random(prePattern[p].x - 10, prePattern[p].x + 10),
          random(prePattern[p].y + 10, prePattern[p].y + 20));
        }
        else {
          tP = createVector(random(prePattern[p].x -10, prePattern[p].x + 10),
          random(prePattern[p].y + 15, prePattern[p].y + 20));
        }
      }

      pointBuffer.push(tP);
      point(tP.x, tP.y);
      prePoint = tP;
    }
    console.log("pointBuffer: " + pointBuffer);
    console.log("pointBuffer length: " + pointBuffer.length);
    point(endCurvePoint.x, endCurvePoint.y + preCurveEndPoint.y);

    // strokeWeight(1);
    // noFill();
    noStroke();
    fill(random(10, 255), random(10, 255), random(10, 255));
    beginShape();
    // curveVertex(firstCurvePoint.x, firstCurvePoint.y + preCurveFirstPoint.y);
    curveVertex(firstCurvePoint.x, firstCurvePoint.y);
    curveVertex(firstCurvePoint.x, firstCurvePoint.y);
    for (let curve=0; curve<ranPointNum; curve++) {
      curveVertex(pointBuffer[curve].x, pointBuffer[curve].y);//
    }
    curveVertex(endCurvePoint.x, endCurvePoint.y + preCurveEndPoint.y);//
    curveVertex(endCurvePoint.x, endCurvePoint.y + preCurveEndPoint.y);//
    endShape();
    pop();

    preCurveFirstPoint = firstCurvePoint;
    preCurveEndPoint = endCurvePoint;
    prePattern = pointBuffer;
  }
}
