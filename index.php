<?php
session_start(); 

if(!isset($_SESSION["username"])){
    header("location:login.php");
}
$username = $_SESSION["username"];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <script type="text/javascript" >
        function preventBack(){window.history.forward();}
         setTimeout("preventBack()", 0);
         window.onunload=function(){null};
     </script>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu game</title>
<html>
    <head>
        <title>Đăng nhập vào website</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="css/menu.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <div class="sender-column">
            <strong><?php echo $username?></strong>
        </div>
        <div class="sender-column">
            <a href="controller/logout.php"> Logout</a>
        </div>
        <div class="container">  
            <form action="login.php" class="form-login" method="POST" role="form">   
        
                <br><br><br><br><br><br><br>
                    <button type="submit" >
                        <h1> <a href="play.php">プレー</a> </h1>
                    </button><br>
                    <button type="submit" >
                        <h1><a href="HighScore.php">トップポイント</a></h1>
                    </button><br>
                    <button type="submit" >
                        <h1><a href="skin.php">スキン<a></h1>	
                    </button><br>
                    <button type="submit" >
                        <h1><a href="Guide.html">ガイド</a></h1>
                    </button><br>
                    <button type="submit" >
                        <h1>セッティング</h1>
                    </button>
            </form>            
        </div>
    </body>
</html>
