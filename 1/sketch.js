var w = 255,
  h = 255;

var bite, osc1, osc2, noise, reverb;
var playing = false;
var lips = document.getElementsByTagName("img");

function preload() {
  bite = loadSound('bite.mp3');
}

function setup() {
  createCanvas(w, h);

  bite.setVolume(1);

  osc1 = new p5.Oscillator();
  osc1.setType('sine');
  osc1.freq(240);
  osc1.amp(1);

  osc2 = new p5.Oscillator();
  osc1.setType('sine')
  osc2.freq(480);
  osc2.amp(1);
  osc2.start();

  reverb = new p5.Reverb();
  reverb.process(osc1, 8, 80);
  osc1.start();

  noise = new p5.Noise('pink');
  noise.amp(0.1);
  noise.start();
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

var mx, my;

function mouseMoved() {

  if (mouseX > w) {
    mx = w;
  } else if (mouseX < 0) {
    mx = 0;
  } else {
    mx = mouseX;
  }
  if (mouseY > h) {
    my = h;
  } else if (mouseY < 0) {
    my = 0;
  } else {
    my = mouseY;
  }

  osc1.freq((mx + 30) * 2);
  osc2.freq((my + 30) * 2);

  console.log('x: ' + mx + ', y: ' + my);
  b = mx;
  g = my;

  return false;
}

function mousePressed() {
  osc1.stop();
  osc2.stop();
  
  bite.play();
  bite.loop();

  lips[0].style.opacity = 1;
}

function mouseReleased() {
  osc1.freq((mx + 30) * 2);
  osc2.freq((my + 30) * 2);
  osc1.start();
  osc2.start();

  bite.stop();

  lips[0].style.opacity = 0;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
