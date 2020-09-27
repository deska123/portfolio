<?php
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || !$_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
        header("Location: index.html");
    }
    
    $goal = '';
    $name = '-';
    $email = '-';
    $message = '-';
    $time_log = '-';
    $ipaddress = '-';

    $success = 1;

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $goal = $_POST['goal'];

        if ($goal == 'addNew') {
            $name = $_POST['name'];
            $email = $_POST['email'];
            $message = $_POST['message'];
            $time_log = $_POST['timeLog'];
        }
    } 
        
    $path = "";
    $fileSize = filesize($path);

    if ($goal == 'addNew') {
        //Taken from https://www.virendrachandak.com/techtalk/getting-real-client-ip-address-in-php-2/
        if (getenv('HTTP_CLIENT_IP')) {
            $ipaddress = getenv('HTTP_CLIENT_IP');
        } else if(getenv('HTTP_X_FORWARDED_FOR')) {
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        } else if(getenv('HTTP_X_FORWARDED')) {
            $ipaddress = getenv('HTTP_X_FORWARDED');
        } else if(getenv('HTTP_FORWARDED_FOR')) {
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        } else if(getenv('HTTP_FORWARDED')) {
            $ipaddress = getenv('HTTP_FORWARDED');
        } else if(getenv('REMOTE_ADDR')) {
            $ipaddress = getenv('REMOTE_ADDR');
        } else {
            $ipaddress = 'Unknown';
        }

        $contentAdded = $name . "\t" . $email . "\t" . $message . "\t" . $time_log . "\t" . $ipaddress;
        $result = '';
        if ($fileSize == 0) {
            $result = file_put_contents($path, $contentAdded);
        } else if ($fileSize > 0){
            $myFile = fopen($path, "r");
            $originalContent = fread($myFile, $fileSize);
            fclose($myFile);
            $result = file_put_contents($path, $originalContent . "\r\n" . $contentAdded);
        }

        clearstatcache();
        if ($result !== FALSE and $result <> FALSE and $result != FALSE) {
            echo "success";
        } else {
            echo "error";
        }
    } else if ($goal == 'show') {
        if ($fileSize > 0) {
            $myFile = fopen($path, "r");
            while(!feof($myFile)) {
                echo "<tr>";
                $temp = fgets($myFile);
                $arr = explode("\t", $temp);
                echo "<td>" . $arr[0] . "</td>";
                echo "<td>" . $arr[1] . "</td>";
                echo "<td>" . $arr[2] . "</td>";
                echo "<td>" . $arr[3] . "</td>";
                echo "<td>" . $arr[4] . "</td>";
                echo "</tr>";
            }
            fclose($myfile);
        }
    }
?>