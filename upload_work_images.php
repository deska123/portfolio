<?php
    $newIndex = $_POST['number'];

    $uploadSuccess = 1;

    //Checking cover picture file type
    if(isset($_FILES['coverPicture'])) {
        $coverPicture = basename($_FILES['coverPicture']['name']);
        $coverPictureFileType = strtolower(pathinfo($coverPicture, PATHINFO_EXTENSION));
    
        if($coverPictureFileType != "jpg") {
            if($coverPictureFileType != "png") {
                $uploadSuccess = 0;
                echo "wrong cover picture filetype";
            }
        }
    }
   
    //Checking other pictures file type
    if($uploadSuccess == 1) {
        if(isset($_FILES['otherPictures'])) {
            $otherPicturesNum = count($_FILES['otherPictures']['name']);
            
            for($a = 0; $a < $otherPicturesNum; $a++) {
                $otherPicture = basename($_FILES['otherPictures']['name'][$a]);
                $otherPictureFileType = strtolower(pathinfo($otherPicture, PATHINFO_EXTENSION));
                if($otherPictureFileType != "jpg") {
                    if($otherPictureFileType != "png") {
                        $uploadSuccess = 0;
                        echo "wrong other pictures filetype";
                        break;  
                    }
                }
            }
        }
    }
    
    $output = "";

    //Create new directory and upload files
    if($uploadSuccess == 1) {
        $dir = "assets/works/" . $newIndex;
        mkdir($dir);
        if(file_exists($dir)) {
            $coverPicture = basename($_FILES['coverPicture']['name']);
            $coverPictureFileType = strtolower(pathinfo($coverPicture, PATHINFO_EXTENSION));
            $cover_target_file = $dir . "/1." . $coverPictureFileType;
            if(!move_uploaded_file($_FILES['coverPicture']['tmp_name'], $cover_target_file)) {
                $uploadSuccess = 0;
            } else {
                $output = $cover_target_file . "|";
            }

            if($uploadSuccess == 1) {
                $otherPicturesNum = count($_FILES['otherPictures']['name']);
                for($a = 0; $a < $otherPicturesNum; $a++) {
                    $otherPicture = basename($_FILES['otherPictures']['name'][$a]);
                    $otherPictureFileType = strtolower(pathinfo($otherPicture, PATHINFO_EXTENSION));
                    $other_target_file = $dir . "/" . ($a + 2) . "." . $otherPictureFileType;
                    if(!move_uploaded_file($_FILES['otherPictures']['tmp_name'][$a], $other_target_file)) {
                        $uploadSuccess = 0;
                        break;
                    } else {
                        $output .= $other_target_file . "|";
                    }
                }
            }
        } else {
            $uploadSuccess = 0;
        }
    }

    //Cancel any uploads if there are any errors
    if($uploadSuccess == 0) {
        $num = count($_FILES['otherPictures']['name']) + 1;
        for($b = 1; $b <= $num; $b++) {
            $dir = "assets/works/" . $newIndex;
            if(file_exists("/" . $dir . $b . ".jpg")) {
                unlink("/" . $dir . $b . ".jpg");
            }
            if(file_exists("/" . $dir . $b . ".png")) {
                unlink("/" . $dir . $b . ".png");
            }
        }
        rmdir($dir);
        echo "failed upload pictures";
    } else {
        echo $output;
    }
?>