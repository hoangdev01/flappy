<?php
if(isset($_POST['username'])&&isset($_POST['start-time'])&&isset($_POST['end-time'])&&isset($_POST['score']))
{
    $username = $_POST['username'];
    $startTime = $_POST['start-time'];
    $endTime = $_POST['end-time'];
    $score = $_POST['score'];
    $mysqli = new mysqli("localhost","root","","test");
    $strQuery = "INSERT INTO MATCH_INFO (username, start_time, end_time, score) VALUES('$username','$startTime','$endTime',$score)";
    echo $strQuery;
    if ($mysqli -> connect_errno) {
        echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
        exit();
    }
    if (!$mysqli -> query($strQuery)) {
        echo "Error description: " . $mysqli -> error;
    }
    else{
        echo "sucess";
    }
    $mysqli -> close();
}
else{
    echo "Error";
}
?>
