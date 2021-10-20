class bg {
    constructor(game) {

        this.game = game;
        this.image = new Image();
        this.base = new Image();
        this.pipeUp = new Image();
        this.pipeDown = new Image();
        this.start = new Image();
        this.btnResume = new Image();
        this.skillTimeImage = new Image();
        
        // item image
        this.strongImage = new Image();
        this.zoomOutImage = new Image();
        this.slowDownImage = new Image();
        this.doubleScoreImage = new Image();

        this.startLoaded = this.baseLoaded = this.imageLoaded = this.pipeUpLoaded = this.pipeDownLoaded = this.btnResumeLoaded = false;

        // item image load check
        this.strongImageLoaded = false;
        this.zoomOutImageLoaded = false;
        this.slowDownImageLoaded = false;
        this.doubleScoreImageLoaded = false;

        this.skillTimeImageLoaded = false;

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
        this.btnResume.onload = () => {
            this.btnResumeLoaded = true;
        }

        // onload item image
        this.strongImage.onload = () =>{
            this.strongImageLoaded = true;
            this.currentImg = this.strongImage;
            // this.images.push(this.strongImage);
        }
        this.zoomOutImage.onload = () =>{
            this.zoomOutImageLoaded = true;
            // this.images.push(this.zoomOutImage);
        }
        this.slowDownImage.onload = () =>{
            this.slowDownImageLoaded = true;
            // this.images.push(this.slowDownImage);
        }
        this.doubleScoreImage.onload = () =>{
            this.doubleScoreImageLoaded = true;
            // this.images.push(this.doubleScoreImage);
        }
        this.skillTimeImage.onload = () =>{
            this.skillTimeImageLoaded = true;
            // this.images.push(this.doubleScoreImage);
        }

        this.start.src = 'images/message.png';
        this.image.src = 'images/bgnight.png';
        this.base.src = 'images/base.png';

        this.pipeDown.src = 'images/PipeDown.png';
        this.pipeUp.src = 'images/pipeUp.png';
        this.btnResume.src = 'images/resume.png';

        //
        this.strongImage.src   = 'images/samset.jpg'  ;
        this.zoomOutImage.src   = 'images/samset.jpg'  ;
        this.slowDownImage.src   = 'images/samset.jpg'  ;
        this.doubleScoreImage.src   = 'images/samset.jpg'  ;
        this.skillTimeImage.src   = 'images/skillTime.jpeg'  ;

        // x là tọa độ ngang background 
        this.x = 0;
        
        // x2 là tọa độ ngang nền 
        this.x2 = 0;
        // nếu checkStatus = -1 thì gọi hàm init khởi động lại game, nếu như = 0 thì game đang được chơi, nếu = 1 thì gọi hàm gameover và chuyển lại -1 để restart game
        this.checkStatus = START_STATUS;
        // toa do y cua cot
        this.r = new Array(0, 0, 0);
        // toa do x cua cot
        this.xr = new Array(0, 0, 0);
        this.pipeCheck = new Array(0, 0, 0);
        // toa do x y cua item
        this.xItem = 0;
        this.yItem = 0;

        this.skillTime=0;
        this.current = 0;
        this.backgroundSpeed = 0.2;
        this.pipeSpeed = 0.5;

        this.init();
        
        this.score = 0;
    }

    init() {
        this.skillTime=0;
        this.xItem = BG_WIDTH*3;
        this.yItem = Math.floor(Math.random() * PIPE_HEIGHT_MAX + PIPE_Y_MAX);
        this.checkStatus = START_STATUS;
        this.current = 0;
        this.game.bird.x = BIRD_INIT_POSITION_X;
        this.game.bird.y = BIRD_INIT_POSITION_Y;
        this.score = 0;
        this.game.bird.vecocity = 0;
        this.r = new Array(0, 0, 0);
        this.xr = new Array(0, 0, 0);
        this.pipeCheck = new Array(0, 0, 0);
        this.game.bird.t = 0;

        for (let i = 0; i < this.xr.length; i++) {
            this.xr[i] = 0;
            this.r[i] = Math.floor(Math.random() * PIPE_HEIGHT_MAX + PIPE_HEIGHT_MIN);
        }
    }

    update() {
        if(this.skillTime>0){
            this.skillTime--;
        }
        if (this.xItem < -1.5*BG_WIDTH){
            this.xItem = BG_WIDTH*3;
            this.yItem = Math.floor(Math.random() * PIPE_HEIGHT_MAX + PIPE_Y_MAX);
        }
        if (this.checkStatus == IN_GAME_STATUS) {
            this.x -= this.backgroundSpeed;
            this.x2 -= this.pipeSpeed;
            for (let i = 0; i < this.xr.length; i++) {
                this.xr[i] -= this.pipeSpeed;
            }
            this.xItem -= ITEM_SPEED;
        }
        // reset background 
        if (this.x <= -BG_WIDTH) this.x = 0;
        // reset nền 
        if (this.x2 <= -BG_WIDTH) this.x2 = 0;
        this.checkCrash();
    }

    draw() {
        if (this.baseLoaded && this.imageLoaded) {
            this.game.ctx.drawImage(this.image, this.x, 0);
            this.game.ctx.drawImage(this.image, this.x + BG_WIDTH - 1, 0);
            if (this.pipeUpLoaded&&this.pipeDownLoaded)
                for (let i = 0; i < this.xr.length; i++) {
                    if (this.pipeCheck[i]==0){
                        this.game.ctx.drawImage(this.pipeDown, this.xr[i] + BG_WIDTH + i * PIPE_SPACE, this.r[i] + PIPE_Y_MAX);
                        this.game.ctx.drawImage(this.pipeUp, this.xr[i] + BG_WIDTH + i * PIPE_SPACE, this.r[i] +PIPE_Y_MIN);
                    }
                }
            this.game.ctx.drawImage(this.base, this.x2 - 10, GROUND_Y);
            this.game.ctx.drawImage(this.base, this.x2 + BG_WIDTH - 10, GROUND_Y);

            if (this.checkStatus == START_STATUS && this.startLoaded) {
                this.game.ctx.drawImage(this.start, 60, 31);
            }
            this.game.ctx.drawImage(this.base, this.x2 - 10, GROUND_Y);
            if(this.btnResumeLoaded && this.checkStatus == PAUSE_STATUS){
                this.game.ctx.drawImage(this.btnResume, BG_WIDTH-this.btnResume.width,this.btnResume.height);
            }
            if(this.strongImageLoaded && this.zoomOutImageLoaded && this.slowDownImageLoaded && this.doubleScoreImageLoaded){
                this.game.ctx.drawImage(this.strongImage, this.xItem + BG_WIDTH,this.yItem , ITEM_SIZE,ITEM_SIZE);
            }
            if(this.skillTimeImageLoaded){
                this.game.ctx.drawImage(this.skillTimeImage,0,BG_HEIGHT-SKILL_TIME_IMAGE_HEIGHT,this.skillTime/(SKILL_TIME/BG_WIDTH),SKILL_TIME_IMAGE_HEIGHT)
            }
        }

    }

    checkCrash(){
        // console.log(this.game.bird.y);
        // console.log(this.yItem);
        if (this.game.bird.x>=this.xItem + BG_WIDTH-this.game.bird.width && this.game.bird.x<=this.xItem+ BG_WIDTH+ITEM_SIZE && this.game.bird.y>=this.yItem-this.game.bird.height && this.game.bird.y<=this.yItem+ITEM_SIZE){
            this.skillTime = SKILL_TIME;
            this.xItem=-1000;
        }
        if (((this.game.bird.x >= (this.xr[this.current] + BG_WIDTH + this.current * PIPE_SPACE) - Math.floor(PIPE_WIDTH / 2)) && (this.game.bird.x <= 1 + (this.xr[this.current] + 1.3 * PIPE_WIDTH + BG_WIDTH + this.current * 150) - Math.floor(PIPE_WIDTH / 2))) && (this.game.bird.y <= this.r[this.current] || this.game.bird.y >= this.r[this.current] + 98)) {
            if(this.skillTime>0){
                this.pipeCheck[this.current]=1;
            }
            else {
                this.game.bird.gameOver();
            }
        }
        // else if ((this.game.bird.x >= (this.xr[this.current] + 1.3 * PIPE_WIDTH + BG_WIDTH + this.current * PIPE_SPACE) - Math.floor(PIPE_WIDTH / 2)) && (this.game.bird.x <= 0.5 + (this.xr[this.current] + 1.3 * PIPE_WIDTH + BG_WIDTH + this.current * 150) - Math.floor(PIPE_WIDTH / 2))){
        else if (this.game.bird.x == this.xr[this.current] + PIPE_WIDTH + BG_WIDTH + this.current * 150) {
            this.score += 1;
            this.current += 1;
            this.createPipe();
        }
        // console.log(this.skillTime);
        // console.log(this.xr[this.current] + PIPE_WIDTH + BG_WIDTH + this.current * 150);

    }

    createPipe() {
        this.xr.push(this.xr[this.xr.length - 1]);
        this.r.push(Math.floor(Math.random() * PIPE_HEIGHT_MAX + PIPE_HEIGHT_MIN));
        this.pipeCheck.push(0);
    }


}