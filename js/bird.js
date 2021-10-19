class bird{
    constructor(game){
        this.game = game;
        this.images = [];

        this.imageUp     = new Image();
        this.imageMid    = new Image();
        this.imageDown   = new Image();
        this.gameOverImg = new Image();
        
        this.currentImg = null;

        this.imageUpLoaded     = false;
        this.imageMidLoaded    = false;
        this.imageDownLoaded   = false;
        this.gameOverImgLoaded = false;
        
        this.imageUp.onload = () =>{
            this.imageUpLoaded = true;
            this.currentImg = this.imageUp;
            this.images.push(this.imageUp);
        }

        this.imageMid.onload = () =>{
            this.imageMidLoaded = true;
            this.images.push(this.imageMid);
        }

        this.imageDown.onload = () =>{
            this.imageDownLoaded = true;
            this.images.push(this.imageDown);
        }
        
        this.gameOverImg.onload = () => {
            this.gameOverImgLoaded = true;
            // console.log("loaded");
        }
        
        this.imageUp.src   = 'images/up.png'  ;
        this.imageMid.src  = 'images/mid.png' ;
        this.imageDown.src = 'images/down.png';
        this.gameOverImg.src = 'images/gameover.png';

        this.x = 100;
        this.y = 200;

        this.vecocity = 0;

        this.t = 0;

        // console.log(this.gameOverImgLoaded);
    }


    
    update(){

        if(!this.imageDownLoaded || !this.imageMidLoaded || !this.imageUpLoaded){
            return;
        }
        else{
            this.t++;
            if(this.t == 61) this.t = 0;
            if(this.t <= 20 ) this.currentImg = this.imageDown;
            else if (this.t <= 40) this.currentImg = this. imageMid;
            else this.currentImg = this.imageUp;
            if(this.y < 380 && this.game.bg.checkStatus == IN_GAME_STATUS){
                this.vecocity += ACCELERATION;
                this.y += this.vecocity;
            }
            else if (this.game.bg.checkStatus == IN_GAME_STATUS || this.game.bg.checkStatus == GAME_OVER_STATUS){
                this.gameOver();
            }
           
        }
        
    }

    gameOver(){
        this.game.bg.checkStatus = GAME_OVER_STATUS;
        this.t = 40;
    }
    
    changeImg(){

    }

    draw(){
        if(this.imageDownLoaded && this.imageMidLoaded && this.imageUpLoaded){
            this.game.ctx.drawImage( this.currentImg , this.x , this.y );
        }
        // console.log(this.currentImgLoaded ,this.imageDownLoaded ,this.imageMidLoaded,this.imageUpLoaded);
        if(this.gameOverImgLoaded && this.game.bg.checkStatus == GAME_OVER_STATUS){
            this.game.ctx.drawImage(this.gameOverImg,50,BG_HEIGHT/7);
            this.game.ctx.fillStyle='#FCA146';    // color of fill
            this.game.ctx.textAlign = "center"
            this.game.ctx.fillRect((BG_WIDTH-SCORE_WIDTH)/2, (BG_HEIGHT-SCORE_HEIGHT)/2, SCORE_WIDTH, SCORE_HEIGHT); // create rectangle  
            this.game.ctx.fillStyle = "white";
            this.game.ctx.font = "bold 20px Arial";
            this.game.ctx.textAlign = "center"
            this.game.ctx.fillText('Score: ' + this.game.bg.score, BG_WIDTH/1.5, (BG_HEIGHT/2.25));
            
            this.game.ctx.textAlign = "center"
            this.game.ctx.fillText('Best: ' + this.game.bg.score, BG_WIDTH/1.5, (BG_HEIGHT/1.75));

            this.game.ctx.textAlign = "center"
            this.game.ctx.fillText('Rank: ' + this.game.bg.score, BG_WIDTH/3.5, BG_HEIGHT/2);
        }
    }


}