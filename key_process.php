<?php
    $target_file = basename($_FILES['key_file']['name']);

    if(move_uploaded_file($_FILES['key_file']['tmp_name'], $target_file)) {
        $md5_value = md5_file($target_file);
        $actual_key = '0bc56bffb2b9e8ef8e4b8284b9f59054';

        if(unlink($target_file)) {
            if($md5_value == $actual_key) {
                echo $md5_value;
            } else {
                echo "not matched";
            }
        } 
    }
?>