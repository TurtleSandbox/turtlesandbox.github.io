class droplet {
    constructor(wind, grav) {
        this.wind = wind;
        this.grav = grav;

        this.x = Math.random() * HEIGHT;
        this.y = -10;

        this.dx = this.wind / 2;
        this.dy = 5;
    }

    physics() {
        this.lastx = this.x;
        this.lasty = this.y;

        this.dx = this.dx + this.wind;
        this.dy = this.dy + this.grav;

        this.x = this.x + this.dx;
        this.y = this.y + this.dy;

        if (WIDTH < this.x) {
            this.x = this.x - WIDTH;
            this.lastx = this.lastx - WIDTH;
        } else if (this.x < 0) {
            this.x = this.x + WIDTH;
            this.lastx = this.lastx + WIDTH;
        }

        if (HEIGHT < this.lasty) {
            return 1;
        } else {
            return 0;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.lastx, this.lasty);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}

class splash {
    constructor(x, y, grav) {
        this.x = x;
        this.y = y;
        this.grav = grav;

        var dir = Math.random() * 180;

        this.dx = Math.cos(dir) * (2 + Math.random() * 3);
        this.dy = -1 * Math.sin(dir) * (2 + Math.random() * 3);
    }

    physics() {
        this.lastx = this.x;
        this.lasty = this.y;

        this.dy = this.dy + this.grav;

        this.x = this.x + this.dx;
        this.y = this.y + this.dy;

        if (WIDTH < this.x) {
            this.x = this.x - WIDTH;
            this.lastx = this.lastx - WIDTH;
        } else if (this.x < 0) {
            this.x = this.x + WIDTH;
            this.lastx = this.lastx + WIDTH;
        }

        if (HEIGHT < this.lasty) {
            return 1;
        } else {
            return 0;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.lastx, this.lasty);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}

class rain {
    constructor() {
        ctx.strokeStyle = "#0070DE";

        this.wind = .03;
        this.grav = .2;
        this.rainchance = 1;
        this.droplets = [];
        this.splashes = [];
    }

    physics(persist) {
        if (persist) {
            if (Math.random() < this.rainchance) {
                this.droplets.push(new droplet(this.wind, this.grav));
            }
        }

        var i = 0;
        while (i < this.droplets.length) {
            if (this.droplets[i].physics() === 1) {
                for (var e = 0; e < 3 + ~~(Math.random() * 4); e++) {
                    this.splashes.push(new splash(this.droplets[i].x, HEIGHT, this.grav));
                }
                this.droplets.splice(i, 1);
            } else {
                i = i + 1;
            }
        }

        i = 0;
        while (i < this.splashes.length) {
            if (this.splashes[i].physics() === 1) {
                this.splashes.splice(i, 1);
            } else {
                i = i + 1;
            }
        }

        return persist || ((this.droplets.length + this.splashes.length) > 0);
    }

    draw() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        ctx.lineWidth = 1.5;
        var i = 0;
        while (i < this.droplets.length) {
            this.droplets[i].draw();
            i = i + 1;
        }

        ctx.lineWidth = 1;
        i = 0;
        while (i < this.splashes.length) {
            this.splashes[i].draw();
            i = i + 1;
        }
    }

    tick(persist) {
        var done = this.physics(persist);
        this.draw();
        return done;
    }
}
