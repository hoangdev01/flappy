class game{
    constructor(ID, birdPath){
        this.canvas = document.getElementById(ID);
        this.ctx =  this.canvas.getContext('2d');
        this.birdPath = birdPath;
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        // this.canvas.width = window.innerWidth * 0.8;
        // this.canvas.height = window.innerHeight * 0.8;
        document.body.appendChild(this.canvas);
        this.timeLoop = TIME_LOOP;
        this.bird = new bird(this);
        this.bg = new bg(this);
        this.continueTime=0;

        this.wingAudio="sound/wing.ogg";
        this.hitAudio="sound/hit.ogg";
        this.dieAudio="sound/die.ogg";
        this.pointAudio="sound/point.ogg";
        this.strongAudio="sound/strong.wav";
        this.doubleScoreAudio="sound/doubleScore.wav";
        this.slowDownTimeAudio="sound/slowDownTime.wav";
        this.zoomOutAudio="sound/zoomout.wav";
        this.removePipeAudio="sound/removePipe.mp3";
        // this.item = new item(this);
        this.listenMouse();
        this.loop();
    }

    listenMouse(){
        this.canvas.addEventListener('click',() => {
            if (this.bg.checkStatus == IN_GAME_STATUS) {
                this.bird.vecocity = -3;
                this.playAudio(this.wingAudio);
            }
            else if (this.bg.checkStatus == GAME_OVER_STATUS) this.bg.init();
            else if (this.bg.checkStatus == START_STATUS) this.bg.checkStatus = IN_GAME_STATUS;
            else if (this.bg.checkStatus == PAUSE_STATUS) this.bg.checkStatus = CONTINUE_STATUS;
        });
        this.canvas.addEventListener('contextmenu', ev => {
            ev.preventDefault();
            if(this.bg.checkStatus == IN_GAME_STATUS){
                this.bg.checkStatus = PAUSE_STATUS;
                this.continueTime = 300;
            }
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
    }

    update(){
        this.bird.update();
        this.bg.update();
    }
    callPHP(params) {
        var url = "get_score.php";
        var form = new FormData();
        form.set('x', params);
        console.log(params);
        fetch(url,{method:'POST',body:form}).then(function(response){
            return response.text();
        })
        .then(function(data){
            console.log(data);
        });
    }
    
    playAudio(path) {
        this.audioStatus=false;
        var audio = new Audio(path);
        audio.play();
        
    }
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}
var btnStartGame = document.getElementById("start-game");

btnStartGame.addEventListener("click", function() {
    var birdPath="";
    var container = document.getElementById("container");
    container.style.display="none"; 
    if(slideIndex==1) birdPath="defaultBird";
    else if(slideIndex==2) birdPath="yellowBird";
    else birdPath="rectangularBird";

    var g = new game("canvas",birdPath);
}); 