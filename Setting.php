<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="Setting.css" rel="stylesheet" type="text/css"/>
    <title>Setting</title>
</head>
<body>
    <section id="header">
        <h1>
            セッチング
        </h1>
    </section>
    <section id="setting">
        <div class="form-text">
            <div class="graphics">
                <label>
                    グラフィックス
                </label>
                <button onclick="setSmallGraphics()" type="button">
                    短い
                </button>
                <button onclick="setMediumGraphics()"" type="button">
                    中くらい
                </button>
                <button onclick="setHighGraphics()" type="button">
                    高い
                </button>
            </div>
            <div class="avatar">
                <script>
                    
                </script>
                
            </div>
        
            <div class="sound">
                <label>
                    音
                </label>
                <button onclick="setSmallVolume()" type="button">
                    短い
                </button>
                <button onclick="setHalfVolume()" type="button">
                    中くらい
                </button>
                <button onclick="setFullVolume()" type="button">
                    高い
                </button>
            </div>
            
        
            <div class="brightness">
                <label>
                    輝度
                </label>
                <button onclick="setSmallBrightness()" type="button">
                    短い
                </button>
                <button onclick="setHalfBrightness()" type="button">
                    中くらい
                </button>
                <button onclick="setFullBrightness()" type="button">
                    高い
                </button>
            </div>   
            <div class="avatar">
                <script src='dir.php'>
                    console.log(files)
                </script> 
            </div>
        </div>
          
    </section>
    <footer>
        <div class="div">
            <button type="menu">
                メニュー
            </button>
        </div>
    </footer> 
          
    
</body>
<script>
    var vid = document.getElementById("sound/die.mp3");
    function setSmallVolume() { 
        vid.volume = 0.2;
    } 
    function setHalfVolume() { 
        vid.volume = 0.5;
    } 
    function setFullVolume() { 
        vid.volume = 1.0;
    } 

    function setSmallGraphics() {
        document.getElementById("bg2").style.filter = "grayscale(50%)";
    }
    function setMediumGraphics() {
        document.getElementById("bg2").style.filter = "grayscale(25%)";
    }
    function setHighGraphics() {
        document.getElementById("bg2").style.filter = "grayscale(0%)";
    }

    function setSmallBrightness() {
        document.getElementById("bg").style.filter = "brightness(75%)";
    }
    function setHalfBrightness() {
        document.getElementById("bg").style.filter = "brightness(100%)";
    }
    function setFullBrightness() {
        document.getElementById("bg").style.filter = "brightness(125%)";
    }
    </script> 
</html>