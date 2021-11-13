
<!DOCTYPE html>
<html>
    <head>
        <title>Đăng nhập Admin</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="admin.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
<div class="container">  
    <form action="adminlogin.php" class="form-loginad" method="POST" role="form">   

                    <h1>Đăng nhập Admin </h1>
                    <div class="form-text">
                        <label>Username</label>
                        <input type="text" class="form-control" id="" name="username" >
                    </div>
                    <div class="form-text">
                        <label>Password</label>
                        <input type="password" class="form-control" id="" name="password">
                    </div>
                        <button type="submit" >
                            Đăng nhập
                        </button>
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