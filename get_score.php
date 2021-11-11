<?php
if(isset($_POST['x']))
{
    $get = $_POST['x'];
    $mysqli = new mysqli("localhost","root","","test");
    if ($mysqli -> connect_errno) {
        echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
        exit();
    }
    if (!$mysqli -> query("INSERT INTO MATCH_INFO (user_id, start_time, end_time, score) VALUES($get)")) {
        echo("Error description: " . $mysqli -> error);
    }
    $mysqli -> close();
}
else{
    echo "sai";
}
?>
