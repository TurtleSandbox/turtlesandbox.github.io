class colors {
    constructor() {
        this.colors = ["#OOOOOO", "#FF7D0A", "#ABD473", "#69CCF0", "#F58CBA", "#FFF569", "#0070DE", "#9482C9", "#C79C6E"];
        this.blocks = [[]];

        this.h = ~~(HEIGHT / 10) + 2;
        this.w = ~~(WIDTH / 10) + 2;

        this.hoff = ~~((HEIGHT % 10) / 2);
        this.woff = ~~((WIDTH % 10) / 2);

        for(var i = 0; i < this.h; i++) {
            this.blocks[i] = [];
            for(var e = 0; e < this.w; e++) {
                this.blocks[i][e] = 0;
            }
        }

        this.blocks[~~(this.h/2)][~~(this.w/2)] = 1;
    }

    tick() {
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        for(var i = 1; i < this.h - 1; i++) {
            for(var e = 1; e < this.w - 1; e++) {
                if((this.blocks[i][e] === 0) && (Math.random() < .02) && (this.blocks[i-1][e] !== 0 ||
                                                                          this.blocks[i+1][e] !== 0 ||
                                                                          this.blocks[i][e-1] !== 0 ||
                                                                          this.blocks[i][e+1] !== 0 )) {
                    this.blocks[i][e] = ~~(Math.random() * 9) + 1;
                } else {
                    if(Math.random() < .02) { this.blocks[i][e] = 0; }
                }
                if(this.blocks[i][e] !== 0) {
                    ctx.fillStyle = this.colors[this.blocks[i][e] - 1];
                    ctx.fillRect(e*10 - 10 + this.woff,i*10 - 10 + this.hoff,10,10);
                }
            }
        }
    }
}
