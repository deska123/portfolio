<?php
    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    
    $username = '';
    $password = '';
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if($_POST['username'] != '' && $_POST['password'] != '') {
            $username = test_input($_POST['username']);
            $password = test_input($_POST['password']);
        }
    }

    if(password_verify($username, $user_hash)) {
        if(password_verify($password, $pass_hash)) {
            echo "login success";
        } else {
            echo "error password";
        }
    } else {
        echo "error username";
    }
?>