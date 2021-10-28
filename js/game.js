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