<?php
//lấy dữ liệu từ login2.html
$u = $_POST['username'];
$p = $_POST['password'];

//kết nối tới csdl
$db = mysqli_connect("localhost","root","","test");

//Truy vấn xem user và password có trong csdl không
$sql = "select * from admin where username='$u' and password='$p'";
$rs = mysqli_query($db,$sql);
if (mysqli_num_rows($rs)>0){
    include 'quanli.php';
}else{
    echo"<h2> Sai tai khoan hoac mat khau</h2>";
}
?>