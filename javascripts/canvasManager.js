var canvas = document.querySelector("#scene");
var ctx = canvas.getContext("2d");
var HEIGHT = document.querySelector("#scene").height;
var WIDTH = document.querySelector("#scene").width;
var tickrate = 1000/60;
var curobj;
var persist = true;
var next;
var runloop;

class off {
  tick(persist) {
    return persist;
  }
}

curobj = new off();
runloop = setTimeout(run, tickrate);

window.addEventListener("resize", function() {
    HEIGHT = document.querySelector("#scene").height;
    WIDTH = document.querySelector("#scene").width;
});

function loadJS(file) {
    next = file;
    persist = false;
}

// script objects given HEIGHT, WIDTH, and ctx
// obj.tick(persist) -> running
// persist is false when you want to decay
// running is whether there are still things to decay
// true -> true

function newfocus(file) {
    if (curobj) {
        delete curobj;
    }
    switch (file) {
        case "rain.js":
            curobj = new rain();
            break;
        case "colors.js":
            curobj = new colors();
            break;
        case "off":
            curobj = new off();
            return;
    }
}

function run() {
    if (curobj.tick(persist)) {
        runloop = setTimeout(run, tickrate);
    } else {
        persist = true;
        newfocus(next);
        runloop = setTimeout(run, tickrate);
    }
}
