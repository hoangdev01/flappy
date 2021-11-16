<?php
session_start();
if(!isset($_SESSION["username"])){
    header("location:login.php");
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Play</title>
    <link href="css/Skin.css" rel="stylesheet" type="text/css"/>
</head>
<style>
    :root{
        --bg1 : #9b59b6;
        --bg2 : #3498db;
        --text : #26ade4;
    }
    body{
        display: flex;
        justify-content: center;
        /* align-items: center; */
        text-align: center;
        background: linear-gradient(to bottom right,var(--bg1),var(--bg2));
        width: 100vw;
        height: 100vh;
    }
    #canvas {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); 
    }
    .sender-column {
        vertical-align: middle;
        font-size:20px;
        height:30px;
        background-color:white;
        width:100%;
        position: fixed;
        text-align: right;
    }   
    .sender-column a{
        text-decoration:none;
    }
    #choose-skin{
        bottom:30px;
        right:50%px;
        width:140px;
    }
    #choose-skin:hover{
        cursor: pointer;
    }


</style>

<body>
    <div class="sender-column">
            <strong><a href="index.php">return menu</a></strong>
    </div>
    <div class="container" id="container">
        <form class="formLabel">
            <div class="slideshow-container">
                <div class="mySlides fade">
                  <div class="numbertext">1 / 3</div>
                  <img class="Img" src="images/defaultBird/up.png">
                  <div class="text">Default Bird</div>
                </div>
                
                <div class="mySlides fade">
                  <div class="numbertext">2 / 3</div>
                  <img class="Img" src="images/yellowBird/up.png">
                  <div class="text">Hat Bird</div>
                </div>
                
                <div class="mySlides fade">
                  <div class="numbertext">3 / 3</div>
                  <img class="Img" src="images/rectangularBird/up.png">
                  <div class="text">Rectangular Bird</div>
                </div>
                
                <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                <a class="next" onclick="plusSlides(1)">&#10095;</a>
                
                </div>
                <br>
                
                <div style="text-align:center">
                  <span class="dot" onclick="currentSlide(1)"></span> 
                  <span class="dot" onclick="currentSlide(2)"></span> 
                  <span class="dot" onclick="currentSlide(3)"></span> 
                </div>
            <h1>
                
            </h1>
            <div class="button">
                <button type="button" id="return-menu">
                    メニュー
                </button>
                <button type="button" id="start-game">
                    スタート
                </button>
            </div>
        </form>
    </div>
    <canvas id="canvas"></canvas>
    <button type="button" id="choose-skin" class="sender-column">
        スキンを選ぶ
    </button>
</body>
<!-- <?php echo $_SESSION['rank'];unset($_SESSION["rank"])?> -->
<!-- <?php echo $_SESSION['maxScore'];unset($_SESSION["maxScore"])?> -->
<script type="text/javascript">
    var username = "<?php echo $_SESSION["username"]?>";
</script>
<script type="text/javascript">
    function getRank(){
        // var rank = "";
        var rank = 0;
        return rank;
    }
</script>
<script type="text/javascript">
    function getMaxScore(){
        // var maxScore = "";
        var maxScore = 0;
        return maxScore;
    }
</script>
<script type="text/javascript" src="js/const.js"></script>
<script type="text/javascript" src="js/bg.js"></script>
<script type="text/javascript" src="js/bird.js"></script>
<script type="text/javascript" src="js/game.js"></script>
</html>