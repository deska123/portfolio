<?php
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || !$_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
        header("Location: index.html");
    }
    
    if($_FILES['key_file']['name'] == '') {
        echo "empty";
    } else {
        $target_file = basename($_FILES['key_file']['name']);
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $uploadSuccess = 1;

        if($imageFileType != "txt" && $imageFileType != "key") {
            $uploadSuccess = 0;
            echo "wrong file type";
        }

        if($uploadSuccess == 1) {
            if(move_uploaded_file($_FILES['key_file']['tmp_name'], $target_file)) {
                $md5_value = md5_file($target_file);
                $actual_key = '';

                if(unlink($target_file)) {
                    if($md5_value == $actual_key) {
                        echo $md5_value;
                    } else {
                        echo "not matched";
                    }
                } 
            }
        }
    }
?>