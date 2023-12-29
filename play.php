<?php
session_start();
if(!isset($_SESSION["username"])){
    header("location:login.php");
}
$skin = array();
$skill = array();
$skillSound = array();
$skinNum = 0;
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
                <?php
                    $conn = new mysqli("localhost","root","","test");
                    // Check connection
                    if ($conn->connect_error) {
                      die("Connection failed: " . $conn->connect_error);
                    }
                    
                    $sql = "SELECT * FROM SKIN";
                    $result = $conn->query($sql);
                    
                    if ($result->num_rows > 0) {
                      while($row = $result->fetch_assoc()) {
                        $skin[]=$row["link"];
                        echo "<div class='mySlides fade'>";
                        echo "<div class='numbertext'>" .$row["ID"]." / ".$result->num_rows."</div>";
                        echo "<img class='Img' src='".$row["link"]."/up.png'>";
                        echo "<div class='text'>Default Bird</div>";
                        echo "</div>";
                      }
                      $skinNum = $result->num_rows;
                    } else {
                      echo "0 results";
                    }
                    $sql = "SELECT * FROM SKILL";
                    $result = $conn->query($sql);
                    
                    if ($result->num_rows > 0) {
                      while($row = $result->fetch_assoc()) {
                        $skill[]=$row["link"];
                        $skillSound[]=$row["soundLink"];
                      }
                    } else {
                      echo "0 results";
                    }
                    $conn->close();
                ?>
                
                <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                <a class="next" onclick="plusSlides(1)">&#10095;</a>
                
                </div>
                <br>
                
                <div style="text-align:center">
                <?php
                    for ($i = 1; $i <= $skinNum; $i++) {
                        echo "<span class='dot' onclick='currentSlide(".$i.")'></span>";
                    }
                ?>
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
<script type="text/javascript">
    var username = "<?php echo $_SESSION["username"]?>";
</script>
<script type="text/javascript" src="js/const.js"></script>
<script type="text/javascript" src="js/bg.js"></script>
<script type="text/javascript" src="js/bird.js"></script>
<script type="text/javascript" src="js/game.js"></script>

<script type="text/javascript">
btnStartGame.addEventListener("click", function() {
    <?php $index=0;?>
    var birdPath="<?php echo $_SESSION["username"]?>";
    var container = document.getElementById("container");
    container.style.display="none"; 
    var skin = new Array();
    var skill = new Array();
    skin = <?php echo json_encode($skin)?>;
    skill = <?php echo json_encode($skill)?>;
    skillSound = <?php echo json_encode($skillSound)?>;
    console.log(skin);
    console.log(skill);
    console.log(skillSound);
    birdPath=skin[slideIndex-1];
    console.log(birdPath);
    var g = new game("canvas",username,birdPath,skill,skillSound);
    btnChooseSkin.style.display ="block";
}); 
</script>

</html>