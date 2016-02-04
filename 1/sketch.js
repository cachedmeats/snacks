var w = 255,
  h = 255;

var osc;
var playing = false;

function setup() {
  createCanvas(w, h);
  osc = new p5.Oscillator();
  osc.setType('triangle');
  osc.freq(240);
  osc.amp(1);
  osc.start();
}

var r, g, b;

function draw() {
  for (var i = 0; i < w; i++) {
    for (var k = 0; k < h; k++) {
      var rand = getRandomInt(1, 100),
        randLength = getRandomInt(1, w),
        halfRand = Math.floor(rand / 3);

      r = getRandomInt(0, 255);

      if (halfRand == 3) {
        noStroke();
        fill(r, g, b);
        rect(i, k, randLength, rand);
      }
    }
  }
}

function mouseMoved() {
  var mx, my;

  if (mouseX > w) {
    mx = w;
  } else if (mouseX < 0) {
    mx = 0;
  } else {
    mx = mouseX;
  }
  if (mouseY > w) {
    my = h;
  } else if (mousey < 0) {
    my = 0; 
  } else {
    my = mouseY;
  }

  osc.freq((mx + 40) * 2);

  console.log('x: ' + mx + ', y: ' + my);
  b = mx;
  g = my;

  return false;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
