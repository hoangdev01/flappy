<?php
session_start();
if(!isset($_SESSION["username"])){
    header("location:../login.php");
}
if(isset($_POST['username'])&&isset($_POST['start-time'])&&isset($_POST['end-time'])&&isset($_POST['score']))
{
    $username = $_POST['username'];
    $startTime = $_POST['start-time'];
    $endTime = $_POST['end-time'];
    $score = $_POST['score'];

    $mysqli = new mysqli("localhost","root","","test");
    $strQuery = "INSERT INTO MATCH_INFO (username, start_time, end_time, score) VALUES('$username','$startTime','$endTime',$score)";
    if ($mysqli -> connect_errno) {
        echo "\nFailed to connect to MySQL: " . $mysqli -> connect_error;
        exit();
    }
    if (!$mysqli -> query($strQuery)) {
        echo "\nError description: " . $mysqli -> error;
    }
    else{
        echo "\nsuccess";
    }
    $mysqli -> close();
}
else{
    echo "Error";
}
?>
