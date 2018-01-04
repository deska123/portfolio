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

    $user_hash = '$2y$10$/4a3rAXWP6QJxoKTc3Lcj.cjIJoaAx5C6GByK/hUfhV2.CxoTGfRq';
    $pass_hash = '$2y$10$spfkvEIGHa/W6TD/EVcJ2O817l1xAthBbGMQV3DzbtuFmywsfXqKa';

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