<?php
 $db = mysqli_connect("localhost","root","","test")
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>High Score</title>
    <link href="css/HighScore.css" rel="stylesheet" type="text/css"/>
</head>
<body>
    <div class="container">
        <form class="form-text">
            <h1>
                トップ
            </h1>
            <div class="content">
                <table id="table-rank">
                    <thead>
                    <tr>
                        <td > 
                            <span class "white text">  ユーザー  |</span>
                        </td>
                        <td align = "center">
                            <span class "white text">  スコア  </span>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                        <?php
                            $sql = "SELECT username,max(score) AS max FROM MATCH_INFO GROUP BY username ORDER BY max DESC ";
                            $result = $db -> query($sql);
                            while($row = $result -> fetch_assoc()){
                            echo"
                        <tr>
                            <td align = 'center'>".$row['username']."</td>
                            <td align = 'center'>".$row['max']."</td>
                        </tr>" ; 
                        }
                        ?>
                    </tbody>
                </table>
            </div>
            
            <div>
                <button type="menu">
                    ^
                </button>
                <button type="menu">
                    v
                </button>
            </div>
            <div>
                <button type="submit">
                    バック
                </button>
            </div>
        </form>
    </div>
    
</body>
</html>