<?php
/*
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
            $actual_key = '0bc56bffb2b9e8ef8e4b8284b9f59054';

            if(unlink($target_file)) {
                if($md5_value == $actual_key) {
                    echo $md5_value;
                } else {
                    echo "not matched";
                }
            } 
        }
    }
    */
    $uploadSuccess = 1;
    if(isset($_FILES['coverPicture'])) {
        $coverPicture = basename($_FILES['coverPicture']['name']);
        $coverPictureFileType = strtolower(pathinfo($coverPicture, PATHINFO_EXTENSION));
    
        if($coverPictureFileType != "jpg" && $coverPictureFileType != "png") {
            $uploadSuccess = 0;
            echo "wrong cover picture filetype";
        }
    }
   
    if($uploadSuccess == 1) {
        if(isset($_FILES['otherPictures'])) {
            $otherPicturesNum = count($_FILES['otherPictures']['name']);
            for($a = 0; $a < $otherPicturesNum; $a++) {
                $otherPicture = basename($_FILES['otherPictures']['name'][$a]);
                echo $otherPicture . "---";
                $otherPictureFileType = strtolower(pathinfo($otherPicture, PATHINFO_EXTENSION));
                if($otherPictureFileType != "jpg" && $otherPictureFileType != "png") {
                    $uploadSuccess = 0;
                    echo "wrong other pictures filetype";
                    break;
                }
            }
        }
    }
?>