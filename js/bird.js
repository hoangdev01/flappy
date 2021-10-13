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
            if(this.y < 380 && this.game.bg.checkStatus == 0){
                this.vecocity += ACCELERATION;
                this.y += this.vecocity;
                
            }
            else if (this.game.bg.checkStatus >= 0){
                this.gameOver();
            }
           
        }
        
    }

    gameOver(){
        this.game.bg.checkStatus = 1;
        this.t = 40;
    }
    
    changeImg(){

    }

    draw(){
        if(this.imageDownLoaded && this.imageMidLoaded && this.imageUpLoaded){
            this.game.ctx.drawImage( this.currentImg , this.x , this.y );
        }
        // console.log(this.currentImgLoaded ,this.imageDownLoaded ,this.imageMidLoaded,this.imageUpLoaded);
        if(this.gameOverImgLoaded && this.game.bg.checkStatus > 0){
            this.game.ctx.drawImage(this.gameOverImg,50,150);
        }
    }


}