<?php
session_start();
if(isset($_SESSION["username"])){
    header("location:index.php");
}
if(isset($_SESSION["createAccountSuccess"])){
    $msg = $_SESSION["createAccountSuccess"];
    unset($_SESSION["createAccountSuccess"]);
    echo "<script type='text/javascript'>alert('$msg');</script>";
  }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Đăng nhập vào website</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="css/login.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
<div class="container">  
    <form action="login.php" class="form-login" method="POST" role="form">   

        <h1>Đăng nhập </h1>
        <div class="form-text">
            <label>Username</label>
            <input type="text" class="form-control" id="" name="username" >
        </div>
        <div class="form-text">
            <label>Password</label>
            <input type="password" class="form-control" id="" name="password">
        </div>
        <?php
        if(isset($_POST['submitLogin'])){
            $u = $_POST['username'];
            $p = $_POST['password'];
            $db = mysqli_connect("localhost","root","","test");
            $sql = "select * from USER where username='$u' and password='$p'";
            $rs = mysqli_query($db,$sql);
            if (mysqli_num_rows($rs)>0){
                $_SESSION['username'] = $u;
                header('location: index.php');
            }
            else{
                echo("<div><i id='error-submit'>sai tài khoản hoặc mật khẩu</i></div>");
            }
        }
        ?>
        <div>
            <button type="submit" name="submitLogin">
                Đăng nhập
            </button><br>
            <span>Chưa có tài khoản? Đăng ký <a href="regis.php"> Tại đây</a></span>
        </div>

    </form>            
</div>
<script>
  const formLogin = document.querySelectorAll('.form-text input')
  const formLabel = document.querySelectorAll('.form-text label')
  for (let i =0;i<2;i++){
      formLogin[i].addEventListener("mouseover",function(){
          formLabel[i].classList.add("focus") 
      })
      formLogin[i].addEventListener("mouseout",function(){
        if(formLogin[i].value =="")  {
        formLabel[i].classList.remove("focus") 
        }
      })
  }   
</script>
    </body>
</html>