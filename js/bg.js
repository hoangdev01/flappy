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

        // x là tọa độ background 
        this.x = 0;
        
        // x2 là tọa độ nền 
        this.x2 = 0;
        // nếu checkStatus = -1 thì gọi hàm init khởi động lại game, nếu như = 0 thì game đang được chơi, nếu = 1 thì gọi hàm gameover và chuyển lại -1 để restart game
        this.checkStatus = START_STATUS;
        this.y = 0;
        this.r = new Array(0, 0, 0);
        this.xr = new Array(0, 0, 0);
        this.current = 0;
        this.backgroundSpeed = 0.2;
        this.pipeSpeed = 0.5;

        this.init();

        this.score = 0;
    }

    init() {
        this.checkStatus = START_STATUS;
        this.current = 0;
        this.game.bird.x = BIRD_INIT_POSITION_X;
        this.game.bird.y = BIRD_INIT_POSITION_Y;
        this.score = 0;
        this.game.bird.vecocity = 0;
        this.r = new Array(0, 0, 0);
        this.xr = new Array(0, 0, 0);
        this.game.bird.t = 0;

        for (let i = 0; i < this.xr.length; i++) {
            this.xr[i] = 0;
            this.r[i] = Math.floor(Math.random() * PIPE_HEIGHT_MAX + PIPE_HEIGHT_MIN);
        }
    }

    update() {
        if (this.checkStatus == IN_GAME_STATUS) {
            this.x -= this.backgroundSpeed;
            this.x2 -= this.pipeSpeed;
            for (let i = 0; i < this.xr.length; i++) {
                this.xr[i] -= this.pipeSpeed;
            }
        }
        this.checkCrash();
    }

    draw() {
        if (this.baseLoaded && this.imageLoaded) {
            // reset background 
            if (this.x <= -BG_WIDTH) this.x = 0;
            // reset nền 
            if (this.x2 <= -BG_WIDTH) this.x2 = 0;
            this.game.ctx.drawImage(this.image, this.x, 0);
            this.game.ctx.drawImage(this.image, this.x + BG_WIDTH - 1, 0);
            for (let i = 0; i < this.xr.length; i++) {
                this.game.ctx.drawImage(this.pipeDown, this.xr[i] + BG_WIDTH + i * PIPE_SPACE, this.r[i] + PIPE_Y_MAX);
                this.game.ctx.drawImage(this.pipeUp, this.xr[i] + BG_WIDTH + i * PIPE_SPACE, this.r[i] +PIPE_Y_MIN);
            }
            this.game.ctx.drawImage(this.base, this.x2 - 10, GROUND_Y);
            this.game.ctx.drawImage(this.base, this.x2 + BG_WIDTH - 10, GROUND_Y);

            if (this.checkStatus == START_STATUS && this.startLoaded) {
                this.game.ctx.drawImage(this.start, 60, 31);
            }
        }

    }

    checkCrash(){
        if (((this.game.bird.x >= (this.xr[this.current] + BG_WIDTH + this.current * PIPE_SPACE) - Math.floor(PIPE_WIDTH / 2)) && (this.game.bird.x <= 1 + (this.xr[this.current] + 1.3 * PIPE_WIDTH + BG_WIDTH + this.current * 150) - Math.floor(PIPE_WIDTH / 2))) && (this.game.bird.y <= this.r[this.current] || this.game.bird.y >= this.r[this.current] + 98)) {
            this.game.bird.gameOver();
        }
        else if ((this.game.bird.x >= (this.xr[this.current] + 1.3 * PIPE_WIDTH + BG_WIDTH + this.current * PIPE_SPACE) - Math.floor(PIPE_WIDTH / 2)) && (this.game.bird.x <= 0.5 + (this.xr[this.current] + 1.3 * PIPE_WIDTH + BG_WIDTH + this.current * 150) - Math.floor(PIPE_WIDTH / 2))) {
            this.score += 1;
            this.current += 1;
            this.createPipe();
        }
    }

    createPipe() {
        this.xr.push(this.xr[this.xr.length - 1]);
        this.r.push(Math.floor(Math.random() * PIPE_HEIGHT_MAX + PIPE_HEIGHT_MIN));
    }


}