var c = document.querySelector("#scene");
var w = document.querySelector("#scene").height;
var h = document.querySelector("#scene").width;

var x = c.getContext("2d");
var S = Math.sin;
var C = Math.cos;
var T = Math.tan;
function R(r,g,b,a) {
    a = a === undefined ? 1 : a;
    return "rgba("+(r|0)+","+(g|0)+","+(b|0)+","+a+")";
}
var r = Math.random

var time = 0;
var frame = 0;
var FPS = 60;

function u(t) {
    for(i=256;i<512;i++){
        j=i-256;
        q=t+99999;
        x.fillStyle=R(j*r()/r(),j,i,.7)
        x.fillRect(960+i*C(q+i*1.57),
                   540+S(q%i)*i*1.56,
                   T(q)/r(),
                   T(q-i)/r())
    }
}

function loop() {
    requestAnimationFrame(loop);
    time = frame/FPS;
    if(time * FPS | 0 == frame - 1){
        time += 0.000001;
    }

    frame++;
    u(time);
}

loop()