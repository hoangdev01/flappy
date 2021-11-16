<?php
session_start();
include 'config.php';
if( isset($_POST['submit']) && $_POST['username']!= '' && $_POST['password'] != '' &&$_POST['repassword'] != '' ){
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $repassword = $_POST["repassword"];

    if($password != $repassword){
        $_SESSION["createAccountStatus"] = '間違ったパスワードの確認';
        header("location:../regis.php");
    }
    else{
        $sql = "SELECT * FROM USER WHERE username='$username'";
        $old = mysqli_query($conn,$sql);
        #$password = md5($password);
        if( mysqli_num_rows($old)>0){
            header("location:../regis.php");
        }
        $sql = "INSERT INTO USER (username,mail_address,password) VALUES ('$username','$email','$password')";
        mysqli_query($conn,$sql);
        $_SESSION["createAccountSuccess"] = 'アカウントの成功を作成する';
        header("location:../index.php");
    }
} else {
    $_SESSION["createAccountStatus"] = 'アカウントを作成できません';
    header("location:../regis.php");
}
?>