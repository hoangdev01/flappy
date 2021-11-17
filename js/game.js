class game{
    constructor(ID,username, birdPath,skill,skillSound){
        this.canvas = document.getElementById(ID);
        this.ctx =  this.canvas.getContext('2d');
        this.skill = skill;
        this.skillSound = skillSound;
        this.birdPath = birdPath;
        this.username = username;
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
        this.strongAudio=this.skillSound[0];
        this.zoomOutAudio=this.skillSound[1];
        this.slowDownTimeAudio=this.skillSound[2];
        this.doubleScoreAudio=this.skillSound[3];
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
    callPHP(startTime,endTime,score) {
        var url = "controller/save_score.php";
        var datashow = "";
        var form = new FormData();
        form.set('username',this.username);
        form.set('start-time', startTime);
        form.set('end-time', endTime);
        form.set('score', score);
        console.log(form);
        fetch(url,{method:'POST',body:form}).then(function(response){
            return response.text();
        })
        .then(function(data){
            datashow = data;
            console.log(data);
        });
        console.log(datashow);
    }
    
    playAudio(path) {
        this.audioStatus=false;
        var audio = new Audio(path);
        audio.play();
        
    }
}

console.log(username);

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
var btnReturnMenu = document.getElementById("return-menu");
var btnStartGame = document.getElementById("start-game");
var btnChooseSkin = document.getElementById("choose-skin");

btnReturnMenu.addEventListener("click",function() {
    window.location.href = "index.php";
})

btnChooseSkin.addEventListener("click",function(){
    history.go(0);
});
btnChooseSkin.style.display="none";
