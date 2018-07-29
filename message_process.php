<?php
    $name = '';
    $email = '';
    $message = '';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];
    }

    $to = "";
    $subject = "New Contact Message";
    $content = "Name : " . $name . "\r\n";
    $content += "Email : " . $email . "\r\n";
    $content += "Message : " . "\r\n";
    $content += $message;
    $headers = "From : " . $email . "\r\n";

    if(mail($to, $subject, $content, $headers)) {
        echo "success";
    } else {
        echo "failed";
    }
?>