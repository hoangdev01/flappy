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
        this.path= "images/"+this.game.birdPath+'/up.png';
        this.imageUp.src   = "images/"+this.game.birdPath+'/up.png'  ;
        this.imageDown.src = "images/"+this.game.birdPath+'/down.png' ;
        this.gameOverImg.src = 'images/gameover.png';

        this.x = 100;
        this.y = 200;

        this.doubleScoreSkill=2;
        this.strongSkill=2;

        this.vecocity = 0;

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
            this.game.ctx.fillStyle='#FCA146';   
            this.game.ctx.fillRect((CANVAS_WIDTH-SCORE_WIDTH)/2, (BG_HEIGHT-SCORE_HEIGHT)/2, SCORE_WIDTH, SCORE_HEIGHT); 
            this.game.ctx.fillStyle = "white";
            this.game.ctx.font = "bold 20px Arial";
            this.game.ctx.fillText('Score: ' + this.game.bg.score, CANVAS_WIDTH/1.5, (BG_HEIGHT/2.25));
            
            this.game.ctx.fillText('Best: ' + this.game.bg.score, CANVAS_WIDTH/1.5, (BG_HEIGHT/1.75));

            this.game.ctx.fillText('Rank: ' + this.game.bg.score, CANVAS_WIDTH/3.5, BG_HEIGHT/2);
        }
    }


}