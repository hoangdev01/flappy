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

<body>
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
                    for ($i = 1; $i <= $result->num_rows; $i++) {
                        echo "<span class='dot' onclick='currentSlide(".$i.")'></span>";
                    }
                ?>
                </div>
            <h1>
                
            </h1>
            <div class="button">
                <button type="button" id="return-menu">
                    <a href="index.php" style="text-decoration:none"> メニュー</a>
                </button>
            </div>
        </form>
    </div>
</body>
<script type="text/javascript">
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
</script>
</html>