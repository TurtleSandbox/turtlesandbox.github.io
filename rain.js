var canvas = document.querySelector("#colors");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

ctx.strokeStyle="#0070DE";

var WIND = .02;
var GRAV = .2;
var RAINCHANCE = 1;
var droplets = [];
var splashes = [];

class droplet {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = -50;

    this.dx = WIND/2;
    this.dy = 0;

  }

  physics() {
    this.lastx = this.x;
    this.lasty = this.y;

    this.dx = this.dx + WIND;
    this.dy = this.dy + GRAV;

    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    if (window.innerWidth < this.x) {
      this.x     = this.x     - window.innerWidth;
      this.lastx = this.lastx - window.innerWidth;
    } else if (this.x < 0) {
      this.x     = this.x     + window.innerWidth;
      this.lastx = this.lastx + window.innerWidth;
    }

    if (window.innerHeight < this.lasty) {
      return 1;
    } else {return 0;}
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.lastx, this.lasty);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}

class splash {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    var dir = Math.random() * 180;

    this.dx = Math.cos(dir)*(2+Math.random()*3);
    this.dy = -1 * Math.sin(dir)*(2+Math.random()*3);
  }

  physics() {
    this.lastx = this.x;
    this.lasty = this.y;

    this.dy = this.dy + GRAV;

    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    if (window.innerWidth < this.x) {
      this.x     = this.x     - window.innerWidth;
      this.lastx = this.lastx - window.innerWidth;
    } else if (this.x < 0) {
      this.x     = this.x     + window.innerWidth;
      this.lastx = this.lastx + window.innerWidth;
    }

    if (window.innerHeight < this.lasty) {
      return 1;
    } else {return 0;}
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.lastx, this.lasty);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}

function input() {}

function physics() {
  if (Math.random() < RAINCHANCE) {
    droplets.push(new droplet());
  }

  var i = 0;
  while (i < droplets.length) {
    if (droplets[i].physics() === 1) {
      for (var e = 0; e < 3 + ~~(Math.random() * 4); e++) {
        splashes.push(new splash(droplets[i].x,window.innerHeight));
      }
      droplets.splice(i,1);
    } else {i = i + 1;}
  }

  i = 0;
  while (i < splashes.length) {
    if(splashes[i].physics() === 1) {
      splashes.splice(i,1);
    } else {i = i + 1;}
  }
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.lineWidth = 2;
  var i = 0;
  while (i < droplets.length) {
    droplets[i].draw();
    i = i + 1;
  }

  ctx.lineWidth = 1.5;
  i = 0;
  while (i < splashes.length) {
    splashes[i].draw();
    i = i + 1;
  }
}

function tick() {
  input();
  physics();
  draw();
}

setInterval(tick, 1000/60);
