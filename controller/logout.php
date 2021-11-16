<?php
    session_start();
    unset($_SESSION['username']);
    unset($_SESSION['password']);
    unset($_SESSION['loginStatus']);
    header('location: ../index.php');
?>