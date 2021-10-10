class game{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx =  this.canvas.getContext('2d');
        this.canvas.width = BG_WIDTH;
        this.canvas.height = BG_HEIGHT;
        document.body.appendChild(this.canvas);
        this.bird = new bird(this);
        this.bg = new bg(this);
        this.listenMouse();
        
        this.loop();
    }

    listenMouse(){
        this.canvas.addEventListener('click',() => {
            if (this.bg.a == 0) this.bird.vecocity = -3;
            else if (this.bg.a > 0) this.bg.init();
            else if (this.bg.a < 0) this.bg.a = 0;
        });
    }

    loop(){
        this.update();
        this.draw();
        setTimeout( () => this.loop() , 1);
    }

    draw(){

        this.bg.draw();
        this.bird.draw();
    }

    update(){
        this.bird.update();
        this.bg.update();
    }

}

var g = new game();