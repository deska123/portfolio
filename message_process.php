<?php
    $name = '';
    $email = '';
    $message = '';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];
    }

    echo "name : " . $name . " , email : ". $email . ", message : " . $message;
?>