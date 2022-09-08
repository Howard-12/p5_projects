const labels = ["Comedy", "Action", "Romance", "Drama", "Scifi"];
const count = [4, 5, 6, 1, 4];
const color = [];
let pre = 0;
const width = 800;
const height = 600;

const pieDiameter = 300;

function setup() {
  createCanvas(width, height);
  for (let i = 0; i < count.length; ++i)
      color.push([random(20, 255), random(20, 255), random(20, 255)]);
  noStroke();
  noLoop();
}

function draw() {
  background(255);

  // draw pie chart
  drawPiechart();
}

function drawPiechart() {
  let sum = 0;
  for (let i = 0; i < count.length; ++i)
    sum += count[i];
  // ------ draw pie chart ------ //
  for (let i = 0; i < count.length; ++i) {
    let degree = map(count[i]/sum, 0, 1, 0, 360);
    let radian = degree * PI / 180;

    fill(color[i][0], color[i][1], color[i][2]);
    arc(width/2 , height/2, pieDiameter, pieDiameter, pre, pre + radian);

    textStyle(BOLD);
    textSize(20);
    textAlign(CENTER);
    const data = labels[i] + "\n" + floor((count[i]/sum*100)) + "%";
    textLeading(30);
    text(data,
        cos(pre + radian/2) * pieDiameter/1.5 + (width/2),
        sin(pre + radian/2) * pieDiameter/1.5 + (height/2));

    textSize(12);
    rect(20, i*35 + 10, 20, 20);
    textAlign(LEFT);

    fill(0);
    const legend = labels[i] + " (count: " + count[i] + ")";
    text(legend, 50, i*35 + 25);

    pre += radian;
  }
}
