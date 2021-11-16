<?php $db = mysqli_connect("localhost","root","","test"); ?>
<!DOCTYPE html>
<html lang="en">

<head>
        <title>Đăng nhập Admin</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="admin.css" rel="stylesheet" type="text/css"/>
    </head>

<body>
<div class="container"> 
    <div class="form-loginad">
                <h1 >USER INFO</h1>
                <table class="white-text"  >
                    <thead >
                        <tr>
                            <td align="center">Email </td>
                            <td align="center">Username </td>
                            <td align="right">Password </td>
                                                                    
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                $sql = "select *from USER";
                $result = $db->query($sql);
                while($row =$result -> fetch_assoc()){
                echo"
                <tr>
                    <td align='center'>".$row['mail_address']."</td>
                    <td align='center'>".$row['username']."</td>
                    <td align='center'>".$row['password']."</td>
                </tr>";
                }
                ?>
                    </tbody>
                </table>
         </div>
    </div>
</body>

</html>