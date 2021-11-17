class bird{
    constructor(game){
        this.game = game;
        this.images = [];
        this.skillTime=0;

        this.width=34;
        this.height=24;
        
        this.imageUp     = new Image();
        this.imageDown   = new Image();
        this.gameOverImg = new Image();
        
        this.currentImg = null;

        this.imageUpLoaded     = false;
        this.imageDownLoaded   = false;
        this.gameOverImgLoaded = false;
        
        this.imageUp.onload = () =>{
            this.imageUpLoaded = true;
            this.currentImg = this.imageUp;
            this.images.push(this.imageUp);
        }
        this.imageDown.onload = () =>{
            this.imageDownLoaded = true;
            this.images.push(this.imageDown);
        }
        
        this.gameOverImg.onload = () => {
            this.gameOverImgLoaded = true;
        }
        this.imageUp.src   = this.game.birdPath+'/up.png'  ;
        this.imageDown.src = this.game.birdPath+'/down.png' ;
        this.gameOverImg.src = 'images/gameover.png';

        this.x = 100;
        this.y = 200;

        this.doubleScoreSkill=2;
        this.strongSkill=2;

        this.vecocity = 0;

        this.result = "";
        this.startTime = null;
        this.endTime = null;
        
        this.scorePanelY = 0;
    }


    
    update(){
        if(this.vecocity < -2 || this.vecocity > 0) this.currentImg = this.imageUp;
        else this.currentImg = this.imageDown;
        if(this.y + this.height - BIRD_CONNER < BG_HEIGHT - BASE_HEIGHT && this.game.bg.checkStatus == IN_GAME_STATUS){
            this.vecocity += ACCELERATION;
            this.y += this.vecocity;
        }
        else if (this.game.bg.checkStatus == IN_GAME_STATUS || this.game.bg.checkStatus == GAME_OVER_STATUS){
            this.gameOver();
        }
    }

    gameOver(){
        if(this.game.bg.checkStatus==IN_GAME_STATUS){
            this.game.playAudio(this.game.hitAudio);
            this.game.playAudio(this.game.dieAudio);
            this.endTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            this.game.callPHP(this.startTime,this.endTime,this.game.bg.score);
            this.scorePanelY = -0;
        }
        this.game.bg.checkStatus = GAME_OVER_STATUS;
    }
    
    changeImg(){

    }

    draw(){
        if(this.imageDownLoaded && this.imageUpLoaded){
            this.game.ctx.drawImage( this.currentImg , this.x , this.y ,this.width,this.height);
        }
        if(this.gameOverImgLoaded && this.game.bg.checkStatus == GAME_OVER_STATUS){
            this.game.ctx.textAlign = "center";
            this.game.ctx.drawImage(this.gameOverImg,CANVAS_WIDTH/2.5,BG_HEIGHT/7);
            this.game.ctx.fillStyle='#080A4E';   
            if(this.scorePanelY < (BG_HEIGHT-SCORE_HEIGHT)/2){
                this.scorePanelY+=10;
            } 
            this.game.ctx.fillRect((CANVAS_WIDTH-SCORE_WIDTH)/2, this.scorePanelY , SCORE_WIDTH, SCORE_HEIGHT); 
            this.game.ctx.fillStyle = "white";
            this.game.ctx.font = "bold 20px Arial";
            this.game.ctx.fillText('SCORE: ' + this.game.bg.score, CANVAS_WIDTH/2, (BG_HEIGHT/2.1));
            
            this.game.ctx.fillText('BEST: ' + this.game.bg.bestScore, CANVAS_WIDTH/2, (BG_HEIGHT/1.7));
        }
    }


}