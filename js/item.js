class item {
    constructor(game) {

        this.game = game;

        this.images = [];
        this.currentImg = null;

        this.x = 0;
        this.y = 0;

        this.width=30;
        this.height=30;

        this.strongImage = new Image();
        this.zoomOutImage = new Image();
        this.slowDownImage = new Image();
        this.doubleScoreImage = new Image();

        this.strongImageLoaded = false;
        this.zoomOutImageLoaded = false;
        this.slowDownImageLoaded = false;
        this.doubleScoreImageLoaded = false;

        this.strongImageLoaded.onload = () =>{
            this.strongImageLoaded = true;
            this.currentImg = this.strongImage;
            this.images.push(this.strongImage);
        }
        this.zoomOutImage.onload = () =>{
            this.zoomOutImageLoaded = true;
            this.images.push(this.zoomOutImage);
        }
        this.slowDownImage.onload = () =>{
            this.slowDownImageLoaded = true;
            this.images.push(this.slowDownImage);
        }
        this.doubleScoreImage.onload = () =>{
            this.doubleScoreImageLoaded = true;
            this.images.push(this.doubleScoreImage);
        }

        this.strongImage.src   = 'images/samset.png'  ;
        this.zoomOutImage.src   = 'images/samset.png'  ;
        this.slowDownImage.src   = 'images/samset.png'  ;
        this.doubleScoreImage.src   = 'images/samset.png'  ;

    }

    update(){
        
    }

    draw(){
        for(let i=0;i<this.images.length;i++){
            if(this.strongImageLoaded && this.zoomOutImageLoaded && this.slowDownImageLoaded && this.doubleScoreImageLoaded){
                this.game.ctx.drawImage(this.currentImg, this.x,this.y, this,this.width,this.height);
            }
        }
    }

}