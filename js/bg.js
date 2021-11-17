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

        this.imageSkill=[]
        
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
            this.imageSkill.push(this.strongImage);
        }
        this.zoomOutImage.onload = () =>{
            this.zoomOutImageLoaded = true;
            this.imageSkill.push(this.zoomOutImage);
        }
        this.slowDownImage.onload = () =>{
            this.slowDownImageLoaded = true;
            this.imageSkill.push(this.slowDownImage);
        }
        this.doubleScoreImage.onload = () =>{
            this.doubleScoreImageLoaded = true;
            this.imageSkill.push(this.doubleScoreImage);
        }
        //thanh skill
        this.skillTimeImage.onload = () =>{
            this.skillTimeImageLoaded = true;
        }

        this.start.src = 'images/message.png';
        this.image.src = 'images/bgnight.png';
        this.base.src = 'images/base.png';

        this.pipeDown.src = 'images/PipeDown.png';
        this.pipeUp.src = 'images/pipeUp.png';
        this.btnResume.src = 'images/resume.png';

        //skill image source
        this.strongImage.src   = this.game.skill[0]  ;
        this.zoomOutImage.src   = this.game.skill[1]  ;
        this.slowDownImage.src   = this.game.skill[2]  ;
        this.doubleScoreImage.src   = this.game.skill[3]  ;

        this.skillTimeImage.src   = 'images/skillTime.png'  ;

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
        this.currentSkill=0;
        this.workingSkill=0;

        this.skillTime=0;
        this.current = 0;
        this.backgroundSpeed = 0.2;
        this.pipeSpeed = 0.5;
        this.scoreEachTime=1;

        this.init();
        
        this.score = 0;
        this.bestScore=0;
    }

    init() {
        this.skillTime=0;
        //skill
        this.currentSkill=Math.floor(Math.random()*4);
        this.xItem = BG_WIDTH*3;
        this.yItem = Math.floor(Math.random() * PIPE_HEIGHT_MAX + PIPE_Y_MAX);
        this.checkStatus = START_STATUS;
        this.current = 0;
        this.score = 0;
        this.r = new Array(0, 0, 0,0,0,0);
        this.xr = new Array(0, 0, 0,0,0,0);
        this.pipeCheck = new Array(0, 0, 0,0,0,0);
        this.game.bird.x = BIRD_INIT_POSITION_X;
        this.game.bird.y = BIRD_INIT_POSITION_Y;
        this.game.bird.vecocity = 0;
        this.game.bird.t = 0;
        this.game.bird.startTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        for (let i = 0; i < this.xr.length; i++) {
            this.xr[i] = 0;
            this.r[i] = Math.floor(Math.random() * PIPE_HEIGHT_MAX + PIPE_HEIGHT_MIN);
        }
    }

    update() {
        if(this.skillTime>0){
            this.skillTime--;
            this.activeSkill(this.workingSkill);
        }
        else{
            this.inactivekill();
        }
        if (this.xItem < -1.5*BG_WIDTH){
            this.currentSkill=Math.floor(Math.random()*4-0.01);
            this.xItem = BG_WIDTH*3.5;
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
            this.game.ctx.drawImage(this.image, this.x + 2*BG_WIDTH - 2, 0);
            this.game.ctx.drawImage(this.image, this.x + 3*BG_WIDTH - 3, 0);
            if (this.pipeUpLoaded&&this.pipeDownLoaded)
                for (let i = 0; i < this.xr.length; i++) {
                    if (this.pipeCheck[i]==0){
                        this.game.ctx.drawImage(this.pipeDown, this.xr[i] + BG_WIDTH + i * PIPE_SPACE, this.r[i] + PIPE_Y_MAX);
                        this.game.ctx.drawImage(this.pipeUp, this.xr[i] + BG_WIDTH + i * PIPE_SPACE, this.r[i] +PIPE_Y_MIN);
                    }
                }
            this.game.ctx.drawImage(this.base, this.x2 - 10, GROUND_Y);
            this.game.ctx.drawImage(this.base, this.x2 + BG_WIDTH - 10, GROUND_Y);
            this.game.ctx.drawImage(this.base, this.x2 + 2*BG_WIDTH - 10, GROUND_Y);
            this.game.ctx.drawImage(this.base, this.x2 + 3*BG_WIDTH - 10, GROUND_Y);

            if (this.checkStatus == START_STATUS && this.startLoaded) {
                this.game.ctx.drawImage(this.start, 60, 31);
            }
            this.game.ctx.drawImage(this.base, this.x2 - 10, GROUND_Y);
            if(this.strongImageLoaded && this.zoomOutImageLoaded && this.slowDownImageLoaded && this.doubleScoreImageLoaded){
                if (this.currentSkill==0){
                    this.game.ctx.drawImage(this.strongImage, this.xItem + BG_WIDTH,this.yItem , ITEM_SIZE,ITEM_SIZE);
                }
                else if (this.currentSkill==1){
                    this.game.ctx.drawImage(this.zoomOutImage, this.xItem + BG_WIDTH,this.yItem , ITEM_SIZE,ITEM_SIZE);
                }
                else if (this.currentSkill==2){
                    this.game.ctx.drawImage(this.slowDownImage, this.xItem + BG_WIDTH,this.yItem , ITEM_SIZE,ITEM_SIZE);
                }
                else if (this.currentSkill==3){
                    this.game.ctx.drawImage(this.doubleScoreImage, this.xItem + BG_WIDTH,this.yItem , ITEM_SIZE,ITEM_SIZE);
                }
            }
            if(this.skillTimeImageLoaded){
                this.game.ctx.drawImage(this.skillTimeImage,0,BG_HEIGHT-SKILL_TIME_IMAGE_HEIGHT,this.skillTime/(SKILL_TIME/CANVAS_WIDTH),SKILL_TIME_IMAGE_HEIGHT)
            }
        }
        if(this.checkStatus == IN_GAME_STATUS){
            this.game.ctx.fillStyle = "white";
            this.game.ctx.font = "bold 40px Arial";
            this.game.ctx.textAlign = "center"
            this.game.ctx.fillText(this.score, CANVAS_WIDTH/2, (BG_HEIGHT / 7));
        }
        if(this.checkStatus==PAUSE_STATUS){
            this.game.ctx.fillStyle = "white";
            this.game.ctx.font = "bold 50px Arial";
            this.game.ctx.textAlign = "center"
            this.game.ctx.fillText("PAUSE", CANVAS_WIDTH/2, (BG_HEIGHT / 2));
        }
        if(this.checkStatus==CONTINUE_STATUS){
            this.game.ctx.fillStyle = "white";
            this.game.ctx.font = "bold 50px Arial";
            this.game.ctx.textAlign = "center"
            this.game.ctx.fillText(Math.floor(this.game.continueTime/100), CANVAS_WIDTH/2, (BG_HEIGHT / 2));
            this.game.continueTime-=1;
            if(this.game.continueTime <= 0){
                this.checkStatus = IN_GAME_STATUS;
            }
        }

    }

    checkCrash(){
        if (this.game.bird.x>=this.xItem + BG_WIDTH-this.game.bird.width && this.game.bird.x<=this.xItem+ BG_WIDTH+ITEM_SIZE && this.game.bird.y>=this.yItem-this.game.bird.height && this.game.bird.y<=this.yItem+ITEM_SIZE){
            if(this.currentSkill==0) this.game.playAudio(this.game.strongAudio);
            else if (this.currentSkill==1) this.game.playAudio(this.game.zoomOutAudio);
            else if (this.currentSkill==2) this.game.playAudio(this.game.slowDownTimeAudio);
            else if (this.currentSkill==3) this.game.playAudio(this.game.doubleScoreAudio);
            this.skillTime = SKILL_TIME;
            this.workingSkill=this.currentSkill;
            this.xItem=NEGATIVE_INFINITY;
        }
        if (((this.game.bird.x >= (this.xr[this.current] + BG_WIDTH + this.current * PIPE_SPACE) - this.game.bird.width + BIRD_CONNER && (this.game.bird.x <= (this.xr[this.current] + PIPE_WIDTH + BG_WIDTH + this.current * PIPE_SPACE) - BIRD_CONNER)) && (this.game.bird.y + this.game.bird.height >= this.r[this.current] + PIPE_Y_MAX + BIRD_CONNER|| this.game.bird.y <= this.r[this.current] + PIPE_Y_MIN + PIPE_HEIGHT - BIRD_CONNER))) {
            if(this.skillTime>0 && this.workingSkill==0 && this.pipeCheck[this.current]==0){
                this.pipeCheck[this.current]=1;
                this.game.playAudio(this.game.removePipeAudio);
            }
            else if(this.pipeCheck[this.current]!=1){
                this.game.bird.gameOver();
            }
        }
        else if (this.game.bird.x == this.xr[this.current] + PIPE_WIDTH + BG_WIDTH + this.current * PIPE_SPACE) {
            this.score += this.scoreEachTime;
            this.bestScore = Math.max(this.score,this.bestScore);
            this.current += 1;
            this.createPipe();
            this.game.playAudio(this.game.pointAudio);
        }

    } 

    createPipe() {
        this.xr.push(this.xr[this.xr.length - 1]);
        this.r.push(Math.floor(Math.random() * PIPE_HEIGHT_MAX + PIPE_HEIGHT_MIN));
        this.pipeCheck.push(0);
    }

    activeSkill(index){
        //zoom out
        if(index==1){
            if(this.game.bird.height>BIRD_HEIGHT/2 && this.game.bird.width > BIRD_WIDTH/2){
                this.game.bird.width-=1;
                this.game.bird.height-=1;
            }
        }
        //slowdow
        else if(index==2){
            this.pipeSpeed=PIPE_SPEED/2;
            this.backgroundSpeed=BG_SPEED/2;
        }
        //doublescore
        else if (index==3){
            this.scoreEachTime=SCORE_EACH_TIME*2;
        }
    }

    inactivekill(){
        this.game.bird.width=BIRD_WIDTH;
        this.game.bird.height=BIRD_HEIGHT;
        this.pipeSpeed=PIPE_SPEED;
        this.backgroundSpeed=BG_SPEED;
        this.scoreEachTime=SCORE_EACH_TIME;
    }    

}