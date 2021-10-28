<?php
include 'config.php';
if( isset($_POST['submit']) && $_POST['username']!= '' && $_POST['password'] != '' &&$_POST['repassword'] != '' ){
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $repassword = $_POST["repassword"];

    if($password != $repassword){
        header("location:regis.php");
    }
    $sql = "SELECT * FROM user WHERE username='$username'";
    $old = mysqli_query($conn,$sql);
    #$password = md5($password);
    if( mysqli_num_rows($old)>0){
        header("location:regis.php");
    }
    $sql = "INSERT INTO user (username,email,password) VALUES ('$username','$email','$password')";
    mysqli_query($conn,$sql);
    echo "register success";
} else {
    header("location:regis.php");
}
?>