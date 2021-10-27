class game{
    constructor(ID){
        this.canvas = document.getElementById(ID);
        this.ctx =  this.canvas.getContext('2d');
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        // this.canvas.width = window.innerWidth * 0.8;
        // this.canvas.height = window.innerHeight * 0.8;
        document.body.appendChild(this.canvas);
        this.timeLoop = TIME_LOOP;
        this.bird = new bird(this);
        this.bg = new bg(this);
        // this.item = new item(this);
        this.listenMouse();
        this.loop();
    }

    listenMouse(){
        this.canvas.addEventListener('click',() => {
            if (this.bg.checkStatus == IN_GAME_STATUS) this.bird.vecocity = -3;
            else if (this.bg.checkStatus == GAME_OVER_STATUS) this.bg.init();
            else if (this.bg.checkStatus == START_STATUS) this.bg.checkStatus = IN_GAME_STATUS;
        });
    }

    loop(){
        this.update();
        this.draw();
        setTimeout( () => this.loop() , this.timeLoop);
    }

    draw(){
        this.bg.draw();
        this.bird.draw();
        if(this.bg.checkStatus == 0){
            this.ctx.fillStyle = "white";
            this.ctx.font = "bold 30px Arial";
            this.ctx.textAlign = "center"
            this.ctx.fillText(this.bg.score, BG_WIDTH/2, (BG_HEIGHT / 7));
        }
    }

    update(){
        this.bird.update();
        this.bg.update();
    }
     callPHP(params) {
        var httpc = new XMLHttpRequest(); // simplified for clarity
        var url = "get_data.php";
        httpc.open("POST", url, true); // sending as POST
    
        httpc.onreadystatechange = function() { //Call a function when the state changes.
            if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
                alert(httpc.responseText); // some processing here, or whatever you want to do with the response
            }
        };
        httpc.send(params);
    }
}

var g = new game("canvas");