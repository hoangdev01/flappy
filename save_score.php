<?php
if(isset($_POST['user-id'])&&isset($_POST['start-time'])&&isset($_POST['end-time'])&&isset($_POST['score']))
{
    $userID = $_POST['user-id'];
    $startTime = $_POST['start-time'];
    $endTime = $_POST['end-time'];
    $score = $_POST['score'];
    $mysqli = new mysqli("localhost","root","","test");
    $strQuery = "INSERT INTO MATCH_INFO (user_id, start_time, end_time, score) VALUES($userID,'$startTime','$endTime',$score)";
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
