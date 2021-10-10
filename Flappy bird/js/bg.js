class bg {
    constructor(game) {

        this.game = game;
        this.image = new Image();
        this.base = new Image();
        this.pipeUp = new Image();
        this.pipeDown = new Image();
        this.start = new Image();



        this.startLoaded = this.baseLoaded = this.imageLoaded = this.pipeUpLoaded = this.pipeDownLoaded = false;


        this.image.onload = () => {
            this.imageLoaded = true;
        }
        this.base.onload = () => {
            this.baseLoaded = true;
        }
        this.pipeUp.onload = () => {
            this.pipeUpLoaded = true;
        }
        this.pipeDown.onload = () => {
            this.pipeDownLoaded = true;
        }
        this.start.onload = () => {
            this.startLoaded = true;
        }

        this.start.src = 'images/message.png';
        this.image.src = 'images/bgnight.png';
        this.base.src = 'images/base.png';
        this.pipeDown.src = 'images/PipeDown.png';
        this.pipeUp.src = 'images/pipeUp.png';

        this.x = 0;
        this.x2 = 0;
        this.a = -1;
        this.y = 0;
        this.r = new Array(0, 0, 0);
        this.xr = new Array(0, 0, 0);
        this.current = 0;

        this.init();

        this.score = 0;
    }

    init() {
        this.a = -1;
        this.current = 0;
        this.game.bird.x = 135;
        this.game.bird.y = 200;
        this.score = 0;
        this.game.bird.vecocity = 0;
        this.r = new Array(0, 0, 0);
        this.xr = new Array(0, 0, 0);
        this.game.bird.t = 0;

        for (let i = 0; i < this.xr.length; i++) {
            this.xr[i] = 0;
            this.r[i] = Math.floor(Math.random() * 250 + 25);
        }
    }

    update() {

    }

    draw() {

        if (this.baseLoaded && this.imageLoaded) {
            if (this.a == 0) {
                this.x -= 0.2;
                this.x2 -= 0.5;
                for (let i = 0; i < this.xr.length; i++) {
                    this.xr[i] -= 0.5;
                }
            }

            if (this.x <= -BG_WIDTH) this.x = 0;
            if (this.x2 <= -BG_WIDTH) this.x2 = 0;
            this.game.ctx.drawImage(this.image, this.x, 0);
            this.game.ctx.drawImage(this.image, this.x + BG_WIDTH - 1, 0);

            for (let i = 0; i < this.xr.length; i++) {
                this.game.ctx.drawImage(this.pipeDown, this.xr[i] + BG_WIDTH + i * 150, this.r[i] + 120);
                this.game.ctx.drawImage(this.pipeUp, this.xr[i] + BG_WIDTH + i * 150, this.r[i] - 320);
            }
            if (((this.game.bird.x >= (this.xr[this.current] + BG_WIDTH + this.current * 150) - Math.floor(PIPE_WIDTH / 2)) && (this.game.bird.x <= 1 + (this.xr[this.current] + 1.3 * PIPE_WIDTH + BG_WIDTH + this.current * 150) - Math.floor(PIPE_WIDTH / 2))) && (this.game.bird.y <= this.r[this.current] || this.game.bird.y >= this.r[this.current] + 98)) {
                this.game.bird.gameOver();
            }
            else if ((this.game.bird.x >= (this.xr[this.current] + 1.3 * PIPE_WIDTH + BG_WIDTH + this.current * 150) - Math.floor(PIPE_WIDTH / 2)) && (this.game.bird.x <= 0.5 + (this.xr[this.current] + 1.3 * PIPE_WIDTH + BG_WIDTH + this.current * 150) - Math.floor(PIPE_WIDTH / 2))) {
                this.score += 1;
                this.current += 1;
                // this.createPipe();

                this.xr.push(this.xr[this.xr.length - 1] + 0.5)
                this.r.push(Math.floor(Math.random() * 250 + 25));
                // console.log(this.score);
            }
            // this.createPipe();
            console.log(this.current);
            this.game.ctx.drawImage(this.base, this.x2 - 10, 400);
            this.game.ctx.drawImage(this.base, this.x2 + BG_WIDTH - 10, 400);

            if (this.a < 0 && this.startLoaded) {
                this.game.ctx.drawImage(this.start, 60, 31);
            }
        }

    }
    createPipe() {
        this.xr.push(this.xr[this.xr.length - 1] + 0.5)
        this.r.push(Math.floor(Math.random() * 250 + 25));
    }

}